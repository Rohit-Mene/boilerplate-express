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
})

//Serve JSON
app.get("/json",(req,res) => {
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": "HELLO JSON"});
  }else res.json({"message": "Hello json"});
});

module.exports = app;
