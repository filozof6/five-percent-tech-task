import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConnectButton from '../components/wallet/ConnectButton';

const Home = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/start');
      setWelcomeMsg(res.data.msg);
    })();
  }, []);

  return (
    <div className="App-header">
      <p>{welcomeMsg}</p>
      <ConnectButton />
    </div>
  );
};

export default Home;
