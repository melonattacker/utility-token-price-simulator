from flask import Flask, jsonify, request
from simulation import simulation
from typing import List
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False 
app.config["JSON_SORT_KEYS"] = False 

@app.route('/', methods=['POST'])
def handler():
    json_str: str = request.data.decode('utf-8')
    json_obj: dict = json.loads(json_str)

    print("Now computing...")
    prices: List[float] = simulation.simulate(json_obj)

    return jsonify({
        'status': 'OK',
        'prices': prices
        })

if __name__ == "__main__":
    app.run(debug=True)