$(document).ready(function () {
    console.log("document is ready");
    $("#myModal").modal('show');

    // Modal calling
    $(window).on('load ', function () {
        $('#WelcomeModal ').modal('show ');
    });

    $(".col-sm-6 col-md-4 col-lg-3").hover(
        function () {
            $(this).addClass('shadow-lg ').css('cursor ', 'pointer ');
        }, function () {
            $(this).removeClass('shadow-lg ');
        }
    );

    $(document).on("click", function (event) {
        var text = event.target.textContent;
        var id = event.target.id;
        console.log(id);

        localStorage.setItem("country", id);
    });

    $('[data-toggle="popover"]').popover({
        placement: 'bottom',
        trigger: 'hover'
    });
});

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
    var text = "to Country gate";
    if (cookie != "none") {
        text = "Welcome back " + cookie.toString() + " :) " + text;
        document.getElementById("logoutButton").innerText = "Logout";
        document.getElementById("userSalutation").innerText = cookie.toString();
        //alert("By continuing to browser, you agree to the storing of cookies on your device to enhance your site experience.");

    } else {
        text = "Welcome to Country gate";
        document.getElementById("logoutButton").innerText = "Login";
        document.getElementById("userSalutation").innerText = "Welcome";

    }
    document.getElementById("Welcome").innerHTML = text;
}

function change_page() {
    window.location.href = "login.html";
}

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

var closeButton = document.getElementById("closeButton");
closeButton.onclick = function () {
    var cookie = getCookie('name');
    console.log(cookie)
    if (cookie != "none") {
        alert("By continuing to browser, you agree to the storing of cookies on your device to enhance your site experience.");
    }
}
