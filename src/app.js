const net = require("net");

// variable declaration
const sockets = [];

// function for data event from client
const handleClientMsg = async (socket) => {
  socket.on("data", (data) => {
    console.log("data", data.toString());
    sockets.forEach((inSocketArr) => {
      inSocketArr.write(data.toString());
    });
  });
};

// create server function
const server = net.createServer((socket) => {
  // sending default message from server to client on connection
  socket.write(
    JSON.stringify({ name: "Server", message: "Hello from server" })
  );

  // pushing client socket in sockets array
  sockets.push(socket);

  // calling data event function
  handleClientMsg(socket);

  // get total connections / clients connected on server
  server.getConnections((err, count) => {
    if (err) console.log("err", err);
    console.log("count", count);
  });
});

// method on client connection
server.on("connection", () => console.log("Server is connected"));

// server listening
server.listen(4000);

// error handler on server
server.on("error", (err) => {
  console.log("error", err);
});
