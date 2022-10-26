//require installed node packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();


//enable express to access static files in folder called "public"
app.use(express.static("public"));

//enable bodyParser to parse URL-encoded body i.e. info from HTML form
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName + lastName + email);
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
