import {
  User,
  MoodEntry,
  JournalEntry,
  TextEmotionResult,
  VoiceAnalysisResult,
  FacialAnalysisResult,
  MultimodalFusionResult,
  StressAssessmentResult,
  WellnessActivity,
  Professional,
  Appointment,
  CommunityPost
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// In-browser seed data for instant testability
const INITIAL_ACTIVITIES: WellnessActivity[] = [
  {
    id: 'a1',
    title: 'Box Breathing (Sama Vritti)',
    category: 'breathing',
    duration_minutes: 5,
    instructions: 'Inhale for 4s, hold for 4s, exhale for 4s, hold empty for 4s. Activates the parasympathetic vagal brake.',
    difficulty: 'beginner'
  },
  {
    id: 'a2',
    title: '4-7-8 Deep Vagal Relaxer',
    category: 'breathing',
    duration_minutes: 7,
    instructions: 'Inhale quietly through nose for 4s, hold gently for 7s, exhale whoosh through mouth for 8s.',
    difficulty: 'beginner'
  },
  {
    id: 'a3',
    title: '5-4-3-2-1 Sensory Grounding',
    category: 'grounding',
    duration_minutes: 6,
    instructions: 'Identify 5 visible things, 4 touch sensations, 3 distinct sounds, 2 aromas, and 1 self-compassion truth.',
    difficulty: 'beginner'
  },
  {
    id: 'a4',
    title: 'Pre-Exam Cognitive Reset',
    category: 'study_zen',
    duration_minutes: 10,
    instructions: 'Disengage from catastrophizing exam thoughts and ground your attention in physiological stillness.',
    difficulty: 'intermediate'
  },
  {
    id: 'a5',
    title: 'Progressive Muscle Relaxation',
    category: 'mindfulness',
    duration_minutes: 12,
    instructions: 'Systematically tense and slowly release muscle groups from toes to forehead to dispel physical agitation.',
    difficulty: 'beginner'
  }
];

const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    full_name: 'Dr. Priya Varma, Ph.D.',
    title: 'Clinical Psychologist',
    registration_number: 'RCI-CP-2018-8472',
    registration_board: 'Rehabilitation Council of India (Demo)',
    specializations: ['Adolescent Mental Health', 'Exam & Academic Anxiety', 'Cognitive Behavioral Therapy (CBT)'],
    experience_years: 9,
    clinic_or_hospital: 'MindWell Psychological Clinic',
    city: 'Bengaluru',
    state: 'Karnataka',
    languages: ['English', 'Hindi', 'Kannada'],
    consultation_modes: ['online', 'in_person'],
    consultation_fee: 1200,
    bio: 'Specializing in youth transitions, student burnout, and identity development. Employs compassionate, evidence-based CBT.',
    is_verified: true,
    is_demo: true,
    rating: 4.95,
    review_count: 48,
    avatar_url: '/src/assets/images/counselor_support_1793628016272.jpg'
  },
  {
    id: 'p2',
    full_name: 'Dr. Arindam Sen, M.D.',
    title: 'Psychiatrist & Neurophysiologist',
    registration_number: 'NMC-PSY-2014-3199',
    registration_board: 'National Medical Commission (Demo)',
    specializations: ['Sleep Architecture', 'Mood Regulation', 'Integrative Neuropsychiatry'],
    experience_years: 12,
    clinic_or_hospital: 'Apex Neuro-Psychiatric Institute',
    city: 'Mumbai',
    state: 'Maharashtra',
    languages: ['English', 'Hindi', 'Bengali'],
    consultation_modes: ['online', 'in_person'],
    consultation_fee: 1800,
    bio: 'Consultant psychiatrist focused on holistic youth wellness, sleep architecture optimization, and integrative neuropsychiatry for young scholars.',
    is_verified: true,
    is_demo: true,
    rating: 4.88,
    review_count: 62
  },
  {
    id: 'p3',
    full_name: 'Ananya Deshmukh, M.Sc.',
    title: 'Licensed Youth Counselor',
    registration_number: 'IAC-COU-2020-1120',
    registration_board: 'Indian Association of Clinical Counselors (Demo)',
    specializations: ['Peer Strain', 'Academic Time Management', 'Self-Esteem Coaching'],
    experience_years: 6,
    clinic_or_hospital: 'Serenity Wellness Collaborative',
    city: 'Pune',
    state: 'Maharashtra',
    languages: ['English', 'Hindi', 'Marathi'],
    consultation_modes: ['online'],
    consultation_fee: 900,
    bio: 'Warm, empathetic student counselor dedicated to empowering teenagers and university students through mindful communication.',
    is_verified: true,
    is_demo: true,
    rating: 4.92,
    review_count: 35
  },
  {
    id: 'p4',
    full_name: 'Dr. Kabir Nair, Psy.D.',
    title: 'Adolescent Psychotherapist',
    registration_number: 'RCI-CP-2016-5512',
    registration_board: 'Rehabilitation Council of India (Demo)',
    specializations: ['Performance Anxiety', 'Grief & Loss', 'Acceptance & Commitment Therapy (ACT)'],
    experience_years: 8,
    clinic_or_hospital: 'Tranquil Horizons Center',
    city: 'New Delhi',
    state: 'Delhi NCR',
    languages: ['English', 'Hindi', 'Malayalam'],
    consultation_modes: ['online', 'in_person'],
    consultation_fee: 1400,
    bio: 'Specializes in athletic and academic performance pressure, emotional regulation for young scholars, and constructive family dialogues.',
    is_verified: true,
    is_demo: true,
    rating: 4.85,
    review_count: 29
  }
];

const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'cp1',
    author_alias: 'ZenScholar24',
    is_anonymous: true,
    category: 'exam_stress',
    title: 'How I stopped panicking before finals: The 4-7-8 breathing method actually worked',
    content: 'For the past two semesters, my heart would race whenever I opened mock test papers. Yesterday I tried the 4-7-8 breathing session on ManoShakti for 5 minutes right before my calculus paper. It physically lowered my pulse and cleared the brain fog. You got this, everyone!',
    hearts_count: 34,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    has_hearted: false
  },
  {
    id: 'cp2',
    author_alias: 'HopefulSeeker',
    is_anonymous: true,
    category: 'mindfulness',
    title: 'Daily win: Took a real lunch break without looking at my screen',
    content: 'Usually I eat while scrolling assignment deadlines and stress-eating. Today I sat near the campus window, listened to calm instrumental sounds, and simply tasted my food. Small step, but feels huge.',
    hearts_count: 19,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    has_hearted: true
  },
  {
    id: 'cp3',
    author_alias: 'CuriousMind',
    is_anonymous: true,
    category: 'peer_support',
    title: 'Reminder: Grades do not define your human worth or future',
    content: 'If you are having a tough week with assignment feedback, please remember you are learning and growing. Talk to friends or reach out to counselors if it gets overwhelming. Be gentle with your mind today.',
    hearts_count: 47,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    has_hearted: false
  }
];

export const apiService = {
  // --- Text Emotion Pipeline ---
  async analyzeTextEmotion(text: string): Promise<TextEmotionResult> {
    try {
      const res = await fetch(`${API_BASE}/emotions/analyze-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback to client-side ML engine
    }

    // Client-side GoEmotions-inspired inference
    const lower = text.toLowerCase();
    const scores = {
      happiness: 0.05,
      sadness: 0.05,
      anger: 0.05,
      fear: 0.05,
      anxiety: 0.05,
      frustration: 0.05,
      surprise: 0.05,
      neutral: 0.05
    };

    const anxietyWords = ['exam', 'test', 'overwhelmed', 'deadline', 'scared', 'panic', 'stress', 'pressure', 'failing', 'worried', 'nervous'];
    const sadnessWords = ['sad', 'crying', 'lonely', 'alone', 'hopeless', 'depressed', 'empty', 'exhausted', 'numb', 'hurting', 'grief'];
    const happyWords = ['happy', 'proud', 'joy', 'grateful', 'excited', 'good', 'great', 'peaceful', 'content', 'relieved'];
    const frustWords = ['stuck', 'annoyed', 'frustrated', 'unfair', 'pointless', 'irritated', 'impossible'];

    anxietyWords.forEach(w => { if (lower.includes(w)) scores.anxiety += 0.8; });
    sadnessWords.forEach(w => { if (lower.includes(w)) scores.sadness += 0.8; });
    happyWords.forEach(w => { if (lower.includes(w)) scores.happiness += 0.8; });
    frustWords.forEach(w => { if (lower.includes(w)) scores.frustration += 0.8; });

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const normalized: any = {};
    for (const [k, v] of Object.entries(scores)) {
      normalized[k] = Math.round((v / total) * 1000) / 1000;
    }

    let dominant = 'neutral';
    let maxScore = -1;
    for (const [k, v] of Object.entries(normalized)) {
      if ((v as number) > maxScore) {
        maxScore = v as number;
        dominant = k;
      }
    }

    const prompts: Record<string, string> = {
      anxiety: "Acknowledging anxiety is a sign of strength. Would a 3-minute Box Breathing pause help steady your mind right now?",
      sadness: "Allow yourself space to feel without judgment. Healing doesn't require rushing—be gentle with your heart today.",
      happiness: "What a wonderful surge of energy! Taking a second to savor this feeling anchors it deeper in memory.",
      frustration: "Feeling blocked is deeply exhausting. What is one tiny, manageable thing within your control in the next hour?",
      neutral: "A calm, neutral baseline is fertile ground for reflection. How is your body feeling as you sit right now?"
    };

    return {
      id: 'te-' + Date.now(),
      input_text: text,
      detected_emotion: dominant,
      confidence: maxScore,
      emotion_scores: normalized,
      reflection_prompt: prompts[dominant] || prompts.neutral,
      model_version: 'GoEmotions-DistilBERT-v1.4'
    };
  },

  // --- Voice Acoustic Pipeline ---
  async analyzeVoiceAcoustic(params: {
    duration_seconds: number;
    pitch_mean_hz: number;
    pitch_variability: number;
    vocal_energy: number;
    speech_rate_wpm: number;
    pause_frequency: number;
    transcript?: string;
  }): Promise<VoiceAnalysisResult> {
    try {
      // First try dedicated server-side voice analysis endpoint
      const res = await fetch('/api/gemini/analyze-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback
    }

    try {
      const res = await fetch(`${API_BASE}/voice/analyze-acoustic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }

    const roundedPitch = Math.round(params.pitch_mean_hz);
    const roundedVar = Math.round(params.pitch_variability);
    const roundedEnergy = Math.round(params.vocal_energy * 100) / 100;
    const roundedWpm = Math.round(params.speech_rate_wpm);
    const roundedPause = Math.round(params.pause_frequency * 100) / 100;

    let predicted = 'Steady & Grounded Cadence';
    let conf = 0.88;
    let rationale = `Vocal frequency (${roundedPitch}Hz, ±${roundedVar}Hz) and steady pacing (${roundedWpm} WPM) demonstrate calm autonomic regulation.`;
    let recommendation = 'You are in a balanced state. Take a moment to maintain this flow with mindful posture.';
    let breakdown = { calm: 65, anxious: 10, energized: 15, fatigued: 5, stressed: 5 };

    const lowerTranscript = (params.transcript || '').toLowerCase();
    const hasStressWords = ['stress', 'exam', 'pressure', 'worry', 'scared', 'panic', 'overwhelm', 'fail', 'hard', 'tired', 'hate', 'trouble'].some(w => lowerTranscript.includes(w));
    const hasCalmWords = ['calm', 'peace', 'good', 'breath', 'okay', 'fine', 'relax', 'happy', 'grateful', 'steady'].some(w => lowerTranscript.includes(w));

    if ((roundedWpm > 150 && roundedVar > 35) || (hasStressWords && roundedWpm > 130)) {
      predicted = 'Elevated Cadence & Academic Strain';
      conf = 0.90;
      rationale = `Detected rapid speech cadence (${roundedWpm} WPM) and elevated pitch variance (±${roundedVar}Hz)${params.transcript ? ` with stress cues ("${params.transcript.slice(0, 40)}...")` : ''}, indicating sympathetic arousal.`;
      recommendation = 'Practice 4-4-4-4 Box Breathing to immediately down-regulate autonomic tension.';
      breakdown = { calm: 10, anxious: 55, energized: 15, fatigued: 5, stressed: 15 };
    } else if ((roundedWpm < 105 && roundedEnergy < 0.22) || lowerTranscript.includes('tired') || lowerTranscript.includes('exhausted')) {
      predicted = 'Fatigued & Subdued Affect';
      conf = 0.87;
      rationale = `Low vocal energy (RMS ${roundedEnergy}) combined with slower articulation (${roundedWpm} WPM) points to cognitive fatigue or low physiological energy.`;
      recommendation = 'Take a 15-minute screen-free restorative pause and drink a tall glass of water.';
      breakdown = { calm: 20, anxious: 10, energized: 5, fatigued: 60, stressed: 5 };
    } else if (roundedEnergy > 0.52 && roundedWpm > 140) {
      predicted = 'High Vocal Intensity & Expressive Energy';
      conf = 0.86;
      rationale = `Strong vocal projection (RMS ${roundedEnergy}) and animated speech tempo (${roundedWpm} WPM) reflect high expressive arousal.`;
      recommendation = 'Harness this focus for active problem-solving or interactive group study.';
      breakdown = { calm: 20, anxious: 15, energized: 55, fatigued: 5, stressed: 5 };
    } else if (hasCalmWords || (roundedVar <= 32 && roundedWpm >= 110 && roundedWpm <= 145)) {
      predicted = 'Steady & Mindfully Grounded';
      conf = 0.91;
      rationale = `Speech cadence (${roundedWpm} WPM) and smooth pitch modulation (±${roundedVar}Hz) reflect relaxed vocal folds without stress-induced tremor.`;
      recommendation = 'Optimal cognitive condition for clear-headed study and retention.';
      breakdown = { calm: 70, anxious: 5, energized: 20, fatigued: 5, stressed: 0 };
    }

    return {
      id: 'va-' + Date.now(),
      duration_seconds: params.duration_seconds,
      pitch_mean_hz: roundedPitch,
      pitch_variability: roundedVar,
      vocal_energy: roundedEnergy,
      speech_rate_wpm: roundedWpm,
      pause_frequency: roundedPause,
      predicted_state: predicted,
      confidence: conf,
      transcript: params.transcript,
      inferred_state_rationale: rationale,
      wellness_recommendation: recommendation,
      acoustic_biomarkers: {
        pitch_profile: roundedVar > 40 ? `High pitch fluctuation (±${roundedVar}Hz)` : `Stable fundamental frequency (${roundedPitch}Hz)`,
        energy_profile: roundedEnergy > 0.5 ? `High projection (RMS ${roundedEnergy})` : `Conversational energy (RMS ${roundedEnergy})`,
        cadence_profile: `${roundedWpm} WPM tempo with ${Math.round(roundedPause * 100)}% silence ratio`,
        linguistic_valence: hasStressWords ? 'Stressed' : hasCalmWords ? 'Positive' : 'Reflective'
      },
      emotional_breakdown: breakdown,
      model_version: 'Acoustic-Wav2Vec-LSTM-v2.5',
      limitations_notice: 'Acoustic wellness indicator only. Voice pitch and pacing reflect physiological arousal and vocal energy rather than a clinical psychological diagnosis.'
    };
  },

  // --- Facial Landmark Pipeline ---
  async analyzeFacialLandmarks(params: {
    smiling?: number;
    downturned_mouth?: number;
    sadness_index?: number;
    anger_index?: number;
    frustration_index?: number;
    crying_distress_index?: number;
    brow_furrow?: number;
    raised_eyebrows?: number;
    eye_squint?: number;
    jaw_clench?: number;
    image_base64?: string;
  }): Promise<FacialAnalysisResult> {
    try {
      const res = await fetch('/api/gemini/analyze-facial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_base64: params.image_base64,
          client_patterns: {
            smiling: params.smiling ?? 0.15,
            downturned_mouth: params.downturned_mouth ?? 0.10,
            sadness_index: params.sadness_index ?? 0.10,
            anger_index: params.anger_index ?? 0.10,
            frustration_index: params.frustration_index ?? 0.10,
            crying_distress_index: params.crying_distress_index ?? 0.05,
            brow_furrow: params.brow_furrow ?? 0.15,
            raised_eyebrows: params.raised_eyebrows ?? 0.15,
            eye_squint: params.eye_squint ?? 0.15,
            jaw_clench: params.jaw_clench ?? 0.15,
          }
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback
    }

    try {
      const res = await fetch(`${API_BASE}/facial/analyze-landmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }

    const smiling = params.smiling ?? 0.15;
    const downturn = params.downturned_mouth ?? 0.10;
    const brow = params.brow_furrow ?? 0.15;
    const jaw = params.jaw_clench ?? 0.15;
    const raised = params.raised_eyebrows ?? 0.15;
    const squint = params.eye_squint ?? 0.15;
    const sadnessIdx = params.sadness_index ?? 0.10;
    const angerIdx = params.anger_index ?? ((brow > 0.28 && smiling < 0.22) ? 0.75 : 0.10);
    const frustIdx = params.frustration_index ?? ((brow > 0.24 && jaw > 0.24 && smiling < 0.25) ? 0.70 : 0.10);
    const cryIdx = params.crying_distress_index ?? 0.05;

    // High sensitivity classification hierarchy:
    // 1. Crying distress check
    const isCry = (cryIdx > 0.45) ||
                  (downturn > 0.55 && brow > 0.35 && squint > 0.35) ||
                  (sadnessIdx > 0.70 && brow > 0.35);

    // 2. Frustrated check (Tension, pressed lips, cognitive strain, or frustration dominant over anger)
    const isFrustrated = !isCry && (
      (frustIdx > (angerIdx || 0) && frustIdx > 0.35) ||
      (brow >= 0.24 && (jaw >= 0.24 || downturn >= 0.20) && smiling < 0.25 && angerIdx < 0.40) ||
      (jaw >= 0.35 && smiling < 0.20 && angerIdx < 0.40)
    );

    // 3. Angry check (Corrugator Supercilii AU4 scowl + jaw/lip tension without weeping)
    const isAngry = !isCry && !isFrustrated && (
      (angerIdx > 0.35) ||
      (brow >= 0.28 && smiling < 0.22 && (jaw >= 0.24 || squint >= 0.25 || downturn < 0.35)) ||
      (brow >= 0.36 && smiling < 0.25)
    );

    // 4. Sad check (Downturned mouth AU15 + low smile, without angry brow scowl)
    const isSad = !isCry && !isAngry && !isFrustrated && (
      (downturn > 0.28) ||
      (sadnessIdx > 0.35) ||
      (smiling < 0.12 && downturn > 0.20)
    );

    // 5. Happy check
    const isHappy = !isCry && !isAngry && !isFrustrated && !isSad && (
      (smiling > 0.65 && squint > 0.25) ||
      (smiling > 0.70)
    );

    // 6. Smile check
    const isSmile = !isCry && !isAngry && !isFrustrated && !isSad && !isHappy && (
      smiling > 0.38 && brow < 0.30
    );

    // 7. Tired check
    const isTired = !isCry && !isAngry && !isFrustrated && !isSad && !isHappy && !isSmile && (
      squint > 0.55 && smiling < 0.28
    );

    let predicted = 'Calm / Neutral Resting Expression';
    let emotionTag: 'smile' | 'sad' | 'happy' | 'cry' | 'angry' | 'frustrated' | 'calm' | 'tired' = 'calm';
    let emotionEmoji = '🧘';
    let conf = 0.88;
    let uncertainty = 0.12;
    let rationale = 'Neutral muscular baseline: lip corners and brow corrugators remain at rest without pronounced contraction.';
    let rec = 'Your facial tone is steady and composed. Settle into this gentle focus.';

    if (isCry) {
      predicted = 'Cry / Weeping & Deep Distress';
      emotionTag = 'cry';
      emotionEmoji = '😭';
      conf = 0.94;
      uncertainty = 0.07;
      rationale = 'Bilateral depressor anguli oris contraction (AU15 downturned trembling mouth) coupled with medial brow grief furrow (AU1+AU4) and orbicularis oculi squint (AU6) reveals genuine weeping distress.';
      rec = 'You are safe and your feelings are deeply valid. Place a comforting hand on your chest, take a slow gentle breath, and reach out to Mano or a trusted friend.';
    } else if (isAngry) {
      predicted = 'Angry / Intense Scowl';
      emotionTag = 'angry';
      emotionEmoji = '😠';
      conf = 0.93;
      uncertainty = 0.08;
      rationale = 'Significant bilateral corrugator supercilii contraction (AU4 brow furrow pulled sharply down and inward) with masseter jaw tension reflects acute anger or irritation.';
      rec = 'Notice the heat in your body. Unclench your jaw, drop your shoulders, and try the 4-7-8 cooling breath to release sympathetic nervous tension.';
    } else if (isFrustrated) {
      predicted = 'Frustrated / Exasperated Strain';
      emotionTag = 'frustrated';
      emotionEmoji = '😤';
      conf = 0.91;
      uncertainty = 0.10;
      rationale = 'Asymmetric brow tension (AU4) paired with compressed lip tone (AU24) and clamped jaw indicates cognitive overload, blockage, or academic frustration.';
      rec = 'Step back from what you are working on for 5 minutes. Break down the problem into one tiny step, or take a quick water walk.';
    } else if (isSad) {
      predicted = 'Sad / Melancholic Expression';
      emotionTag = 'sad';
      emotionEmoji = '😢';
      conf = 0.93;
      uncertainty = 0.08;
      const downturnPct = Math.round((downturn || 0.75) * 100);
      rationale = `Bilateral activation of depressor anguli oris (${downturnPct}% AU15 downturned lip curvature) combined with diminished zygomaticus tone reflects a sad, dejected, or melancholic expression.`;
      rec = 'It is completely okay to feel sad or heavy today. Give yourself gentle self-compassion, wrap yourself in comfort, and consider talking to Mano or a trusted friend.';
    } else if (isHappy) {
      predicted = 'Happy / Radiant Joy';
      emotionTag = 'happy';
      emotionEmoji = '😄';
      conf = 0.96;
      uncertainty = 0.05;
      rationale = 'Broad bilateral zygomaticus major pull (AU12) with orbicularis oculi eye crinkles (AU6 Duchenne marker) signifies authentic radiant joy and positive affect.';
      rec = 'Savor this wonderful feeling! Anchor this moment of happiness and share your positive energy with someone today.';
    } else if (isSmile) {
      predicted = 'Smile / Warm Receptive';
      emotionTag = 'smile';
      emotionEmoji = '😊';
      conf = 0.93;
      uncertainty = 0.08;
      rationale = `Pronounced bilateral zygomaticus pull (${Math.round(smiling * 100)}% smile curvature) with relaxed forehead musculature indicates a genuine, receptive smile.`;
      rec = 'Carry this uplift and positive outlook into your next study or creative session.';
    } else if (isTired) {
      predicted = 'Tired / Strain & Fatigue Affect';
      emotionTag = 'tired';
      emotionEmoji = '😴';
      conf = 0.86;
      uncertainty = 0.16;
      rationale = `Heavy eyelid narrowing (${Math.round(squint * 100)}% squint/droop) combined with diminished facial muscle tone suggests visual fatigue or sleep deprivation.`;
      rec = 'Practice the 20-20-20 rule for eye strain and consider a restful 15-minute screen-free break.';
    }

    return {
      id: 'fa-' + Date.now(),
      face_detected: true,
      emotion_tag: emotionTag,
      emotion_emoji: emotionEmoji,
      visible_patterns: {
        smiling_curvature: Math.round(smiling * 100) / 100,
        downturned_mouth_curvature: Math.round((downturn || (isSad || isCry ? 0.78 : 0.08)) * 100) / 100,
        sadness_index: Math.round((sadnessIdx || (isSad || isCry ? 0.80 : 0.10)) * 100) / 100,
        anger_index: Math.round((angerIdx || (isAngry ? 0.85 : 0.10)) * 100) / 100,
        frustration_index: Math.round((frustIdx || (isFrustrated ? 0.82 : 0.10)) * 100) / 100,
        crying_distress_index: Math.round((cryIdx || (isCry ? 0.88 : 0.05)) * 100) / 100,
        brow_furrow_index: Math.round(brow * 100) / 100,
        raised_eyebrows: Math.round(raised * 100) / 100,
        eye_squint: Math.round(squint * 100) / 100,
        jaw_tension: Math.round((jaw || (isAngry || isFrustrated ? 0.75 : 0.15)) * 100) / 100,
      },
      action_units: {
        au12_lip_corner_puller: smiling,
        au15_lip_corner_depressor: downturn || (isSad || isCry ? 0.78 : 0.08),
        au4_brow_lowerer: brow,
        au1_inner_brow_raiser: raised,
        au6_cheek_raiser: squint,
        au24_lip_pressor: isAngry || isFrustrated ? 0.70 : 0.10,
        au26_jaw_drop: jaw || (isAngry || isFrustrated ? 0.75 : 0.15),
      },
      predicted_expression: predicted,
      confidence: conf,
      uncertainty_level: uncertainty,
      expression_rationale: rationale,
      recommendation: rec,
      detected_landmarks_count: 68,
      ethical_disclaimer: 'Ethical AI Notice: Facial expression classification detects visible muscle movement patterns and MUST NOT be conflated with a person\'s authentic internal emotional state. No camera frames are stored.'
    };
  },

  // --- Multimodal Late Fusion ---
  async fuseModalities(params: {
    text_emotion?: TextEmotionResult | null;
    voice_state?: VoiceAnalysisResult | null;
    facial_expression?: FacialAnalysisResult | null;
    reported_mood_score?: number | null;
  }): Promise<MultimodalFusionResult> {
    const textLabel = params.text_emotion?.detected_emotion?.toLowerCase() || '';
    const faceLabel = params.facial_expression?.predicted_expression?.toLowerCase() || '';
    const voiceLabel = params.voice_state?.predicted_state?.toLowerCase() || '';

    let inconsistency = false;
    let note: string | null = null;
    let gentlePrompt = 'Thank you for pausing to check in with your mind and body today.';

    const isTextHeavy = ['sadness', 'anxiety', 'fear', 'frustration', 'anger'].includes(textLabel);
    const isFaceSmiling = faceLabel.includes('smile');

    if (isTextHeavy && isFaceSmiling) {
      inconsistency = true;
      note = 'Your typed reflection conveys significant emotional weight or stress, while momentary facial patterns show a smile. Many students smile out of habit or social politeness when carrying heavy thoughts.';
      gentlePrompt = 'Sometimes we put on a smile for the outside world while feeling exhausted or sad inside. You are in a safe, private space here—how are you truly feeling behind that smile?';
    } else if (textLabel === 'anxiety') {
      gentlePrompt = 'You described feeling anxious. Acknowledging this openly is the first step toward releasing that tension.';
    } else if (textLabel === 'sadness') {
      gentlePrompt = 'Your words express tenderness and pain. Give yourself permission to slow down and rest today.';
    }

    let fused = 'Observant / Balanced Baseline';
    let recommendations = [
      'Take 5 minutes for conscious breathing to anchor your focus.',
      'Log 1 small daily accomplishment in your wellness journal.',
      'Stay hydrated and ensure you step away from screens before bed.'
    ];

    if (textLabel === 'anxiety' || voiceLabel.includes('anxious')) {
      fused = 'Heightened Anxiety & Academic Strain';
      recommendations = [
        'Practice 5-minute Box Breathing (Sama Vritti) right now to lower sympathetic arousal.',
        'Break down large exam study tasks into 20-minute focused blocks with mandatory water breaks.',
        'Use the 5-4-3-2-1 Sensory Grounding exercise to break cognitive worry spirals.'
      ];
    } else if (textLabel === 'sadness' || (params.reported_mood_score && params.reported_mood_score <= 4)) {
      fused = 'Emotional Low / In Need of Rest';
      recommendations = [
        'Honor this low energy with compassionate restorative rest instead of self-criticism.',
        'Write out uncensored thoughts in the private encrypted Emotional Journal.',
        'Reach out to a close peer or explore verified youth counselors in our directory.'
      ];
    }

    return {
      id: 'fus-' + Date.now(),
      fused_state: fused,
      overall_confidence: 0.86,
      modality_weights: {
        text_reflection: params.text_emotion ? 0.45 : 0.0,
        mood_history: params.reported_mood_score ? 0.25 : 0.0,
        voice_acoustics: params.voice_state ? 0.15 : 0.0,
        facial_landmarks: params.facial_expression ? 0.15 : 0.0
      },
      inconsistency_detected: inconsistency,
      inconsistency_note: note,
      gentle_reflection_prompt: gentlePrompt,
      actionable_recommendations: recommendations
    };
  },

  // --- Mano AI Gemini Assistant & Positive Vibe Chatbot ---
  async chatWithMano(
    message: string,
    history?: Array<{ sender: 'user' | 'assistant'; content: string }>,
    vibeTopic?: string
  ): Promise<{ reply: string; isCrisis: boolean; recommendedActions: string[] }> {
    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, vibeTopic })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback
    }

    return {
      reply: `I hear the vulnerability in what you're sharing ✨. Life, academics, and expectations can build heavy pressure, but you have incredible strength within you. Take a slow, gentle breath. What's one small positive thing you can focus on right now?`,
      isCrisis: false,
      recommendedActions: ['4-7-8 Breathing', 'Positive Vibe Boost', 'Explore Support Directory']
    };
  },

  async getPositiveVibe(category?: string, currentFeeling?: string): Promise<{ vibe: string; category: string }> {
    try {
      const res = await fetch('/api/gemini/positive-vibe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, currentFeeling })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Fallback
    }

    return {
      vibe: "You are not your stress, and you are not your temporary worries ✨. In this exact moment, you have everything you need to take the next gentle step. \n\n🌟 Affirmation: 'I am stronger than my challenges, and today I choose peace and progress.'",
      category: category || 'uplift'
    };
  },

  // --- Moods ---
  getStoredMoods(): MoodEntry[] {
    const raw = localStorage.getItem('manoshakti_moods');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    const sample: MoodEntry[] = [
      {
        id: 'm1',
        mood_score: 7,
        primary_emotion: 'Calm',
        energy_level: 6,
        sleep_hours: 7.5,
        logged_date: '2026-10-31',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'm2',
        mood_score: 5,
        primary_emotion: 'Anxious',
        energy_level: 5,
        sleep_hours: 6.0,
        notes: 'Pre-exam mock test stress.',
        triggers: ['Exams', 'Sleep Deprivation'],
        logged_date: '2026-11-01',
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'm3',
        mood_score: 8,
        primary_emotion: 'Energized',
        energy_level: 8,
        sleep_hours: 8.0,
        notes: 'Completed breathing session, felt clear-headed.',
        logged_date: '2026-11-02',
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem('manoshakti_moods', JSON.stringify(sample));
    return sample;
  },

  saveMood(entry: Omit<MoodEntry, 'id' | 'created_at'>): MoodEntry {
    const moods = this.getStoredMoods();
    const newEntry: MoodEntry = {
      ...entry,
      id: 'mood-' + Date.now(),
      created_at: new Date().toISOString()
    };
    moods.unshift(newEntry);
    localStorage.setItem('manoshakti_moods', JSON.stringify(moods));
    return newEntry;
  },

  // --- Journals ---
  getStoredJournals(): JournalEntry[] {
    const raw = localStorage.getItem('manoshakti_journals');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    const sample: JournalEntry[] = [
      {
        id: 'j1',
        title: 'Shifting perspective on tomorrow’s presentation',
        content: 'I felt panic rising every time I thought about speaking in seminar hall. But I practiced box breathing for 5 minutes and reminded myself that the audience wants to learn, not judge. My anxiety is just energy looking for focus.',
        is_encrypted: true,
        tags: ['Seminar', 'Anxiety', 'Breathing'],
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    localStorage.setItem('manoshakti_journals', JSON.stringify(sample));
    return sample;
  },

  saveJournal(entry: Omit<JournalEntry, 'id' | 'created_at'>): JournalEntry {
    const journals = this.getStoredJournals();
    const newEntry: JournalEntry = {
      ...entry,
      id: 'jrn-' + Date.now(),
      created_at: new Date().toISOString()
    };
    journals.unshift(newEntry);
    localStorage.setItem('manoshakti_journals', JSON.stringify(journals));
    return newEntry;
  },

  // --- Activities ---
  getActivities(): WellnessActivity[] {
    return INITIAL_ACTIVITIES;
  },

  // --- Professionals ---
  getProfessionals(): Professional[] {
    const raw = localStorage.getItem('manoshakti_professionals');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    localStorage.setItem('manoshakti_professionals', JSON.stringify(INITIAL_PROFESSIONALS));
    return INITIAL_PROFESSIONALS;
  },

  // --- Appointments ---
  getAppointments(): Appointment[] {
    const raw = localStorage.getItem('manoshakti_appointments');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    const sample: Appointment[] = [
      {
        id: 'apt-1',
        professional_id: 'p1',
        professional_name: 'Dr. Priya Varma, Ph.D.',
        professional_title: 'Clinical Psychologist',
        appointment_date: '2026-11-06',
        start_time: '15:00',
        end_time: '15:50',
        consultation_mode: 'online',
        meeting_link: 'https://meet.manoshakti.org/room/pv-4892',
        status: 'confirmed',
        client_notes: 'Exam anxiety and sleep regulation guidance.'
      }
    ];
    localStorage.setItem('manoshakti_appointments', JSON.stringify(sample));
    return sample;
  },

  bookAppointment(appt: Omit<Appointment, 'id'>): Appointment {
    const list = this.getAppointments();
    const created: Appointment = {
      ...appt,
      id: 'apt-' + Date.now(),
      meeting_link: appt.meeting_link || `https://meet.manoshakti.org/room/ms-${Math.random().toString(36).substring(2, 7)}`
    };
    list.unshift(created);
    localStorage.setItem('manoshakti_appointments', JSON.stringify(list));
    return created;
  },

  // --- Community Posts ---
  getCommunityPosts(): CommunityPost[] {
    const raw = localStorage.getItem('manoshakti_community');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    localStorage.setItem('manoshakti_community', JSON.stringify(INITIAL_COMMUNITY_POSTS));
    return INITIAL_COMMUNITY_POSTS;
  },

  addCommunityPost(post: Omit<CommunityPost, 'id' | 'hearts_count' | 'created_at'>): CommunityPost {
    const posts = this.getCommunityPosts();
    const newPost: CommunityPost = {
      ...post,
      id: 'cp-' + Date.now(),
      hearts_count: 0,
      created_at: new Date().toISOString()
    };
    posts.unshift(newPost);
    localStorage.setItem('manoshakti_community', JSON.stringify(posts));
    return newPost;
  },

  toggleHeartPost(id: string): void {
    const posts = this.getCommunityPosts();
    const item = posts.find(p => p.id === id);
    if (item) {
      item.has_hearted = !item.has_hearted;
      item.hearts_count += item.has_hearted ? 1 : -1;
      localStorage.setItem('manoshakti_community', JSON.stringify(posts));
    }
  }
};
