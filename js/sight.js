$(document).ready(function() {
    $("#feedbackSection").on("click", "button", function() {
        console.log("Asfas");
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