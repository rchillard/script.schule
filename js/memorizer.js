// memorizer.js - logic to support a very primitive spaced repetition algorithm
//
// Difficulty   Repetition
// Easy         6 days
// Medium       3 days
// Hard         1 day

// Question and Answer Box
var question = document.querySelector('#questionBox');
var answer = document.querySelector('#answerBox');

// Retrieve list of all elements
var elements = {};

fetch('https://html.haus/api/index.json').then(function (response) {
    // The API call was successful, so check if response is valid (200)
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    // data is the JSON response
    elements = data.json();
}).catch(function (err) {
    // err is the raw response
    console.warn(`Error fetching question data: ${err}`);
})

// Load local storage version

// Put in proper practice order for questionDeck

// Load the first question
var currentQuestion = {};

fetch('https://html.haus/api/elements/abbr.json').then(function (response) {
    // The API call was successful, so check if response is valid (200)
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    // data is the JSON response
    console.log(data);
    currentQuestion = data;
    question.textContent = currentQuestion.name;
    answer.textContent = currentQuestion.description;
}).catch(function (err) {
    // err is the raw response
    console.warn(`Error fetching question data: ${err}`);
})

// Elements on the actual page
var card = document.querySelector('.card');
var difficulty = document.querySelector('.difficulty');

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
});

difficulty.addEventListener('click', function (event) {
    if (event.target.id === "easy") {
        console.log("Easy!");
        // Assign next time this question comes up
        recordedDifficulty = "easy";
    }

    if (event.target.id === "medium") {
        console.log("Medium!");
        // Assign next time this question comes up
        recordedDifficulty = "medium";
    }

    if (event.target.id === "hard") {
        console.log("Hard!");
        // Assign next time this question comes up
        recordedDifficulty = "hard";
    }

    // Save result to localStorage
    var cardDifficulty = localStorage.setItem(question.textContent, recordedDifficulty);
})



