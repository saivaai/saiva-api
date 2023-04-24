from flask import Flask
from flask import request
import hashlib, hmac, json

app = Flask(__name__)

# Set your runtime variables
secret = '<YOUR WEBHOOK SECRET KEY>'
port = 7071

# Signature verification
def verifyHmac(received_hmac_header, received_body, secret):
    hmacParts = received_hmac_header.split(' ')
    receivedHmac = hmacParts[1]
    hash = hmac.new(bytes(secret, 'UTF-8'), received_body, hashlib.sha256).hexdigest()
    return receivedHmac == hash

# Main webhook entry point
@app.route('/webhook', methods=['POST'])
def webhook():
    # Some initial basic verification
    if 'signature' not in request.headers:
        print("Signature doesn't exist")
        return '', 500
    else:
        print('Signature:', request.headers['signature'])

    # Verify source from signature
    if not verifyHmac(request.headers['signature'], request.data, secret):
        print('Signature verification failed')
        return '', 500

    print('Signature verified')

    # Extract payload
    payload = request.get_json()
    print(json.dumps(payload, indent=4))

    # Parse the actual payload here
    # TODO

    return 'Ok'

if __name__ == '__main__':
    print('Listening for events on ' + str(port))
    app.run(port=port)