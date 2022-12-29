import express from 'express';
import * as dotenv from 'dotenv';
import queryString from 'query-string';
import axios, * as others from 'axios';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = 8888;
const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const stateKey = 'spotify_auth_state';
app.use(cookieParser());
app.use(cors());

//storing access Token locally so can be reused for all requests/queries

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwzyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// const getCookie = (cookiesString) => {
//     console.log(cookiesString)
//     return cookiesString.split('; ')[1].split('=')[1]
// };

// app.get('/', (req, res) => {
//     res.send('hi!')
// }
// )

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

const queryParams = queryString.stringify({
  client_id: CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  state: state,
  scope: scope
})
res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/search/:searchTerms', (req, res) => {
    const mediaTypes = 'track,album,artist,show'
    console.log(req.cookies['access-token'])
    axios({
        method: 'get',
        url: `https://api.spotify.com/v1/search?type=${mediaTypes}&q=${req.params.searchTerms}`,
        headers: { 'Authorization': `Bearer ${ req.cookies['access-token']}`},
        'Content-Type': 'application/json',
    })
        .then(response => {
            if(response.status === 200) {
               res.json(response.data)
            } else {
                res.redirect(`/?${queryString.stringify({ error: 'invalid token' })}`);
            }
        }) 
    .catch(error => {
        res.send(error);
    }) 
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null; //

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            if(response.status === 200) {
                const {access_token} = response.data;

                res.cookie('access-token', access_token)
                res.redirect(`http://localhost:3000`)
              
            } else {
                res.redirect(`/?${queryString.stringify({ error: 'invalid token' })}`);
                
            }
        })
        .catch(error => {
            res.send(error);
        })
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    })
});

app.listen(port, () => {
    console.log(`Express app now listening at http://localhost:${port}`)
});