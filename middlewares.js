const authmiddleware = require('./tools/auth-middleware');
const bodyParser = require('body-parser');

const corsOptions = { origin: "https://poke-team-frontend.herokuapp.com/" }

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));  
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
    app.use(cors(corsOptions));
}

exports.setupMiddlewares = setupMiddlewares;