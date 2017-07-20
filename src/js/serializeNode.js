import config from './_generated/config';

/**
 * 序列化节点信息用于存储
 * @param node
 * @returns {{}}
 */
const serializeNode = (node) => {
    let nodeType = node.type;
    let cfgNode = config[nodeType];
    let newNode = {};
    newNode.type = nodeType;

    for(let {name} of cfgNode.properties) {
        newNode[name] = node[name];
    }
    if(cfgNode.isContainer) {
        newNode.childNodes = node.childNodes.map((o) => serializeNode(o));
    }

    return newNode;
};

export default serializeNode;