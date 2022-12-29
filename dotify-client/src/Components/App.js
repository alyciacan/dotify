import './App.css';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../spotify';
import Form from './Form';
import Login from './Login';

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
