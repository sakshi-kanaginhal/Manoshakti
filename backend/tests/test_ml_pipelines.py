import pytest
from app.ml.text_emotion import text_emotion_analyzer
from app.ml.voice_emotion import voice_emotion_analyzer
from app.ml.facial_emotion import facial_expression_analyzer
from app.ml.fusion_engine import multimodal_fusion_engine

def test_text_emotion_analyzer_anxiety():
    text = "I have exams next week and I feel overwhelmed. I cannot concentrate."
    dominant, confidence, scores, prompt = text_emotion_analyzer.analyze(text)
    assert dominant == "anxiety"
    assert confidence > 0.3
    assert "belly breaths" in prompt

def test_text_emotion_analyzer_happiness():
    text = "I am so grateful and proud of how I handled today's presentation!"
    dominant, confidence, scores, prompt = text_emotion_analyzer.analyze(text)
    assert dominant == "happiness"
    assert scores["happiness"] > scores["sadness"]

def test_voice_emotion_acoustic_analysis():
    # High pitch variability and fast pace indicates anxiety/strain
    predicted, confidence, features = voice_emotion_analyzer.analyze_features(
        duration_seconds=5.0,
        pitch_mean_hz=240.0,
        pitch_variability=52.0,
        vocal_energy=0.45,
        speech_rate_wpm=175,
        pause_frequency=0.15
    )
    assert "Anxious" in predicted
    assert confidence > 0.7
    assert features["speech_rate_wpm"] == 175

def test_facial_expression_analysis():
    # High smiling, low brow furrow
    predicted, confidence, uncertainty, patterns = facial_expression_analyzer.analyze_patterns(
        smiling=0.85,
        brow_furrow=0.05,
        raised_eyebrows=0.1,
        eye_squint=0.2,
        jaw_clench=0.0
    )
    assert "Smile" in predicted
    assert patterns["smiling_curvature"] == 0.85

def test_multimodal_fusion_inconsistency_detection():
    # User types sadness but facial landmark indicates smile
    text_data = {"detected_emotion": "sadness"}
    face_data = {"predicted_expression": "Gentle Smile / Receptive"}
    
    result = multimodal_fusion_engine.fuse(
        text_emotion=text_data,
        facial_expression=face_data
    )
    assert result["inconsistency_detected"] is True
    assert "smile" in result["inconsistency_note"].lower()
    assert "behind that smile" in result["gentle_reflection_prompt"].lower()
