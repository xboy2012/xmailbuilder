import config from './_generated/config';

//格式化节点，添加默认值
const formatNode = (node) => {
    let nodeType = node.type;
    let cfgNode = config[nodeType];
    let newNode = {};
    newNode.type = nodeType;

    for(let {name, type, defaultValue} of cfgNode.properties) {
        if(type === 'nodes') {
            newNode[name] = node.hasOwnProperty(name) ? node[name].map((o) => formatNode(o)) : [];
        } else {
            newNode[name] = node.hasOwnProperty(name) ? node[name] : defaultValue;
        }
    }
    return newNode;
};


export default formatNode;