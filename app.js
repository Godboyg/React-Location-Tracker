const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(cors());

io.on("connect",(socket)=>{
    console.log("user connected");
    socket.on("send-location",(data)=>{
        io.emit("recieve-location", {id: socket.id, ...data});
    })
})

app.get("/",function(req,res){
    res.send({ message: "server connected" });
})

server.listen(PORT);