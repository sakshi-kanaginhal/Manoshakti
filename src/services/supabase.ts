
import { User } from '../types';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const TOKEN_KEY = 'manoshakti_access_token';
const STORAGE_SESSION_KEY = 'manoshakti_current_user';

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface ServiceResult {
  user: User | null;
  error: string | null;
}

function saveSession(data: AuthResponse): User {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(data.user));
  return data.user;
}

function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STORAGE_SESSION_KEY);
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  authenticated = false
): Promise<any> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (authenticated) {
    const token = getToken();

    if (!token) {
      throw new Error('Your session has expired. Please log in again.');
    }

    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
    }

    const detail = result.detail;

    const message = Array.isArray(detail)
      ? detail.map((item: any) => item.msg).join(', ')
      : typeof detail === 'string'
        ? detail
        : result.message || 'Something went wrong. Please try again.';

    throw new Error(message);
  }

  return result;
}

export const authService = {
  // SIGN UP
  async signUp(params: {
    fullName: string;
    email: string;
    contactNumber: string;
    password: string;
  }): Promise<ServiceResult> {
    try {
      const result: AuthResponse = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          full_name: params.fullName.trim(),
          email: params.email.trim().toLowerCase(),
          contact_number: params.contactNumber.trim(),
          password: params.password
        })
      });

      const user = saveSession(result);

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Registration failed.'
      };
    }
  },

  // LOGIN
  async signIn(
    email: string,
    password: string
  ): Promise<ServiceResult> {
    try {
      const result: AuthResponse = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        })
      });

      const user = saveSession(result);

      return { user, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Login failed.'
      };
    }
  },

  // LOGOUT
  async signOut(): Promise<void> {
    try {
      if (getToken()) {
        await apiRequest('/auth/logout', {
          method: 'POST'
        }, true);
      }
    } finally {
      clearSession();
    }
  },

  // GET CURRENT USER
  async getCurrentUser(): Promise<ServiceResult> {
    try {
      const result: User = await apiRequest(
        '/users/me',
        { method: 'GET' },
        true
      );

      localStorage.setItem(
        STORAGE_SESSION_KEY,
        JSON.stringify(result)
      );

      return { user: result, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Unable to retrieve account.'
      };
    }
  },

  // GET CACHED USER
  getCurrentSessionUser(): User | null {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      const token = getToken();

      if (!saved || !token) return null;

      return JSON.parse(saved) as User;
    } catch {
      clearSession();
      return null;
    }
  },

  // UPDATE ACCOUNT
  async updateAccount(
    _userId: string,
    data: {
      full_name?: string;
      contact_number?: string;
    }
  ): Promise<ServiceResult> {
    try {
      const result: User = await apiRequest(
        '/users/me',
        {
          method: 'PUT',
          body: JSON.stringify(data)
        },
        true
      );

      localStorage.setItem(
        STORAGE_SESSION_KEY,
        JSON.stringify(result)
      );

      return { user: result, error: null };
    } catch (error: any) {
      return {
        user: null,
        error: error.message || 'Account update failed.'
      };
    }
  },

  // DELETE ACCOUNT
  async deleteAccount(_userId: string): Promise<{
    error: string | null;
  }> {
    try {
      await apiRequest(
        '/users/me',
        { method: 'DELETE' },
        true
      );

      clearSession();

      return { error: null };
    } catch (error: any) {
      return {
        error: error.message || 'Account deletion failed.'
      };
    }
  }
};
