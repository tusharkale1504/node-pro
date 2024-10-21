const express = require('express')
const app = express()
const db = require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to our Hotel...')
})





const personRoutes = require('./Routes/personRoutes');
const menuItemRoutes = require('./Routes/menuItemRoutes');


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);  



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});