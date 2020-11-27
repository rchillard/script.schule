var questionElement = document.getElementById('questionBox');
var answerElement = document.getElementById('answerBox');
var resultElement = document.getElementById('result');

var questions;

fetch('https://script.schule/data/questions.json').then(function(response) {
    // The API call was successful, so check if response is valid (200)
    if(response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function(data) {
    // data is the JSON response
    questions = data;
    questionElement.textContent = questions.question;
}).catch(function(err) {
    // err is the raw response
    questionElement.value = `Error fetching question data: ${err}`;
})

function checkAnswer() {
    if (questions.answer === answerElement.value.trim()) {
        console.log("Correct!");
        resultElement.textContent = "Correct!";
    } else {
        console.log("False!");
        resultElement.textContent = "Wrong!";
    }
}