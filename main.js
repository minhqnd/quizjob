function select(selected) {
    // add the outline to the selected answer and remove it from the other
    resetColor()
    $("#answer" + selected).addClass("outline")
    $("#answer" + selected).addClass("outline-amber-400")
    // add the selected answer to the array
    selectedAnswer[currentQuestion] = selected;
    // set the current question awnser to the selected answer
    questions.cauhoi[currentQuestion].dapan.selected = selected;


}

function removeOutline() {
    $("#answerA").removeClass("outline")
    $("#answerB").removeClass("outline")
    $("#answerC").removeClass("outline")
}



function check() {
    //get the correct answer
    var correct = questions.cauhoi[currentQuestion].dapandung;
    // get the selected answer
    var selected = questions.cauhoi[currentQuestion].dapan.selected;
    // check if the selected answer is correct
    if (selected == correct) {
        // replace outline-amber-400 with outline-green-400
        $("#answer" + selected).removeClass("outline-amber-400")
        $("#answer" + selected).addClass("outline-green-400")
        console.log('ok');
    } else {
        // add the wrong class to the selected answer
        $("#answer" + selected).addClass("outline-red-400")
        // add the correct class to the correct answer
        $("#answer" + correct).addClass("outline-green-400")
        $("#answer" + correct).addClass("outline")

    }
}

$.getJSON("cauhoi.json", function (data) {
    // make the variable golbal to call it in other functions
    questions = data;
    // load the questions json cauhoi.json
    $.getJSON("cauhoi.json", function (data) {
        // make the variable golbal to call it in other functions
        questions = data;
        //check how many question
        questions.cauhoi.length
        // for each question, create a button for select
        for (i = 0; i < questions.cauhoi.length; i++) {
            // create a button
            var button = TEMPLATE_BUTTON.replaceAll("NUMBER", i + 1)
            // add the button to the div
            console.log(button);
            $("#questions-btn").append(button)
        }
    });




});

function changeQuestion(index) {
    $.getJSON("cauhoi.json", function (data) {
        // make the variable golbal to call it in other functions
        questions = data;
        resetColor()
        console.log(questions.cauhoi[index].noidung);
        $("#question").text(questions.cauhoi[index].noidung);
        $("#answer1").text(questions.cauhoi[index].dapan.a);
        $("#answer2").text(questions.cauhoi[index].dapan.b);
        $("#answer3").text(questions.cauhoi[index].dapan.c);
    });
}

function resetColor() {
    //remove the outline
    removeOutline()
    //remove all the color
    $("#answerA").removeClass("outline-green-400")
    $("#answerA").removeClass("outline-red-400")
    $("#answerB").removeClass("outline-green-400")
    $("#answerB").removeClass("outline-red-400")
    $("#answerC").removeClass("outline-green-400")
    $("#answerC").removeClass("outline-red-400")
}

changeQuestion(0)

var TEMPLATE_BUTTON = `<button onclick="changeQuestion(NUMBER-1)"
class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:text-aselectedent-foreground h-10 border border-gray-500 p-2 text-center rounded-lg hover:bg-gray-200">
NUMBER
</button>`

var CURRENT_BUTTON = `<button
class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-aselectedent-foreground h-10 border border-gray-500 p-2 text-center bg-green-500 rounded-lg hover:bg-green-300">
NUMBER
</button>`

// loadQuestions();

// current question
var currentQuestion = 0;
// selected answer array
var selectedAnswer = [];

// change the question to current question


// changeQuestion(0)

function next() {
    currentQuestion++;
    changeQuestion(currentQuestion)
}

function prev() {
    currentQuestion--;
    changeQuestion(currentQuestion)
}

//count down timer 1 hour and update to the timer format hh:mm:ss
var countDownDate = new Date().getTime() + 3600000;
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    // Time calculations for hours, minutes and seconds
    var hours = Math.floor(distance / (1000 * 60 * 60));
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;
    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Hết giờ";
    }
}, 1000);