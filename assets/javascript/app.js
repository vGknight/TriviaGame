//Trivia Game


var trivia = {
    // gameTime: 100,
    questionIndex: 0, // keep track of where we are in the question array
    answerIndex: -1,
    answerTime: 10,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsUnanswered: 0,
    gameStarted: false,

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
        gameStarted = true;
        trivia.showQuestion();

    },

    decrement: function() {

        //  Decrease number by one.

        trivia.answerTime--;
        $("#countdown").html("<h2>" + trivia.answerTime + "</h2>");
        //  Once number hits zero...
        if (trivia.answerTime === 0) {
            //  ...run the stop function.
            trivia.stop();
            //  Alert the user that time is up.
            console.log("Time Up!");
            trivia.showCorrect();
            trivia.questionsUnanswered++;
            // trivia.questionIndex++;


            //show correct answer in div
            // wait seconds then move to next question
            if (trivia.gameOver()) {

                console.log("game over fn")
                gameStarted = false;

            } else {
                trivia.questionIndex++; /// 
                setTimeout(function() {
                    trivia.nextQuestion();
                }, 5000);
                // trivia.nextQuestion();
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
            console.log("checkAnswer will return true");

        } else {


            return false;
            console.log("checkAnswer will return false");
        }



    },

    nextQuestion: function() {
        trivia.answerTime = 30; // reset timer
        trivia.showQuestion();
        trivia.run();


    },

    showCorrect: function() {


        var answerCorrectIndex = trivia.questions[trivia.questionIndex].answer;
        // var correctAnswer = trivia.questions[answerCorrectIndex];
        var correctAnswer = trivia.questions[trivia.questionIndex].choices[answerCorrectIndex];

        console.log("CORRECT answer is " + correctAnswer)
        // {
        //     question: "What color is the sky?",
        //     choices: ["China", "Pink", "$50", "Blue"],
        //     answer: 3
        // }





    },
    showScore: function() {
        // show final score screen

        console.log("final score");
        $('#Correct-Guesses').html("Correct Guesses: " + trivia.questionsCorrect);
        $('#Incorrect-Guesses').html("Incorrect Guesses: " + trivia.questionsIncorrect);
        $('#Unanswered').html("Unanswered Questions " + trivia.questionsUnanswered);

    },

    gameOver: function() {
        if ((trivia.questions.length - 1) === trivia.questionIndex) {
            console.log("end of game");
            // trivia.stop(); // stop any active timers
            trivia.showScore();
            return true;

        } else {
            // trivia.questionIndex++;
            // trivia.nextQuestion();
            return false;
        }


    }


};

// Start Game Stuff

$("#start-game").on("click", function() { trivia.run() });


$(".answer").on("click", function() {
    trivia.stop() // stop timer

    //this.id returns the 'id' of the clicked element
    //we use this to compare to the answer in the trivia obj

    // check answer to see if it correct

    if (trivia.checkAnswer(parseInt(this.id))) {

        console.log("correct");
        trivia.questionsCorrect++;

    } else {
        console.log("wrong");
        trivia.questionsIncorrect++;
        trivia.showCorrect();
    }
    if (!trivia.gameOver()) {
        trivia.questionIndex++; // increment index
        trivia.nextQuestion();
    }


    //check for correct answer


    //if correct

    //increment correct guess

    // not correct

    //increment incorrect guess

    // increment question index
    // if not last questions



    // if ((trivia.questions.length - 1) === trivia.questionIndex) {
    //     alert("end of game");
    //     trivia.showScore();

    // } else {
    //     trivia.questionIndex++;
    //     trivia.nextQuestion();
    // }






});


// win check




// hide






$("#resume").on("click", function() { trivia.runGame() }); // use anonymous function here to prevent fn being called on page load
$("#stop").on("click", function() { trivia.stop() });


// function run(timeVar) {
//     // var intervalId = setInterval(function() { decrement(time); }, 1000);
//     intervalId = setInterval(function() { decrement(timeVar); }, 1000);
//     console.log("button clicked" + timeVar);
//     // console.log(time);
// }
// debugger;

// run(myNum);

// $("#start-game").on("click", run(30));


// on start game

// begin game countdown
// fhow first question - start question coutdown




// setTimeout(function() {
//     postinsql(topicId);
// }, 4000)


//  function run() {
//      intervalId = setInterval(decrement, 1000); //runs decrement function every second
//      console.log("button clicked");
//  }

// //


//  function setIntervalAndExecute(fn, t) {
//     fn();
//     return(setInterval(fn, t));
// }

// var i = setIntervalAndExecute(decrement(500, 1000));

// i();

// function(opacity) {
//         setTimeout(function() {SetOpacity(eID, opacity);}, timer * 30);
//     };




// function run() {
//     intervalId = setInterval(decrement, 1000); //runs decrement function every second
//     console.log("button clicked");
// }


// var foo = (function())

// var foo = function run(timeVar) {
//     // var intervalId = setInterval(function() { decrement(time); }, 1000);
//     intervalId = setInterval(function() { decrement(timeVar); }, 1000);
//     console.log("button clicked" + timeVar);
//     // console.log(time);
// }


// nu


// runGame: function() {

//     intervalId2 = setInterval(function() { trivia.decrementGame(); }, 1000);
//     console.log("button clicked" + trivia.gameTime);
//     gameStarted = true;
//     console.log(gameStarted);
//     trivia.showQuestion();
//     //call function to display first question
// },

// decrementGame: function() {

//     //  Decrease number by one.

//     trivia.gameTime--;
//     $("#countdown-game").html("<h2>" + trivia.gameTime + "</h2>");
//     //  Once number hits zero...
//     if (trivia.gameTime === 0) {
//         //  ...run the stop function.
//         trivia.stopGame();
//         //  Alert the user that time is up.
//         alert("Time Up!");
//         //show correct answer in div
//         // wait seconds then move to next question
//     }
// },

// stopGame: function() {

//     //  Clears our intervalId
//     //  We just pass the name of the interval
//     //  to the clearInterval function.
//     clearInterval(intervalId2);


// },

//timer functions

// function run(totalTime) {
//     intervalId = setInterval(function(){decrement(totalTime);}, 1000); //runs decrement function every second
//     // setInterval(function(){decrement(totalTime);}, 1000); //runs decrement function every second
//     console.log("button clicked");
// }

//  The decrement function.
// function decrement(timerAmt) {

//     //  Decrease number by one.
//     // function() { decrement(timeVar); }, 1000)



//     console.log(window[timerAmt] + " Number at top of decrement fn")

//     //var timerAmt = timerAmt;
//     window[timerAmt]--;
//     // timeQuestion--;
//     console.log(window[timerAmt] + " not this");
//     // console.log(timeQuestion + " this is the timeQuestion var");
//     // console.log(window.timeQuestion + " window here");

//     $("#countdown").html("<h2>" + window[timerAmt] + "</h2>");
//     //  Once number hits zero...
//     if (window[timerAmt] === 0) {
//         //  ...run the stop function.
//         stop();
//         //  Alert the user that time is up.
//         alert("Time Up!");
//         //show correct answer in div
//         // wait seconds then move to next question
//     }
// }

// function stop() {
//     //  Clears our intervalId
//     //  We just pass the name of the interval
//     //  to the clearInterval function.
//     clearInterval(intervalId);
// }