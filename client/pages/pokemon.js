let pokemonDictionary = new Map();
let currentPokedex = 1;

let currentGeneration = 1;

const form = document.getElementById("form");

form.addEventListener("submit", async event => {
    try {
        const input = document.getElementById("pokemon_input").value.toLowerCase();
        event.preventDefault();

        const pokemon = await getPokemon(input);

        console.log(pokemon);
        displayPokemon(pokemon);

    } catch (e) {
        console.log("pokemon not found");

        // Alternative Display
    }
});

const pokedexCycleBackwardButton = document.getElementById("cycle_pokedex_backward");
const pokedexCycleForwardButton = document.getElementById("cycle_pokedex_forward");

pokedexCycleBackwardButton.addEventListener("click", () => cyclePokedex(false));
pokedexCycleForwardButton.addEventListener("click", () => cyclePokedex(true));

async function cyclePokedex(forward) {
    if (forward) currentPokedex = Math.min(++currentPokedex, 1025);
    else currentPokedex = Math.max(--currentPokedex, 1);

    displayPokemon(await getPokemon(currentPokedex.toString()));
}

async function getPokemon(input) {
    try {
        let pokemon;

        if (pokemonDictionary.has(input)) pokemon = pokemonDictionary.get(input);
        else {
            const response = await fetch(`http://localhost:3000/pokemon?name=${input}`);

            pokemon = await response.json();
            pokemonDictionary.set(pokemon.id.toString(), pokemon);
            pokemonDictionary.set(pokemon.name, pokemon);
            console.log("searched")
        }

        currentPokedex = pokemon.id;
        return pokemon;

    } catch (e) {
        console.log(e);
        console.log("pokemon not found");
    }
}

function displayPokemon(pokemon) {
    const image = document.getElementById("pokemon_sprite");
    image.src = pokemon.sprites.other["official-artwork"]["front_default"];


    // Display Abilities
    const name = document.getElementById("pokemon_name");
    name.textContent = `#${pokemon.id} - ${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`;

    const ul = document.getElementById("pokemon_data");
    ul.replaceChildren();

    pokemon.abilities.forEach((ability) => {
        const li = document.createElement("li");
        li.textContent = ability.ability.name;
        ul.appendChild(li);
    });
}


const generationCycleBackwardButton = document.getElementById("cycle_generation_backward");
const generationCycleForwardButton = document.getElementById("cycle_generation_forward");

generationCycleBackwardButton.addEventListener("click", () => cycleGeneration(false));
generationCycleForwardButton.addEventListener("click", () => cycleGeneration(true));

async function cycleGeneration(forward) {
    if (forward) currentGeneration = Math.min(++currentGeneration, 9);
    else currentGeneration = Math.max(--currentGeneration, 1);

    displayGeneration(await getGeneration(currentGeneration.toString()));
}

async function getGeneration(input) {
    try {
        const response = await fetch(`http://localhost:3000/generation?name=${input}`);

        let generation = await response.json();

        return generation;

    } catch (e) {
        console.log(e);
        console.log("generation not found");
    }
}

function displayGeneration(generation) {
    const name = document.getElementById("generation_name");
    name.textContent = generation.name.toUpperCase();

    const ul = document.getElementById("generation_games");
    ul.replaceChildren();

    generation.version_groups.forEach((version) => {
        const li = document.createElement("li");
        li.textContent = version.name;
        ul.appendChild(li);
    });
}

displayPokemon(await getPokemon(currentPokedex.toString()));
displayGeneration(await getGeneration(currentGeneration.toString()));

