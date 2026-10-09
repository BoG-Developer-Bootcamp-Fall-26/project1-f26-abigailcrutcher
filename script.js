let currentId = 1;
let shownId = 1;
let lastId = 1025;

let typeColors = {
    normal: "bg-[#A8A77A]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    electric: "bg-[#F7D02C]",
    grass: "bg-[#7AC74C]",
    ice: "bg-[#96D9D6]",
    fighting: "bg-[#C22E28]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    flying: "bg-[#A98FF3]",
    psychic: "bg-[#F95587]",
    bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]",
    ghost: "bg-[#735797]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]",
    fairy: "bg-[#D685AD]"
};

async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    if (response.ok === false) {
        throw new Error("PokeAPI answered with status " + response.status);
    }
    let data = await response.json();
    return data;
}

async function showPokemon() {
    let id = currentId;
    let data;
    try {
        data = await getPokemon(id);
    } catch (error) {
        console.error("Could not load Pokémon " + id, error);
        if (id === currentId) {
            currentId = shownId;
        }
        return;
    }
    if (id !== currentId) {
        return;
    }

    let nameText = document.getElementById("pokemon-name");
    nameText.textContent = data.name;

    let image = document.getElementById("pokemon-image");
    if (data.sprites.front_default) {
        image.src = data.sprites.front_default;
    } else {
        image.removeAttribute("src");
    }
    image.alt = data.name;

    let typesBox = document.getElementById("types-box");
    typesBox.innerHTML = "";
    for (let i = 0; i < data.types.length; i++) {
        let typeName = data.types[i].type.name;
        let badge = document.createElement("span");
        badge.className = "rounded-lg px-5 py-1 text-2xl " + typeColors[typeName];
        badge.textContent = typeName;
        typesBox.appendChild(badge);
    }

    let infoBox = document.getElementById("info-box");
    infoBox.innerHTML = "";

    let height = document.createElement("p");
    height.textContent = "height: " + (data.height / 10).toFixed(1) + "m";
    infoBox.appendChild(height);

    let weight = document.createElement("p");
    weight.textContent = "weight: " + (data.weight / 10).toFixed(1) + "kg";
    infoBox.appendChild(weight);

    for (let i = 0; i < data.stats.length; i++) {
        let stat = document.createElement("p");
        stat.textContent = data.stats[i].stat.name + ": " + data.stats[i].base_stat;
        infoBox.appendChild(stat);
    }

    let movesBox = document.getElementById("moves-box");
    movesBox.innerHTML = "";
    for (let i = 0; i < data.moves.length; i++) {
        let move = document.createElement("p");
        move.textContent = data.moves[i].move.name;
        movesBox.appendChild(move);
    }

    let statsPanel = document.getElementById("stats-panel");
    statsPanel.scrollTop = 0;

    shownId = id;
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

function showInfo() {
    document.getElementById("panel-title").textContent = "Info";

    document.getElementById("info-box").classList.remove("hidden");
    document.getElementById("moves-box").classList.add("hidden");

    let infoButton = document.getElementById("info-button");
    infoButton.classList.remove("bg-[#E8E8E8]");
    infoButton.classList.add("bg-[#7CFF79]");

    let movesButton = document.getElementById("moves-button");
    movesButton.classList.remove("bg-[#7CFF79]");
    movesButton.classList.add("bg-[#E8E8E8]");
}

function showMoves() {
    document.getElementById("panel-title").textContent = "Moves";

    document.getElementById("moves-box").classList.remove("hidden");
    document.getElementById("info-box").classList.add("hidden");

    let movesButton = document.getElementById("moves-button");
    movesButton.classList.remove("bg-[#E8E8E8]");
    movesButton.classList.add("bg-[#7CFF79]");

    let infoButton = document.getElementById("info-button");
    infoButton.classList.remove("bg-[#7CFF79]");
    infoButton.classList.add("bg-[#E8E8E8]");
}

let infoButton = document.getElementById("info-button");
infoButton.addEventListener("click", showInfo);

let movesButton = document.getElementById("moves-button");
movesButton.addEventListener("click", showMoves);

let previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", goToPrevious);

let nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", goToNext);

showPokemon();
