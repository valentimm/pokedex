const pokemonName = document.querySelector('#pokemon_name');
const pokemonImage = document.querySelector('#pokemon_image img');
const pokemonId = document.querySelector('#pokemon_id');

const form = document.querySelector('#form');
const input = document.querySelector('#pokemon_search');
const buttonPrev = document.querySelector('#previous');
const buttonNext = document.querySelector('#next');

let searchId = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
  const data = await APIResponse.json();
  return data ;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonImage.style.display = 'none';

  pokemonName.innerHTML = 'Loading...';

  pokemonId.innerHTML = '';

  const data = await fetchPokemon(pokemon);


  if (data) {
  pokemonImage.style.display = 'block';
  pokemonName.innerHTML = data.name;
  pokemonId.innerHTML = data.id;
  pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
  input.value = '';
  searchId = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :(';
    input.value = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchId > 1) {
    searchId -= 1;
  renderPokemon(searchId);
  }
});

buttonNext.addEventListener('click', () => {
  searchId += 1;
  renderPokemon(searchId);
});
renderPokemon(searchId);