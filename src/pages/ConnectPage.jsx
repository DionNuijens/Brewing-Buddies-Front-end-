import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [playerData, setPlayerData] = useState({});
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0(); 
  const user = JSON.parse(sessionStorage.getItem('userConnect'));

  const searchForPlayer = async (event) => {
    const APICallingAccountString = `https://localhost:7097/api/Values/GetSummoner?gameName=${searchName}&tagLine=${searchTag}`;
    
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(APICallingAccountString, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  }

  const handleConnect = async () => {
    console.log(user);
    const updatedUser = { ...user, riotId: playerData.puuid };
    const userConnection = { ...user, Id: playerData.puuid, summonerName: playerData.summonerName, tagLine: playerData.tagLine };

    try {
      const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`https://localhost:7097/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const response2 = await fetch('https://localhost:7097/LinkAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userConnection),
      });

      if (response.ok && response2.ok) {
        console.log('User updated successfully');
        navigate(`/manageUsers`);
      } else {
        console.error('Failed to update user');
        navigate(`/manageUsers`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <h5>League of Legends Player Searcher</h5>
        <input type='text' onChange={e => setSearchName(e.target.value)} placeholder="Enter Player Name"></input>
        <input type='text' onChange={e => setSearchTag(e.target.value)} placeholder="Enter Player Tag"></input>
        <button onClick={searchForPlayer}>Search For Player</button>
      </div>
      {JSON.stringify(playerData) !== '{}' ? 
      <>
        <p>{playerData.summonerName}</p>
        <p>{playerData.summonerLevel}</p>
        <div className="center-image">
          <img width="200" src={"https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + playerData.profileIconId + ".png"} alt="Profile Icon"></img>
        </div>
        <div>
          <button onClick={handleConnect}>
            Connect to this player
          </button>
        </div>
      </>
      :
      <><p>We have no player data</p></>
      }
    </div>
  );
};

export default Home;