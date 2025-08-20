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
    let matchedResponses = [];

    for (const category in conditionsBase ) {
        conditionsBase[category].forEach((entry) => {

            let keywords = Array.isArray(entry.keywords) ? entry.keywords : entry.keywords.split(" ").filter(Boolean);

            keywords.forEach((keyword) => {
                if (replyResponse.includes(keyword.toLowerCase())) {
                   if (entry.reponses && entry.responses.length > 0) {
                        matchedResponses.push(
                             entry.response[Math.floor(Math.random() * entry.responses.length)]
                        );
                   }
                }
            });
        });
    }

    return matchedResponse.length > 0 ? matchedResponse : ["I’m not sure, could you tell me more about your symptoms?"];
}

exports = { matchedResponses }