const authmiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));  
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
    app.use(cors(corsOptions));
}

exports.setupMiddlewares = setupMiddlewares;