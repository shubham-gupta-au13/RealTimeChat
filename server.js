const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.port || 5005;


app.get("/",function(req,res){

    res.status(200).sendFile(path.join(__dirname,"index.html"));
})


app.listen(PORT,function(){
    console.log(`Server is running at Port ${PORT}`)
})



