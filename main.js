function select(selected) {
    // add the outline to the selected answer and remove it from the other
    resetColor()
    $("#answer" + selected).addClass("outline")
    $("#answer" + selected).addClass("outline-amber-400")
    // add the selected answer to the array
    selectedAnswer[currentQuestion] = selected;
    // set the current question awnser to the selected answer
    questions.cauhoi[currentQuestion].dapan.selected = selected;
    //save the selected answer to array to check later
    awnser[currentQuestion] = selected;

}

var awnser = []
// make array awnser with emtpy element length of the question

function submit() {
    //check between the selected answer array and the correct answer array and show the result
    // get all correct answer to json to check later format [1: "C", 2: "B"], save with index of question

    $.getJSON("cauhoi.json", function (data) {
        // make the variable golbal to call it in other functions
        questions = data;
        var correctAnswer = []
        for (i = 0; i < questions.cauhoi.length; i++) {
            correctAnswer[i] = questions.cauhoi[i].dapandung
        }
        // console.log(awnser);
        // console.log(correctAnswer);
        // check the selected answer with the correct answer
        var result = []
        for (i = 0; i < questions.cauhoi.length; i++) {
            if (awnser[i] == correctAnswer[i]) {
                result[i] = true
            } else {
                result[i] = false
            }
        }
        // alrt the result how many correct answer
        var correct = 0;
        for (i = 0; i < result.length; i++) {
            if (result[i] == true) {
                correct++;
            }
        }
        alert("Bạn đã trả lời đúng " + correct + " câu tren " + result.length + " câu")
    });
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

    //show the ex div remove display none
    $("#ex").removeClass("hidden")

}


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
        $("#questions-btn").append(button)
    }
});

function changeQuestion(index) {
    currentQuestion = index;
    $.getJSON("cauhoi.json", function (data) {
        // make the variable golbal to call it in other functions
        questions = data;
        // get all correct answer to array to check later format [1: "C", 2: "B"], save with index of question
        var correctAnswer = []
        for (i = 0; i < questions.cauhoi.length; i++) {
            correctAnswer[i] = questions.cauhoi[i].dapandung
        }
        // console.log(correctAnswer);
        resetColor()
        console.log(questions.cauhoi[index].noidung);
        $("#question").text(questions.cauhoi[index].noidung);
        $("#question-ex").text(questions.cauhoi[index].noidung);
        $("#answer1").text(questions.cauhoi[index].dapan.a);
        $("#answer2").text(questions.cauhoi[index].dapan.b);
        $("#answer3").text(questions.cauhoi[index].dapan.c);


        // change correctawser-ex to the correct answer
        switch (questions.cauhoi[index].dapandung) {
            case "A":
                $("#correctAnswer-ex").text(questions.cauhoi[index].dapan.a)
                break;
            case "B":
                $("#correctAnswer-ex").text(questions.cauhoi[index].dapan.b)
                break;
            case "C":
                $("#correctAnswer-ex").text(questions.cauhoi[index].dapan.c)
                break;
        
            default:
                break;
        }
        $("#questions-btn").html("")
                // change the color the only active question to button
        for (i = 0; i < questions.cauhoi.length; i++) {
            if (i == index) {
                var button = CURRENT_BUTTON.replaceAll("NUMBER", i + 1)
            } else {
                var button = TEMPLATE_BUTTON.replaceAll("NUMBER", i + 1)
            }
            $("#questions-btn").append(button)
        }  
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
    //remove ex div
    $("#ex").addClass("hidden")
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

var ANSWER_BUTTON = `<button
class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-aselectedent-foreground h-10 border border-gray-500 p-2 text-center bg-amber-400 rounded-lg hover:bg-green-300">
123
</button>`

// loadQuestions();

// current question
var currentQuestion = 0;
// selected answer array
var selectedAnswer = [];

// change the question to current question


// changeQuestion(0)

function next() {
    if (currentQuestion == questions.cauhoi.length - 1) {
        $("#next").prop("disabled", true);
    } else {
        $("#next").prop("disabled", false);
        currentQuestion++;
        changeQuestion(currentQuestion)
    }

}

function prev() {

    // if end of the question, disable the next button, else enable it
    if (currentQuestion == 0) {
        $("#prev").prop("disabled", true);
    } else {
        $("#prev").prop("disabled", false);
        currentQuestion--;
        changeQuestion(currentQuestion)
    }

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
