let questions;
$("#cSubmit").on("click", function () {
    let code = $("#code").val();
    questions = code;
    questions = localStorage.getItem(questions);
    questions = JSON.parse(questions);
    if (questions !== null) {
        console.log(questions);
        $("ol").empty();
        $("#printOption").html("Print Options: " + "<span style=\"color:green\">" + code + "</span>");
    } else {
        $("ol").empty();
        $("#printOption").text("Print Options: ");
        $("#error").show()
        $("#error").text("Code not found");
        $("#error").hide(4000);
    }
})


$("#qSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].q);
        console.log(questions[0].o[0]);
        $("ol").empty();
        let liNum = 1;
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.addClass("left-align");
            if (questions[i].o[2] === "") {
                eleLi.html(liNum + ") " + questions[i].q + "<br>" + "<br>" + "a) " + questions[i].o[0] + "<br>" + "b) " + questions[i].o[1] + "<br>");
            } else {
                eleLi.html(liNum + ") " + questions[i].q + "<br>" + "<br>" + "a) " + questions[i].o[0] + "<br>" + "b) " + questions[i].o[1] + "<br>" + "c) " + questions[i].o[2] + "<br>" + "d) " + questions[i].o[3]);
            }
            liNum++;
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("nav").hide();
        $("#top").hide();
        let print = setTimeout(function () {
            window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show();
            $("nav").show();
        }, 5000);
    }

});

$("#aSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].a);
        $("ol").empty();
        let liNum = 1;
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.addClass("left-align");
            eleLi.html(liNum + ") " + questions[i].a);
            liNum++;
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("nav").hide();
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("nav").show();
            $("#top").show();
        }, 5000);
    }


});

$("#oSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].o[0]);
        $("ol").empty();
        let liNum = 1;
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.addClass("left-align");
            eleLi.html(liNum + ") " + questions[i].q);
            liNum++;
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("nav").hide();
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show();
            $("nav").show();
        }, 5000);
    }


});

$("#lSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].o[0]);
        let myArray = [];
        let len = myArray.length;
        for (let i = 0; i < questions.length; i++) {
            for (let z = 0; z < questions[i].o.length; z++)
                if (questions[i].a === questions[i].o[z]) {
                    let letter = z;
                    if (letter === 0) {
                        letter = "a";
                    } else if (letter === 1) {
                        letter = "b";
                    } else if (letter === 2) {
                        letter = "c";
                    } else {
                        letter = "d";
                    }
                    myArray.push(letter);
                }
        }
        $("ol").empty();
        let liNum = 1;
        for (let i = 0; i < questions.length; i++) {
            console.log(myArray[i]);
            let eleLi = $("<li>");
            eleLi.addClass("left-align");
            eleLi.html(liNum + ") " + myArray[i]);
            liNum++;
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("nav").hide();
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show()
            $("nav").show();
        }, 5000);
    }


});

$("#titleButton").on("click", function () {
    let text = $("#titleVal").val();
    console.log(text);
    $("#listTitle").text(text);
})