let currentId = 1;

async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let data = await response.json();
    return data;
}

async function showPokemon() {
    let data = await getPokemon(currentId);

    let nameText = document.getElementById("pokemon-name");
    nameText.textContent = data.name;
}

showPokemon();
