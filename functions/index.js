const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const cors = require('cors');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const app = express();
app.use(cors());

app.post("/", async (request, response) => {
    const entry = request.body;
    try {
        const writeResult = await admin.firestore().collection('entries').add(entry)
        return response.status(200).send(`entry created with ${writeResult.id} id`)
    } catch (error) {
        console.error(error.message);
        return response.status(500).send('Oh no! Error: ' + error);
    }
});

app.get("/", async (request, response) => {
    const entry = request.body;
    try {
        const entries = await admin.firestore().collection('entries').limit(100).get()
        const out = []
        entries.forEach(entry => out.push(entry.data()))
        return response.json({entries: out})
    } catch (error) {
        console.error(error.message);
        return response.status(500).send('Oh no! Error: ' + error);
    }
});

exports.entries = functions.https.onRequest(app);