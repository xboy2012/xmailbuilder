import config from './_generated/config';

//格式化节点，添加默认值
const formatNode = (node) => {
    let nodeType = node.type;
    let cfgNode = config[nodeType];
    let newNode = {};
    newNode.type = nodeType;

    for(let {name, defaultValue} of cfgNode.properties) {
        newNode[name] = node.hasOwnProperty(name) ? node[name] : defaultValue;
    }

    if(cfgNode.isContainer) {
        newNode.childNodes = (node.childNodes || []).map((o) => {
            o = formatNode(o);
            o.parentNode = newNode;
            return o;
        });
    }

    return newNode;
};


export default formatNode;