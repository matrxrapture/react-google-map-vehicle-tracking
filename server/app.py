from flask import Flask, request, jsonify
from collections import deque
import logging
import os
import math
import requests
import base64
import json
import os
import logging
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)
# Stack to store the latest request data
data_stack = deque(maxlen=10)  # Set the maximum stack size as required

@app.route('/api/post_location', methods=['POST'])
@cross_origin(origins=['https://driver-pwa-gb6dkzvuza-uc.a.run.app'], supports_credentials=False, headers=['Content-Type', 'Authorization'])
def post_location():
    # response.headers.add('Access-Control-Allow-Origin', 'https://driver-pwa-gb6dkzvuza-uc.a.run.app')
    # response.headers.add('Access-Control-Allow-Origin', '*')
    logging.info(f'request received {request.get_json()}')
    if request.is_json:
        data = request.get_json()
        # logging.info(f'data received {data} type : {type(data)}') 
        if 'lat' in data and 'lng' in data and 'bearing' in data or 'driver_id' in data:
            if not data['bearing']:
                data['bearing'] = 0
            data_stack.append(data)  # Add the data to the stack
            return jsonify({"success": True, "message": "Data stored successfully."}), 200
        else:
            return jsonify({"success": False, "message": "Invalid data format."}), 400
    else:
        return jsonify({"success": False, "message": "Request data is not in JSON format."}), 400

@app.route('/api/get_latest_location', methods=['GET'])
@cross_origin(origins=['https://joy-driver-web-gb6dkzvuza-uc.a.run.app'], supports_credentials=False, headers=['Content-Type', 'Authorization'])
def get_latest_location():
    # response.headers.add('Access-Control-Allow-Origin', 'https://joy-driver-web-gb6dkzvuza-uc.a.run.app')
    # response.headers.add('Access-Control-Allow-Origin', '*')
    if data_stack:
        latest_data = data_stack.pop()
        logging.info(f'latest data {latest_data}')
        return jsonify({"success": True, "data": latest_data}), 200
    else:
        return jsonify({"success": False, "message": "No data available."}), 404
    
@app.route("/")
def helloWorld():
   return "Hello, cross-origin-world!"

def get_bering(lat1, lng1, lat2, lng2):
    dLon = (lng2 - lng1)
    y = math.sin(dLon) * math.cos(lat2)
    x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * \
        math.cos(lat2) * math.cos(dLon)
    brng = math.atan2(y, x)
    brng = math.degrees(brng)
    brng = (brng + 360) % 360
    brng = 360 - brng
    return brng
if __name__ == '__main__':
   app.run(host='0.0.0.0',debug=True)