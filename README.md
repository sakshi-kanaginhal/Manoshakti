# ManoShakti – Empowering Youth Mental Strength

> **"Understand Your Emotions. Strengthen Your Mind."**

ManoShakti is a full-stack, AI-powered mental wellness and cognitive strength platform architected specifically for students and young adults. It bridges the gap between everyday academic stress and clinical care through multimodal emotion intelligence, vagal downregulation tools, an empathetic Gemini companion, and an accredited counselor network.

---

## 1. Project Architecture

```
manoshakti/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routers.py           # 17 FastAPI REST endpoints
│   │   ├── core/
│   │   │   ├── config.py            # Settings, Supabase & PostgreSQL env vars
│   │   │   ├── security.py          # JWT, Passwords, Role check dependencies
│   │   ├── database/
│   │   │   ├── base.py              # DeclarativeBase
│   │   │   ├── session.py           # Engine & SessionLocal
│   │   ├── ml/
│   │   │   ├── text_emotion.py      # GoEmotions DistilBERT Pipeline A
│   │   │   ├── voice_emotion.py     # Acoustic Pitch & Cadence Pipeline B
│   │   │   ├── facial_emotion.py    # Facial Landmark Pipeline C
│   │   │   ├── fusion_engine.py     # Multimodal Late Fusion Engine
│   │   ├── models/
│   │   │   ├── models.py            # 23 normalized SQLAlchemy tables
│   │   ├── schemas/
│   │   │   ├── schemas.py           # Pydantic v2 request & response schemas
│   │   ├── services/
│   │   │   ├── gemini_service.py    # Gemini 3.8 Flash empathetic assistant
│   │   └── main.py                  # FastAPI app entry point
│   ├── migrations/
│   │   ├── env.py                   # Alembic environment
│   │   └── alembic.ini              # Alembic config
│   ├── tests/
│   │   └── test_ml_pipelines.py     # Unit test suite for ML pipelines
│   └── requirements.txt             # Python dependencies
├── database/
│   ├── schema.sql                   # Normalized PostgreSQL 23-table schema
│   └── seed.sql                     # Seed data with marked fictional demo doctors
├── docs/
│   ├── ARCHITECTURE.md              # Detailed architecture & ML formulas
│   └── API_REFERENCE.md             # REST API specifications
├── src/                             # React 19 + TypeScript + Tailwind CSS Frontend
│   ├── assets/images/               # Generated high-resolution wellness assets
│   ├── components/layout/           # Navbar (Top bar contract), Sidebar, Footer
│   ├── context/                     # AuthContext (Role management) & ThemeContext
│   ├── pages/                       # 19 User Pages + 6 Admin Pages + Public Pages
│   ├── services/                    # api.ts (FastAPI client + fallback preview ML)
│   └── types/                       # TypeScript models
├── server.ts                        # Full-stack Node/Express dev server with Gemini proxy
├── package.json
└── README.md
```

---

## 2. Local Setup & Execution Guide

### Running the Python FastAPI Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file in `/backend` (or root):
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/manoshakti
   SECRET_KEY=your-secure-jwt-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

5. **Apply Database Schema / Alembic Migrations**:
   ```bash
   # Run schema directly:
   psql -U postgres -d manoshakti -f database/schema.sql
   psql -U postgres -d manoshakti -f database/seed.sql

   # Or run via Alembic:
   alembic upgrade head
   ```

6. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   Interactive Swagger documentation will be live at `http://localhost:8000/docs`.

---

### Running the React Frontend

1. **Install Node packages**:
   ```bash
   npm install
   ```

2. **Configure API Base URL**:
   In your `.env` or `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
   *(Note: In the Google AI Studio preview sandbox, if FastAPI is not running on port 8000, ManoShakti’s client-side API engine automatically activates full in-memory persistence and client ML inference, ensuring 100% of the UI, emotion analyzers, and breathing pacers remain testable without errors).*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000`.

---

## 3. Running Backend Tests

Run the comprehensive ML pipeline tests:
```bash
cd backend
pytest tests/
```

---

## 4. Evaluation Demo Logins (1-Click)

On the `/login` page and in the authenticated sidebar footer, instant 1-click role switches are provided:
- **Student Role**: `sakshi.student@manoshakti.org` (Access to all emotion engines, journal, breathing, and academic tools)
- **Counselor Role**: `priya.varma@manoshakti.org` (Professional directory preview and appointment booking management)
- **Admin Role**: `admin@manoshakti.org` (Access to `/admin` dashboard, doctor verification queues, and community moderation)

---

## 5. Ethical AI & Crisis Escalation Notice

- **Wellness Companion, NOT Medical Diagnosis**: ManoShakti is explicitly designed as a self-awareness companion and does **not** diagnose clinical conditions, prescribe pharmaceuticals, or replace clinical psychologists.
- **Privacy Assurance**: Camera and microphone inputs are evaluated ephemerally in memory; no raw camera images or biometric templates are stored. Student records are strictly never shared with educational institutions.
- **24/7 Crisis Escalation**: If active suicidal ideation or self-harm is detected, the AI companion automatically prioritizes national emergency crisis lines:
  - **Tele-MANAS (India)**: 14416 or 1800-891-4416 (24/7 Toll-Free)
  - **KIRAN**: 1800-599-0019
  - **988 Lifeline (US & International)**: Call or text 988
# Manoshakti
