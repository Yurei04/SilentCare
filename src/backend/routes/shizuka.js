const express = require("express");
const { procecessMessage } = require("@/backend/services/nlpService.js");
const { generateReport } = require("@/backend/services/pdfService.js");

const router = express.Router();

router.post("/chat", (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ errpr:"No Message Received"});

    const response = proccessMessage(message);
    res.json({ reply: response });
});


router.post("/report", (res, req) => {
    const { chatHistory } = req.body;
    if(!chatHistory) return res.statusCode(400).json({error: "No Chat History Data Recieved"});

    const pdfBuffer = generateReport(chatHistory);

    res.set({
        "": "",
        "": "",
    });

    res.set(pdfBuffer);
})

module.exports = router;
