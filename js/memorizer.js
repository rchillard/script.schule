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

// Elements are a raw index, sortedQuestions an Array of objects, questionCounter tracks progress
var elements = [];
var sortedQuestions = [];
var questionCounter = 0;

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

// Use event delegation to capture click events properly
var clickHandler = function (event) {
    event.preventDefault();

    if (event.target.closest('.difficulty')) {
        card.classList.remove('is-flipped');

        var difficulty;
        switch (event.target.id) {
            case "easy":
                difficulty = 7
                break;
            case "medium":
                difficulty = 3;
                break;
            case "hard":
                difficulty = 1;
                break;
        }

        var nextTestDate = new Date();
        nextTestDate.setDate(nextTestDate.getDate() + difficulty)
        localStorage.setItem(question.textContent, nextTestDate)
        setTimeout(() => { renderNextQuestion(); }, 250);
        return;
    }

    if (event.target.closest('.card')) {
        card.classList.toggle('is-flipped');
    }
}

document.addEventListener('click', clickHandler, true);

// difficulty.addEventListener('click', function (event) {
//     var nextTestDate = new Date();

//     if (event.target.id === "easy") {
//         console.log("Easy!");
//         // Assign next time this question comes up
//         nextTestDate.setDate(nextTestDate.getDate() + 7)
//         recordedDifficulty = nextTestDate;
//     }

//     if (event.target.id === "medium") {
//         console.log("Medium!");
//         // Assign next time this question comes up
//         nextTestDate.setDate(nextTestDate.getDate() + 3)
//         recordedDifficulty = nextTestDate;
//     }

//     if (event.target.id === "hard") {
//         console.log("Hard!");
//         // Assign next time this question comes up
//         nextTestDate.setDate(nextTestDate.getDate() + 1)
//         recordedDifficulty = nextTestDate;
//     }

//     // Save result to localStorage
//     localStorage.setItem(question.textContent, recordedDifficulty);

//     // Reset UI
//     console.log("difficulty cardFlip!")
//     card.classList.toggle('is-flipped');

//     // Load next question
//     renderNextQuestion();
// })

