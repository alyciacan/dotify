import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { accessToken, getInitialAccessToken, triggerSearch } from './spotify';
import Form from './Form';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerms, setSearchTerms] = useState("")
  
  useEffect(() => {
    //function to request the access token (post Fn)
    // getInitialAccessToken();
  }, [])

  const logout = () => {
    setToken("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">
          Dotify
        </h1>
        {!token ? (
          <a
          className="login-anchor"
          href="http://localhost:8888/login"
        >
        Log in to Spotify!
        </a>
        ) : (
        <div className="login">
          <h4>You are logged in!</h4>
          <button type="button" onClick={logout}>Log out</button>
        </div>
        )}
      </header>
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
