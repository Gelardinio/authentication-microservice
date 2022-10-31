from flask import Flask, jsonify, request
from flask_cors import CORS
from Graphs import parseFunc

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Home Page"

@app.route("/submit", methods=['POST'])
def submit():
    submitRes = request.get_json()
    parseFunc(submitRes)
    return "", 201

if __name__ == "__main__":
    app.run(debug=True)