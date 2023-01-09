// ! Asynchronous Code in JavaScript

// Let’s have some fun working with callbacks and promises! You’ll complete these exercises twice, using two different methods. First, you’ll use promises! Then, in the exercises at the end of the next subunit, you’ll use async / await!

// If this is your first time seeing these challenges, start by solving them with promises.

// Once you’ve solved this using promises continue to the next subunit and after learning about async functions solve these using async and await.

// TODO: Part 1: Number Facts

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

let url = 'http://numbersapi.com'
let num = 4;

$.getJSON(`${url}/${num}?json`).then(data => {
    console.log(data);
  });

// {text: '4 is the number of legs most furniture has.', number: 4, found: true, type: 'trivia'}


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let nums = [24, 14, 4];
$.getJSON(`${url}/${nums}?json`, function(data) {
    console.log(data);
  });


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// ! (Note: You’ll need to make multiple requests for this.)
let facts = [];
$.getJSON(`${url}/${num}?json`, function(data) {
    facts.push(data.text);
    $.getJSON(`${url}/${num}?json`, function(data) {
        facts.push(data.text);
        $.getJSON(`${url}/${num}?json`, function(data) {
            facts.push(data.text);
            $.getJSON(`${url}/${num}?json`, function(data) {
                facts.push(data.text);
                facts.forEach(fact => {
                    $('body').append(`<p>${fact}</p>`);
                });
            });
        });
    });
});