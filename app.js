const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 3000,function(){
  console.log("server is up and running");
})

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  https.get("https://api.chucknorris.io/jokes/random",function(response){
    response.on("data",function(data){
      var jokeData = JSON.parse(data);
      var joke = jokeData.value;
            res.send(`<!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="description" content="">
                <meta name="author" content="">
                <title> Chuck Norris</title>        <!-- Bootstrap core CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <!-- Custom styles for this template -->
                <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
              <link href="/styles.css" rel="stylesheet">
            </head>
            <body>
              <div class="jumbotron jumbotron-fluid">
              <div class="container">
              <h1 class="display-4 joke-joke">Joke : ${joke}</h1>

            </div>

            </div>
            </body>
          </html>`);






    });
  })


})
