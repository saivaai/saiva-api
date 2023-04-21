var express = require('express')
const crypto = require('crypto');
var app = express()

let secret = '<YOUR WEBHOOK SECRET KEY>';

// Signature verification
const verifyHmac = (
    receivedHmacHeader,
    receivedBody,
    secret
) => {
    const hmacParts = receivedHmacHeader.split(' ')
    const receivedHmac = hmacParts[1]
    const hash = crypto
        .createHmac('sha256', secret)
        .update(receivedBody)
        .digest('hex')
    return receivedHmac == hash
}

app.use(express.raw({ type: "*/*" }))

// Main webhook entry point
app.post('/webhook', function (req, res) {

    // Some initial basic verification
    if (!req.headers.signature) {
        console.log('Signature doesn\'t exist');
        return res.sendStatus(500);
    }
    else {
        console.log('Signature: ' + req.headers.signature);
    }

    // Verify source from signature
    if (!verifyHmac(req.headers.signature, req.body, secret)) {
        console.log('Signature verification failed');
        return res.sendStatus(500);
    }

    console.log("Signature verified");

    // Extract payload
    let payload = JSON.parse(req.body);
    console.log(JSON.stringify(payload, null, 4));

    // Parse the actual payload here
    // TODO

    res.send('Ok')
})

console.log(`Listening for log events on 7071`)
app.listen(7071);
