import express from "express"
import cors from "cors"

const app = express();

app.use(cors());

app.get("/", (_, response) => {
    response.send("hi");
});

app.get("/pokemon", async (request, response) => {
    const name = request.query.name;

    try {
        const pokeapi_response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await pokeapi_response.json();
        response.json(pokemon);
    } catch (e) {
        response.status(404).send("Not found");
    }
});

app.get("/generation", async (request, response) => {
    const name = request.query.name;

    try {
        const pokeapi_response = await fetch(`https://pokeapi.co/api/v2/generation/${name}`);
        const generation = await pokeapi_response.json();
        response.json(generation);
    } catch (e) {
        response.status(404).send("Not found");
    }
});

app.listen(3000, () => console.log("server at port 3000"));

//type and interface

// type Ren = {
//     name: string;
// }

// const v:Ren = {
//     age: 'ren'
// }



