const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
//Middleware
//If we want to use JSON in our application, we need to use the express.json() middleware.
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
//Max tokens is really low for testing. Will push up to 516
app.post('/completion', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": req.body.message}],
            max_tokens: 20,
        })
    };
    try {
       const results = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await results.json();
        res.json(data);
    }catch (err) {
        console.log(`Error: ${err.message}`);
    }
});









app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

