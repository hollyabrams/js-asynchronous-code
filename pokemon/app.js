// Pokemon

let baseURL = 'https://pokeapi.co/api/v2';

// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
$.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
    console.log(data);
  });


// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.
$.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(pokemon => {
      pokemon.forEach(p => console.log(p));
    });


// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found. Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”
let names = null;
$.getJSON(`${baseURL}/pokemon/?limit=1000`)
  .then(data => {
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
  })
  .then(data => {
    names = data.map(d => d.name);
    return Promise.all(data.map(d => $.getJSON(d.species.url)))
  })
  .then(data => {
    let descriptions = data.map(d => {
      let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
    });
    descriptions.forEach((desc, i) => {
      console.log(`${names[i]}: ${desc}`);
    });
  });


// 4. BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on("click", function() {
  $pokeArea.empty();
  let namesAndImages = [];
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(pokemonData => {
      namesAndImages = pokemonData.map(p => ({
        name: p.name,
        imgSrc: p.sprites.front_default
      }));
      return Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
    })
    .then(speciesData => {
      speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(function(entry) {
          return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let { name, imgSrc } = namesAndImages[i];
        $pokeArea.append(makePokeCard(name, imgSrc, description));
      });
    });
});

function makePokeCard(name, imgSrc, description) {
  return `
    <div class="card">
      <h1>${name}</h1>
      <img src=${imgSrc} />
      <p>${description}</p>
    </div>
  `;
}