let express = require("express");
let server = express();

server.use("/dist", express.static(__dirname + "/dist"));
server.use("/styles", express.static(__dirname + "/styles"));
server.use("/", express.static(__dirname + "/index.html"));

server.get("/", function (req, res) {
  res.sendFile("index.html");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port, function () {
  console.log("Server is running on " + port);
});
