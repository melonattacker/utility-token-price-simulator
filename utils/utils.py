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

def validate(df: dict):
    isOk: bool = True
    if type(df['period']) != int:
        print('period parameter must be int.')
        isOk = False
        
    elif df['period'] <= 0:
        print('period parameter must be greater than 0.')
        isOk = False

    if type(df['agents']) != int:
        print('agents parameter must be int.')
        isOk = False
    elif df['agents'] <= 0:
        print('agents parameter must be greater than 0.')
        isOk = False
    
    if type(df['times']) != int:
        print('times parameter must be int.')
        isOk = False
    elif df['times'] <= 0:
        print('times parameter must be greater than 0.')
        isOk = False

    if type(df['beta']) != float:
        print('beta parameter must be float.')
        isOk = False
    elif df['beta'] >= 1.0:
        print('beta parameter must be less than 1.0.')
        isOk = False

    if type(df['chi']) != float:
        print('chi parameter must be float.')
        isOk = False
    
    if type(df['interest_rate']) != float:
        print('interest_rate parameter must be float.')
        isOk = False

    if type(df['token_supply']) != int:
        print('token_supply parameter must be int.')
        isOk = False
    elif df['token_supply'] <= 0:
        print('token_supply parameter must be greater than 0.')
        isOk = False

    if type(df['price']['mu']) != float:
        print('price mu parameter must be float.')
        isOk = False

    if type(df['productivity']['initial_value']) != float:
        print('productivity initial_value parameter must be float.')
        isOk = False
    elif df['productivity']['initial_value'] <= 0.0:
        print('productivity initial_value parameter must be greater than 0.')
        isOk = False

    if type(df['productivity']['mu']) != float:
        print('productivity mu parameter must be float.')
        isOk = False
    
    if type(df['productivity']['sigma']) != float:
        print('productivity sigma parameter must be float.')
        isOk = False

    if type(df['utility']['mu']) != float:
        print('utility mu parameter must be float.')
        isOk = False
    elif df['utility']['mu'] <= 0.0:
        print('utility mu parameter must be greater than 0.')
        isOk = False

    if type(df['utility']['sigma']) != float:
        print('utility sigma parameter must be float.')
        isOk = False
    elif df['utility']['sigma'] <= 0.0:
        print('utility sigma parameter must be greater than 0.')
        isOk = False

    if df['interest_rate'] < df['price']['mu']:
        print('risk free rate must be less than expected rate of return under the risk-neutral measure.')
        isOk = False
    
    if isOk == True:
        return
    else:
        sys.exit(0)