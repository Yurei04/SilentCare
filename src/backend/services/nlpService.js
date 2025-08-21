const path = require("path");
const fs = require("fs");
const natural = require("natural");
const nlp = require("compromise");

const dataPath = path.join(process.cwd(), "data", "conditions.json");
const conditionsBase = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

/** 
 * @param {string} message
 * @returns {string[]} 
 */
function processMessage(message) {
   
    const tokens = new natural.WordTokenizer().tokenize(message.toLowerCase());
    const doc = nlp(message); 

    return matchResponse(tokens);
}

/**
 * 
 * @param {string[]} replyTokens
 * @returns {string[]} 
 */
function matchResponse(replyTokens) {
    let matched = [];

    for (const category in conditionsBase) {
        conditionsBase[category].forEach((entry) => {
            let keywords = Array.isArray(entry.keywords)
                ? entry.keywords
                : entry.keywords.split(" ").filter(Boolean);

            keywords.forEach((keyword) => {
                if (replyTokens.includes(keyword.toLowerCase())) {
                    if (entry.responses && entry.responses.length > 0) {
                        matched.push(
                            entry.responses[
                                Math.floor(Math.random() * entry.responses.length)
                            ]
                        );
                    }
                }
            });
        });
    }

    return matched.length > 0
        ? matched
        : ["I’m not sure, could you tell me more about your symptoms?"];
}

module.exports = { processMessage };
