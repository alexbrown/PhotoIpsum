const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 9000

app.use(express.static('public'))

const helpers = require("./helpers");

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

app.get("/:size", (req, res) => {
    if(!(/[\d]{3,4}x[\d]{3,4}/i).test(req.params.size)){
        res.send();
        return;
    }
    let size = helpers.getSizeFromParams(req.params.size);
    console.log(size);
    helpers.getRandomPhoto(size, (photo) => {
        res.writeHead(302, {
            'Location' : photo
        })
        res.end();
    });
});

app.get("/:term/:size", (req, res) => {
    let size = helpers.getSizeFromParams(req.params.size);
    let term = req.params.term;
    helpers.getPhotoWithTerm(size, term, (photo) => {
        res.writeHead(302, {
            'Location' : photo
        })
        res.end();
    });
});

app.listen(PORT, console.log("Photo Ipsum is running on port" + PORT + "!"));


