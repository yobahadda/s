import redis
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Configure CORS properly - ensure it's applied to all routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Change Redis connection to localhost if you're running locally
# If you're using Docker, keep 'redis' as the hostname
try:
    # Try connecting to redis container first (for Docker setup)
    r = redis.Redis(host='redis', port=6379, db=0)
    r.ping()  # Test the connection
except:
    # Fallback to localhost if redis container is not available
    r = redis.Redis(host='localhost', port=6379, db=0)

@app.route('/users', methods=['GET', 'POST', 'OPTIONS'])
def users():
    
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
        
    if request.method == 'GET':
        try:
            # Fetch all users from Redis
            user_keys = r.keys('user:*')
            users = []
            for key in user_keys:
                user_data = r.hgetall(key)
                user = {k.decode('utf-8'): v.decode('utf-8') for k, v in user_data.items()}
                # Add id to the user object
                user_id = key.decode('utf-8').split(':')[1]
                user['id'] = user_id
                users.append(user)
            return jsonify(users), 200
        except Exception as e:
            print(f"Error fetching users: {str(e)}")
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        try:
            # Existing code for creating a user
            data = request.json
            user_id = data.get('id')
            username = data.get('username')
            email = data.get('email')

            if not user_id or not username or not email:
                return jsonify({'error': 'Missing data'}), 400

            user_key = f'user:{user_id}'
            r.hset(user_key, 'username', username)
            r.hset(user_key, 'email', email)

            return jsonify({'message': 'User created', 'user_id': user_id}), 201
        except Exception as e:
            print(f"Error creating user: {str(e)}")
            return jsonify({'error': str(e)}), 500

# Change route to accept string IDs as well
@app.route('/users/<user_id>', methods=['GET', 'DELETE', 'OPTIONS'])
def user_operations(user_id):
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
        
    user_key = f'user:{user_id}'
    
    if request.method == 'GET':
        try:
            username = r.hget(user_key, 'username')
            email = r.hget(user_key, 'email')
            if not username or not email:
                return jsonify({'error': 'User not found'}), 404
            return jsonify({
                'id': user_id,
                'username': username.decode('utf-8'), 
                'email': email.decode('utf-8')
            }), 200
        except Exception as e:
            print(f"Error getting user: {str(e)}")
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        try:
            if not r.exists(user_key):
                return jsonify({'error': 'User not found'}), 404

            r.delete(user_key)
            return jsonify({'message': 'User deleted'}), 200
        except Exception as e:
            print(f"Error deleting user: {str(e)}")
            return jsonify({'error': str(e)}), 500

def _build_cors_preflight_response():
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
    return response

if __name__ == '__main__':
    # Make sure Flask is accessible from other machines
    app.run(debug=True, host='0.0.0.0')