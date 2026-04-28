const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    console.log('Received request:', JSON.stringify(req.body).substring(0, 100));
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log('Anthropic status:', response.status);
    console.log('Anthropic response:', text.substring(0, 200));

    res.status(response.status).json(JSON.parse(text));
  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
