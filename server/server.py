from flask import Flask, jsonify, request
from flask_cors import CORS
from simulation import simulation
from typing import List
import json
import base64

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False 
app.config["JSON_SORT_KEYS"] = False 

cors = CORS(app, resources={r"/": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['POST'])
def handler():
    json_str: str = request.data.decode('utf-8')
    json_obj: dict = json.loads(json_str)
    print(json_obj)

    print("Now computing...")
    prices: List[float] = simulation.simulate(json_obj)

    enc_img = img_to_base64('img.png')

    response = jsonify({
        'status': 'OK',
        'prices': prices,
        'img': enc_img
    })
    return response

def img_to_base64(path):
    img_file = open(path, 'rb')
    try:
        data = base64.b64encode(img_file.read())
        return data.decode('utf8')
    finally:
        img_file.close()

if __name__ == "__main__":
    app.run(debug=True)