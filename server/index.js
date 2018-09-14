const express           = require('express'),
      bodyParser        = require('body-parser'),
      massive           = require('massive'),
      session           = require('express-session'),
      axios             = require('axios'),
      pC                = require('./controllers/primate_controller'),
      app               = express();
      require('dotenv').config();


//Middleware
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))


massive(process.env.CONNECTION_STRING)
    .then( db => {
        app.set('db', db);
    })
    .catch(err => console.log('Err in massive', err));


//AUTH0
app.get(`/auth/callback`, (req, res) => {
    console.log('/auth/callback fired');
    
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };
  
    function tradeCodeForAccessToken() {
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }
  
    function tradeAccessTokenForUserInfo(accessTokenResponse) {
      const accessToken = accessTokenResponse.data.access_token;
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }
  
    function storeUserInfoInDatabase(response) {
      const auth0Id = response.data.sub;
      console.log(response.data);
      
      const db = req.app.get('db');
      return db.get_admin_by_auth0_id(auth0Id).then(user => {
          if (user[0].auth0id == auth0Id) {
              let { name, picture, email } = response.data
               const userArray = {
                    id: user[0].id,
                    name,
                    picture,
                    email
                    };
                    if (user.length) {
                    req.session.user = userArray;
                    res.redirect('/');
                    } else {
                    return db.create_admin([auth0Id, email]).then(newUser => {
                        req.session.user = userArray;
                        res.redirect('/');
                    }).catch(error => {
                        console.log('error in db.create_user', error);
                        res.status(500).send('Unexpected error');
                    });
                }
            } else {
                res.redirect('/login');  
            }
            }).catch(error => {
                console.log('error in db.get_user_by_auth0_id', error);
                res.status(500).send('Unexpected error');
            });
            }
        
    tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(error => {
      console.log('error in /auth/callback', error);
      res.status(500).send('Unexpected error');
    });
  });
//GET SESSION
app.get('/api/admin-data', (req, res) => {
    res.json(req.session.user);
});
//GET PRIMATES
app.get('/api/primates', pC.getAll);
app.post('/api/primates', pC.create);
//DELETE PROFILE
app.delete('/api/primate/:id', pC.deleteProfile)


//LOGOUT
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))