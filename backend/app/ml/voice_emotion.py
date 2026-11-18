from typing import Dict, Any, Tuple

class VoiceEmotionAnalyzer:
    """
    Acoustic pattern analyzer for voice emotion inference.
    Examines fundamental frequency (f0 / pitch), vocal intensity/energy,
    speech rate (WPM), and pause temporal dynamics.
    """

    LIMITATIONS_NOTICE = (
        "Acoustic wellness indicator only. Voice pitch and pacing reflect somatic "
        "and physical arousal levels rather than a clinical psychological diagnosis. "
        "Acoustic features can be influenced by microphone quality, physical fatigue, "
        "ambient noise, and native linguistic cadence."
    )

    def analyze_features(
        self,
        duration_seconds: float,
        pitch_mean_hz: float,
        pitch_variability: float,
        vocal_energy: float,
        speech_rate_wpm: int,
        pause_frequency: float
    ) -> Tuple[str, float, Dict[str, Any]]:
        # Threshold-based heuristic classification mimicking pretrained acoustic LSTM/CNN outputs
        confidence = 0.78

        if speech_rate_wpm > 160 and pitch_variability > 45:
            predicted = "Anxious / Agitated"
            confidence = min(0.92, 0.65 + (speech_rate_wpm - 160) * 0.003)
        elif speech_rate_wpm < 100 and vocal_energy < 0.25 and pause_frequency > 0.4:
            predicted = "Fatigued / Low Energy"
            confidence = min(0.89, 0.70 + (0.4 - vocal_energy))
        elif vocal_energy > 0.6 and pitch_mean_hz > 220:
            predicted = "Energized / Animated"
            confidence = 0.84
        elif pitch_variability < 20 and speech_rate_wpm < 110:
            predicted = "Somber / Subdued"
            confidence = 0.81
        else:
            predicted = "Steady / Calm Baseline"
            confidence = 0.86

        features_summary = {
            "pitch_mean_hz": round(pitch_mean_hz, 1),
            "pitch_variability_st": round(pitch_variability, 1),
            "vocal_energy_rms": round(vocal_energy, 3),
            "speech_rate_wpm": speech_rate_wpm,
            "pause_frequency": round(pause_frequency, 2),
            "duration_analyzed": round(duration_seconds, 2)
        }

        return predicted, round(confidence, 4), features_summary

voice_emotion_analyzer = VoiceEmotionAnalyzer()
