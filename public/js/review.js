//toggleEdit(review)
function toggleEdit(reviewId) {
    const displayDiv = document.getElementById(`review-display-${reviewId}`);
    const editDiv = document.getElementById(`review-edit-${reviewId}`);

    if (displayDiv.style.display === "none") {
        displayDiv.style.display = "block";
        editDiv.style.display = "none";
    } else {
        displayDiv.style.display = "none";
        editDiv.style.display = "block";
    }
}

//show more btn
const showMoreBtn = document.getElementById("show-more-btn");
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
        const hiddenReviews = document.querySelectorAll(".review-item.d-none");

        if (hiddenReviews.length > 0) {
            hiddenReviews.forEach(review => review.classList.remove("d-none"));
            this.innerText = "Show Less";
        } else {
            const allReviews = document.querySelectorAll(".review-item");
            allReviews.forEach((review, index) => {
                if (index >= 3) {
                    review.classList.add("d-none");
                }
            });
            this.innerText = "Show More";
        }
    });
}
