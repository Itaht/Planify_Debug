import React, { useState, useEffect } from 'react';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import './styles/sidebar.css';
import './index.css';
import Interface from './components/Interface.jsx';
import Calendar from './components/Calendar.jsx';
import Task from './components/Task.jsx';
import Board from './components/Board.jsx';
import SettingsPopup from './components/Settings.jsx';
import ProjectPopup from './components/ProjectPopup.jsx';
import ConfirmationPopup from './components/ConfirmationPopup.jsx';
import TaskLabel from './components/TaskLabel.jsx';
import BoardProject from './components/BoardProject.jsx';
import List from './components/List.jsx';
import Member from './components/Member.jsx';

const App = () => {
  const [discordSdk, setDiscordSdk] = useState(null);
  const [user, setUser] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [labelPopupVisible, setLabelPopupVisible] = useState(false);

  useEffect(() => {
    const setupDiscordSdk = async () => {
      try {
        const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
        const discordClientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET;

        if (!discordClientId || !discordClientSecret) {
          throw new Error('Discord Client ID or Client Secret is missing');
        }

        console.log('Setting up Discord SDK...');

        // Initialize Discord SDK
        const sdk = new DiscordSDK(discordClientId);
        await sdk.ready();

        console.log('Discord SDK Ready...');

        // Authorize with Discord OAuth
        const { code } = await sdk.commands.authorize({
          client_id: discordClientId,
          response_type: 'code',
          state: '',
          prompt: 'none',
          scope: ['identify', 'guilds', 'applications.commands'],
        });

        console.log('Authorization code received...');

        // Exchange authorization code for access token
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const { access_token } = await response.json();
        console.log('Access Token received...');

        // Authenticate with Discord SDK using the access token
        await sdk.commands.authenticate({ access_token });

        console.log('Authentication successful...');

        // Fetch the user profile
        const userProfile = await fetchUserProfile(access_token);
        console.log('User Profile:', userProfile);

        setUser({
          username: userProfile.username,
          avatarUrl: `https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}.png`,
        });

        setDiscordSdk(sdk);
      } catch (error) {
        console.error('Error setting up Discord SDK:', error);
      }
    };

    const fetchUserProfile = async (token) => {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return await response.json();
    };

    setupDiscordSdk();
  }, []);

  const handleConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  if (!user) {
    console.log('User data is still loading...');
    return <div>Loading...</div>;
  }

  return (
    <div id="app">
      <Interface user={user} />
      <Calendar />
      <Task />
      <Board />
      <SettingsPopup />
      <ProjectPopup />
      <ConfirmationPopup
        isVisible={isConfirmationVisible}
        onConfirm={handleConfirmation}
        onCancel={() => setIsConfirmationVisible(false)}
      />
      <TaskLabel
        isVisible={labelPopupVisible}
        onLabelSelect={(label) => console.log('Selected label:', label)}
        onClose={() => setLabelPopupVisible(false)}
      />
      <BoardProject />
      <List />
      <Member members={[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]} />
    </div>
  );
};

export default App;
