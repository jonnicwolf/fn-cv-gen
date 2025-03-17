// server.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);
