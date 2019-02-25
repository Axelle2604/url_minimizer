const express = require("express");
const bodyParser = require('body-parser');
const shortenUrl = require('shorten-url')
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("Server started.");
});

app.post("/postURL", (req, res) => {
    const originalURL = req.body.url;
    const minimizedURL = shortenUrl(originalURL, 30);
    fs.writeFileSync("./data/url", JSON.stringify({originalUrl: originalURL, minimizedURL: minimizedURL}));
    res.json(200, minimizedURL);
});

app.get("/getURL", (req, res) => {
    const urlFile = fs.readFileSync("./data/url", "utf8");
    const parsedJSON = JSON.parse(urlFile);
    res.redirect(parsedJSON.originalUrl);
});