const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../app').app;
const userController = require('../../auth/users.controller');
const teamController = require('../teams.controller');

beforeEach(async () => {
    await userController.registerUser('bettatech', '1234', 'nombreImagen');
    await userController.registerUser('mastermind', '4321', 'nombreImagen');
});

afterEach(async () => {
    await teamController.cleanUpTeam();
    await userController.cleanUpUsers();
})

describe('Suite de pruebas teams', () => {
    it('should return the team of the guiven user', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                //tiene equipo con Charizard y Blastoise
                                //formato { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'mastermind');
                                chai.assert.equal(res.body.team.length, 2);
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                done();
                            });
                    });
            });
    });

    it('should return the pokedex number', (done) => {
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({
                        name: pokemonName
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                //formato { trainer: 'mastermind, team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'bettatech');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });

    it('should delete one pokemon in a team', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete(`/teams/pokemons/0`)
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, 'bettatech');
                                        chai.assert.equal(res.body.team.length, team.length -1);
                                        done();
                                    });
                            });
                    });
            });
    });


    it('should not be able to add pokemon if you already have 6', (done) => {
        let team = [
            {name: 'Charizard'},
            {name: 'Blastoise'},
            {name: 'Pikachu'},
            {name: 'Charizard'},
            {name: 'Blastoise'},
            {name: 'Pikachu'}
        ];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({team: team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                        .post(`/teams/pokemons`)
                        .send({name: 'Vibrava'})
                        .set('Authorization', `JWT ${token}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 400);
                            done();
                        });
                    });
                
            });
    });
})