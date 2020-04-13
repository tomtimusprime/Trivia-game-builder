(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {

  console.log("ready!");

  //=========================
  //Declare the DOM variables
  //=========================
  const questionContainerElement = $("#question-container");
  const cardTitle = $(".card-title");
  const nextBtn = $("#next-button");
  let startButton = $("#start-button");
  const questionElement = $("#question-element");
  const answerElement = $("#answer-buttons");
  const quitButton = $("#quit-button");
  let questions = JSON.parse(localStorage.getItem("questions"));
  let numberOfQuestions;
  checkLocalStorage(questions);
  let currentQuestionIndex;
  let timerCount = 5;
  const MAX_TIME = 5;
  let questionTimer = MAX_TIME;
  let radioValue;

  function determineHowManyQuestions(questions) {
    let numberOfQuestions = 0;
    for (let i = 0; i < questions.length; i++) {
      numberOfQuestions += 1;
    }
    return numberOfQuestions;
  }


  function checkLocalStorage(questions) {
    if (questions === null) {
      $("#how-long").addClass("hide");
      startButton.addClass("hide");
      questionContainerElement.removeClass("hide");
      questionElement.removeClass("hide")
      questionElement.text("You didn't select any questions for your trivia game. Go back to the create quiz page by clicking the quit button.");
      quitButton.removeClass("hide");
    }
    else {
      numberOfQuestions = determineHowManyQuestions(questions);
      questions = JSON.parse(localStorage.getItem("questions"));
      console.log(questions);
    }
  }

  //Event Listeners
  startButton.on("click", function (e) {
    radioValue = $("input[name='how-long']:checked").val();
    radioValue = parseInt(radioValue);
    console.log(radioValue);
    questionTimer = radioValue;
    startGame();
  })


  // function triviaTimer() {
  //   let timerTextElement = $("#timer");
  //   let timerId = setInterval(function () {
  //     if (timerCount < 1) {
  //       clearInterval(timerId);
  //       startButton.addClass("hide");
  //       nextBtn.addClass("hide");
  //       answerElement.addClass("hide");
  //       endGame();
  //     }
  //     timerTextElement.text(`Time Remaining: ${timerCount}`);
  //     timerCount--;
  //   }, 1000);
  // }

  function startGame() {
    // timer = triviaTimer();
    console.log("game started");
    startButton.addClass("hide");
    quitButton.removeClass("hide");
    $("#how-long").addClass("hide");
    questionContainerElement.removeClass("hide");
    questionElement.removeClass("hide")
    nextBtn.removeClass("hide");
    nextBtn.attr('disabled', 'disabled');
    answerElement.removeClass("hide");
    currentQuestionIndex = 0;
    setNextQuestion();
  }
  function setNextQuestion() {
    showQuestion(questions[currentQuestionIndex]);
  }

  //==================================================
  //Generate the questions and answers to be displayed
  //==================================================
  function showQuestion(question) {
    answerElement.empty();
    nextBtn.removeClass("hide");
    nextBtn.attr('disabled', 'disabled');
    nextBtn.text(`Time remaining: ${radioValue}`);
    cardTitle.text("");
    if (!question) {
      endGame();
    }
    else {
      questionElement.text(question.q);
      answerElement.removeClass("hide");
      questionTimerFunction();
      for (let i = 0; i < question.o.length; i++) {
        const pTag = $("<p>");
        pTag.text(question.o[i]);
        answerElement.append(pTag);
      }

    }
  }

  function questionTimerFunction() {
    let timerId2 = setInterval(function () {
      if (questionTimer < 1) {
        clearInterval(timerId2);
        currentQuestionIndex++;
        questionTimer = radioValue;
        setNextQuestion();
      }
      nextBtn.text(`Time Remaining: ${questionTimer}`);
      questionTimer--;
    }, 1000);
  }

  function endGame() {
    nextBtn.addClass("hide");
    answerElement.addClass("hide");
    questionElement.text("Time's up! The trivia quiz is over!");

  }

});

//Done - 1. Get data from local storage - so I need to load Schwynn's version and get that data so I know how to manipulate it.
//Done - mostly 2. Once I have that in an array of objects, I can then manipulate and generate the question cards.
//Done - 3. add timer option on the actual execute page.
//Done - 4. Need to test the overall timer
//Done - 5. Need to add the ability to get how long they want each question to be in seconds
//Done - 6. Need to add that timer to each question.
//7. throw in animations. - maybe get with Ian on that. 
//8. need to make sure everything is styled correctly across all pages.
//Done - 9. Need to pull the data of how many questions there are
//10. fix the quotes issue that Schwyn was talking about
//** get ABCD to show up in front of questions - ask Ian maybe? */

//Make a powerpoint - include what will happen in future updates?
//Go back through the checklist
//something is wrong in the dropdown when you try to create the trivia quiz
//We need to handle if someone puts one self-created question and then tries 20 questions from the drop down - need to make that consistent
//because there's 4 other question spots they could use.
//Need to use the GIPHY API
//Need to use AOS and implement that
//For future updates - add additional categories
//Make two different options for the execute - one with multiple choice answers and one without

//To go over with Ian - Animations, get ABCD to show up in front of questions, Done- how to handle when the questions end.


//We still need to use Giphy





