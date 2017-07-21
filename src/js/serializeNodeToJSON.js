import config from './_generated/config';

/**
 * 序列化节点信息用于存储
 * @param node
 * @returns {{}}
 */
const serializeNode = (node) => {
    let nodeType = node.type;
    let cfgNode = config[nodeType];
    let json = {};
    json.type = nodeType;

    for(let {name} of cfgNode.properties) {
        json[name] = node[name];
    }
    if(cfgNode.isContainer) {
        json.childNodes = node.childNodes.map((o) => serializeNode(o));
    }

    return json;
};

export default serializeNode;