from utils import utils

def main():
    df = utils.read_config('config.json')
    print(df)

main()