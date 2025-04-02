// server.js
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const { getResume } = require('../src/aiScripts/aiScript.js');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.json({message: 'yo'})
})

app.post('/openai', async (req, res) => {
    const { jobDescription, template, resumeData } = req.body;

    try {
        const resume = await getResume(jobDescription, template, resumeData);
        res.json(resume);
    } catch (error) {
        console.error('Error generating resume:', error)
        res.status(500).json({ error: error.message });
    }
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);
