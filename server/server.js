import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config({ path: '../.env' });

const app = express();
const port = 3001;

// Enable CORS (you can restrict it if needed)
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match the URL of your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Parse JSON bodies
app.use(express.json());

// Exchange authorization code for access token
app.post('/api/token', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).send({ error: 'Code is required' });
    }

    // Exchange the authorization code for an access token
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.VITE_DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI, // Ensure this matches your Discord app settings
      }),
    });

    if (!response.ok) {
      return res.status(500).send({ error: 'Failed to exchange code for token' });
    }

    // Get the access token from the response
    const data = await response.json();
    const { access_token } = data;

    // Send the access token back to the frontend
    res.send({ access_token });
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
