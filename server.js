const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;





const logRequet = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}]Request made to:${req.originalUrl}`);
  next();//Move on to the next phase
}

app.use(logRequet);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})

app.get('/' ,function (req, res) {
  res.send('Welcome to our Hotel...')
})





const personRoutes = require('./Routes/personRoutes');
const menuItemRoutes = require('./Routes/menuItemRoutes');


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);  



app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});