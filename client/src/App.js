import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [teams, setTeams] = useState(null);
  
  const _fetchTeams = async() => {
    const resp = await fetch('http://localhost:3001/api/v1/teams');
    const data = await resp.json();
    console.log("teams: ", data);
    setTeams(data);
  }

  useEffect(() => {
    _fetchTeams();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Teams:</h1>
        <ol>
          {teams && teams.map((team) => {
            return <li key={team.id}>{team.name}</li>
          })}
        </ol>
      </header>
    </div>
  );
}

export default App;
