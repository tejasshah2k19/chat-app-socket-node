const express = require("express")
const socket = require("socket.io")


let app = express()
let server = app.listen(9898, function () {
    console.log("server started --- 9898 ");
})

app.use(express.static("view"))

let io = socket(server);
let users = new Set();

io.on("connection", function (socket) {
    console.log("client connected....");

    socket.on("new user", function (data) {
        socket.join(data);
        socket.userId = data;
        console.log("new user => " + data);
        users.add(data);
        io.emit("new user", [...users])
    });

    socket.on("disconnect", function () {
        console.log("user disconneceted...")
        users.delete(socket.userId)
        io.emit("user disconnect", [...users])
    })

    socket.on("message", function (data) {
        console.log("message");
        console.log(data);//userId data 
        // io.emit("message",data)
        //socket.broadcast.to(parseInt(data.recvId)).emit("message",data)
        //    console.log(io.sockets); 
        if (data.recvId == "all") {
            io.emit("message", data)
        }
        else {
            //
            io.sockets.in(parseInt(data.recvId)).emit("message", data)
            io.sockets.in(parseInt(data.userId)).emit("message",data)
        }
    })


})