import { useState } from 'react'  
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [searchName, setSearchName] = useState("");
const [searchTag, setSearchTag] = useState("");
const [playerData, setPlayerData] = useState({ });
const API_KEY = "RGAPI-239b5ffb-b5e1-4322-bfe7-382319de9f9a";

  function searchForPlayer(event){
    // Set up de correcte api call
    var APICallingAccountString = `https://localhost:7097/api/Values/Summoner?gameName=${searchName}&tagLine=${searchTag}`;
    // var APICallingAccountString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchName +"/" + searchTag + "?api_key=" + API_KEY;

    //Handel de API Call
    axios.get(APICallingAccountString).then(function (response){
      //Success
      setPlayerData(response.data);
    }).catch(function(error){
      //Error
      console.log(error)
    });
  }
  
  console.log(playerData)

  return (
    <>
    <div className='App'>
      <div className='container'>
        <h5>League of Legends Plaayer Searcher</h5>
        <input type='text' onChange={e => setSearchName(e.target.value)}></input>
        <input type='text' onChange={e => setSearchTag(e.target.value)}></input>

        {/* <input type='text' onChange={e => setSearchTag(e.target.value)}></input> */}
        <button onClick={e => searchForPlayer(e)}>Searcher For Player</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? 
      <>
      <p>{playerData.summonerName}</p>
      <p>{playerData.summonerLevel}</p>
      <img widht="100" height="100" src={"https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>

      </>
      :
      <><p>We have no player data</p></>
      }

    </div>

    </>
  )
}

export default App
