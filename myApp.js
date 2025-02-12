let bodyParser = require("body-parser");
let express = require("express");
let app = express();


console.log("Hello World");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));
//Request logger middleware
app.use("",(req,res,next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
//Use Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//Chain Middleware
app.get('/now',(req,res,next)=>{
  req.time = new Date().toString();
  next();
},(req,res)=>{
  res.json({time: req.time});
});
//Request Params
app.get('/:word/echo',(req,res) =>{
  res.json({echo: req.params.word});
});

//Query Params
app.get('/name',(req,res)=>{
  
  res.json({name : req.query.first + " "+ req.query.last})
});

//Serve JSON
app.get("/json",(req,res) => {
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": "HELLO JSON"});
  }else res.json({"message": "Hello json"});
});

module.exports = app;
