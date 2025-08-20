const express = require("express");
const app = express();
const bodyPaser = require("body-parser")
const port = 5000;
const shizukaRoute = require("@/backend/routes/shizuka")

app.get("/", (req, res) => {
    res.send("Express Server is Running");
})

app.use(cors());
app.use(bodyPaser.json());

app.use("/api/shizuka", shizukaRoute);

app.listen(port, () => {
    console.log("server is running on port", port)
})