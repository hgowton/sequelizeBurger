//Attaches handlers after the DOM has fully loaded
$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var updateDevour = !$(this).data("newdevour");
 
        var newDevouredState = {
            devoured : updateDevour
        };

        //Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
                console.log("changed devoured to" , updateDevour);
                //Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        //Make sure to prevent Default on a submit event
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burg").val().trim(),
            devoured: 0
        };

        //Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("ordered new burger");
                //Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".cancel-burger").on("click", function(event) {
        var id = $(this).data("id");

        //Send the DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("cancelled burger", id);
                //Reload the page to get the updated list
                location.reload();
            }
        );
    });
});