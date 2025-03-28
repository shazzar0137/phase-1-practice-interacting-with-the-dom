document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let minusBtn = document.getElementById("minus");
    let plusBtn = document.getElementById("plus");
    let heartBtn = document.getElementById("heart");
    let pauseBtn = document.getElementById("pause");
    let likesList = document.querySelector(".likes");
    let commentForm = document.getElementById("comment-form");
    let commentInput = document.getElementById("comment-input");
    let commentList = document.getElementById("list");
    let count = 0;
    let isPaused = false;
    let likeCounts = {};

    // Function to update counter display
    function updateCounter() {
        counter.textContent = count;
    }

    // Timer function
    let timer = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }, 1000);

    // Plus button functionality
    plusBtn.addEventListener("click", () => {
        count++;
        updateCounter();
    });

    // Minus button functionality
    minusBtn.addEventListener("click", () => {
        count--;
        updateCounter();
    });

    // Like button functionality
    heartBtn.addEventListener("click", () => {
        if (!likeCounts[count]) {
            likeCounts[count] = 1;
        } else {
            likeCounts[count]++;
        }

        let existingLike = document.getElementById(`like-${count}`);
        if (existingLike) {
            existingLike.textContent = `${count} has been liked ${likeCounts[count]} times`;
        } else {
            let likeItem = document.createElement("li");
            likeItem.id = `like-${count}`;
            likeItem.textContent = `${count} has been liked 1 time`;
            likesList.appendChild(likeItem);
        }
    });

    // Pause/Resume button functionality
    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timer);
            pauseBtn.textContent = "resume";
            plusBtn.disabled = true;
            minusBtn.disabled = true;
            heartBtn.disabled = true;
        } else {
            timer = setInterval(() => {
                count++;
                updateCounter();
            }, 1000);
            pauseBtn.textContent = "pause";
            plusBtn.disabled = false;
            minusBtn.disabled = false;
            heartBtn.disabled = false;
        }
    });

    // Comment submission functionality
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let commentText = commentInput.value.trim();
        if (commentText !== "") {
            let commentItem = document.createElement("p");
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
            commentInput.value = "";
        }
    });
});
