import { readFileSync, writeFileSync, existsSync } from 'fs';
import { marked } from 'marked';
import { renderer } from './helper.js';

const DEFAULT_INPUT_FILENAME = 'input.md';
const DEFAULT_OUTPUT_FILENAME = 'blog.html';

let inputFilename;
let outputFilename;
if (process.argv.length < 3 || process.argv[2]?.length <= 0) {
    inputFilename = DEFAULT_INPUT_FILENAME;
} else {
    inputFilename = process.argv[2]
}
if (process.argv.length < 4 || process.argv[3]?.length <= 0) {
    outputFilename = DEFAULT_OUTPUT_FILENAME;
} else {
    outputFilename = process.argv[3]
}
if (!existsSync(inputFilename)) {
    inputFilename += (inputFilename === DEFAULT_INPUT_FILENAME) ? ' (default)' : '';
    console.error(`Provided file ${inputFilename} not found.`);
    process.exit(1);
}

// add image & code tag renderer override
marked.use({ renderer });

try {
    const markdown = readFileSync(inputFilename, 'utf8');
    const html = marked.parse(markdown);
    writeFileSync(outputFilename, html, {
        encoding: 'utf8',
        flag: 'w'
    });
} catch (error) {
    console.error(error)
}