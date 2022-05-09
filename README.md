# Backend poke Api
Esta aplicacion esta pensada para crear nuevos usuarios y que cada usuario pueda crearse su propio equipo pokemon con los datos recogidos de la pokeapi

```bash
# Tecnologias utilizadas:
    - Node JS
    - Express
    - Mongodb
```

- Es neceario instalar las dependencias de npm y crear un archivo database.js en la raiz con la conexión a la base de datos.
- Es recomendable que tanto la url como el usuario y la contraseña esten en un archivo .env
- Esta app está pensada para funcionar junto al proyecto FrontendPokeTeam
- Todas las funcinalidades cuentan con tests unitarios con mocha

# Autenticacion :
- Se encarga de la autenticación mediante tokens JWT
- Registrar usuarios nuevos
- Recoger la informacion de todos los usuarios

# Equipos :
- Añadir pokemon al usuario
- Borrar pokemon del usuario
- Coger la informacion de todo el equipo pokemon del usuario