import json from './json';
import writeFile from '../../utils/writeFile';

let {parseNodeFromJSON, buildHtmlFromNode} = require('../../dist/index.es5');

const run = () => {
    let node = parseNodeFromJSON(json);
    let html = buildHtmlFromNode(node);

    let file = `${__dirname}/output.html`;

    writeFile(file, html).then(() => {
        console.log(`generating ${file} success`);
    });
};

run();