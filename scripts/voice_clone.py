import argparse
import os

try:
    from TTS.api import TTS
except ImportError as e:
    raise SystemExit("Please install the 'TTS' package to use this script")


def main():
    parser = argparse.ArgumentParser(description="Generate an AI voice clone for a given script using a reference audio clip.")
    parser.add_argument("--reference", required=True, help="Path to a short audio clip of the narrator's voice (e.g. WAV)")
    parser.add_argument("--text", required=True, help="Text to synthesize in the narrator's voice")
    parser.add_argument("--output", default="cloned_voice.wav", help="Output WAV file")
    args = parser.parse_args()

    # Load an XTTS model (multi-lingual, speaker-adaptive)
    tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2.0.2")

    # Synthesize using the reference clip
    tts.tts_to_file(text=args.text, speaker_wav=args.reference, file_path=args.output)
    print(f"Saved synthesized audio to {args.output}")


if __name__ == "__main__":
    main()
