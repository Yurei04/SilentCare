const express = require("express");
const { processMessage } = require("../services/nlpService.js");
const { generateReport } = require("../services/pdfService.js");

const router = express.Router();

router.post("/chat", (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "No Message Received" });
    }

    try {
        const response = processMessage(message);
        res.json({ reply: response });
    } catch (err) {
        console.error("Chat error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/report", (req, res) => {
    const { chatHistory } = req.body;
    if (!chatHistory) {
        return res.status(400).json({ error: "No Chat History Data Received" });
    }

    try {
        const pdfBuffer = generateReport(chatHistory);

        res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
        });

        res.send(pdfBuffer);
    } catch (err) {
        console.error("Report error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
