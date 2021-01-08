const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:19006",
    withCredentials: true,
    credentials: true,
  },
});

app.use(cors());
app.use("/", (req, res) => {
  res.send({ res: "Server is running..." }).status(200);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Listening on port: ", port);
});

const userIDS = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("joinRoom", (roomID, userID, peerID) => {
    userIDS[socket.id] = userID;
    socket.join(roomID);
    socket.to(roomID).broadcast.emit("user-connected", [userID, peerID]);
  });
  socket.on("disconnect", () => {
    console.log("USer disconnected", socket.id);
    socket.broadcast.emit("user-disconnected", userIDS[socket.id]);
  });

  socket.on("sendmessage", (roomID, userID, msg) => {
    console.log(userID + "sent: " + msg);
    socket.to(roomID).emit("message", userID, msg);
  });
});
