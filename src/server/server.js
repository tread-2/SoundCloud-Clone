const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

// Proxy endpoint for Openwhyd API
app.get('/api/proxy/openwhyd/*', async (req, res) => {
  try {
    const path = req.params[0];
    const query = new URLSearchParams(req.query).toString();
    const url = `https://openwhyd.org/api/${path}?${query}`;
    
    console.log(`Proxying request to: ${url}`);
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from Openwhyd',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});