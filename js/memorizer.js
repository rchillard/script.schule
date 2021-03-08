// memorizer.js

var card = document.querySelector('.card');
var difficulty = document.querySelector('.difficulty');

card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
});

difficulty.addEventListener('click', function (event) {
    if(event.target.id==="easy") {
        console.log("Easy!")
        // Assign next time this question comes up
        recordedDifficulty = "easy";
    }

    if(event.target.id==="medium") {
        console.log("Medium!")
        // Assign next time this question comes up
        recordedDifficulty = "medium";
    }

    if(event.target.id==="hard") {
        console.log("Hard!")
        // Assign next time this question comes up
        recordedDifficulty = "hard";
    }

    // Save result to localStorage
    var cardDifficulty = localStorage.setItem(questionElement.textContent, recordedDifficulty)
})

// Spaced repetition table
// Difficulty   Repetition
// Easy         6 days
// Medium       3 days
// Hard         1 day

// fetch('https://script.schule/data/dom-manipulation.json').then(function (response) {
//     // The API call was successful, so check if response is valid (200)
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject(response);
//     }
// }).then(function (data) {
//     // data is the JSON response
//     questions = data;
//     questionElement.textContent = questions[currentQuestion].question;
//     answerElement.textContent = questions[currentQuestion].answer;
// }).catch(function (err) {
//     // err is the raw response
//     questionElement.value = `Error fetching question data: ${err}`;
// })