const express = require('express');
const res = require('express/lib/response');
const middlewares = require('./middlewares');

require('dotenv').config();
require('./database');

//Routes
const authRoutes = require('./auth/auth.router').router;
const teamRoutes = require('./teams/teams.router').router;

const app = express();

app.use('/uploads', express.static(__dirname +'/uploads'))
middlewares.setupMiddlewares(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started at port ' + process.env.PORT);
})

exports.app = app;