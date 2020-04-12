// material jquery
$('select').material_select();

// removing local storage key to be used again
localStorage.removeItem("questions");
$("#apiButton").on("click", function () {

  let eleI = $("<i>");
  eleI.addClass("fa fa-spinner fa-spin");
  eleI.css("font-size", "24px");
  $("#form").append(eleI);

  // apiNumber
  let apiNum = $("#apiNumber").val();
  if (apiNum === null) {
    apiNum = 1;
  }
  apiNum = "amount=" + apiNum;
  // apiCategory
  let apiCat = $("#apiCategory").val();
  if (apiCat === null) {
    apiCat = "";
  } else {
    apiCat = "&category=" + apiCat;
  }
  // apiDificulty
  let apiDif = $("#apiDifficulty").val();
  if (apiDif === null) {
    apiDif = "easy"
  }
  apiDif = "&difficulty=" + apiDif;

  console.log(apiDif);
  console.log(apiCat);
  console.log(apiNum);

  let queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=VYV7WuUWYvqBEkmL3ntG5ElTynntIv4e";
  let quizApi = "https://opentdb.com/api.php?";
  $.ajax({
    url: quizApi + apiNum + apiCat + apiDif,
    method: "GET"
  }).then(function (response) {
    $("i").remove();
    // Checking the JSON object recieved from the "Open Trivia Database" API
    console.log(response);
    console.log(response.results[0].question);
    console.log(response.results[0].correct_answer);
    console.log(response.results[0].incorrect_answers);
    // Using local storage to save/recieve user's quiz and to pass information in and out of the AJAX call
    let questions = localStorage.getItem("questions");
    questions = JSON.parse(questions);
    if (questions === null) {
      questions = [];
    }

    // limiting the length to 20 so they purchase premium lol
    let checkNumber = $("#apiNumber").val();
    if(checkNumber === null){
      checkNumber = 1;
    }
    console.log(checkNumber);
    checkNumber = parseInt(checkNumber);
    let addedCheck = questions.length + checkNumber;
    if (questions.length < 20 && addedCheck < 21) {
      let inquiry;
      let wrongAnswers;
      let rightAnswer;

      // Editing each question due to the syntax incompatibility and setting up the array for questions
      for (let q = 0; q < response.results.length; q++) {
        inquiry = response.results[q].question;
        wrongAnswers = response.results[q].incorrect_answers;
        rightAnswer = response.results[q].correct_answer;

        // editing the question syntax
        text = inquiry.split("");
        console.log(typeof text + text.length);
        for (let i = 0; i < text.length; i++) {
          if (text[i] === "&" && text[i + 1] === "q") {
            text.splice(i, 6, "\"");
          }
          if (text[i] === "&" && text[i + 1] === "#") {
            text.splice(i, 6, "\'");
          }
        }
        response.results[q].question = text.join("")
        console.log(response.results[q].question);

        // Inserting the answer radomly into the wrong answer list
        let randomNumber = Math.floor(Math.random() * 4);
        wrongAnswers.splice(randomNumber, 0, rightAnswer);

        // editing the options syntax
        for (let i = 0; i < wrongAnswers.length; i++) {
          let optionFix = wrongAnswers[i];
          optionFix = optionFix.split("");
          console.log("options " + optionFix);
          for (let z = 0; z < optionFix.length; z++) {
            if (optionFix[z] === "&" && optionFix[z + 1] === "q") {
              console.log("55555");
              optionFix.splice(z, 6, "\"");
            }
            if (optionFix[z] === "&" && optionFix[z + 1] === "#") {
              console.log("6666");
              optionFix.splice(z, 6, "\'");
            }
          }
          wrongAnswers[i] = optionFix.join("");
        }
      }
      // fixing options for True/False then putting each questions into an object to be pushed into the final array
      for (let y = 0; y < response.results.length; y++) {
        console.log(response.results[y].incorrect_answers[2]);
        if (response.results[y].incorrect_answers[2] === undefined) {
          response.results[y].incorrect_answers[2] = "";
        }
        if (response.results[y].incorrect_answers[3] === undefined) {
          response.results[y].incorrect_answers[3] = "";
        }
        let currentQuestion = {
          q: response.results[y].question,
          a: response.results[y].correct_answer,
          o: [response.results[y].incorrect_answers[0], response.results[y].incorrect_answers[1], response.results[y].incorrect_answers[2], response.results[y].incorrect_answers[3]]
        };
        questions.push(currentQuestion);
      }
      //  appending questions to HTML
      $("#demo").empty();
      console.log(questions);
      for (let i = 0; i < questions.length; i++) {
        console.log(i);
        let eleD = $("<div>");
        let eleQ = $("<p>");
        eleQ.html((i + 1) + ") " + questions[i].q + "<br>" + "<br>" + questions[i].o[0] + "<br>" + questions[i].o[1] + "<br>" + questions[i].o[2] + "<br>" + questions[i].o[3]);
        eleD.append(eleQ);
        $("#demo").append(eleD);
      }

      // Saving object to localStorage
      let json = JSON.stringify(questions);
      console.log(json);
      localStorage.setItem("questions", json);
    } else {
      $("#apiError").show();
      $("#apiError").text("Sorry! No more than 20. Delete to add more.");
      $("#apiError").hide(5000);

    }

  });
})


// delete button
$("#deleteButton").on("click", function () {
  let questions = localStorage.getItem("questions");
  questions = JSON.parse(questions);
  let deletePick = $("#deleteInput").val();
  deletePick = parseInt(deletePick);
  deletePick = deletePick - 1;
  if (deletePick <= questions.length && deletePick >= 0 && typeof deletePick === "number") {
    console.log("delete" + deletePick);
    questions.splice(deletePick, 1);
    json = JSON.stringify(questions);
    localStorage.setItem("questions", json);
    console.log(deletePick);
    $("#demo").empty();
    for (let i = 0; i < questions.length; i++) {
      let eleD = $("<div>");
      let eleQ = $("<p>");
      eleQ.html((i + 1) + ") " + questions[i].q + "<br>" + "<br>" + questions[i].o[0] + "<br>" + questions[i].o[1] + "<br>" + questions[i].o[2] + "<br>" + questions[i].o[3]);
      eleD.append(eleQ);
      $("#demo").append(eleD);
    }
  }

})

//  sort button
$(".sortB").on("click", function () {
  console.log(1);
  let questions = localStorage.getItem("questions");
  questions = JSON.parse(questions);
  let sort1 = $("#sort1").val();
  sort1 = parseInt(sort1);
  sort1 = sort1 - 1;
  let sort2 = $("#sort2").val();
  sort2 = parseInt(sort2);
  sort2 = sort2 - 1;
  if (questions[sort1] !== undefined && questions[sort2] !== undefined) {
    console.log(sort1);
    console.log(sort2);

    let temp = questions[sort1];
    questions[sort1] = questions[sort2];
    questions[sort2] = temp;
    json = JSON.stringify(questions);
    localStorage.setItem("questions", json);
    $("#demo").empty();
    for (let i = 0; i < questions.length; i++) {
      let eleD = $("<div>");
      let eleQ = $("<p>");
      eleQ.html((i + 1) + ") " + questions[i].q + "<br>" + "<br>" + questions[i].o[0] + "<br>" + questions[i].o[1] + "<br>" + questions[i].o[2] + "<br>" + questions[i].o[3]);
      eleD.append(eleQ);
      $("#demo").append(eleD);
    }

  }


});

// multiple choice button
$("#mButton").on("click", function () {
  console.log("coool");
  let currentQuestion;
  let questions = localStorage.getItem("questions");
  questions = JSON.parse(questions);
  if (questions === null) {
    questions = [];
  }
  let mQuestion = $("#mQuestion").val();
  console.log(mQuestion);
  let mAnswer = $("#mAnswer").val();
  let mOption1 = $("#mOption1").val();
  let mOption2 = $("#mOption2").val();
  let mOption3 = $("#mOption3").val();
  let mOption4 = $("#mOption4").val();
  if (mQuestion !== "" && mAnswer !== "" && mOption1 !== "" && mOption2 !== "" && mOption3 !== "" && mOption4 !== "") {
    if ((mAnswer === mOption1) || (mAnswer === mOption2) || (mAnswer === mOption3) || (mAnswer === mOption4)) {
      if (questions.length < 20) {
        currentQuestion = {
          q: mQuestion,
          a: mAnswer,
          o: [mOption1, mOption2, mOption3, mOption4]

        }
        questions.push(currentQuestion);
        json = JSON.stringify(questions);
        localStorage.setItem("questions", json);
        $("#demo").empty();
        for (let i = 0; i < questions.length; i++) {
          let eleD = $("<div>");
          let eleQ = $("<p>");
          eleQ.html((i + 1) + ") " + questions[i].q + "<br>" + "<br>" + questions[i].o[0] + "<br>" + questions[i].o[1] + "<br>" + questions[i].o[2] + "<br>" + questions[i].o[3]);
          eleD.append(eleQ);
          $("#demo").append(eleD);
        }
      } else {
        $("#multipleError").show();
        $("#multipleError").text("Sorry! No more than 20. Delete to add more.");
        $("#multipleError").hide(5000);
      }
    } else {
      $("#multipleError").show();
      $("#multipleError").text("Please match answer to an option.");
      $("#multipleError").hide(5000);
    }
  } else {
    $("#multipleError").show();
    $("#multipleError").text("A value can not be left blank.");
    $("#multipleError").hide(5000);
  }

});

// boolean button
$("#bButton").on("click", function () {
  console.log("bButton");
  let currentQuestion;
  let questions = localStorage.getItem("questions");
  questions = JSON.parse(questions);
  if (questions === null) {
    questions = [];
  }
  let bQuestion = $("#bQuestion").val();
  console.log(bQuestion);
  let bAnswer = $("#bAnswer").val();
  console.log(bAnswer);
  if (bQuestion !== "" && bAnswer !== "") {
    console.log("got it");
    if (bAnswer.toUpperCase() == "TRUE" || bAnswer.toUpperCase() == "FALSE") {
      console.log("done");
      if (questions.length < 20) {
        currentQuestion = {
          q: bQuestion,
          a: bAnswer,
          o: ["True", "False", "", ""]

        }
        questions.push(currentQuestion);
        json = JSON.stringify(questions);
        localStorage.setItem("questions", json);
        $("#demo").empty();
        for (let i = 0; i < questions.length; i++) {
          let eleD = $("<div>");
          let eleQ = $("<p>");
          eleQ.html((i + 1) + ") " + questions[i].q + "<br>" + "<br>" + questions[i].o[0] + "<br>" + questions[i].o[1] + "<br>" + questions[i].o[2] + "<br>" + questions[i].o[3]);
          eleD.append(eleQ);
          $("#demo").append(eleD);
        }
      } else {
        $("#booleanError").show();
        $("#booleanError").text("Sorry! No more than 20. Delete to add more.");
        $("#booleanError").hide(5000);
      }

    } else {
      $("#booleanError").show();
      $("#booleanError").text("Sorry! Anwer must be True or False.");
      $("#booleanError").hide(5000);
    }
  }

});

$("#mClear").on("click", function () {
  $("#mQuestion").val("");
  $("#mAnswer").val("");
  $("#mOption1").val("");
  $("#mOption2").val("");
  $("#mOption3").val("");
  $("#mOption4").val("");
});

let lastPassword = localStorage.getItem("lastPassword");
lastPassword = JSON.parse(lastPassword);
if (lastPassword === null) {
  lastPassword = [];
}
let a = 0;
$("#next").on("click", function () {
  let x = $("#pword").val();
  console.log(x);
  let questions = localStorage.getItem("questions");
  questions = JSON.parse(questions);
  console.log(questions.length);
  if (x.length > 3 && a > 0 && questions.length > 0) {
    console.log(lastPassword);
    let len = lastPassword.length;
    lastPassword[len] = x;
    json = JSON.stringify(lastPassword);
    localStorage.setItem("lastPassword", json);
    questions = localStorage.getItem("questions")
    questions = JSON.parse(questions);
    json = JSON.stringify(questions);
    localStorage.setItem(x, json);
    window.location.href = "./print.html";
  }else if (a === 0) {
    $("#lastCheck").show();
    $("#lastCheck").text("Once you submit, no more edits");
    $("#lastCheck").hide(5000);
    a++;
  } else {
    $("#lastCheck").show();
    $("#lastCheck").text("Length must be at least 4 chars and at least one question.");
    $("#lastCheck").hide(5000);
  }

})

$("#bClear").on("click", function () {
  $("#bQuestion").val("");
  $("#bAnswer").val("");
});

$("#apiClear").on("click", function () {
  $("#apiNumber").val("");
  $("#apiCategory").val("");
  $("#apiDifficulty").val("");
  $("#apiType").val("");
});