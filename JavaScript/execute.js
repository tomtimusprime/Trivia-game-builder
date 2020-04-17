(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {

  console.log("ready!");
  localStorage.removeItem("lastPassword"); //ask schwyn about this.

  //=========================
  //Declare the DOM variables
  //=========================
  const questionContainerElement = $("#question-container");
  const cardTitle = $(".card-title");
  const codeElement = $("#code");
  const codeButton = $("#code-button");
  const nextBtn = $("#next-button");
  let startButton = $("#start-button");
  const questionElement = $("#question-element");
  const answerElement = $("#answer-buttons");
  const quitButton = $("#quit-button");
  let resetButton = $("#reset-button");
  let timer;
  let code = codeElement.val();
  // let questions = JSON.parse(localStorage.getItem("questions"));
  let key = localStorage.key(0);
  let questions;
  if (!localStorage.getItem("questions")) {
    questions = JSON.parse(localStorage.getItem(key));
  }
  else {
    questions = JSON.parse(localStorage.getItem("questions"));
  }
  console.log(questions);
  let numberOfQuestions;
  console.log(localStorage.length);
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
    if (localStorage.length === 0) {
      $("#how-long").addClass("hide");
      startButton.addClass("hide");
      questionContainerElement.removeClass("hide");
      questionElement.removeClass("hide")
      questionElement.text("You didn't associate a code with a trivia quiz or select any questions for your trivia game. Go back to the create quiz page to create a quiz.");
      quitButton.removeClass("hide");
    }
    else {

      numberOfQuestions = determineHowManyQuestions(questions);
      console.log(questions);
    }

  }


  //Event Listeners
  startButton.on("click", function (e) {
    radioValue = $("input[name='how-long']:checked").val();
    radioValue = parseInt(radioValue);
    console.log(radioValue);
    questionTimer = radioValue;
    $("#code-div").addClass("hide");
    resetButton.removeClass("hide");
    startGame();

  })

  resetButton.on("click", function () {
    $("#code-div").removeClass("hide");
    answerElement.addClass("hide");
    reset();
  })

  codeButton.on("click", function () {
    code = codeElement.val();
    questions = code;
    questions = JSON.parse(localStorage.getItem(questions));
    console.log(questions);
    if(!localStorage.getItem(code)) {
      $("#code-success").show();
      $("#code-success").attr("style", "color: red;");
      $("#code-success").text("That code isn't associated with a trivia quiz.");
      $("#code-success").hide(5000);
    }
    else {
      $("#code-success").show();
      $("#code-success").attr("style", "color: green;");
      $("#code-success").text("Successfully added your code. That quiz has " + numberOfQuestions + " question(s).");
      $("#code-success").hide(10000);
      // let newP = $("<p>").text("That quiz has " + numberOfQuestions);
      // codeElement.append(newP);
      // console.log("That quiz has " + numberOfQuestions);
      reset();
    }
  })


  function reset() {
    questionElement.text("Click the button below to start. You will have no more than 10 minutes to complete the whole trivia quiz.");
    quitButton.addClass("hide");
    startButton.removeClass("hide");
    resetButton.addClass("hide");
    clearInterval(timer);
    nextBtn.addClass("hide");
    $("#how-long").removeClass("hide");
  }

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
        if (question.o[i] === question.o[0]) {
          pTag.text("a.) " + question.o[i]);
          answerElement.append(pTag);
        }
        if (question.o[i] === question.o[1]) {
          pTag.text("b.) " + question.o[i]);
          answerElement.append(pTag);
        }
        if (question.o[i] === question.o[2] && question.o[i].length > 0) {
          pTag.text("c.) " + question.o[i]);
          answerElement.append(pTag);
        }
        if (question.o[i] === question.o[3] && question.o[i].length > 0) {
          pTag.text("d.) " + question.o[i]);
          answerElement.append(pTag);
        }
        // pTag.text(question.o[i]);
        // answerElement.append(pTag);

      }

    }
  }

  function questionTimerFunction() {
    timer = setInterval(function () {
      if (questionTimer < 1) {
        clearInterval(timer);
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
    questionElement.text("That's it! The trivia quiz is over!");
    resetButton.attr("class", "waves-effect waves-light btn center-align");
    $("#button-div").append(resetButton);
    $.ajax({
      headers: {
        "Accept": "application/json",
        "userkey": "dc6zaTOxFJmzC",
        "Access-Control-Allow-Origin": "*"
      },
      url: "https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=congrats",
      method: "GET"
    }).then(function (response) {
      console.log(response);
      console.log(response.data[0].url);
      let img = $("<img>").attr("src", response.data[0].images.downsized_large.url);
      questionElement.append("<br>").append(img);

    })

  }

});


//Done - 1. Get data from local storage - so I need to load Schwynn's version and get that data so I know how to manipulate it.
//Done - mostly 2. Once I have that in an array of objects, I can then manipulate and generate the question cards.
//Done - 3. add timer option on the actual execute page.
//Done - 4. Need to test the overall timer
//Done - 5. Need to add the ability to get how long they want each question to be in seconds
//Done - 6. Need to add that timer to each questions
//8. need to make sure everything is styled correctly across all pages.
//Done - 9. Need to pull the data of how many questions there are
//10. fix the quotes issue that Schwyn was talking about
//** get ABCD to show up in front of questions - ask Ian maybe? */
//clean up the create quiz page
//add a button to go to the execute page after the submit button or make the functionality of the submit button include going to the execute page.
//Add functionality to show how many questions there in each quiz they selected.
//Get the handling for the start button if they add a code that isn't there and press the start button.
//fix the navbar on create page
//update buttons on create page
//get all the navs mobile friendly
//review create page and see how we can make it more user friendly

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

//Bug concerning the code portion of the create quiz - have to click it twice?
//Special characters are still not showing up
//Is it possible to put in the code that you already created in the create quiz page to modify it? If not, can we add that functionality?
//If you quit the execute page it's a rabit trail to get back
//But with the nav bar - this is known.

//constructor - it's like classes because Javascript doesn't actually have real classes you can use class syntax as well.
// function Timer(timeLength) {
//   this.MAX_TIME = timeLength;
//   this.time = this.MAX_TIME;
//   this.start = function () { }
//   this.interval = ()=> setInterval(this.timer, 1000);
//   this.timer = function () {
//     if (this.time < 1) {
//       this.stop();
//       currentQuestionIndex++;
//       this.time = this.MAX_TIME;
//     }
//     // nextBtn.text(`Time Remaining: ${this.time}`);
//     console.log(this.time);
//     this.time--;

//   }
//   this.stop = function () {
//     clearInterval(this.interval);
//   }
// }

// var timer2 = new Timer(5);

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


