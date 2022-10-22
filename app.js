const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

actualId = 0;

app.get("/",(req, res) =>{

    var url = "https://thronesapi.com/api/v2/Characters/" + actualId;
    https.get(url, (response) =>{
        let data = "";
        response
            .on("data", (jdata)=> {
                data += jdata;
            })
            .on("end", () => {
                var jsonData = JSON.parse(data);
                console.log(jsonData["firstName"])
                res.render("public/html/index.html", { 
                    ID: jsonData["id"],
                    LastName: jsonData["lastName"], 
                    FirstName: jsonData["firstName"],
                    Title: jsonData["title"],
                    Family: jsonData["family"],
                    ImageURL: jsonData["imageUrl"]
            });
            })
            .on("error", (e) => {
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            });
        });
});

app.post("/next",(req, res)=>{
    if(actualId==52){
        actualId=0;
    }else{
        actualId++;
    }

    var url = "https://thronesapi.com/api/v2/Characters/" + actualId;
    https.get(url, (response) =>{
        let data = "";
        response
            .on("data", (jdata)=> {
                data += jdata;
            })
            .on("end", () => {
                var jsonData = JSON.parse(data);
                console.log(jsonData["firstName"])
                res.render("public/html/index.html", { 
                    ID: jsonData["id"],
                    LastName: jsonData["lastName"], 
                    FirstName: jsonData["firstName"],
                    Title: jsonData["title"],
                    Family: jsonData["family"],
                    ImageURL: jsonData["imageUrl"]
                });

            })
            .on("error", (e) => {
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            })
        });
});

app.post("/previous",(req, res)=>{
    if(actualId==0){
        actualId=52;
    }else{
        actualId--;
    }

    var url = "https://thronesapi.com/api/v2/Characters/" + actualId;
    https.get(url, (response) =>{
        let data = "";
        response
            .on("data", (jdata)=> {
                data += jdata;
            })
            .on("end", () => {
                var jsonData = JSON.parse(data);
                console.log(jsonData["firstName"])
                res.render("public/html/index.html", { 
                    ID: jsonData["id"],
                    LastName: jsonData["lastName"], 
                    FirstName: jsonData["firstName"],
                    Title: jsonData["title"],
                    Family: jsonData["family"],
                    ImageURL: jsonData["imageUrl"]
                });

            })
            .on("error", (e) => {
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            })
        });
});

app.post("/", (req, res) => {
    GOT = []
    const url = "https://thronesapi.com/api/v2/Characters/";
    https.get(url, (response) => {
        response.on("data", (data) => {
            GOT.push(data);
        });
        response.on("end", () => {
            try {
                const data = Buffer.concat(GOT);
                const infoGOT = JSON.parse(data);
                let characterInfo = null;
                for (var i = 0; i < infoGOT.length; i++) {
                    if (req.body.gotCharacter.toLowerCase() == infoGOT[i].firstName.toLowerCase()) {
                        characterInfo = infoGOT[i];
                        actualId = i;
                        break;
                    }
                }
                res.render("public/html/index.html", {
                    ID: characterInfo["id"],
                    LastName: characterInfo["lastName"],
                    FirstName: characterInfo["firstName"],
                    Title: characterInfo["title"],
                    Family: characterInfo["family"],
                    ImageURL: characterInfo["imageUrl"]
                });
            } catch (error) {
                res.send("Error algo a fallado");
            }
        });
    });
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});