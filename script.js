document.getElementById("comment-bttn").addEventListener("click",function(){
    const commentsection  = document.getElementById("comment-section");
    commentsection.classList.add("active");
});
document.querySelector(".cross").addEventListener("click",function(){
    const commentsection  = document.getElementById("comment-section");
    commentsection.classList.remove("active");
});

function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px';
}
// This function will reload the comments from our local storage even after our page is reloaded
window.addEventListener('load', function() { // It means when the page is reloaded the follwing function will be performed
    const savedComments = JSON.parse(localStorage.getItem('comments')) || []; //It'll check the comments in our local storage and find 'em
    savedComments.forEach(comment => { // and for each of the comment we find there
        addCommentToList(comment.name, comment.comment, comment.timeStamp); // we will add the name, comment and time in the commen-section's commentList
    });
});

document.getElementById('comment-section').addEventListener('submit', function(event) { //It means when our submit button is cliked the following function is performed
    event.preventDefault(); // it means it'll not follow the default function when the button is clicked, i.e., to reload the page when we press submit (which basically just means it'll prevent page reload)

    const name = document.getElementById('name').value; //it'll find/get the name typed in the name field
    const comment = document.getElementById('comment').value; //it'll find/get the comment typed in comment field
    const timeStamp = new Date().toLocaleString(); //it'll add the "NEW(data)"(as mentioned in the name itself) which means it'll add a date and time string along with the comment and name so basically it just means it's the data other than what the user provided which we have to show
    
    addCommentToList(name, comment, timeStamp); // it'll add all the three data we got previously in the list we created in script.js 

    saveCommentToLocalStorage(name, comment, timeStamp); //it'll add our each comment data the is posted into our local storage

    document.getElementById('name').value = ''; // it clears the name typed in name input box after the comment is posted
    document.getElementById('comment').value = ''; // it clears the comment typed in comment input box after the comment is posted
});

// This is basically just the function we used above to add the data to commentList
function addCommentToList(name, comment, timeStamp) {
    const commentsList = document.getElementById('commentsList'); //it'll find the commentsList from index.html
    const commentItem = document.createElement('li'); // it'll create a new item in the ul named "commentsList" we found in upper step
    commentItem.innerHTML = `
        <strong>${name}</strong> <i>${timeStamp}</i> : <br> 
        ${comment} 
    `; // it just defines how the comment will be displayed like first the name in bold then time stamp in italics and the comment in the next line
    commentsList.appendChild(commentItem); // it just means we're 'appending' the new comment to our already existing list(must've seen the diff b/w wrting and appending in file handling in python right... so it's basically the same appending
}

// This is basically just the function we used above to save the comment data in our local storage
function saveCommentToLocalStorage(name, comment, timeStamp) {
    const newComment = { name, comment, timeStamp };
    let comments = JSON.parse(localStorage.getItem('comments')) || []; // it checks if there are already the same items stored in local storge or not to avoid duplicating and if not it'll create a new array (in local storages the data is usually stored in arrays)
    comments.push(newComment); // it'll add the new comment to the array we created in upper step, that is, if it's created
    localStorage.setItem('comments', JSON.stringify(comments)); // Save updated comments to local storage
}
