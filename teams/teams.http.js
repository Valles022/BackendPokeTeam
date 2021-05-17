const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');
const { to } = require('../tools/to');

const getTeamFromUser = async (req, res) => {
    let user = await getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId);

    if (team && user) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', true);
        res.status(200).json({
            trainer: user.userName,
            team: team
        });
    }
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;    
    let [pokeApiError, pokeApiResponse] = await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));
    if (pokeApiError) {
        return res.status(400).json({message: pokeApiError});
    }
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id,
        types: pokeApiResponse.data.types,
        abilities: pokeApiResponse.data.abilities,
        weight: pokeApiResponse.data.weight,
        height: pokeApiResponse.data.height,
        image: pokeApiResponse.data.sprites.front_default
    }
    let [errorAdd, response] = await to(teamsController.addPokemon(req.user.userId, pokemon));
    if (errorAdd) {
        return res.status(400).json({message: 'You have already a 6 pokemons'});
    }
    res.status(201).json(pokemon);
}

const deletePokemonFromTeam = async (req, res) => {
    let [errorDelete, response] = await to(teamsController.deletePokemon(req.user.userId, req.params.pokeid));

    if (errorDelete) {
        return res.status(400).json({message: 'Error al eliminar el pokemon'})
    }
    res.status(200).json({message: 'Pokemon eliminado correctamente'});
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;