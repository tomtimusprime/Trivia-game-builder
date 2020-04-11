
(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
  console.log("ready!");

  function getDataFromLocalStorage() {

  }

  //

  //=========================
  //Declare the DOM variables
  //=========================
  const questionContainerElement = $("#question-container");
  const nextBtn = $("#next-button");
  const questionElement = $("#question-element");
  const answerButtonsElement = $("#answer-buttons");

  let shuffledQuestions;
  let currentQuestionIndex;
  let startButton = $("#start-button");
  let timerCount = 100;

  //Event Listeners
  startButton.on("click", function (e) {
    startGame();
  })

  nextBtn.addEventListener("click", function () {
    currentQuestionIndex++;
    setNextQuestion();
  });

  function quizTimer() {
    let timerTextElement = $("#timer");
    let timerId = setInterval(function () {
      timerCount--;
      timerTextElement.text(`Time Remaining: ${timerCount}`);
      if (timerCount === 0) {
        clearTimeout(timerId);
        startButton.addClass("hide");
        nextBtn.addClass("hide");
        answerButtonsElement.addClass("hide");
        endGame();
      }
    }, 1000);
  }

  function startGame() {
    timer = quizTimer();
    console.log("game started");
    startButton.addClass("hide");
    questionContainerElement.removeClass("hide");
    // questionElement.removeClass("hide")
    // nextBtn.removeClass("hide");
    // answerButtonsElement.removeClass("hide");
    shuffledQuestions = questions.sort(function () {
      return Math.random() - 0.5;
    })
    currentQuestionIndex = 0;
    setNextQuestion();
  }
  function setNextQuestion() {
    resetQuestions();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  //Created a timer object to be assigned to the variable up above so I could manipulate the timer from outside the setInterval 
  //function. This also handles the penalty when you get an answer wrong.
  let timerObject = {
    stop: function () { clearTimeout(timerId); }
  }


  //==================================================
  //Generate the questions and buttons to be displayed
  //==================================================
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.setAttribute("class", "btn btn-primary button-effects");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    })
  }

  //=============================================
  //resets the answerButtonsElement using the DOM
  //=============================================
  function resetQuestions() {
    nextBtn.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  //=======================================================================================================================
  //generates the new buttons associated with the question and answer objects within the questions array and displays them.
  //=======================================================================================================================
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);//selects the body element and sets it to the ".correct" css class
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (!correct) {
      timer.penalty();
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextBtn.classList.remove("hide");
    }
    else {
      endGame();
    }

  }

  //================================================================================================================
  //Code to the change the background and button color according to whether the user gets the answer correct or not.
  //================================================================================================================

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    }
    else {
      element.classList.add("wrong");
    }
  }

  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }

  //=======================================================================================================================
  //This code handles when the quiz is over. It creates a form to input your initials and saves them to local storage to be displayed on the High Scores html page.
  //=======================================================================================================================
  function endGame() {
    timer.stop();
    document.body.setAttribute("style", "background-color:#5995ED");
    let highscore = timerCount;
    answerButtonsElement.classList.add("hide");
    questionElement.innerText = `The quiz is over! Enter your initials to add yourself to the high scores list! Your score is ${highscore}.`;
    let submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.setAttribute("class", "btn btn-primary button-effects");
    let formSubmission = document.createElement("input");
    formSubmission.setAttribute("type", "text");
    questionContainerElement.appendChild(formSubmission);
    questionContainerElement.appendChild(submitButton);
    //Submit button handler code
    submitButton.addEventListener("click", function (e) {
      let highScores = localStorage.getItem("highscores");
      if (highScores === null) {
        highScores = [];
      } else {
        highScores = JSON.parse(highScores);
      }
      highScores.push({
        initials: formSubmission.value,
        score: highscore
      });
      highScores.sort(compare).reverse();

      localStorage.setItem("highscores", JSON.stringify(highScores));
      formSubmission.textContent = "";
      questionContainerElement.removeChild(formSubmission);
      questionContainerElement.removeChild(submitButton);
      questionElement.classList.add("hide");
      startButton.classList.remove('hide');
      startButton.innerText = "Restart";

    })

  }
  //This is a simple compare function to be able to sort the high scores. Used in the endGame function
  function compare(a, b) {
    if (a.score > b.score) return 1;
    if (b.score > a.score) return -1;

    return 0;
  }

});


//1. Get data from local storage - so I need to load Schwynn's version and get that data so I know how to manipulate it.
//2. Once I have that in an array of objects, I can then manipulate and generate the question cards.
//3. add timer option on the actual execute page.

//For future updates - add additional categories
//Make two different options for the execute - one with multiple choice answers and one without


//We still need to use Giphy





