import express from "express"
import cors from "cors"

const app = express();
const router = express.Router();

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



app.listen(3000, () => {
    const a: string = '';
    const b: number = 1;

    console.log('yeet1 ' + (typeof a === 'string'));
    console.log('yeet2 ' + (typeof b === 'string'));
});

//type and interface

// type Ren = {
//     name: string;
// }

// const v:Ren = {
//     age: 'ren'
// }

const arr = ["1", "2", "3", "4"] as const;

type k<T extends typeof arr[number]> = {
    age: T;
}

const e: k<"1"> = {
    age: "1"
}



