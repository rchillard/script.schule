// memorizer.js - logic to support a very primitive spaced repetition algorithm
//
// Difficulty   Repetition
// Easy         7 days
// Medium       3 days
// Hard         1 day

// Elements on page
var card = document.querySelector('.card');
var question = document.querySelector('#questionBox');
var difficulty = document.querySelector('.difficulty');
var answer = document.querySelector('#answerBox');
var questionCounter = 0;

// Retrieve list of all elements
var elements = [];
var sortedQuestions = [];
// var elements = {
//     "abbr": "",
//     "div": "",
//     "label": ""
// };

async function loadQuestions(url) {
    const response = await fetch(url).then(function (response) {
        // The API call was successful, so check if response is valid (200)
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // data is the JSON response
        return data;
    }).catch(function (err) {
        // err is the raw response
        console.warn(`Error fetching question data: ${err}`);
    })

    const elements = await response.elements;

    var questionDeck = [];
    // Loop through all the elements and add to questionDeck as objects, checking if localStorage value exists
    for (var element of elements) {
        var nextTestDate = localStorage.getItem(element) ? new Date(localStorage.getItem(element)) : new Date();
        questionDeck.push({ "element": element, "date": nextTestDate });
    }
    // console.log(questionDeck);


    // Put in proper practice order for questionDeck, ordering by soonest nextTestDate
    sortedQuestions = questionDeck.slice().sort((a, b) => a.date - b.date);
    // console.log(sortedQuestions);
    return sortedQuestions;
}

loadQuestions('https://html.haus/api/index.json').then(sortedQuestions => {
    console.log(sortedQuestions[0].element);
    var elementToQuery = sortedQuestions[0].element;
    console.log(elementToQuery);

    // Load the first question
    renderNextQuestion();
});

async function renderNextQuestion() {
    var elementQuery = sortedQuestions[questionCounter].element;
    fetch(`https://html.haus/api/elements/${elementQuery}.json`).then(function (response) {
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
        questionCounter = questionCounter + 1;
    }).catch(function (err) {
        // err is the raw response
        console.warn(`Error fetching question data: ${err}`);
    })
}

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

    // Reset UI
    console.log("Flipping card!")
    card.classList.toggle('is-flipped');

    // Load next question
    renderNextQuestion();
})



