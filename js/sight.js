var data = {
    "Eiffel Tower": {
        "images": [
            "Eiffel Tower1.jpg",
            "Eiffel Tower2.jpg",
            "Eiffel Tower3.jpg",
            "Eiffel Tower4.jpg"
        ],
        "text": "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Wikipedia"
    }
}

function heartFlip() {
    var className = $("#heartIcon").attr("class");
    if (className === "far fa-heart"){
        $("#heartIcon").attr("class", "fa fa-heart");
    } else {
        $("#heartIcon").attr("class", "far fa-heart");
    }
}

function fillPage(sight, country) {
    $("#cityName").html(country);

    $(".sightName").html(sight);
    $("#sightDescription").html(data[sight]["text"]);
    $(".header").css("background", `linear-gradient(to bottom, rgba(22, 22, 22, 0.1) 50%,rgba(22, 22, 22, 0.5) 75%, #161616 100%),`
     + `url("./img/${data[sight]['images'][0]}")`);
    // $(".header").css("background-image", 'url("./img/Eiffel Tower1.jpg")');

    $("#sightImage1").attr("src", "./img/" + data[sight]["images"][1]);
    $("#sightImage2").attr("src", "./img/" + data[sight]["images"][2]);
    $("#sightImage3").attr("src", "./img/" + data[sight]["images"][3]);
}

$(document).ready(function() {
    $(document).on("click", function(event) {
        var text = event.target.textContent;
        var type = event.target.nodeName;
        // console.log(text, type);
    });

    localStorage.setItem("sight", "Eiffel Tower");
    localStorage.setItem("country", "France");
    var sight = localStorage.getItem("sight");
    var country = localStorage.getItem("country");
    fillPage(sight, country);
    

    $("#feedbackSection").on("click", "button", function() {
        $("#feedbackMessage").toggle();
    });

    $("#submitReviewBtn").on("click", function() {
        const userName = "Ahmad Hussain";
        const userReview = $("#userReview").val();

        if (userReview == "") {
            window.alert("Kindly insert a valid review.")
            return;
        }
        
        $("#reviews").append(`
            <div class="col-xl-10 col-lg-5">
                <div class="featured-text text-center text-lg-left">
                    <h5>${userName}</h5>
                    <p class="text-black-50 mb-0">
                        ${userReview}
                    </p>
                </div>
            </div>`
        );

        // Close modal and clean input field
        $("#userReview").val("");
        $("#closeModalBtn").click();
    });
});