const authmiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': true,
}

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));  
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
    app.use(cors(corsOptions));
}

exports.setupMiddlewares = setupMiddlewares;