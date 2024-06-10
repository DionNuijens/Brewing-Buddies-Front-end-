import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [playerData, setPlayerData] = useState({});
  const navigate = useNavigate();
  const API_KEY = "RGAPI-239b5ffb-b5e1-4322-bfe7-382319de9f9a";
  const user = JSON.parse(sessionStorage.getItem('userConnect'));

  function searchForPlayer(event) {
    var APICallingAccountString = `https://localhost:7097/api/Values/Summoner?gameName=${searchName}&tagLine=${searchTag}`;
    axios.get(APICallingAccountString).then(function (response) {
      console.log(response.data);
      setPlayerData(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const handleConnect = async () => {
    console.log(user);
    const updatedUser = { ...user, riotId: playerData.puuid };
    const userConnection = { ...user, Id: playerData.puuid, summonerName: playerData.summonerName, tagLine: playerData.tagLine};


    try {
      const response = await fetch(`https://localhost:7097/updateUser`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          })
          const response2 = await fetch('https://localhost:7097/LinkAccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userConnection),
          });
          
          if (response2.ok && response.ok) {
            console.log('User updated successfully');
            navigate(`/about`);
      } else {
        console.error('Failed to update user');
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