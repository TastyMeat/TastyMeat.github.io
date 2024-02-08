// import express from "express";
// const app = express();

// app.use(express.json());

const form = document.getElementById("form");

form.addEventListener("submit", async e => {
    const name = document.getElementById("pokemon_name").value.toLowerCase();
    e.preventDefault();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await response.json();

    const abilities = await pokemon.abilities;


    // Display Abilities
    const ul = document.getElementById("pokemon_data");
    ul.replaceChildren();

    abilities.forEach((ability) => {
        const li = document.createElement("li");
        li.textContent = ability.ability.name;
        ul.appendChild(li);
    });
});


