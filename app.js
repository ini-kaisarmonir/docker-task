const express = require('express');
const os = require('os');

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Service is running',
        timestamp: new Date()
    });
});

app.post('/data', (req, res) => {
    const data = req.body;

    res.json({
        message: 'Data received successfully',
        received: data
    });
});

app.get('/health', (req, res) => {
    res.status(200).send(`OK from ${os.hostname()}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});