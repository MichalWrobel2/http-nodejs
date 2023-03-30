// Import dependencies
import express from 'express';
import axios from 'axios';

// Create an Express app
const app = express();
app.use(express.json());

// Define the /deploy endpoint
app.post('/deploy', async (req, res) => {
  // Rewrite the request body
  const data = { "event_type": `Deployed due to strapi event webhook: ${new Date().toUTCString()}` };
  
  // Send the data to the GitHub API
  try {
    const response = await axios.post('https://api.github.com/repos/MichalWrobel2/mp-client/dispatches', data, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Log the response and send a success message
    console.log(response.data);
    res.status(200).json({ message: 'Event dispatched successfully' });
  } catch (error) {
    // Log the error and send an error message
    console.error(error);
    res.status(500).json({ message: 'Error dispatching event' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});