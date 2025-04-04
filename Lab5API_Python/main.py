from flask import Flask, jsonify, request
from user_service import UserService

app = Flask(__name__)
user_service = UserService()
user_service.load_users()

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(user_service.get_users())

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')  # que será el email
    user = user_service.login(username, password)
    if user:
        return jsonify({"message": "Login successful", "user": user})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

