const net = require("net");
const sockets = [];
const handleClientMsg = async (socket) => {
  socket.on("data", (data) => {
    console.log("data", data.toString());
    sockets.forEach((inSocketArr) => {
      inSocketArr.write(data.toString());
    });
  });
};
const server = net.createServer((socket) => {
  socket.write(
    JSON.stringify({ name: "Server", message: "Hello from server" })
  );
  sockets.push(socket);
  handleClientMsg(socket);
  server.getConnections((err, count) => {
    if (err) console.log("err", err);
    console.log("count", count);
  });
});
server.on("connection", () => console.log("Server is connected"));
server.listen(4000);
server.on("error", (err) => {
  console.log("error", err);
});
