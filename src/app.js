const express = require('express');
const cookieParser = require('cookie-parser');

const allRoutes = require('./routes');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(allRoutes);

app.listen(5000, () => {
  console.log('server started');
});
