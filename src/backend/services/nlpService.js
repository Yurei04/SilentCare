import path from "path";
import fs from "fs"
import natural from "natural"
import nlp from "compromise"

const dataPath = path.join(process.cwd(), "data", "conditions.json");
const conditionsBase = JSON.parse(fs.readFileSync(dataPath, "utf-8"))


function processMessage(message) {
    const tokens = new natural.WordTokenizer().tokenize(message.toLowerCase());
    const doc = nlp(message);
    matchedResponse(tokens);
}

function matchedResponse ( replyResponse ) {
    let matchedResponses = null;
    
    for (const category in conditionsBase ) {
        conditionsBase[category].forEach((entry) => {
            entry.keywords.forEach((keyword) => {
                if (replyResponse.includes(keyword)) {
                    matchedResponses = entry.response[Math.floor(Math.random() * entry.responses.length)];
                }
            })
        });
    }
}

module.exports = { matchedResponses }