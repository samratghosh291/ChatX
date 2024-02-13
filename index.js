const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// handle all Socket.io connections

io.on("connection", (socket) => {
    // console.log("New user connected",socket.id);
    socket.on("chatMessage", (msg) => {
        // console.log(msg);
        io.emit("message", msg);
    });
});






app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});


server.listen(9000, () => {
  console.log("Server is running on port 9000");
});