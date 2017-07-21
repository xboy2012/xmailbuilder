import config from './_generated/config';
import parseNodeFromJSON from './parseNodeFromJSON';

export const createNode = (nodeType) => {
    let {properties, isContainer} = config[nodeType];
    let json = {};
    for(let {name, defaultValue} of properties) {
        if(defaultValue !== undefined) {
            json[name] = defaultValue;
        }
    }
    if(isContainer) {
        json.childNodes = [];
    }
    return parseNodeFromJSON(json);
};

export const appendChild = (parentNode, childNode) => {
    //不是容器，不能插入子元素
    if(!config[parentNode.type].isContainer) {
        throw Error('Cannot appendChild in a non-container element');
    }
    //如果已经在树中，先移除
    removeNode(childNode);
    //插入新树
    parentNode.childNodes.push(childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = () => parentNode;
};

export const removeNode = (childNode) => {
    if(childNode.parentId) {
        let parentNode = childNode.getParentNode();
        let index = parentNode.childNodes.indexOf(childNode);
        parentNode.childNodes.splice(index, 1);
        childNode.parentId = 0;
        childNode.getParentNode = () => null;
    }
};

export const insertBefore = (baseNode, childNode) => {
    if(!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(childNode);
    let parentNode = baseNode.getParentNode();
    let index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index, 0, childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = () => parentNode;
};

export const insertAfter = (baseNode, childNode) => {
    if(!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(childNode);
    let parentNode = baseNode.getParentNode();
    let index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index + 1, 0, childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = () => parentNode;
};