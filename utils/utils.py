import json

def read_config(file: str):
    with open(file) as f:
        df = json.load(f)
    
    return df