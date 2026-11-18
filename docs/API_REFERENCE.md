# ManoShakti – REST API Reference

The FastAPI backend exposes interactive OpenAPI documentation at `/docs` (Swagger UI) and `/redoc`.

## Base URLs
- Local FastAPI: `http://localhost:8000/api`
- Frontend Proxy in Dev: `/api`

---

## Endpoints Summary

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new student or counselor account
- `POST /api/auth/login` - Authenticate user and return JWT bearer token

### 2. User Profiles (`/api/users`)
- `GET /api/users/me` - Retrieve authenticated user profile, streaks, and resilience score

### 3. Emotion ML Pipelines
- `POST /api/emotions/analyze-text` - Pipeline A: GoEmotions text sentiment classification
- `POST /api/voice/analyze-acoustic` - Pipeline B: Acoustic pitch, vocal energy, and cadence
- `POST /api/facial/analyze-landmarks` - Pipeline C: Facial landmark geometry & muscle cues
- `POST /api/fusion/fuse` - Multimodal Late Fusion Engine with discordance detection

### 4. Self-Care & Tracking
- `POST /api/moods/` - Log daily mood (1-10), energy, sleep hours, and triggers
- `GET /api/moods/history` - Retrieve 30-day mood and energy trajectory
- `POST /api/journals/` - Create private encrypted journal entry
- `GET /api/journals/` - List user journal entries

### 5. Mano AI Assistant (`/api/assistant`)
- `POST /api/assistant/chat` - Chat with Mano AI (Gemini 3.8 Flash) with crisis detection

### 6. Stress & Academics
- `POST /api/stress/assess` - Submit PSS-10 perceived stress self-assessment
- `GET /api/activities/` - List guided mindfulness activities & breathwork

### 7. Professional Directory & Appointments
- `GET /api/professionals/` - Search verified psychologists and counselors
- `POST /api/appointments/` - Book consultation slot with meeting room link
- `GET /api/appointments/my` - List scheduled appointments

### 8. Peer Community (`/api/community`)
- `GET /api/community/posts` - Retrieve safe peer support discussions
- `POST /api/community/posts` - Create new community post (anonymous option)

### 9. Administration (`/api/admin`)
- `GET /api/admin/overview` - Platform KPIs, pending verifications, and system health
