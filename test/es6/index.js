import json from './json';
import writeFile from '../../utils/writeFile';
import {parseNodeFromJSON, buildHtmlFromNode} from '../../dist/index.es6';

const run = () => {
    let node = parseNodeFromJSON(json);
    let html = buildHtmlFromNode(node);

    let file = `${__dirname}/output.html`;

    writeFile(file, html).then(() => {
        console.log(`generating ${file} success`);
    });
};

run();