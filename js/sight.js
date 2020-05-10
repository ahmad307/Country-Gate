$(document).ready(function() {
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
            <div class="media col-xl-10">
                <div class="media-left featured-text">
                    <img src="img/person.png" class="media-object">
                </div>
                <div class="media-body">
                    <h5>${userName}</h5>
                    <p class="text-black-50 mb-3">
                        ${userReview}
                    </p>
                </div>
            </div>
        `);

        // Close modal and clean input field
        $("#userReview").val("");
        $("#closeModalBtn").click();
    });
});

function heartFlip(check) {
    var className = $("#heartIcon").attr("class");
    var likes = parseInt($("#likesCounter").html());
    if (className === "far fa-heart"){
        $("#heartIcon").attr("class", "fa fa-heart");
        if (!check){
            $("#likesCounter").html(likes + 1);
        }
        return "inc";
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
    console.log(country);
    $(".sightName").html(sight);
    $("#sightDescription").html(data[sight]["text"]);
    $(".header").css("background", `linear-gradient(to bottom, rgba(22, 22, 22, 0.1) 50%,rgba(22, 22, 22, 0.5) 75%, #161616 100%),`
     + `url("./img/${data[sight]['images'][0]}")`);

    $("#sightImage1").attr("src", "./img/" + data[sight]["images"][1]);
    $("#sightImage2").attr("src", "./img/" + data[sight]["images"][2]);
    $("#sightImage3").attr("src", "./img/" + data[sight]["images"][3]);
}

// Registration and cookie managmenet

var logoutButton = document.getElementById("logoutButton");
logoutButton.onclick = function () {
    var currentName = logoutButton.innerText;
    if (currentName == "Login") {
        change_page();
    }
    else {
        setCookie('id', '-1', 1);
        setCookie('name', 'none', 1);
        window.location.reload();
    }
}

async function get_likes(sight_name) {
    const res = await fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: sight_name,
        })
    })
    const data = await res.json()
    document.getElementById("likesCounter").innerText = data['count'].toString();
}

async function checkLikes(sightName, userID) {
    const res = await fetch("http://localhost:3000/check_likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: sightName,
            id: userID,
        })
    })
    const data = await res.json()
    console.log("data", data)
    if (data['reacted'] == true){
        heartFlip(true);
        
    }
    
}

async function add_likes(sight_name, user_id) {
    const res = await fetch("http://localhost:3000/add_likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: sight_name,
            id: user_id,
        })
    })
    const data = await res.json()

}

async function deleteLikes(sight_name, user_id) {
    const res = await fetch("http://localhost:3000/delete_likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: sight_name,
            id: user_id,
        })
    })
    const data = await res.json()

}

function setCookie(name, value, daysToLive) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);

    if (typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);

        document.cookie = cookie;
    }
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");

        if (x == c_name) {
            return unescape(y);
        }
    }
    return "none"
}

function checkCookies() {
    var cookie = getCookie('name')
    var userID = getCookie('id')
    get_likes(localStorage.getItem("sight"));

    if (cookie != "none") {
        document.getElementById("logoutButton").innerText = "Logout";
        document.getElementById("userSalutation").innerText = cookie.toString();

    } 
    else {
        document.getElementById("logoutButton").innerText = "Login";
        document.getElementById("userSalutation").innerText = "Welcome";
    }
    //check if user already reacted on this sight before 
    if (userID != -1){
        checkLikes(localStorage.getItem("sight"), userID)   
    }

}

function change_page() {
    window.location.href = "login.html";
}

function allow_access() {
    var cookie = getCookie('id');
    console.log("ress",cookie)
    if (cookie == -1 || cookie == "none" ) {
        return false;
    }
    else {
        return true;
    }
}

function heartFlip_handler() {
    if (!allow_access()) {
        alert("Please Login to be able to react on the sight..");
    }
    else {
        res = heartFlip();
        console.log("res",res)
        //update database with current number..
        if (res == "inc"){
            add_likes(localStorage.getItem("sight"), getCookie('id'));
        }
        else {
            deleteLikes(localStorage.getItem("sight"), getCookie('id'));
        }
    }
}

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