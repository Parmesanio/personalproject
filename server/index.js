const express           = require('express'),
      bodyParser        = require('body-parser'),
      massive           = require('massive'),
      session           = require('express-session'),
      axios             = require('axios'),
      pC                = require('./controllers/primate_controller'),
      stripe = require("stripe")("sk_test_uV3JAqgj5mGtJICkj5X7WyrY"),
      nodemailer        = require('nodemailer'),
      config            = require('./controllers/config'),
      app               = express();
      require('dotenv').config();


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
//DB CONFIG
massive(process.env.CONNECTION_STRING)
    .then( db => {
        app.set('db', db);
    })
    .catch(err => console.log('Err in massive', err));
//NODEMAILER
var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: config.USER,
      pass: config.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

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
      const db = req.app.get('db');
      return db.get_admin_by_auth0_id(auth0Id).then(admin => {
          if (admin[0].auth0id == auth0Id) {
              let { name, picture, email } = response.data
               const userArray = {
                    id: admin[0].id,
                    name,
                    picture,
                    email
                    };
                    if (admin.length) {
                    req.session.admin = userArray;
                    res.redirect('/');
                    } else {
                    return db.create_admin([auth0Id, email]).then(newUser => {
                        req.session.admin = userArray;
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
    res.json(req.session.admin);
});
app.get('/api/user/cart', (req, res) => {
    if (req.session.cart == undefined && req.session.total == undefined) {
        req.session.cart = [];
        req.session.total = 0;
        res.json(req.session)
    }else if (req.session.cart !== [] && req.session.total !== 0) {
        res.json(req.session)
    }
})
app.post('/api/user/cart', (req, res) => {
    let { product } = req.body;
    
    req.session.cart.push(product)
    req.session.total += parseFloat(product.price);
    res.json(req.session);
    
});
app.delete('/api/user/cart/:id', (req, res) => {
    let { id } = req.params;
    let index = req.session.cart.findIndex(item => item.id == id);
    req.session.total -= parseFloat(req.session.cart[index].price);
    index !== -1 ? req.session.cart.splice(index, 1) : res.send('Item not in cart');
    res.json(req.session)
    
})
//GET PRIMATES
app.get('/api/primates', pC.getAllPrimates);
app.get('/api/primates/:id', pC.getProfile);
//CREATE PRIMATE PROFILE
app.post('/api/primates', pC.create);
//DELETE PRIMATE PROFILE
app.delete('/api/primate/:id', pC.deleteProfile)
//UPDATE PRIMATE PROFILE
app.put('/api/primate/:id', pC.updateProfile)
//GET PRODUCTS
app.get('/api/products', pC.getAllProducts)


//LOGOUT
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
})
//NODEMAILER
app.post('/send', (req, res, next) => {
    console.log(req.body);
    
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
    console.log('CONTENT',content);
    
  
    var mail = {
      from: name,
      to: config.USER,  //Change to email address that you want to receive messages on
      subject: "New Message from The Talkin' Monkeys Project, Inc. Website",
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

//STRIPE CONFIG
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

// app.post('/api/stripe', (req, res) => {
//     const charge = stripe.charges.create({
//         amount: 999,
//         currency: 'usd',
//         source: 'tok_visa',
//         receipt_email: 'sean.parmar@yahoo.com',
//       });
      

// });
app.post("/charge", async (req, res) => {
    console.log(req.body);
    let { id, amount } = req.body
    
    try {
      let {status} = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "An example charge",
        source: id
      });
  
      res.json({status});
    } catch (err) {
      res.status(500).end();
    }
  });



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))