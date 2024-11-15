document.getElementById("comment-bttn").addEventListener("click", function () {
    const commentsection = document.getElementById("comment-section");
    commentsection.classList.add("active");
});

document.querySelector(".cross").addEventListener("click", function () {
    const commentsection = document.getElementById("comment-section");
    commentsection.classList.remove("active");
});

function autoResize(textarea) {
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = textarea.scrollHeight + "px";
}

// Reload the comments from local storage when the page loads
window.addEventListener("load", function () {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || []; // Check for comments in local storage
    savedComments.reverse();
    console.log(savedComments)
    savedComments.forEach((comment) => {
        console.log(comment)
        addCommentToList(comment.name, comment.comment, comment.timeStamp); // Add each saved comment to the list
    });
});

// Handle the submission of a new comment
document.getElementById("comment-section").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the page from reloading on form submission

    const name = document.getElementById("name").value; // Get the name input
    const comment = document.getElementById("comment").value; // Get the comment input
    const timeStamp = new Date().toLocaleString(); // Generate a timestamp

    addCommentToList(name, comment, timeStamp); // Display the new comment
    saveCommentToLocalStorage(name, comment, timeStamp); // Save the new comment to local storage

    document.getElementById("name").value = ""; // Clear the name input
    document.getElementById("comment").value = ""; // Clear the comment input
});

// Add a comment to the comment list in the UI
function addCommentToList(name, comment, timeStamp) {
    const commentsList = document.getElementById("commentsList");
    const commentItem = document.createElement("li");
    console.log(name);
    commentItem.innerHTML = `
        <strong>${name}</strong> <i>${timeStamp}</i>:<br>
        ${comment}
    `;
    commentsList.appendChild(commentItem);
}

// Save a comment to local storage
function saveCommentToLocalStorage(name, comment, timeStamp) {
    const newComment = { name, comment, timeStamp };
    let comments = JSON.parse(localStorage.getItem("comments")) || []; // Get existing comments or initialize a new array
    comments.push(newComment); // Add the new comment to the array
    localStorage.setItem("comments", JSON.stringify(comments)); // Save the updated array to local storage
}

// Simulating AJAX-like local loading
function fetchComments() {
    // Simulate fetching from a server (in this case, local storage)
    return new Promise((resolve) => {
        setTimeout(() => {
            const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
            resolve(savedComments);
        }, 500); // Simulating a 500ms delay for AJAX
    });
}

// Load comments using "AJAX" (local storage fetch)
function loadCommentsWithAJAX() {
    fetchComments().then((comments) => {
        document.getElementById("commentsList").innerHTML = ""; // Clear existing comments
        console.log("kiru")
        comments.reverse()
        console.log(comments)
        comments.forEach((comment) => {
            addCommentToList(comment.name, comment.comment, comment.timeStamp);
        });
    });
}

// Trigger the AJAX-like loading on page load
window.addEventListener("load", loadCommentsWithAJAX);

