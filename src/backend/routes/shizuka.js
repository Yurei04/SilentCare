const express = require("express");
const { procecessMessage } = require("@/backend/services/nlpService.js");
const { generateReport } = require("@/backend/services/pdfService.js");

const router = express.Router();

router.post("/chat", (res, req) => {
    const { message } = req.body;
    if (!message) return res.statusCode(400).json({ errpr:"No Message Received"});

    const response = procecessMessage(message);
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
