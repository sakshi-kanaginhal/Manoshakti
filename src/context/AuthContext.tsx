import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserConsent } from '../types';
import { authService } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error: string | null }>;
  register: (data: {
    fullName: string;
    email: string;
    contactNumber: string;
    password: string;
  }) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<void>;
  updateAccount: (data: {
    full_name?: string;
    contact_number?: string;
  }) => Promise<{ success: boolean; error: string | null }>;
  deleteAccount: () => Promise<{ success: boolean; error: string | null }>;
  switchDemoRole: (newRole: UserRole) => void;
  quickDemoLogin: (demoRole: UserRole) => Promise<void>;
  consents: UserConsent;
  updateConsent: (key: keyof Omit<UserConsent, 'consent_version' | 'terms_accepted_at'>, value: boolean) => void;
}

const DEFAULT_CONSENTS: UserConsent = {
  microphone_consent: true,
  camera_consent: true,
  ai_analysis_consent: true,
  consent_version: '1.0',
  terms_accepted_at: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentSessionUser());
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('manoshakti_active_role');
    return (savedRole as UserRole) || 'student';
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [consents, setConsents] = useState<UserConsent>(() => {
    const saved = localStorage.getItem('manoshakti_consents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_CONSENTS;
  });

  useEffect(() => {
    localStorage.setItem('manoshakti_consents', JSON.stringify(consents));
  }, [consents]);

  useEffect(() => {
    localStorage.setItem('manoshakti_active_role', role);
  }, [role]);
  useEffect(() => {
    let active = true;
  
    const restoreSession = async () => {
      if (!authService.getCurrentSessionUser()) {
        return;
      }
  
      const result = await authService.getCurrentUser();
  
      if (active) {
        setUser(result.user);
      }
    };
  
    restoreSession();
  
    return () => {
      active = false;
    };
  }, []);

  const clearError = () => setError(null);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.signIn(email, password);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return { success: false, error: res.error };
      }
      if (res.user) {
        setUser(res.user);
        if (rememberMe) {
          localStorage.setItem('manoshakti_remember_email', email);
        } else {
          localStorage.removeItem('manoshakti_remember_email');
        }
      }
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const msg = err?.message || 'Login failed. Please check credentials.';
      setError(msg);
      setLoading(false);
      return { success: false, error: msg };
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    contactNumber: string;
    password: string;
  }): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.signUp({
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
        password: data.password
      });

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return { success: false, error: res.error };
      }

      if (res.user) {
        setUser(res.user);
      }
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      const msg = err?.message || 'Registration failed. Please try again.';
      setError(msg);
      setLoading(false);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setRole('student');
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (data: {
    full_name?: string;
    contact_number?: string;
  }): Promise<{ success: boolean; error: string | null }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    setLoading(true);
    try {
      const res = await authService.updateAccount(user.id, data);
      if (res.error) {
        setLoading(false);
        return { success: false, error: res.error };
      }
      if (res.user) {
        setUser(res.user);
      }
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err?.message || 'Update failed' };
    }
  };

  const deleteAccount = async (): Promise<{ success: boolean; error: string | null }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    setLoading(true);
    try {
      const res = await authService.deleteAccount(user.id);
      if (res.error) {
        setLoading(false);
        return { success: false, error: res.error };
      }
      setUser(null);
      setLoading(false);
      return { success: true, error: null };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err?.message || 'Deletion failed' };
    }
  };

  const switchDemoRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const quickDemoLogin = async (demoRole: UserRole) => {
    setRole(demoRole);
    if (demoRole === 'student') {
      await login('sakshi.student@manoshakti.org', 'password123', true);
    } else if (demoRole === 'professional') {
      const res = await login('priya.varma@manoshakti.org', 'password123', true);
      if (!res.success) {
        // Register demo counselor if not already in store
        await register({
          fullName: 'Dr. Priya Varma, Ph.D.',
          email: 'priya.varma@manoshakti.org',
          contactNumber: '+919811122334',
          password: 'password123'
        });
      }
    } else {
      const res = await login('admin@manoshakti.org', 'password123', true);
      if (!res.success) {
        // Register demo admin if not already in store
        await register({
          fullName: 'System Administrator',
          email: 'admin@manoshakti.org',
          contactNumber: '+919800011122',
          password: 'password123'
        });
      }
    }
  };

  const updateConsent = (
    key: keyof Omit<UserConsent, 'consent_version' | 'terms_accepted_at'>,
    value: boolean
  ) => {
    setConsents((prev: UserConsent) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        loading,
        error,
        clearError,
        login,
        register,
        logout,
        updateAccount,
        deleteAccount,
        switchDemoRole,
        quickDemoLogin,
        consents,
        updateConsent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
