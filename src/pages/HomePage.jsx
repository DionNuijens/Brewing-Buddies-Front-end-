// src/pages/Home.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-239b5ffb-b5e1-4322-bfe7-382319de9f9a";

  function searchForPlayer(event) {
    var APICallingAccountString = `https://localhost:7097/api/Values/Summoner?gameName=${searchName}&tagLine=${searchTag}`;
    axios.get(APICallingAccountString).then(function (response) {
      setPlayerData(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className='App'>
      <div className='container'>
        <h5>League of Legends Player Searcher</h5>
        <input type='text' onChange={e => setSearchName(e.target.value)} placeholder="Enter Player Name"></input>
        <input type='text' onChange={e => setSearchTag(e.target.value)} placeholder="Enter Player Tag"></input>
        <button onClick={e => searchForPlayer(e)}>Search For Player</button>
      </div>
      {JSON.stringify(playerData) !== '{}' ? 
      <>
        <p>{playerData.summonerName}</p>
        <p>{playerData.summonerLevel}</p>
        <div className="center-image">
          <img width="200" src={"https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + playerData.profileIconId + ".png"} alt="Profile Icon"></img>
        </div>
      </>
      :
      <><p>We have no player data</p></>
      }
    </div>
  );
};

export default Home;