const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const port = 5000;
const shizukaRoute = require("./routes/shizuka")

app.get("/", (req, res) => {
    res.send("Express Server is Running");
})

app.use(cors());
app.use(bodyParser.json());

app.use("/api/shizuka", shizukaRoute);

app.listen(port, () => {
    console.log("server is running on port", port)
})