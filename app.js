const express = require('express'); // Express will be used for http request and routing
const bodyParser = require('body-parser'); // body parser is being used for incoming data request
const cors = require('cors'); //CORS= CROSS ORIGIN Resource sharing.. basically just means it will accept requests from different origins like taking requests from front-end
// cont is basically like calling or you can say importing
const app = express();
const port = 3000; //these both are basically part of http request.. see the syllabus of mid term for more info

app.use(cors()); // it'll basicallly tell our server to accept cross-origin requests
app.use(bodyParser.json()); // it'll tell our server to read any incoming data as JSON requests

let comments = []; // a temporary comment storage area

// When someone asks for comments this route will respond with all the comments in JSON format...  asically just getting all the previously stored comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// submitting a new comment
app.post('/comments', (req, res) => {
    const { name, comment } = req.body; //it'll read a new comment name and the comment body
    const timeStamp = new Date().toLocaleString();//it'll record the excat date and time of the new comment
    const newComment = { name, comment, timeStamp }; //it'll create the new object for comment with all the three mentioned data
    comments.push(newComment); //it'll add the new the new comment to the existing commentsList
    res.json(newComment); // It'll show the newly updated list with new comment
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); // just to show the server is running when locally testing like we do in terminals


// the work process is basically this: our script.js will work with front-end.. like when a specific 
//button is pressed then what's it supposed to do.. like when we add name and comment it'll know that
// we're supposed to add that in local storage and show the data but the main place where all the
// work is actually done is app.js
// for exapmle: I pressed the post button after adding name and comment... the script.js will process
// what is supposed to be done and then send the data to app.js and tell it.. save blah blah to
// local storage and add the comment data then app.js will make an array and add it in storage
// and add the data into the list in index.html and sends the data to be shown to script.js
// then script.js will show the output
// That is exactly why while reading both you might feel that they look similar but actually it's just
// script.js asking app.js to do the work and app.js actually performing it
