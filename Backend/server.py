from flask import Flask, request, jsonify
from flask_cors import CORS
import comparisonFunctions

client = comparisonFunctions.connectMongoDb()

if not client:
    print("Failed to connect to MongoDB!")

app = Flask(__name__)
CORS(app)  

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.get_json()
    comparisonFunctions.compareBrowserData(data['browserData'])
    comparisonFunctions.processMouseNodes(data)
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run()
