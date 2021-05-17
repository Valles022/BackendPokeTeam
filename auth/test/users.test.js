const chai = require('chai');
const chaiHttp = require('chai-http');
const userController = require('../users.controller');

chai.use(chaiHttp);

const app = require('../../app').app;

beforeEach(async () => {
    await userController.registerUser('mastermind', '4321', 'nombreImagen');
    await userController.registerUser('bettatech', '1234', 'nombreImagen');
});

afterEach(async () => {
    await userController.cleanUpUsers();
});

describe('Suite de pruebas de users', () => {
    it('should return all users', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/auth/getAll')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.users.length, 2)
                        done();
                    });
            });
    });
});
