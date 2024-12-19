const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

app.post('/post-phonenumber', async (req, res) => {
  const { phonenumber } = req.body; 

  if (!phonenumber) {
    return res.status(400).send('Phone number is required');
  }

  try {
    // Send the POST request to the chimpu.online API
    const response = await axios.post('https://chimpu.online/api/post.php', { phonenumber });

    // Extract headers from the response
    const headers = response.headers;

    // Send the headers back in the response
    res.json({
      message: 'Headers received from the API:',
      headers
    });
  } catch (error) {
    console.error('Error posting to the API:', error);
    res.status(500).send('An error occurred while posting data to the API.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
