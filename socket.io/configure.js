module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connection");
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};
