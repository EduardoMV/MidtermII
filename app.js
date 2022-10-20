const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);



app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/public/html/index.html");
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});