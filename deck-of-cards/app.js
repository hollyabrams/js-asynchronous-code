let url = 'https://deckofcardsapi.com/api/deck'

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

$.getJSON(`${url}/new/draw`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});


// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.
let card1 = null;
$.getJSON(`${url}/new/draw/`).then(data => {
  card1 = data.cards[0];
  let deck = data.deck_id;
  return $.getJSON(`${url}/${deck}/draw/`);
})
.then(data => {
  let card2 = data.cards[0];
  [card1, card2].forEach(function(card) {
    console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
  });
});

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${url}/new/shuffle/`).then(data => {
  deckId = data.deck_id;
  $btn.show();
});

$btn.on('click', function() {
  $.getJSON(`${url}/${deckId}/draw/`).then(data => {
    let cardSrc = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (data.remaining === 0) $btn.remove();
  });
});