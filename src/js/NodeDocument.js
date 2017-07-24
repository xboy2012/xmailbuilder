import config from './_generated/config';
import parseNodeFromJSON from './parseNodeFromJSON';

export const createNode = (nodeType) => {
    let {properties, isContainer} = config[nodeType];
    let json = {};
    json.type = nodeType;
    for(let {name, defaultValue} of properties) {
        json[name] = defaultValue;
    }
    if(isContainer) {
        json.childNodes = [];
    }
    return parseNodeFromJSON(json);
};

export const getNodeById = (parentNode, id) => {
    if(parentNode.id === id)
        return parentNode;
    if(!parentNode.childNodes)
        return null;
    for(let childNode of parentNode.childNodes) {
        let result = getNodeById(childNode, id);
        if(result)
            return result;
    }
    return null;
};

export const appendChild = (rootNode, parentNode, childNode) => {
    //不是容器，不能插入子元素
    if(!config[parentNode.type].isContainer) {
        throw Error('Cannot appendChild in a non-container element');
    }
    //如果已经在树中，先移除
    removeNode(rootNode, childNode);
    //插入新树
    parentNode.childNodes.push(childNode);
    childNode.parentId = parentNode.id;
};

export const removeNode = (rootNode, childNode) => {
    if(childNode.parentId) {
        let parentNode = getNodeById(rootNode, childNode.parentId);
        let index = parentNode.childNodes.indexOf(childNode);
        parentNode.childNodes.splice(index, 1);
        childNode.parentId = 0;
    }
};

export const insertBefore = (rootNode, baseNode, childNode) => {
    if(!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(rootNode, childNode);
    let parentNode = getNodeById(rootNode, baseNode.parentId);
    let index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index, 0, childNode);
    childNode.parentId = parentNode.id;
};

export const insertAfter = (rootNode, baseNode, childNode) => {
    if(!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(rootNode, childNode);
    let parentNode =  getNodeById(rootNode, baseNode.parentId);
    let index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index + 1, 0, childNode);
    childNode.parentId = parentNode.id;
};