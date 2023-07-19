require("dotenv").config();
const express = require("express");
const app = express();
const router = require('./router/route');
const cors = require('cors');

app.use(express.json());
app.use(router);
app.use(cors());

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server started");
});
