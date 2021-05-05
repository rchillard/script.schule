// memorizer.js - logic to support a very primitive spaced repetition algorithm
//
// Difficulty   Repetition
// Easy         7 days
// Medium       3 days
// Hard         1 day

// Elements on page
var question = document.querySelector('#questionBox');
var answer = document.querySelector('#answerBox');
var card = document.querySelector('.card');
var difficulty = document.querySelector('.difficulty');

// Retrieve list of all elements
var elements = {
    "abbr": "",
    "div": "",
    "label": ""
};

// fetch('https://html.haus/api/index.json').then(function (response) {
//     // The API call was successful, so check if response is valid (200)
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject(response);
//     }
// }).then(function (data) {
//     // data is the JSON response
//     elements = data;
//     console.log(elements);
// }).catch(function (err) {
//     // err is the raw response
//     console.warn(`Error fetching question data: ${err}`);
// })

// Load local storage version
var keys = Object.keys(localStorage);
console.log(keys);
for (var key of keys) {
    // If this element exists in the elements object
    console.log(key);
    if (elements.hasOwnProperty(key)) {
        console.log(elements.key);
        // Assign the next date as the value for this key
        elements[key] = localStorage.getItem(key);
    }
    console.log(`${key}: ${localStorage.getItem(key)}`);
    console.log(elements.key);
}

// Put in proper practice order for questionDeck
// var sortedQuestions = elements.slice().sort((a,b) => b.date - a.date);

console.log(sortedQuestions);
// Load the first question
var currentQuestion = {};

fetch('https://html.haus/api/elements/label.json').then(function (response) {
    // The API call was successful, so check if response is valid (200)
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    // data is the JSON response
    currentQuestion = data;
    question.textContent = currentQuestion.name;
    answer.textContent = currentQuestion.description;
}).catch(function (err) {
    // err is the raw response
    console.warn(`Error fetching question data: ${err}`);
})

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
});

difficulty.addEventListener('click', function (event) {
    var nextTestDate = new Date();
    
    if (event.target.id === "easy") {
        console.log("Easy!");
        // Assign next time this question comes up
        nextTestDate.setDate(nextTestDate.getDate() + 7)
        recordedDifficulty = nextTestDate;
    }

    if (event.target.id === "medium") {
        console.log("Medium!");
        // Assign next time this question comes up
        nextTestDate.setDate(nextTestDate.getDate() + 3)
        recordedDifficulty = nextTestDate;
    }

    if (event.target.id === "hard") {
        console.log("Hard!");
        // Assign next time this question comes up
        nextTestDate.setDate(nextTestDate.getDate() + 1)
        recordedDifficulty = nextTestDate;
    }

    // Save result to localStorage
    localStorage.setItem(question.textContent, recordedDifficulty);
})



