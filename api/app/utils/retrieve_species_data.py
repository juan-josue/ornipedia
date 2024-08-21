from openai import OpenAI # type: ignore
from pydantic import BaseModel # type: ignore

client = OpenAI()

class SpeciesData(BaseModel):
    name: str
    scientific_name: str
    appearance: str
    habitat: str

def retrieve_species_data(species_name):
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert ornithologist. When given a species name you will determine the name, scientific name, appearance, and habitat and you will keep your answers accurate and concise."},
            {"role": "user", "content": "Tell me about the {}".format(species_name)}
        ],
        response_format=SpeciesData,
    )
    
    result = completion.choices[0].message.parsed
    data = {
        "name": result.name,
        "scientific_name": result.scientific_name,
        "appearance": result.appearance,
        "habitat": result.habitat,
    }
    print(data)
    return data