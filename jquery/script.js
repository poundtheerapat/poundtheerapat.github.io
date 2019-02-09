$(document).ready(function () {
    var foods = [];
    var tempFoods = [];
    $.ajax({
        url: "food.json",
        dataType: "json"
    }).done(function (response) {
        response.forEach(element => {
            var word = "";
            var food = {
                id: element.id,
                name: element.name,
                energyPer100g: element.energyPer100g,
                tags: element.tags,
            };
            foods.push(food);
            var word = "<tr class=\"table-info\"><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.energyPer100g + "</td><td>" +
            element.tags + "</td><tr>";
            $("#tableBody").append(word);
        });

    });
    $("#advanceSearchButton").click(function () {
        $("#input").val("");
        $("#advanceSearch").show();
        $("#simpleSearch").hide();
    });
    $("#simpleSearchButton").click(function () {
        $("#simpleSearch").show();
        $("#advanceSearch").hide();
    });
    $("#searchButton").click(function () {
        setHeadTable();
        tempFoods = [];
        if ($("#inputAll").val() != "" ) {
            console.log("hello")
            foods.forEach(element => {
                $.each(element, function (i, val) {
                    if ((val.toLowerCase()).includes($("#inputAll").val().toLowerCase())) {
                        console.log("hello2")
                        tempFoods.push(element);
                        return false;
                    }
                });
            });
            setTable(tempFoods);
        }
        else {
            setTable(foods);
        }
    });
    $("#resetButton").click(function () {
        setHeadTable();
        tempFoods = [];
        setTable(tempFoods);
        setTable(foods);
        $("#ID").val("");
        $("#Name").val("");
        $("#minEnergy").val("");
        $("#maxEnergy").val("");
    });

    $("#searchAdvanceStyleButton").click(function () {
        if(!$.isNumeric($("#minEnergy").val()) || !$.isNumeric($("#maxEnergy").val()) ){
            alert("Please Enter a number in Energy range")
        }
        if (($("#ID").val() == "") ||($("#Name").val() == "")) {
            alert("Please Enter a characters to search By ID or Name")
        }
        else{
            tempFoods = [];
            setHeadTable();
            foods.forEach(element => {
                console.log("hello2")
                if (!(element.id.toLowerCase()).includes($("#ID").val().toLowerCase())) {
                    if ($("#ID").val().toLowerCase() != "") {
                        return;
                    }
                }
                if (!(element.name.toLowerCase()).includes($("#Name").val().toLowerCase())) {
                    if ($("#Name").val().toLowerCase() != "") {
                        return;
                    }
                }
                if (parseInt($("#minEnergy").val())>parseInt($("#maxEnergy").val())) {
                    var minE = parseInt($("#maxEnergy").val());
                    var maxE = parseInt($("#minEnergy").val());
                } else {
                    var minE = parseInt($("#minEnergy").val());
                    var maxE = parseInt($("#maxEnergy").val());
                }
                if (!(minE <= parseInt(element.energyPer100g) && parseInt(element.energyPer100g) <= maxE)) {
                    return;
                }
                if (!element.tags.toLowerCase().includes($("select#tagsSelector").find(":selected").val())) {
                    if ($("select#tagsSelector").find(":selected").val() != "all") {
                        return;
                    }
                }
                tempFoods.push(element);
            });
            setTable(tempFoods);
        }
    });
});
function setTable(array) {
    array.forEach(element => {
        var wordTable = "<tr class=\"table-info\"><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.energyPer100g + "</td><td>" + element.tags + "</td><tr>";
        $("#tableBody").append(wordTable);
    });

}
function setHeadTable() {
    $("#tableBody").empty();
    $("#tableBody").append("<tr><th>ID</th><th>Name</th><th>Energy per 100g</th><th>Tags</th></tr>");
}