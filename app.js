//require installed node packages
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https")

const app = express();


//enable express to access static files in folder called "public"
app.use(express.static("public"));

//enable bodyParser to parse URL-encoded body i.e. info from HTML form
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
   members:[
    {
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }
 ]
};

   const jasonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/a5762173e6";

   const options = {
     method: "POST",
     auth: "shahed:8d9b63bd9e2a8ca602af24b5bbf48622-us21"
   }

   const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

     response.on("data", function(data){
       console.log(JSON.parse(data));
     } )
   })

    request.write(jasonData);
    request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

// API KEY
//8d9b63bd9e2a8ca602af24b5bbf48622-us21

// list id
// a5762173e6
