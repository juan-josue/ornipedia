import requests
from openai import OpenAI # type: ignore

client = OpenAI()

def retrieve_species_data(species_name):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert ornithologist. When given a species name, you always return species data in the following format:\n\nspecies name:\nscientific name:\nappearance:\nhabitat:"},
            {"role": "user", "content": "Tell me about the {}".format(species_name)}
        ]
    )
    return completion.choices[0].message.content