var data = {
    "Eiffel Tower": {
        "images": [
            "Eiffel Tower1.jpg",
            "Eiffel Tower2.jpg",
            "Eiffel Tower3.jpg",
            "Eiffel Tower4.jpg"
        ],
        "text": "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Wikipedia"
    },
    "Louvre Museum": {
        "images": [
            "louvre1.jpg",
            "louvre2.jpg",
            "louvre3.jpeg",
            "louvre4.jpeg"
        ],
        "text": "The Louvre, or the Louvre Museum, is the world's largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement. Wikipedia"
    },
    "Cathédrale Notre-Dame de Paris": {
        "images": [
            "notredam1.jpeg",
            "notredam2.jpeg",
            "notredam3.jpeg",
            "notredam4.jpeg",
        ],
        "text": "Notre-Dame de Paris, referred to simply as Notre-Dame, is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral was consecrated to the Virgin Mary and considered to be one of the finest examples of French Gothic architecture. Wikipedia"
    },
    "Egyptian Pyramids": {
        "images": [
            "pyramids5.jpg",
            "pyramids1.jpeg",
            "pyramids2.jpeg",
            "pyramids3.jpeg"
        ],
        "text": "The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact. Wikipedia"
    },
    "Egyptian Museum": {
        "images": [
            "egyptianmus1.jpeg",
            "egyptianmus5.jpeg",
            "egyptianmus2.jpg",
            "egyptianmus3.jpg",
        ],
        "text": "The Museum of Egyptian Antiquities, known commonly as the Egyptian Museum or Museum of Cairo, in Cairo, Egypt, is home to an extensive collection of ancient Egyptian antiquities. It has 120,000 items, with a representative amount on display, the remainder in storerooms. Wikipedia"
    }
}

function heartFlip(check) {
    var className = $("#heartIcon").attr("class");
    var likes = parseInt($("#likesCounter").html());
    if (className === "far fa-heart"){
        $("#heartIcon").attr("class", "fa fa-heart");
        if (!check){
            $("#likesCounter").html(likes + 1);
        }
        return "inc"

    } else {
        $("#heartIcon").attr("class", "far fa-heart");
        if (!check){
            $("#likesCounter").html(likes - 1);
        }
        return "dec"
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
    });

    var sight = localStorage.getItem("sight");
    var country = localStorage.getItem("country");
    country[0] = country[0] + 32;
    fillPage(sight, country);
    

    $("#feedbackSection").on("click", "button", function() {
        $("#feedbackMessage").toggle();
    });

    $("#submitReviewBtn").on("click", function() {
        if (!allow_access()) {
            alert("Please Login to be able to add review on the sight..");
            return ;
        }
        const userName = getCookie('name') ;
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