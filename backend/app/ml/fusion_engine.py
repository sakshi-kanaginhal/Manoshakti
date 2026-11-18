from typing import Dict, Any, List, Optional

class MultimodalFusionEngine:
    """
    Multimodal Late Fusion Engine for ManoShakti.
    Integrates voluntary self-report text, acoustic speech indicators,
    visual facial landmarks, and longitudinal mood logs.
    
    Principles:
    1. Voluntary text and self-reports hold highest epistemic weight.
    2. Modality conflicts trigger gentle inquiry, never accusations.
    3. Missing modalities adjust weights dynamically.
    """

    DEFAULT_BASE_WEIGHTS = {
        "text": 0.45,
        "mood_history": 0.25,
        "voice": 0.15,
        "facial": 0.15
    }

    RECOMMENDATIONS_MAP = {
        "anxiety": [
            "5-minute Box Breathing to activate the vagus nerve and steady heart rate.",
            "5-4-3-2-1 Sensory Grounding to break cognitive rumination loops.",
            "Schedule a short 10-minute study break with water and fresh air."
        ],
        "sadness": [
            "Allow yourself space for restorative rest without self-judgment.",
            "Gentle guided reflection in your emotional journal.",
            "Consider reaching out to a trusted peer or checking our counselor directory."
        ],
        "tension": [
            "Progressive Muscle Relaxation to release jaw and shoulder stiffness.",
            "4-7-8 Breathing session before resuming academic tasks.",
            "Short mindful walk to change somatic posture."
        ],
        "balanced": [
            "Acknowledge this steady baseline and log 1 gratitude win.",
            "Maintain your balanced rhythm with a timed Pomodoro study session.",
            "Share an encouraging word in the student peer support forum."
        ]
    }

    def fuse(
        self,
        text_emotion: Optional[Dict[str, Any]] = None,
        voice_state: Optional[Dict[str, Any]] = None,
        facial_expression: Optional[Dict[str, Any]] = None,
        reported_mood_score: Optional[int] = None
    ) -> Dict[str, Any]:
        
        active_weights: Dict[str, float] = {}
        if text_emotion:
            active_weights["text"] = self.DEFAULT_BASE_WEIGHTS["text"]
        if reported_mood_score is not None:
            active_weights["mood_history"] = self.DEFAULT_BASE_WEIGHTS["mood_history"]
        if voice_state:
            active_weights["voice"] = self.DEFAULT_BASE_WEIGHTS["voice"]
        if facial_expression:
            active_weights["facial"] = self.DEFAULT_BASE_WEIGHTS["facial"]

        # If no modality provided, return default baseline
        if not active_weights:
            return {
                "fused_state": "Calm Baseline",
                "overall_confidence": 0.70,
                "modality_weights": {},
                "inconsistency_detected": False,
                "inconsistency_note": None,
                "gentle_reflection_prompt": "Take a conscious breath and check in with how you are feeling inside right now.",
                "actionable_recommendations": self.RECOMMENDATIONS_MAP["balanced"]
            }

        # Renormalize active weights to sum to 1.0
        total_w = sum(active_weights.values())
        norm_weights = {k: round(v / total_w, 3) for k, v in active_weights.items()}

        text_label = (text_emotion or {}).get("detected_emotion", "").lower()
        face_label = (facial_expression or {}).get("predicted_expression", "").lower()
        voice_label = (voice_state or {}).get("predicted_state", "").lower()

        # Inconsistency detection logic
        inconsistency_detected = False
        inconsistency_note = None
        gentle_prompt = "How is your inner world feeling in this moment?"

        is_text_heavy = text_label in ["sadness", "anxiety", "fear", "frustration", "anger"]
        is_face_smiling = "smile" in face_label
        is_voice_energized = "energized" in voice_label or "agitated" in voice_label

        if is_text_heavy and is_face_smiling:
            inconsistency_detected = True
            inconsistency_note = (
                "Your typed reflection conveys significant emotional weight or stress, "
                "while momentary facial patterns show a smile. Many young adults smile out of habit "
                "or social protection when carrying heavy thoughts."
            )
            gentle_prompt = (
                "Sometimes we put on a smile for the outside world while feeling exhausted or sad inside. "
                "You are in a safe, private space here—how are you truly feeling behind that smile?"
            )
        elif is_text_heavy and "steady" in voice_label:
            inconsistency_detected = True
            inconsistency_note = (
                "Your words express vulnerability, while your vocal cadence remains steady."
            )
            gentle_prompt = (
                "Holding everything together takes immense strength. Does it feel tiring to maintain composure today?"
            )
        else:
            if text_label in ["anxiety", "fear"]:
                gentle_prompt = "You described feeling anxious. Let's acknowledge the feeling without judgment and take a grounding pause."
            elif text_label == "sadness":
                gentle_prompt = "Your thoughts show tenderness and sorrow. Giving yourself compassion right now is your greatest strength."
            elif text_label == "happiness":
                gentle_prompt = "Your reflections carry warmth and clarity. Savor this uplifting energy."
            else:
                gentle_prompt = "Thank you for pausing to check in with your mind and body today."

        # Compute synthesized state
        if text_label in ["anxiety", "fear"] or "anxious" in voice_label:
            fused_state = "Heightened Anxiety & Academic Strain"
            category_key = "anxiety"
        elif text_label == "sadness" or "somber" in voice_label or (reported_mood_score and reported_mood_score <= 4):
            fused_state = "Emotional Low / Need for Rest"
            category_key = "sadness"
        elif "tension" in face_label or text_label == "frustration":
            fused_state = "Somatic Tension & Cognitive Overload"
            category_key = "tension"
        elif text_label == "happiness" or (reported_mood_score and reported_mood_score >= 8):
            fused_state = "Positive Vitality & Well-Being"
            category_key = "balanced"
        else:
            fused_state = "Observant / Steady Baseline"
            category_key = "balanced"

        return {
            "fused_state": fused_state,
            "overall_confidence": 0.85,
            "modality_weights": norm_weights,
            "inconsistency_detected": inconsistency_detected,
            "inconsistency_note": inconsistency_note,
            "gentle_reflection_prompt": gentle_prompt,
            "actionable_recommendations": self.RECOMMENDATIONS_MAP.get(category_key, self.RECOMMENDATIONS_MAP["balanced"])
        }

multimodal_fusion_engine = MultimodalFusionEngine()
