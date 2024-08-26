const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Replace with your desired port

app.post('/register-domain', async (req, res) => {
  try {
    // Get domain name from request body
    const domainName = req.body.domainName;

    // Replace with your actual Name.com API key
    const apiKey = '65433c3ef0faf282aaba15e66e983ec07d0ba5bf';

    // Construct the API request URL
    const apiUrl = 'https://api.name.com/v4/domains';

    // Prepare the request body
    const requestData = {
      domain_name: domainName,
      period: 1 // Register for 1 year
    };

    // Send the API request
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    // Handle the API response
    if (response.status === 200) {
      res.json({ message: 'Domain registration successful' });
    } else {
      res.status(500).json({ message: 'Domain registration failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// register-domain.js
function registerDomain(domainName) {
  return fetch('/register-domain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ domainName })
  })
  .then(response => response.json())
  .then(data => {
    return {
      success: data.success,
      message: data.message
    };
  })
  .catch(error => {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred'
    };
  });
}