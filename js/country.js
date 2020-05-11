$(document).ready(function() {
    var country = localStorage.getItem("country");

    console.log(typeof(country))
    if (country == "") {
        country = "egypt";
    }

    console.log(country)

    // Set header image
    document.getElementById("main").style.backgroundImage = `url("img/${country}.jpg")`;


    $(document).on("click", function(event) {
        // Catches see more clicks and hides see more button
        if (event.target.innerHTML === "See More") {
            $(event.target).hide();
        }

        var text = event.target.textContent;
        var id = event.target.id;
        localStorage.setItem("country", id);

        localStorage.setItem("sight", text);

        console.log(id);
        //  console.log(text);

    });

    for (let i = 0; i < data[country].length; ++i) {

        $("#nav-up").append(`<li class="nav-item">
            <a class="nav-link " href="#${i}" style="font-weight:bold; font-size:100%; ">${data[country][i]["title"]}</a> </li>`)

    }

    $(".countryName").html(data[country][0]["country"]);

    for (let i = 0; i < data[country].length; ++i) {
        $("#Append").append(`
            <div class="card border-dark mb-3" id="${[i]}" style="max-width:100%; margin: 5px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src= ${data[country][i]["img"]} class="card-img" alt="Photo Of Egyptian Museum" style="width: min-width; height: min-content;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div expanded="true" aria-labelledby="heading1" data-parent="#accordion">
                                <div id="accordion">
                                    <div class="card">
                                        <div class="card-header" id="heading1">
                                            <h4 class="card-title" style="font-weight:bold; color:blue" data-toggle="tooltip" data-placement="top" title="Visit Page For More Info"><a id=${data[country][0]["country"]} href="sight.html" class="card-link">${data[country][i]["title"]}</a></h4>

                                            <p class="card-text">${data[country][i]["text"]}</p>
                                            <p class="collapse" id="collapse${i}"> Now the museum has more than 100,000 ancient objects inside its walls.<br> of the world's greatest historical mysteries. ... The Egyptians believed that if the pharaoh's body could be mummified after death the pharaoh
                                                would live forever.</p>

                                            <button class="btn" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">See More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `);
    }
    $('a.page-link#' + country).css({
        'background-color': 'black'
    });

})

// Check cookies
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
    //setCookie('name', 'Ahmad', 1);
    //setCookie('id', '7', 1);

    var cookie = getCookie('name')

    if (cookie != "none") {
        document.getElementById("LogoutButton").innerText = "Logout";
        document.getElementById("labelID").innerText = cookie.toString();

    } else {
        document.getElementById("LogoutButton").innerText = "Login";
        document.getElementById("labelID").innerText = "Welcome";
    }

}

function change_page() {
    window.location.href = "login.html";
}

var logoutButton = document.getElementById("LogoutButton");
logoutButton.onclick = function() {
    console.log("edeloo");
    var currentName = logoutButton.innerText;
    if (currentName == "Login") {
        change_page();
    } else {
        setCookie('id', '-1', 1);
        setCookie('name', 'none', 1);
        window.location.reload();
    }
}

var data = {
    "egypt": [{
        "img": "img/pyramids.jpg",
        "title": "Egyptian Pyramids",
        "text": "The Pyramids of Giza are the largest and most recognizable pyramid structures in the world. They were built to honor certain Pharaohs of the fourth ruling dynasty of Egypt during a period known as the Old Kingdom.                       The Old Kingdom was the first great era of Egyptian civilization and lasted from 2686 to 2181 BCEThe Pyramids of Giza are the largest and most recognizable pyramid structures in the world.They were built to ",
        "country": "egypt"
    }, {
        "img": "img/EgyptianMuseum.jpg",
        "title": "Egyptian Museum",
        "text": "The Egyptian museum in Cairo houses a great and enormous collection of artifacts, mummies, coffins, stones, ancient belongings, and even food types that used to be buried with the kings before death to use in the afterlife."
    }, {
        "img": "img/m3bdelkarnk.jpg",
        "title": "Karnak Temple",
        "text": "The importance of Karnak resided in its being the contact point between Amun, the supreme ruler of the universe, and the pharaoh, the supreme ruler on Earth who represented all Egyptian people.Ahmose I, a Thebanprince, thanked the god Amun for his victory by contributing to the temple at Karnak"
    }, {
        "img": "img/philaeTemple.jpg",
        "title": "Philae Temple",
        "text": "he oldest surviving temple buildings here date from the time of Nectanebo I (circa 370 BC) and the principal deity worshiped was Isis, although Osiris, Nephthys, Hathor, and the cataract gods Khnum and Satet were       also venerated "
    }, {
        "img": "img/elmlok.jpg",
        "title": "Valley Of the Kings",
        "text": "During Egypt's New Kingdom (1539-1075 B.C.), the valley became a royal burial ground for pharaohs such as Tutankhamun, Seti I, and Ramses II, as well as queens, high priests,and other elites of the 18th, 19th, and   20th dynasties.The tombs evidence elaborate preparations for the next world, in which humans were promised continuing life and pharaohs were expected to becom one with the gods. Mummification was used to preserve   the body so that the deceased's eternal soul would be able to reanimate it in the afterlife< "
    }],
    "france": [{
        "img": "img/Paris.jpeg",
        "title": "Eiffel Tower",
        "text": "The Pyramids of Giza are the largest and most recognizable pyramid structures in the world. They were built to honor certain Pharaohs of the fourth ruling dynasty of Egypt during a period known as the Old Kingdom.                       The Old Kingdom was the first great era of Egyptian civilization and lasted from 2686 to 2181 BCEThe Pyramids of Giza are the largest and most recognizable pyramid structures in the world.They were built to ",
        "country": "france"
    }, {
        "img": "img/louvre1.jpg",
        "title": "Louvre Museum",
        "text": "The Louvre, or the Louvre Museum, is the world's largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city's 1st arrondissement. Wikipedia"
    }, {
        "img": "img/notredam1.jpeg",
        "title": "Cathédrale Notre-Dame de Paris",
        "text": "Notre-Dame de Paris, referred to simply as Notre-Dame, is a medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral was consecrated to the Virgin Mary and considered to be one of the finest examples of French Gothic architecture. Wikipedia"
    }],
    "spain": [{
        "img": "img/spainn.jpg",
        "title": "La Sagrada Familia",
        "text": "The Basílica de la Sagrada Família, also known as the Sagrada Família, is a large unfinished Roman Catholic minor basilica in Barcelona, Catalonia, Spain. Designed by Spanish/Catalan architect Antoni Gaudí, his work on the building is part of a UNESCO World Heritage Site. Wikipedia",
        "country": "spain"
    }, {
        "img": "img/santiagobernabeu.jpg",
        "title": "Santiago Bernabeu",
        "text": "The Santiago Bernabéu Stadium is a football stadium in Madrid, Spain. With a current seating capacity of 81,044, it has been the home stadium of Real Madrid since its completion in 1947. It is the 2nd-largest stadium in Spain and the largest in the Community of Madrid. Wikipedia"
    }, ],
    "russuia": [{
        "img": "img/RedSquare.jpg",
        "title": "Red Square",
        "text": "Red Square is a city square in Moscow, Russia. It separates the Kremlin, the former royal citadel and now the official residence of the President of Russia, from a historic merchant quarter known as Kitai-gorod. Red Square is often considered to be the central square of Moscow since the city's major streets, which connect to Russia's major highways, originate in the square. Wikipedia",
        "country": "russia"
    }, {
        "img": "img/St.Basil'sCathedral.jpg",
        "title": "St. Basil's Cathedral",
        "text": "The Cathedral of Vasily the Blessed, commonly known as Saint Basil's Cathedral, is a Christian church in Red Square in Moscow, Russia and is regarded as a cultural symbol of the country. The building, now a museum, is officially known as the Cathedral of the Intercession of the Most Holy Theotokos on the Moat or Pokrovsky Cathedral. It was built from 1555 to 1561 on orders from Ivan the Terrible and commemorates the capture of Kazan and Astrakhan. It was the city's tallest building until the completion of the Ivan the Great Bell Tower in 1600. The original building, known as Trinity Church and later Trinity Cathedral, contained eight churches arranged around a ninth, central church of Intercession; a tenth church was erected in 1588 over the grave of venerated local saint Vasily. In the 16th and 17th centuries, the church, perceived as the earthly symbol of the Heavenly City, was popularly known as the 'Jerusalem' and served as an allegory of the Jerusalem Temple in the annual Palm Sunday parade attended by the Patriarch of Moscow and the Tsar. The building is shaped like the flame of a bonfire rising into the sky, a design that has no parallel in Russian architecture. Wikipedia"
    }, {
        "img": "img/StateHermitageMuseum.jpg",
        "title": "State Hermitage Museum",
        "text": "a major art museum in St. Petersburg, Russia, containing among its collections those begun by Catherine the Great"
    }],
    "rome": [{
        "img": "img/Rome.jpg",
        "title": "Colosseum",
        "text": "The Colosseum or Coliseum, also known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy. Built of travertine limestone, tuff, and brick-faced concrete, it was the largest amphitheatre ever built at the time and held 50,000 to 80,000 spectators. Wikipedia",
        "country": "rome"
    }, {
        "img": "img/St._Peters_Basil_588cea2887d77.jpg",
        "title": "St. Peter's Basilica",
        "text": "The Papal Basilica of Saint Peter in the Vatican, or simply Saint Peter's Basilica, is a church built in the Renaissance style located in Vatican City, the papal enclave which is within the city of Rome. Wikipedia"
    }],
    "germany": [{
        "img": "img/Rome.jpg",
        "title": "Neuschwanstein Castle",
        "text": "Neuschwanstein Castle is a 19th-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau near Füssen in southwest Bavaria, Germany. The palace was commissioned by Ludwig II of Bavaria as a retreat and in honour of Richard Wagner. Ludwig paid for the palace out of his personal fortune and by means of extensive borrowing, rather than Bavarian public funds. The castle was intended as a home for the king, until he died in 1886. It was open to the public shortly after his death. Since then more than 61 million people have visited Neuschwanstein Castle. More than 1.3 million people visit annually, with as many as 6,000 per day.",
        "country": "germany"
    }, ],
}
