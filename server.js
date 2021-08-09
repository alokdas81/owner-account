const express = require("express");
const path = require("path");
const compression = require("compression");

const PORT = 9001;
const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, "/dist/owner-account")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/owner-account/index.html"));
});
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
