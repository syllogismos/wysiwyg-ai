const express = require('express');
const path = require('path');
const http = require('http');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongooseConfig = require('./server/config/mongo.js');

const bodyParser = require('body-parser');
const multer = require('multer');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer());
app.use(session({
  secret: 'this is the secret',
  store: new MongoStore({ mongooseConnection: mongooseConfig.mongoose.connection }),
  cookie: {
    maxAge: 1000*60*60*24 // 1 day
  },
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'dist')));


// Define api end points go here
const api = require('./server/routes/api');
const elastic = require('./server/routes/elastic');
app.use('/api', api);
app.use('/elastic', elastic);

// rest of the routes front end, angular build files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})


// Start server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`API running on localhost:${port}`)
);