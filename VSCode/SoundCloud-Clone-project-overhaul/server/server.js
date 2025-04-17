const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

// Proxy endpoint for Openwhyd API (Update with valid endpoints)
app.get('/api/proxy/openwhyd/*', async (req, res) => {
  try {
    let path = req.params[0];  // Use the path from the request URL
    
    // Check for a valid endpoint; if needed, change 'hot' to 'tracks' or any other valid endpoint.
    if (path === 'hot') {
      path = 'tracks';  // Replace with the correct endpoint if needed
    }
    
    const query = new URLSearchParams(req.query).toString();
    const url = `https://openwhyd.org/api/${path}?${query}`;

    console.log(`Proxying request to: ${url}`);  // Add logging for the full URL

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);  // Log any errors
    res.status(500).json({ 
      error: 'Failed to fetch data from Openwhyd',
      details: error.message
    });
  }
});


app.get('/api/proxy/eventbrite/*', async (req, res) => {
  try {
    let path = req.params[0];  // Use the path from the request URL
    const query = new URLSearchParams(req.query).toString();
    const url = `https://www.eventbriteapi.com/v3/${path}?${query}&token=KF5C66P6E2LSMQR3N5VV`;

    console.log(`Proxying request to: ${url}`);  // Log the URL being proxied

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);  // Log any errors
    res.status(500).json({ 
      error: 'Failed to fetch data from Eventbrite',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
