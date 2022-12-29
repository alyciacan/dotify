import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getAccessToken, triggerSearch } from './spotify';
import Form from './Form';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerms, setSearchTerms] = useState("")
  const [token, setToken] = useState(null);
 
  useEffect(() => {
      const tokens = getAccessToken();
      setToken(tokens.accessToken);
  }, [])

  const logout = () => {
    setToken("");
  }

  const search = () => {

  }

  console.log(token)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">
          Dotify
        </h1>
      </header>
      <main>
        { token ? <Form token={token}/> : <Login /> }
      </main>
      <Form />
    </div>
  );
}

export default App;
