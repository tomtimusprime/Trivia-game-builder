let questions;
$("#cSubmit").on("click", function () {
    let code = $("#code").val();
    questions = code;
    questions = localStorage.getItem(questions);
    questions = JSON.parse(questions);
    if (questions !== null) {
        console.log(questions);
        $("ol").empty();
        $("#printOption").html("Print Options: " + "<span style=\"color:green\">"+ code + "</span>");
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
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.html(questions[i].q + "<br>" + "<br>" + "a) " + questions[i].o[0] + "<br>" + "b) " + questions[i].o[1] + "<br>" + "c) " + questions[i].o[2] + "<br>" + "d) " + questions[i].o[3]);
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("#top").hide();
        let print = setTimeout(function () {
            window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show()
        }, 5000);
    }

});

$("#aSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].a);
        $("ol").empty();
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.html(questions[i].a);
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show()
        }, 5000);
    }


});

$("#oSubmit").on("click", function () {
    if (questions !== null && questions !== undefined) {
        console.log(questions);
        console.log(questions[0].o[0]);
        $("ol").empty();
        for (let i = 0; i < questions.length; i++) {
            console.log(i);
            let eleLi = $("<li>");
            eleLi.html(questions[i].q);
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show()
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
        for (let i = 0; i < questions.length; i++) {
            console.log(myArray[i]);
            let eleLi = $("<li>");
            eleLi.html(myArray[i]);
            $("ol").append(eleLi);
            let eleBr = $("<br>")
            $("ol").append(eleBr);
        }
        $("#top").hide();
        let print = setTimeout(function () {
            // window.print();
        }, 1000);
        let bringBack = setTimeout(function () {
            $("#top").show()
        }, 5000);
    }

});