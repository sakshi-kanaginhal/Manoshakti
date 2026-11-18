-- ====================================================================
-- MANOSHAKTI: EMPOWERING YOUTH MENTAL STRENGTH
-- PostgreSQL / Supabase Relational Database Schema (schema.sql)
-- MINIMAL USER PRIVACY SPECIFICATION
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE (Strictly minimal 6 essential fields, linked to Supabase Auth)
-- No passwords, no DOB, no gender, no home address, no academic details.
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable Supabase Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Each user can access and update ONLY their own record
DROP POLICY IF EXISTS "Users can view own account" ON users;
CREATE POLICY "Users can view own account"
    ON users FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own account" ON users;
CREATE POLICY "Users can update own account"
    ON users FOR UPDATE
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own account" ON users;
CREATE POLICY "Users can insert own account"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own account" ON users;
CREATE POLICY "Users can delete own account"
    ON users FOR DELETE
    USING (auth.uid() = id);

-- 2. MOOD ENTRIES (Voluntary emotional check-ins)
CREATE TABLE IF NOT EXISTS mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
    primary_emotion VARCHAR(100) NOT NULL,
    secondary_emotions TEXT[],
    energy_level INT CHECK (energy_level BETWEEN 1 AND 10),
    sleep_hours NUMERIC(4, 1),
    notes TEXT,
    triggers TEXT[],
    logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_date ON mood_entries(user_id, logged_date);
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own mood entries" ON mood_entries
    FOR ALL USING (auth.uid() = user_id);

-- 3. JOURNAL ENTRIES (Client-encrypted private reflections)
CREATE TABLE IF NOT EXISTS journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_encrypted BOOLEAN DEFAULT TRUE,
    prompt_used VARCHAR(255),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user ON journal_entries(user_id);
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own journals" ON journal_entries
    FOR ALL USING (auth.uid() = user_id);

-- 4. EMOTION ANALYSES (GoEmotions text evaluation)
CREATE TABLE IF NOT EXISTS emotion_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    input_text TEXT NOT NULL,
    detected_emotion VARCHAR(100) NOT NULL,
    confidence NUMERIC(5, 4) NOT NULL,
    emotion_scores JSONB NOT NULL,
    model_version VARCHAR(100) DEFAULT 'GoEmotions-DistilBERT-v1.4',
    user_correction VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_emotion_analyses_user ON emotion_analyses(user_id);
ALTER TABLE emotion_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own emotion analyses" ON emotion_analyses
    FOR ALL USING (auth.uid() = user_id);

-- 5. VOICE ANALYSES (Acoustic indicators - no raw audio stored)
CREATE TABLE IF NOT EXISTS voice_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    duration_seconds NUMERIC(6, 2) NOT NULL,
    pitch_mean_hz NUMERIC(8, 2),
    pitch_variability NUMERIC(8, 2),
    vocal_energy NUMERIC(8, 4),
    speech_rate_wpm INT,
    pause_frequency NUMERIC(5, 2),
    acoustic_features JSONB,
    predicted_state VARCHAR(100) NOT NULL,
    confidence NUMERIC(5, 4) NOT NULL,
    model_version VARCHAR(100) DEFAULT 'Acoustic-Wav2Vec-LSTM-v2.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_voice_analyses_user ON voice_analyses(user_id);
ALTER TABLE voice_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own voice analyses" ON voice_analyses
    FOR ALL USING (auth.uid() = user_id);

-- 6. FACIAL ANALYSES (Landmark coordinates - no raw images stored)
CREATE TABLE IF NOT EXISTS facial_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    visible_patterns JSONB NOT NULL,
    predicted_expression VARCHAR(100) NOT NULL,
    confidence NUMERIC(5, 4) NOT NULL,
    uncertainty_level NUMERIC(5, 4) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_facial_analyses_user ON facial_analyses(user_id);
ALTER TABLE facial_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own facial analyses" ON facial_analyses
    FOR ALL USING (auth.uid() = user_id);

-- 7. MULTIMODAL FUSION RESULTS
CREATE TABLE IF NOT EXISTS multimodal_fusion_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    fused_state VARCHAR(100) NOT NULL,
    overall_confidence NUMERIC(5, 4) NOT NULL,
    modality_weights JSONB NOT NULL,
    inconsistency_detected BOOLEAN DEFAULT FALSE,
    inconsistency_note TEXT,
    gentle_reflection_prompt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_fusion_user ON multimodal_fusion_results(user_id);
ALTER TABLE multimodal_fusion_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own fusion results" ON multimodal_fusion_results
    FOR ALL USING (auth.uid() = user_id);

-- 8. WELLNESS ACTIVITIES
CREATE TABLE IF NOT EXISTS wellness_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    instructions TEXT NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'beginner',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. PROFESSIONALS (Directory - Demo Profiles)
CREATE TABLE IF NOT EXISTS professionals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    registration_number VARCHAR(100) NOT NULL,
    registration_board VARCHAR(255) NOT NULL,
    specializations TEXT[] NOT NULL,
    experience_years INT NOT NULL,
    clinic_or_hospital VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    languages TEXT[] NOT NULL,
    consultation_modes TEXT[] NOT NULL,
    consultation_fee NUMERIC(10, 2) DEFAULT 0.0,
    bio TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_demo BOOLEAN DEFAULT TRUE,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    review_count INT DEFAULT 24,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. APPOINTMENTS
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    consultation_mode VARCHAR(50) DEFAULT 'online',
    meeting_link TEXT,
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled')),
    client_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own appointments" ON appointments
    FOR ALL USING (auth.uid() = user_id);

-- 11. COMMUNITY POSTS
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    author_alias VARCHAR(100) NOT NULL,
    is_anonymous BOOLEAN DEFAULT TRUE,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    hearts_count INT DEFAULT 0,
    is_moderated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view moderated posts" ON community_posts
    FOR SELECT USING (is_moderated = TRUE);
CREATE POLICY "Users can create own posts" ON community_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);
