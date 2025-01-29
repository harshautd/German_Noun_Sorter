const fs = require("fs");
const { createCanvas } = require("canvas");
const marked = require("marked");

// Read the markdown file
const mdContent = fs.readFileSync("nouns.md", "utf8");

// Extract table data
function parseMarkdownTable(mdContent) {
    const tableRegex = /\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/g;
    let nouns = [];
    let match;
    
    while ((match = tableRegex.exec(mdContent)) !== null) {
        if (match[1] !== "Noun") { // Ignore header row
            nouns.push({ noun: match[1], article: match[2], plural: match[3], meaning: match[4] });
        }
    }
    return nouns;
}

// Sort nouns into categories
function sortNouns(nouns) {
    let sorted = { der: [], die: [], das: [] };
    
    nouns.forEach(({ noun, article, plural, meaning }) => {
        if (sorted[article]) {
            sorted[article].push({ noun, plural, meaning });
        }
    });
    
    return sorted;
}

// Generate a single image with all three tables
function createCombinedTableImage(sortedNouns) {
    const width = 800;
    const rowHeight = 30;
    const padding = 20;
    const sectionSpacing = 40;
    
    const totalRows = Object.values(sortedNouns).reduce((sum, words) => sum + words.length, 0);
    const height = padding * 2 + totalRows * rowHeight + sectionSpacing * 2;
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    let yOffset = padding;
    ["der", "die", "das"].forEach((category) => {
        if (sortedNouns[category].length > 0) {
            ctx.fillText(category.toUpperCase(), padding, yOffset);
            yOffset += rowHeight;
            
            ctx.font = "16px Arial";
            sortedNouns[category].forEach(({ noun, plural, meaning }) => {
                ctx.fillText(`${noun} (${plural}) - ${meaning}`, padding, yOffset);
                yOffset += rowHeight;
            });
            yOffset += sectionSpacing;
        }
    });

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("nouns_table.png", buffer);
    console.log("Generated nouns_table.png");
}

// Main function
function main() {
    const nouns = parseMarkdownTable(mdContent);
    const sortedNouns = sortNouns(nouns);
    createCombinedTableImage(sortedNouns);
}

main();
