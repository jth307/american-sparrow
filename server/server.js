const path = require('path');
const express = require('express'); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// other configuration...

app.get('/', (req, res) => {
  res.send('Server says hello!');
});

