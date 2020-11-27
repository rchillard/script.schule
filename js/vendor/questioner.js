var questionElement = document.querySelector('#questionBox');
var answerElement = document.querySelector('#answerBox');

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
}).catch(function(err) {
    // err is the raw response
    questionElement.textContent = `Error fetching question data: ${err}`;
})