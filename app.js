const express = require('express');
const middlewares = require('./middlewares');
const port = 3000;

require('dotenv').config();
require('./database');
//Routes
const authRoutes = require('./auth/auth.router').router;
const teamRoutes = require('./teams/teams.router').router;

const app = express();

app.use('/uploads', express.static(__dirname +'/uploads'))
middlewares.setupMiddlewares(app);

app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);

app.listen(port, () => {
    console.log('Server started at port ' + port);
})

exports.app = app;