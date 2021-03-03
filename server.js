const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 80;

app.use(express.static("public"))

app.get("/",function(req,res){

    res.status(200).sendFile(path.join(__dirname,"index.html"));
})


const server = app.listen(PORT,function(){
    console.log(`Server is running at Port ${PORT}`)
})

const io = require("socket.io")(server);
io.on("connection",function(socket){

    console.log("connected");

    socket.on("newUser",function(userName){

        socket.broadcast.emit('newUser',userName)

    })

    socket.on("sendMessage",function(msg){

        socket.broadcast.emit('sendMessage',msg)

    })
    
})