import config from './_generated/config';

let ct = 0;
const getNewId = () => {
    ct++;
    return ct;
};

//格式化节点，添加默认值
const parseNodeFromJSON = (json) => {
    let nodeType = json.type;
    let cfgNode = config[nodeType];
    let node = {};
    node.type = nodeType;
    node.id = getNewId();
    node.parentId = 0;
    node.getParentNode = () => null;

    for(let {name, defaultValue} of cfgNode.properties) {
        node[name] = json.hasOwnProperty(name) ? json[name] : defaultValue;
    }

    if(cfgNode.isContainer) {
        node.childNodes = (json.childNodes || []).map((o) => {
            o = parseNodeFromJSON(o);
            o.parentId = node.id;            //父节点ID
            o.getParentNode = () => node;    //父节点信息
            return o;
        });
    }

    return node;
};

export default parseNodeFromJSON;