let currentId = 1;
let lastId = 1025;

async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let data = await response.json();
    return data;
}

async function showPokemon() {
    let data = await getPokemon(currentId);

    let nameText = document.getElementById("pokemon-name");
    nameText.textContent = data.name;

    let image = document.getElementById("pokemon-image");
    image.src = data.sprites.front_default;
    image.alt = data.name;
}

function goToPrevious() {
    if (currentId > 1) {
        currentId = currentId - 1;
        showPokemon();
    }
}

function goToNext() {
    if (currentId < lastId) {
        currentId = currentId + 1;
        showPokemon();
    }
}

let previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", goToPrevious);

let nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", goToNext);

showPokemon();
