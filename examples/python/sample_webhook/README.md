# Webhook Sample (python)

## Overview
This is a simple node.js project that implements a webhook receiver. 

## Install
`pip install flask`

1. Set your listen port to the desired value (currently 7071):
`port = 8080
`
2. Add your webhook secret to the code:
`secret = '<YOUR WEBHOOK SECRET KEY>'
`
## Run
`python app.py`

## Description
This code is a Python Flask server that listens for incoming HTTP POST requests on the /webhook endpoint. It verifies the authenticity of the incoming request using a HMAC signature, and if the signature is valid, it extracts and logs the payload of the request.

Here's a breakdown of what the code does:

- The Flask module is imported, and an instance of the Flask application is created (app).
- The hashlib, hmac, and json modules are imported to enable hashing using HMAC and JSON parsing.
- A secret key and a port number are defined as runtime variables.
- A function called verifyHmac is defined to verify the HMAC signature of the incoming request. It takes the received HMAC header, received request body, and the secret key as input and returns a boolean indicating whether the signature is valid or not.
- The @app.route() decorator sets up a route for POST requests to the /webhook endpoint. When a POST request is received, it checks for the existence of a signature header. If it does not exist, the server responds with a 500 status code. Otherwise, it verifies the signature using the verifyHmac function. If the signature is invalid, the server responds with a 500 status code. If the signature is valid, the server logs the signature, extracts the payload of the request, logs it, and sends an Ok response.
- Finally, the server listens on the specified port and logs a message to indicate that it is ready to receive incoming requests.

Overall, this code provides a secure way to receive incoming requests and verify their authenticity using a HMAC signature. It can be used as a basis for building a webhook endpoint that receives and processes incoming requests.

## Get Help
For help or feedback please contact support@saiva.ai
