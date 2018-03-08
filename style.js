let br = document.createElement('br');

let interval = null;
let totalScore = 0;
let amountDone = 0;
let request = new XMLHttpRequest();
request.open("GET", "question.json", false);
request.send(null)
let questionList = JSON.parse(request.responseText);
let requestAns = new XMLHttpRequest();
requestAns.open("GET", "answer.json", false);
requestAns.send(null)
let answerList = JSON.parse(requestAns.responseText);

function onClickQuestion(doneQuestion, questionList, answerList, amountEx) {
    clearInterval(interval);
    nextQuestion(doneQuestion, questionList, answerList, amountEx);
}

function startProgress(doneQuestion, questionList, answerList, amountEx) {
    clearInterval(interval);
    amountDone++;
    let percentage = 100;
    interval = setInterval(function() {
        var element = document.getElementById('tabTimer');
        document.getElementById("tabTimer").value = --percentage;
        if (percentage == 0) {
            nextQuestion(doneQuestion, questionList, answerList, amountEx);
        }
    }, 600);
}

function nextQuestion(doneQuestion, questionList, answerList, amountEx) {
    if (amountDone == amountEx) {
        clearInterval(interval);
        document.getElementById("tabTimer").style.display = "none";
        document.getElementById("startComponent").style.display = "block";
        document.getElementById('question').style.display = "none";
        if (totalScore > 1) {
            alert("You got " + totalScore + " scores");
        } else {
            alert("You got " + totalScore + " score");
        }
    } else {
        startProgress(doneQuestion, questionList, answerList, amountEx);
        randomChioce = Math.floor(Math.random() * Object.keys(questionList).length);
        while ($.inArray(randomChioce, doneQuestion) != -1) {
            randomChioce = Math.floor(Math.random() * Object.keys(questionList).length);
        }
        console.log(randomChioce);
        let numQuestion = Object.keys(questionList);
        let valueQuestion = Object.values(questionList);
        let question = valueQuestion[0].question;
        let choice = valueQuestion[0].choice;
        let keyAnswer = Object.keys(answerList);
        let valueAnswer = Object.values(answerList);
        document.getElementById("question").innerHTML = getQuestion(valueQuestion, randomChioce);

        for (let i = 0; i < getChoice(valueQuestion, randomChioce).length; i++) {
            let button = document.createElement('button');
            let nameId = "choice" + i;
            button.setAttribute("id", nameId);

            button.onclick = function() {
                let element = document.getElementById(nameId);
                let text = element.innerText || element.textContent;
                console.log("This is text: ", text)
                console.log("This is answer: ", valueAnswer[randomChioce])
                doneQuestion.push(randomChioce);
                if (text == valueAnswer[randomChioce]) {
                    totalScore++;
                }
                nextQuestion(doneQuestion, questionList, answerList, amountEx);
                console.log(totalScore);
            };

            let br = document.createElement('br');
            button.innerHTML = getChoice(valueQuestion, randomChioce)[i];
            let div1 = document.getElementById(nameId);
            document.getElementById('question').appendChild(br);
            document.getElementById('question').appendChild(button);
        }
    }
}

function getQuestion(value, index) {
    return value[index].question;
}

function getChoice(value, index) {
    return value[index].choice;
}

function fiveQuestion() {
    document.getElementById("tabTimer").style.display = "block";
    document.getElementById('question').style.display = "block";
    document.getElementById("startComponent").style.display = "none";
    let amountEx = 5;
    let doneQuestion = [];
    totalScore = 0;
    amountDone = 0;
    // document.getElementById("score").innerHTML = "Your score: " + totalScore;
    nextQuestion(doneQuestion, questionList, answerList, amountEx);
}

function tenQuestion() {
    document.getElementById("tabTimer").style.display = "block";
    document.getElementById('question').style.display = "block";
    document.getElementById("startComponent").style.display = "none";
    let amountEx = 10;
    let doneQuestion = [];
    totalScore = 0;
    amountDone = 0;
    // document.getElementById("score").innerHTML = "Your score: " + totalScore;
    nextQuestion(doneQuestion, questionList, answerList, amountEx);
}

function fiveteenQuestion() {
    document.getElementById("tabTimer").style.display = "block";
    document.getElementById('question').style.display = "block";
    document.getElementById("startComponent").style.display = "none";
    let amountEx = 15;
    let doneQuestion = [];
    totalScore = 0;
    amountDone = 0;
    // document.getElementById("score").innerHTML = "Your score: " + totalScore;
    nextQuestion(doneQuestion, questionList, answerList, amountEx);
}