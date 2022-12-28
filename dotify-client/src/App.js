import logo from './logo.svg';
import './App.css';
import { useEffect, useState, Fragment } from 'react';
import { accessToken, logout, triggerSearch } from './spotify';
import Form from './Form';

function App() {
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerms, setSearchTerms] = useState("")
  
  useEffect(() => {
    setToken(accessToken);
  }, [])

  // useEffect(() => {
  //   triggerSearch(searchTerms)
  //     .then(results => setSearchResults(results))
  // }, [searchTerms])

  // const search = (searchTerms) => {
  //  setSearchTerms(searchTerms);
  // }

  return (
    <div className="App">
      <p>Hi</p>
      {/* <header className="App-header">
        {!token ? (
          <a
          className="login-anchor"
          href="http://localhost:8888/login"
          rel="noopener noreferrer"
        >
        Log in to Spotify!
        </a>
        ) : (
        <Fragment>
          <h1>You are logged in!</h1>
          <button onClick={logout}>Log out</button>
        </Fragment>
        )}
      </header>
      <main>
        <Form />
      </main> */}
    </div>
  );
}

export default App;
