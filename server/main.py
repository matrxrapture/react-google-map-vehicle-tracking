from flask import Flask, request, jsonify
from collections import deque

app = Flask(__name__)

# Stack to store the latest request data
data_stack = deque(maxlen=10)  # Set the maximum stack size as required

@app.route('/api/post_location', methods=['POST'])
def post_location():
    if request.is_json:
        data = request.get_json()
        if 'latitude' in data and 'longitude' in data and 'bearing' in data and 'driver_id' in data:
            data_stack.append(data)  # Add the data to the stack
            return jsonify({"success": True, "message": "Data stored successfully."}), 200
        else:
            return jsonify({"success": False, "message": "Invalid data format."}), 400
    else:
        return jsonify({"success": False, "message": "Request data is not in JSON format."}), 400

@app.route('/api/get_latest_location', methods=['GET'])
def get_latest_location():
    if data_stack:
        latest_data = data_stack.pop()
        return jsonify({"success": True, "data": latest_data}), 200
    else:
        return jsonify({"success": False, "message": "No data available."}), 404

if __name__ == '__main__':
    app.run(debug=True)