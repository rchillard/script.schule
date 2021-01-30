var questionElement = document.getElementById('questionBox');
var answerElement = document.getElementById('answerBox');
var resultElement = document.getElementById('result');
var card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});


var questions;
var currentQuestion = 0;

fetch('https://script.schule/data/dom-manipulation.json').then(function(response) {
    // The API call was successful, so check if response is valid (200)
    if(response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function(data) {
    // data is the JSON response
    questions = data;
    questionElement.textContent = questions[currentQuestion].question;
    answerElement.textContent = questions[currentQuestion].answer;
}).catch(function(err) {
    // err is the raw response
    questionElement.value = `Error fetching question data: ${err}`;
})

function checkAnswer() {
    if (questions[currentQuestion].answer === answerElement.value.trim()) {
        console.log(`Question ${currentQuestion}: Correct`);
        resultElement.textContent = "Correct";
        resultElement.classList.remove('hidden');
        window.setTimeout(function() {
            currentQuestion = currentQuestion + 1;
            resultElement.classList.add('hidden');
            questionElement.textContent = questions[currentQuestion].question;
            answerElement.value = "";
        }, 750);
    } else {
        console.log("Try Again");
        resultElement.textContent = "Try Again";
        resultElement.classList.remove('hidden');
        window.setTimeout(function() { resultElement.classList.add('hidden') }, 500);
    }
}

function correctAnswer() {

}