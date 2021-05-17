const chai = require('chai');
const chaiHttp = require('chai-http');
const userController = require('../users.controller');
const teamController = require('../../teams/teams.controller');

chai.use(chaiHttp);

const app = require('../../app').app;

beforeEach(async () => {
    await userController.registerUser('bettatech', '1234');
    await userController.registerUser('mastermind', '4321');
});

afterEach(async () => {
    await teamController.cleanUpTeam();
    await userController.cleanUpUsers();
});

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token avaiable', (done) => {
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });


    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            })
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {     
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt token is valid', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});
