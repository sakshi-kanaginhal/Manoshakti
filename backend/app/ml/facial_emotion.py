from typing import Dict, Tuple

class FacialExpressionAnalyzer:
    """
    Facial expression and movement pattern analyzer.
    Analyzes visual landmark geometry: smiling (zygomaticus activation),
    brow furrowing (corrugator supercilii), raised eyebrows (frontalis), and eye aperture.
    Includes ethical guardrail: visible facial expressions do not inherently represent
    deep internal emotional reality.
    """

    ETHICAL_DISCLAIMER = (
        "Ethical AI Notice: Facial expression classification detects momentary visible "
        "muscle movement patterns (e.g. smile curvature, brow tension) and MUST NOT be conflated "
        "with a person's authentic internal emotional state or clinical affect. No biometric "
        "templates or raw camera feeds are saved to disk."
    )

    def analyze_patterns(
        self,
        smiling: float,
        brow_furrow: float,
        raised_eyebrows: float,
        eye_squint: float,
        jaw_clench: float
    ) -> Tuple[str, float, float, Dict[str, float]]:
        
        # Uncertainty metric increases when conflicting muscular patterns occur
        # e.g., smiling while heavily brow furrowed (social masking)
        discordance = abs(smiling - brow_furrow)
        uncertainty = round(max(0.12, 0.45 - (discordance * 0.3)), 4)

        if smiling > 0.65 and brow_furrow < 0.25:
            predicted = "Gentle Smile / Receptive"
            confidence = round(0.70 + (smiling * 0.25), 4)
        elif brow_furrow > 0.55:
            predicted = "Concentrated / Somatic Tension"
            confidence = round(0.68 + (brow_furrow * 0.22), 4)
        elif raised_eyebrows > 0.6 and eye_squint < 0.3:
            predicted = "Alert / Inquiring"
            confidence = 0.76
        elif smiling > 0.4 and brow_furrow > 0.4:
            predicted = "Complex / Masked Affect"
            confidence = 0.62
            uncertainty = 0.48
        else:
            predicted = "Neutral / Resting Expression"
            confidence = 0.82

        patterns = {
            "smiling_curvature": round(smiling, 3),
            "brow_furrow_index": round(brow_furrow, 3),
            "raised_eyebrows": round(raised_eyebrows, 3),
            "eye_squint": round(eye_squint, 3),
            "jaw_tension": round(jaw_clench, 3)
        }

        return predicted, confidence, uncertainty, patterns

facial_expression_analyzer = FacialExpressionAnalyzer()
