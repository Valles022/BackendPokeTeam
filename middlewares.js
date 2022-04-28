const authmiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');


const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));  
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;