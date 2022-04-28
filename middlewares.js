const authmiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));  
    app.use(cors({optionsSuccessStatus: 200, credentials: true}));
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;