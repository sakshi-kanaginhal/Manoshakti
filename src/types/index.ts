export interface User {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  created_at?: string;
  updated_at?: string;
}

export interface MoodEntry {
  id: string;
  user_id?: string;
  mood_score: number; // 1 to 10
  primary_emotion: string;
  secondary_emotions?: string[];
  energy_level: number;
  sleep_hours: number;
  notes?: string;
  triggers?: string[];
  logged_date: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  is_encrypted: boolean;
  prompt_used?: string;
  tags?: string[];
  created_at: string;
}

export interface EmotionScores {
  happiness: number;
  sadness: number;
  anger: number;
  fear: number;
  anxiety: number;
  frustration: number;
  surprise: number;
  neutral: number;
}

export interface TextEmotionResult {
  id?: string;
  input_text: string;
  detected_emotion: string;
  confidence: number;
  emotion_scores: EmotionScores;
  reflection_prompt: string;
  model_version: string;
}

export interface VoiceAnalysisResult {
  id?: string;
  duration_seconds: number;
  pitch_mean_hz: number;
  pitch_variability?: number;
  vocal_energy: number;
  speech_rate_wpm: number;
  pause_frequency: number;
  predicted_state: string;
  confidence: number;
  model_version: string;
  limitations_notice: string;
  transcript?: string;
  inferred_state_rationale?: string;
  wellness_recommendation?: string;
  acoustic_biomarkers?: {
    pitch_profile: string;
    energy_profile: string;
    cadence_profile: string;
    linguistic_valence?: string;
  };
  emotional_breakdown?: {
    calm: number;
    anxious: number;
    energized: number;
    fatigued: number;
    stressed: number;
  };
}

export interface FacialPatterns {
  smiling_curvature: number;
  downturned_mouth_curvature?: number;
  sadness_index?: number;
  anger_index?: number;
  frustration_index?: number;
  crying_distress_index?: number;
  lip_press_index?: number;
  brow_furrow_index: number;
  raised_eyebrows: number;
  eye_squint: number;
  jaw_tension: number;
}

export type DetectedEmotionTag = 'smile' | 'sad' | 'happy' | 'cry' | 'angry' | 'frustrated' | 'calm' | 'tired';

export interface FacialAnalysisResult {
  id?: string;
  visible_patterns: FacialPatterns;
  predicted_expression: string;
  emotion_tag?: DetectedEmotionTag;
  emotion_emoji?: string;
  confidence: number;
  uncertainty_level: number;
  ethical_disclaimer: string;
  expression_rationale?: string;
  recommendation?: string;
  detected_landmarks_count?: number;
  face_detected?: boolean;
  action_units?: {
    au12_lip_corner_puller?: number;
    au15_lip_corner_depressor?: number;
    au4_brow_lowerer?: number;
    au1_inner_brow_raiser?: number;
    au6_cheek_raiser?: number;
    au24_lip_pressor?: number;
    au26_jaw_drop?: number;
  };
}

export interface MultimodalFusionResult {
  id?: string;
  fused_state: string;
  overall_confidence: number;
  modality_weights: Record<string, number>;
  inconsistency_detected: boolean;
  inconsistency_note?: string | null;
  gentle_reflection_prompt: string;
  actionable_recommendations: string[];
}

export interface WellnessActivity {
  id: string;
  title: string;
  category: 'breathing' | 'mindfulness' | 'grounding' | 'study_zen';
  duration_minutes: number;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Professional {
  id: string;
  full_name: string;
  title: string;
  registration_number: string;
  registration_board: string;
  specializations: string[];
  experience_years: number;
  clinic_or_hospital: string;
  city: string;
  state?: string;
  languages: string[];
  consultation_modes: string[];
  consultation_fee: number;
  bio: string;
  is_verified: boolean;
  is_demo: boolean;
  rating: number;
  review_count: number;
  avatar_url?: string;
}

export interface Appointment {
  id: string;
  professional_id: string;
  professional_name: string;
  professional_title: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  consultation_mode: string;
  meeting_link?: string;
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled';
  client_notes?: string;
}

export interface CommunityPost {
  id: string;
  author_alias: string;
  is_anonymous: boolean;
  category: string;
  title: string;
  content: string;
  hearts_count: number;
  created_at: string;
  has_hearted?: boolean;
}

export type UserRole = 'student' | 'professional' | 'admin';

export interface UserConsent {
  microphone_consent: boolean;
  camera_consent: boolean;
  ai_analysis_consent: boolean;
  consent_version: string;
  terms_accepted_at: string;
}

export interface StressAssessmentResult {
  id?: string;
  stress_level: 'mild' | 'moderate' | 'elevated' | 'high';
  score: number;
  perceived_stress_index: number;
  primary_stressor: string;
  academic_pressure_score: number;
  recommendations: string[];
  created_at: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship_type: string;
  phone: string;
  can_notify_in_crisis: boolean;
}

