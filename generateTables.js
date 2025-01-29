const fs = require("fs");
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

// Generate an HTML file with a scrollable table
function createScrollableTableHTML(sortedNouns) {
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouns Table</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .scrollable-table {
            max-height: 400px;
            overflow-y: auto;
            display: block;
        }
    </style>
</head>
<body>
    <h1>German Nouns</h1>
`;

    ["der", "die", "das"].forEach((category) => {
        if (sortedNouns[category].length > 0) {
            htmlContent += `
    <h2>${category.toUpperCase()}</h2>
    <div class="scrollable-table">
        <table>
            <thead>
                <tr>
                    <th>Noun</th>
                    <th>Plural</th>
                    <th>Meaning</th>
                </tr>
            </thead>
            <tbody>
`;
            sortedNouns[category].forEach(({ noun, plural, meaning }) => {
                htmlContent += `
                <tr>
                    <td>${noun}</td>
                    <td>${plural}</td>
                    <td>${meaning}</td>
                </tr>
`;
            });
            htmlContent += `
            </tbody>
        </table>
    </div>
`;
        }
    });

    htmlContent += `
</body>
</html>
`;

    fs.writeFileSync("nouns_table.html", htmlContent);
    console.log("Generated nouns_table.html");
}

// Main function
function main() {
    const nouns = parseMarkdownTable(mdContent);
    const sortedNouns = sortNouns(nouns);
    createScrollableTableHTML(sortedNouns);
}

main();