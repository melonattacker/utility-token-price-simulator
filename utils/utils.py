import json
import sys

def read_config(file_path: str) -> dict:
    file = open(file_path, 'r')
    try:
        try:
            df = json.load(file)
            validate(df)
            return df
        except json.decoder.JSONDecodeError:
            print("Please enter all field values.")
    
    finally:
        file.close()

def validate(df: dict) -> bool:
    if type(df['period']) != int:
        print('period parameter must be int.')
        sys.exit(0)
    elif df['period'] <= 0:
        print('period parameter must be greater than 0.')
        sys.exit(0)

    if type(df['agents']) != int:
        print('agents parameter must be int.')
        sys.exit(0)
    elif df['agents'] <= 0:
        print('agents parameter must be greater than 0.')
        sys.exit(0)
    
    if type(df['times']) != int:
        print('times parameter must be int.')
        sys.exit(0)
    elif df['times'] <= 0:
        print('times parameter must be greater than 0.')
        sys.exit(0)

    if type(df['beta']) != float:
        print('times parameter must be float.')
        sys.exit(0)

    if type(df['chi']) != float:
        print('chi parameter must be float.')
        sys.exit(0)
    
    if type(df['interest_rate']) != float:
        print('interest_rate parameter must be float.')
        sys.exit(0)

    if type(df['token_supply']) != int:
        print('token_supply parameter must be int.')
        sys.exit(0)
    elif df['token_supply'] <= 0:
        print('token_supply parameter must be greater than 0.')
        sys.exit(0)

    if type(df['price']['mu']) != float:
        print('price mu parameter must be float.')
        sys.exit(0)
    
    if type(df['price']['sigma']) != float:
        print('price sigma parameter must be float.')
        sys.exit(0)

    if type(df['productivity']['initial_value']) != float:
        print('productivity initial_value parameter must be float.')
        sys.exit(0)
    elif df['productivity']['initial_value'] <= 0.0:
        print('productivity initial_value parameter must be greater than 0.')
        sys.exit(0)

    if type(df['productivity']['mu']) != float:
        print('productivity mu parameter must be float.')
        sys.exit(0)
    
    if type(df['productivity']['sigma']) != float:
        print('productivity sigma parameter must be float.')
        sys.exit(0)

    if type(df['utility']['mu']) != float:
        print('utility mu parameter must be float.')
        sys.exit(0)

    if type(df['utility']['sigma']) != float:
        print('utility sigma parameter must be float.')
        sys.exit(0)