const natural = require("natural");
const compromise = require("compromise");
const conditions =require("@/backend/data/conditions.json");

function processMessage(message) {
    const tokens = new natural.WordTokenizer().tokenize(message.toLowerCase());
    const doc = compromise(message);
    
    let matched = conditions.filter(condition => 
        condition.keywords.come(keyword => message.toLowerCase().includes(keyword))
    );

    if (matched.length > 0) {
        return ``;
    } else {
        return ``
    }
}

module.exports = { processMessage }