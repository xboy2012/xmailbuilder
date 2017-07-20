import Types from './types';
import config from './_generated/config';

const calculateSize_browser = (url) => {
    return new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.onload = () => {
            resolve([img.width, img.height]);
        };
        img.onerror = reject;
        img.src = url;
    });
};

const readNode = (node, promises) => {
    let nodeType = node.type;

    if(nodeType === Types.IMG || nodeType === Types.IMG_CONTENT || nodeType === Types.IMG_LINK) {
        let url = node.src;
        let key = `CACHE_${url}`;
        if(!promises.has(key)) {

            let promise = calculateSize_browser(url).then(([width, height]) => {
                node.imgWidth = width;
                node.imgHeight = height;
            });
            promises.set(key, promise);
        }
    }

    let cfgNode = config[nodeType];
    for(let {name, type} of cfgNode.properties) {
        if(type === 'nodes') {
            for(let childNode of node[name]) {
                readNode(childNode, promises);
            }
        }
    }
};

export default (node) => {
    let promises = new Map();
    readNode(node, promises);
    promises = Array.from(promises.values());
    return Promise.all(promises);
};