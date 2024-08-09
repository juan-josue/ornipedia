from pathlib import Path
from openai import OpenAI # type: ignore

client = OpenAI()

def text_to_audio(text, output_path=None):
    if output_path is None:
        output_path = Path(__file__).parent / "speech.mp3"

    response = client.audio.speech.create(
        model="tts-1",
        voice="fable",
        input=text
    )
    response.stream_to_file(output_path)

    return str(output_path)