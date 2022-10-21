const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);



app.get("/",(req, res) =>{
    // Acá iran los datos a guardar
    const chunks = [];
    // Llamamos a la API de GOT
    const url = "https://anapioficeandfire.com/api/characters/583"
    // Usamos un response que nos dirija al html principal
    res.sendFile(__dirname + "/public/html/index.html");
    // Función en proceso...
    https.get(url, (response)=>{
        response.on("data",(data)=>{
            chunks.push(data);
        });
    //     response.on("end",()=>{
    //         actualId = 1;
    //         let rendered = setVars(chunks);

    //         res.render(__dirname + "/index.html", rendered);
    //     });
    });
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});