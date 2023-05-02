const net = require("net");

const handleClientMsg = async (socket) => {
  socket.on("data", (data) => {
    data = JSON.parse(data.toString());
    console.log("data", data);
    //   console.log(data.name + ":", data.message);
    socket.write(JSON.stringify(data));
  });
};
const server = net.createServer((socket) => {
  socket.write(
    JSON.stringify({ name: "Server", message: "Hello from server" })
  );
  handleClientMsg(socket);
  //   console.log("socket.address", socket);
  server.getConnections((err, count) => {
    if (err) console.log("err", err);
    console.log("count", count);
  });
});
server.on("connection", () => console.log("Server is connected"));
server.listen(4000);
server.on("error", (err) => {
  console.log("error", error);
});
