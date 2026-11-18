-- ====================================================================
-- MANOSHAKTI: SEED DATA (database/seed.sql)
-- Minimal user information (id, full_name, email, contact_number)
-- ====================================================================

-- Demo Users
INSERT INTO users (id, full_name, email, contact_number)
VALUES
    ('c1111111-1111-4111-8111-111111111111', 'Sakshi Sharma', 'sakshi.student@manoshakti.org', '+919876543210'),
    ('c2222222-2222-4222-8222-222222222222', 'Dr. Priya Varma', 'priya.varma@manoshakti.org', '+919811122233'),
    ('c3333333-3333-4333-8333-333333333333', 'System Administrator', 'admin@manoshakti.org', '+919800011122')
ON CONFLICT (email) DO NOTHING;

-- Wellness Activities
INSERT INTO wellness_activities (id, title, category, duration_minutes, instructions, difficulty)
VALUES
    ('a0000001-0000-0000-0000-000000000001', 'Box Breathing (Sama Vritti)', 'breathing', 5, 'Inhale for 4 seconds, hold your breath for 4 seconds, exhale slowly for 4 seconds, and hold empty for 4 seconds. Repeat for 5 cycles to stimulate the parasympathetic nervous system.', 'beginner'),
    ('a0000002-0000-0000-0000-000000000002', '4-7-8 Deep Vagal Relaxer', 'breathing', 7, 'Breathe in quietly through the nose for 4 counts, hold gently for 7 counts, and exhale completely through the mouth with a whoosh sound for 8 counts. Relieves acute somatic tension.', 'beginner'),
    ('a0000003-0000-0000-0000-000000000003', '5-4-3-2-1 Sensory Grounding', 'grounding', 6, 'Acknowledge 5 things you can see, 4 things you can physically touch, 3 sounds you can hear, 2 aromas you can smell, and 1 positive affirmation you can taste or speak.', 'beginner'),
    ('a0000004-0000-0000-0000-000000000004', 'Pre-Exam Cognitive Reset', 'study_zen', 10, 'A guided meditation to disengage catastrophizing exam thoughts, ground your attention in the physical present, and cultivate cognitive clarity before study sessions.', 'intermediate'),
    ('a0000005-0000-0000-0000-000000000005', 'Progressive Muscle Relaxation', 'mindfulness', 12, 'Systematically tense specific muscle groups for 5 seconds and release for 15 seconds, starting from your toes up to your brow. Excellent for sleep preparation.', 'beginner')
ON CONFLICT (id) DO NOTHING;

-- Fictional Professional Directory (Clearly Marked as Demo Profiles)
INSERT INTO professionals (id, full_name, title, registration_number, registration_board, specializations, experience_years, clinic_or_hospital, city, state, languages, consultation_modes, consultation_fee, bio, is_verified, is_demo, rating, review_count)
VALUES
    ('p0000001-0000-0000-0000-000000000001', 'Dr. Priya Varma, Ph.D.', 'Clinical Psychologist', 'RCI-CP-2018-8472', 'Rehabilitation Council of India (Demo)', ARRAY['Adolescent Mental Health', 'Exam & Academic Anxiety', 'Cognitive Behavioral Therapy (CBT)'], 9, 'MindWell Psychological Clinic', 'Bengaluru', 'Karnataka', ARRAY['English', 'Hindi', 'Kannada'], ARRAY['online', 'in_person'], 1200.00, 'Specializing in youth transitions, student burnout, and identity development. Dr. Priya utilizes compassionate, evidence-based CBT and mindfulness-based stress reduction.', true, true, 4.95, 48),
    ('p0000002-0000-0000-0000-000000000002', 'Dr. Arindam Sen, M.D.', 'Psychiatrist', 'MCI-PSY-2014-3199', 'National Medical Commission (Demo)', ARRAY['Neurodevelopmental Support', 'Mood Disorders', 'Sleep Science'], 12, 'Apex Neuro-Psychiatric Institute', 'Mumbai', 'Maharashtra', ARRAY['English', 'Hindi', 'Bengali', 'Marathi'], ARRAY['online', 'in_person'], 1800.00, 'Consultant psychiatrist focused on holistic youth wellness, sleep architecture optimization, and integrative neuropsychiatry for young adults.', true, true, 4.88, 62),
    ('p0000003-0000-0000-0000-000000000003', 'Ananya Deshmukh, M.Sc.', 'Licensed Youth Counselor', 'IAC-COU-2020-1120', 'Indian Association of Clinical Counselors (Demo)', ARRAY['Peer Relationship Strain', 'Self-Esteem Coaching', 'Academic Time Management'], 6, 'Serenity Wellness Collaborative', 'Pune', 'Maharashtra', ARRAY['English', 'Hindi', 'Marathi'], ARRAY['online'], 900.00, 'Warm, empathetic student counselor dedicated to empowering teenagers and university students through mindful communication and resilience habits.', true, true, 4.92, 35)
ON CONFLICT (id) DO NOTHING;

-- Initial Community Posts
INSERT INTO community_posts (id, user_id, author_alias, is_anonymous, category, title, content, hearts_count, is_moderated)
VALUES
    ('b0000001-0000-0000-0000-000000000001', 'c1111111-1111-4111-8111-111111111111', 'ZenScholar24', true, 'exam_stress', 'How I stopped panicking before finals: The 4-7-8 breathing method actually worked', 'For the past two semesters, my heart would race whenever I opened mock test papers. Yesterday I tried the 4-7-8 breathing session on ManoShakti for 5 minutes right before my calculus paper. It physically lowered my pulse and cleared the brain fog. You got this, everyone!', 34, true),
    ('b0000002-0000-0000-0000-000000000002', 'c1111111-1111-4111-8111-111111111111', 'HopefulSeeker', true, 'mindfulness', 'Daily win: Took a real lunch break without looking at my screen', 'Usually I eat while scrolling assignment deadlines and stress-eating. Today I sat near the campus window, listened to calm instrumental sounds, and simply tasted my food. Small step, but feels huge.', 19, true)
ON CONFLICT (id) DO NOTHING;
