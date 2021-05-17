const jwt = require('jsonwebtoken');
const { to } = require('../tools/to');
const userController = require('./users.controller');

const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }

    //Comprobar credenciales
    let [err, resp] = await to(userController.checkUserCredentials(req.body.user, req.body.password));
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    let user = await userController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({userId: user.userId}, 'secretPassword');

    res.status(200).json(
        {
          token: token,
          image: user.image
        }
    )
}

const register = async (req, res) => {
    const file = req.file;
    if (!req.user && !req.password) {
        return res.status(400).json({message: 'Missing data fields'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }

    await userController.registerUser(req.body.user, req.body.password, file.filename).then(user => {
        res.status(200).json({
            user:user
        })
    })
}

const getAll = async (req, res) => {
    const users = await userController.getAllUsers()
    res.status(200).json({
        users:users
    })
}

exports.login = login;
exports.register = register;
exports.getAll = getAll;