//Trivia Game


var trivia = {
    // gameTime: 100,
    questionIndex: 0, // keep track of where we are in the question array
    answerIndex: -1,
    answerTime: 10, // change this to production time once testing complete
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsUnanswered: 0,
    gameStarted: false,
    gamePaused: false,

    questions: [{
            question: "What is the capital of United Kingdom?",
            choices: ["Manchester", "Birmingham", "London", "Birmingham"],
            answer: 2
        },

        {
            question: "What is the capital of United States?",
            choices: ["California", "Washington DC", "Miami", "Florida"],
            answer: 1
        },
        {
            question: "What color is the sky?",
            choices: ["China", "Pink", "$50", "Blue"],
            answer: 3
        }



    ],

    //methods

    run: function() {

        intervalId = setInterval(function() { trivia.decrement(); }, 1000);
        trivia.gameStarted = true;
        $(".answer").empty();
        trivia.showQuestion();
        $("#start-game").hide();
        $("#notification").hide();
       

    },

    decrement: function() {

        //  Decrease number by one.

        trivia.answerTime--;
        $("#countdown").html("<h2> Time Remaining: " + trivia.answerTime + "</h2>");
        //  Once number hits zero...
        if (trivia.answerTime === 0) {
            //  ...run the stop function.
            trivia.stop();
            //  Alert the user that time is up.
            console.log("Times Up for this one :-( ");
            $("#countdown").html("<h2>Times Up for this one :-(</h2>");

            trivia.showCorrect();
            trivia.questionsUnanswered++;
            // trivia.questionIndex++;


            //show correct answer in div
            // wait seconds then move to next question
            if (trivia.gameOver()) {

                console.log("game over fn")
                trivia.gameStarted = false;

            } else {
                trivia.questionIndex++; /// 
                setTimeout(function() {
                    trivia.nextQuestion();
                }, 5000);
            }


        }
    },

    stop: function() {

        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
    },



    showQuestion: function() {


        answerIndex = trivia.questions[trivia.questionIndex].answer; // set 
        // console.log("correct answer is at index " + answerIndex);

        $("#question").html("<h2>" + trivia.questions[trivia.questionIndex].question + "</h2>");
        $("#0").html("<h2>" + trivia.questions[trivia.questionIndex].choices[0] + "</h2>");
        $("#1").html("<h2>" + trivia.questions[trivia.questionIndex].choices[1] + "</h2>");
        $("#2").html("<h2>" + trivia.questions[trivia.questionIndex].choices[2] + "</h2>");
        $("#3").html("<h2>" + trivia.questions[trivia.questionIndex].choices[3] + "</h2>");
        //show question

        //show choices
        // trivia.run(); // start clock



        // set 30 second timeout


        // show question, start 30 econd timeout, if timer expires show correct answer then move to next
        //


    },

    checkAnswer: function(choice) {
        var indexCorrect = trivia.questions[trivia.questionIndex].answer;
        var indexQuestion = choice;
        if (indexQuestion === indexCorrect) {
            // winner
            return true;
        } else {
            return false;
        }
    },

    nextQuestion: function() {
        trivia.answerTime = 10; // reset timer
        trivia.gamePaused = false; // un pause to allow clicks to actually do something
        trivia.showQuestion();
        trivia.run();
        $('#correct-answer').hide();
        $('.answer').show();
    },

    showCorrect: function() {
        var answerCorrectIndex = trivia.questions[trivia.questionIndex].answer;
        var correctAnswer = trivia.questions[trivia.questionIndex].choices[answerCorrectIndex];
        $("#notification").html("<h2>Sorry, the correct answer is.</h2>").show();
        trivia.hideWrongAnswer(answerCorrectIndex);
        trivia.gamePaused = true;

    },
    showScore: function() {
        // show final score screen
        $('#Correct-Guesses').html("Correct Guesses: " + trivia.questionsCorrect);
        $('#Incorrect-Guesses').html("Incorrect Guesses: " + trivia.questionsIncorrect);
        $('#Unanswered').html("Unanswered Questions " + trivia.questionsUnanswered);
        $("#restart-game").show();
        $("#stats").show();
    },

    restartGame: function() {

        trivia.questionIndex = 0, // keep track of where we are in the question array
        trivia.answerIndex = -1,
        trivia.answerTime = 10, // change this to production time once testing complete
        trivia.questionsCorrect = 0,
        trivia.questionsIncorrect = 0,
        trivia.questionsUnanswered = 0,
        trivia.gameStarted = true,
        trivia.gamePaused = false;
        $("#restart-game").hide();
        $("#stats").hide();
        $('#countdown').empty();
        trivia.run();
        $('.answer').show(); // unhide answers
        // $('#notification').empty();

    },

    hideWrongAnswer: function(answer) {
        trivia.gamePaused = true;
        arr = [0, 1, 2, 3];
        for (var i = 0; i < arr.length; i++) {
            if (i != answer) {

                $("#" + i).hide();
                console.log("#" + i);

            }
        }


    },

    gameOver: function() {
        if ((trivia.questions.length - 1) === trivia.questionIndex) {
            console.log("end of game");
            trivia.showScore();
            trivia.gameStarted = false;
            return true;

        } else {
            return false;
        }


    }


};



// Start Game Stuff

$(document).ready(function() {

    $("#restart-game").hide();
    $("#stats").hide();

    $("#start-game").on("click", function() {
        trivia.run()
    });

    $("#restart-game").on("click", function() {
        trivia.restartGame();

    });

    $(".answer").on("click", function() {
        console.log(" game started " + trivia.gameStarted);

        if (trivia.gameStarted && !trivia.gamePaused) {
            trivia.stop() // stop timer
            trivia.gamePaused = true; // set to true to stop click functions on answer divs
            trivia.showCorrect();

            //this.id returns the 'id' of the clicked element
            //we use this to compare to the answer in the trivia obj

            // check answer to see if it correct

            if (trivia.checkAnswer(parseInt(this.id))) {

                console.log("correct");
                trivia.questionsCorrect++;
                $("#notification").html("<h2>Correct, the answer is</h2>").show();

            } else {
                console.log("wrong");
                trivia.questionsIncorrect++;
            }
            if (!trivia.gameOver()) {
                trivia.questionIndex++;
                setTimeout(function() {
                    trivia.nextQuestion();
                }, 5000);
            }
        }
    });

});

