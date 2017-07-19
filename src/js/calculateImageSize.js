import Types from './types';
import config from './_generated/config';
import size from 'http-image-size';

const readNode = (node, promises) => {
    let nodeType = node.type;

    if(nodeType === Types.IMG || nodeType === Types.IMG_CONTENT || nodeType === Types.IMG_LINK) {
        let url = node.src;
        let key = `CACHE_${url}`;
        if(!promises.has(key)) {
            let promise = new Promise((resolve, reject) => {
                size(url, (err, dimensions) => {
                    if(err) {
                        reject(err);
                    } else {
                        let {width, height} = dimensions;
                        node.imgWidth = width;
                        node.imgHeight = height;
                        resolve();
                    }
                });
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