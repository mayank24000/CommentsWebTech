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