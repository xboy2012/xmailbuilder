import cheerio from 'cheerio';
import juice from 'juice/client';
import csso from 'csso';

var MAIN = {
    properties: [
        {name: 'bgColor', type: 'string'}
    ],
    isContainer: true
};

var IMG_CONTENT = {
    properties: [
        {name: 'src', type: 'string'},
        {name: 'alt', type: 'string'},
        {name: 'fontSize', type: 'string'},
        {name: 'fontColor', type: 'string'},
        {name: 'lineHeight', type: 'string'},
        {name: 'bgColor', type: 'string'},
        {name: 'paddingLeft', type: 'string', defaultValue: '0'},
        {name: 'paddingTop', type: 'string', defaultValue: '0'},
        {name: 'paddingRight', type: 'string', defaultValue: '0'},
        {name: 'paddingBottom', type: 'string', defaultValue: '0'},
        {name: 'imgWidth', type: 'string'},
        {name: 'imgHeight', type: 'string'}
    ],
    isContainer: true
};

var TITLE_CONTENT = {
    properties: [
        {name: 'title', type: 'string', defaultValue: '这是标题'},
        {name: 'fontSize', type: 'string'},
        {name: 'fontColor', type: 'string'},
        {name: 'lineHeight', type: 'string'},
        {name: 'bgColor', type: 'string'},
        {name: 'paddingLeft', type: 'string', defaultValue: '0'},
        {name: 'paddingTop', type: 'string', defaultValue: '0'},
        {name: 'paddingRight', type: 'string', defaultValue: '0'},
        {name: 'paddingBottom', type: 'string', defaultValue: '0'}
    ],
    isContainer: true
};

var BOTTOM_QR = {
    properties: [],
    isContainer: false
};

var SIGNATURE = {
    properties: [
        {name: 'date', type: 'string'}
    ],
    isContainer: false
};

var IMG = {
    properties: [
        {name: 'src', type: 'string'},
        {name: 'alt', type: 'string'},
        {name: 'imgWidth', type: 'string'},
        {name: 'imgHeight', type: 'string'}
    ],
    isContainer: false
};

var IMG_LINK = {
    properties: [
        {name: 'src', type: 'string'},
        {name: 'alt', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'imgWidth', type: 'string'},
        {name: 'imgHeight', type: 'string'}
    ],
    isContainer: false
};

var CONTAINER = {
    properties: [
        {name: 'bgColor', type: 'string'},
        {name: 'paddingLeft', type: 'string', defaultValue: '0'},
        {name: 'paddingTop', type: 'string', defaultValue: '0'},
        {name: 'paddingRight', type: 'string', defaultValue: '0'},
        {name: 'paddingBottom', type: 'string', defaultValue: '0'}
    ],
    isContainer: true
};

var TEXT = {
    properties: [
        {name: 'text', type: 'string'},
        {name: 'fontColor', type: 'string'},
        {name: 'fontSize', type: 'string'},
        {name: 'lineHeight', type: 'string'},
        {name: 'paddingLeft', type: 'string', defaultValue: '0'},
        {name: 'paddingTop', type: 'string', defaultValue: '0'},
        {name: 'paddingRight', type: 'string', defaultValue: '0'},
        {name: 'paddingBottom', type: 'string', defaultValue: '0'}
    ],
    isContainer: false
};

var HTML = {
    properties: [
        {name: 'html', type: 'string', defaultValue: ''}
    ],
    isContainer: false
};

var BLANK = {
    properties: [
        {name: 'height', type: 'string', defaultValue: '0'}
    ],
    isContainer: false
};

var LIST = {
    properties: [
        {name: 'bulletColor', type: 'string'},
        {name: 'fontColor', type: 'string'},
        {name: 'paddingLeft', type: 'string', defaultValue: '0'},
        {name: 'paddingTop', type: 'string', defaultValue: '0'},
        {name: 'paddingRight', type: 'string', defaultValue: '0'},
        {name: 'paddingBottom', type: 'string', defaultValue: '0'}
    ],
    isContainer: true
};

var LIST_ITEM = {
    properties: [
        {name: 'fontColor', type: 'string'}
    ],
    isContainer: true
};

var config = {
"MAIN": MAIN,
"IMG_CONTENT": IMG_CONTENT,
"TITLE_CONTENT": TITLE_CONTENT,
"BOTTOM_QR": BOTTOM_QR,
"SIGNATURE": SIGNATURE,
"IMG": IMG,
"IMG_LINK": IMG_LINK,
"CONTAINER": CONTAINER,
"TEXT": TEXT,
"HTML": HTML,
"BLANK": BLANK,
"LIST": LIST,
"LIST_ITEM": LIST_ITEM
};

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

function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n;}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}function xtmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var locals_for_with = (locals || {});(function (node) {var Types = {"MAIN":"MAIN","IMG_CONTENT":"IMG_CONTENT","TITLE_CONTENT":"TITLE_CONTENT","BOTTOM_QR":"BOTTOM_QR","SIGNATURE":"SIGNATURE","IMG":"IMG","IMG_LINK":"IMG_LINK","CONTAINER":"CONTAINER","TEXT":"TEXT","HTML":"HTML","BLANK":"BLANK","LIST":"LIST","LIST_ITEM":"LIST_ITEM"};
var parseStyle = function(css) {
    var rules = [];
    for(var key in css) {
        if(!css.hasOwnProperty(key))
            continue;
        var value = css[key];
        if(value === false || value === undefined || value === null)
            continue;
        rules.push(key+':'+value);
    }
    return rules.length ? rules.join(';') : false;
};
pug_mixins["MAIN"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var bgColor = node.bgColor;
var childNodes = node.childNodes;
pug_html = pug_html + "\u003Chtml\u003E\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u002F\u003E\u003C\u002Fhead\u003E\u003Cbody" + (pug_attr("bgcolor", bgColor || false, true, false)+pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor
            })), true, false)) + "\u003E\u003Cdiv" + (" class=\"main\""+pug_attr("style", pug_style(parseStyle({
                    'background-color': bgColor
                })), true, false)) + "\u003E\u003Ctable align=\"center\" width=\"640\" border=\"0\"\u003E\u003Ctbody\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var childNode = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr\u003E";
if (childNode.type === Types.BLANK) {
pug_mixins["createPartialPug"](childNode, node);
}
else {
pug_html = pug_html + "\u003Ctd\u003E";
pug_mixins["createPartialPug"](childNode, node);
pug_html = pug_html + "\u003C\u002Ftd\u003E";
}
pug_html = pug_html + "\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index0];
pug_html = pug_html + "\u003Ctr\u003E";
if (childNode.type === Types.BLANK) {
pug_mixins["createPartialPug"](childNode, node);
}
else {
pug_html = pug_html + "\u003Ctd\u003E";
pug_mixins["createPartialPug"](childNode, node);
pug_html = pug_html + "\u003C\u002Ftd\u003E";
}
pug_html = pug_html + "\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
};
pug_mixins["IMG_CONTENT"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var src = node.src;
var alt = node.alt;
var fontSize = node.fontSize;
var fontColor = node.fontColor;
var lineHeight = node.lineHeight;
var bgColor = node.bgColor;
var childNodes = node.childNodes;
var paddingLeft = node.paddingLeft;
var paddingRight = node.paddingRight;
var paddingTop = node.paddingTop;
var paddingBottom = node.paddingBottom;
var imgWith = node.imgWidth;
var imgHeight = node.imgHeight;

pug_html = pug_html + "\u003Ctable" + (" class=\"banner section\""+pug_attr("style", pug_style(parseStyle({
            'background-color': bgColor
        })), true, false)+pug_attr("bgColor", bgColor || false, true, false)) + "\u003E\u003Ctbody\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cimg" + (pug_attr("src", src || false, true, false)+pug_attr("alt", alt || false, true, false)+pug_attr("width", imgWith || false, true, false)+pug_attr("height", imgHeight || false, true, false)) + "\u002F\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003Ctr\u003E\u003Ctd" + (" class=\"content\""+pug_attr("style", pug_style(parseStyle({
                        'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
                        'font-size': fontSize,
                        'color': fontColor,
                        'line-height': lineHeight
                    })), true, false)) + "\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var childNode = $$obj[pug_index1];
pug_mixins["createPartialPug"](childNode, node);
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index1];
pug_mixins["createPartialPug"](childNode, node);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
};
pug_mixins["TITLE_CONTENT"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var title = node.title;
var bgColor = node.bgColor;
var fontSize = node.fontSize;
var fontColor = node.fontColor;
var lineHeight = node.lineHeight;
var childNodes = node.childNodes;
var paddingLeft = node.paddingLeft;
var paddingRight = node.paddingRight;
var paddingTop = node.paddingTop;
var paddingBottom = node.paddingBottom;

pug_html = pug_html + "\u003Ctable" + (" class=\"title section\""+pug_attr("style", pug_style(parseStyle({
            'background-color': bgColor
        })), true, false)+pug_attr("bgcolor", bgColor || false, true, false)) + "\u003E\u003Ctbody\u003E\u003Ctr\u003E\u003Cth\u003E\u003Cp" + (pug_attr("style", pug_style(parseStyle({
                            'color': fontColor,
                            'background-image': bgColor && 'url("https://bqq.gtimg.com/qidian/src/themes/client/email/mail2-images/titleline_bg.png")',
                            'background-size': bgColor && 'auto 100%'
                        })), true, false)) + "\u003E\u003Cspan" + (pug_attr("style", pug_style(parseStyle({
                                'background-color': bgColor && '#fff'
                            })), true, false)) + "\u003E" + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003Ctr\u003E\u003Ctd" + (" class=\"content\""+pug_attr("style", pug_style(parseStyle({
                        'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
                        'font-size': fontSize,
                        'color': fontColor,
                        'line-height': lineHeight
                    })), true, false)) + "\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var childNode = $$obj[pug_index2];
pug_mixins["createPartialPug"](childNode, node);
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index2];
pug_mixins["createPartialPug"](childNode, node);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
};
pug_mixins["BOTTOM_QR"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Ctable class=\"section\" width=\"100%\" style=\"background-color:#fff;font-size:18px;\"\u003E\u003Ctbody\u003E\u003Ctr\u003E\u003Cth width=\"200\"\u003E\u003Cimg src=\"https:\u002F\u002Fbqq.gtimg.com\u002Fqidian\u002Fsrc\u002Fthemes\u002Fclient\u002Femail\u002Fimages-1.7.0\u002Fimages\u002Fwechat-qrcode.png\" width=\"170\" height=\"170\" style=\"border: 6px solid #0067ED;border-radius: 2px;margin: 56px 30px 56px 50px;\"\u002F\u003E\u003C\u002Fth\u003E\u003Ctd width=\"300\"\u003E\u003Cp style=\"font-size:30px;padding-bottom:26px;\"\u003E扫描二维码关注我们\u003C\u002Fp\u003E\u003Cp style=\"line-height: 32px;\"\u003E更多产品资讯、功能更新\u003Cbr\u002F\u003E点击链接\u003Ca href=\"https:\u002F\u002Fq.url.cn\u002Fs\u002FWl7JmJm\" target=\"_blank\"\u003Ehttps:\u002F\u002Fq.url.cn\u002Fs\u002FWl7JmJm\u003C\u002Fa\u003E\u003Cbr\u002F\u003E加入官方群\u003Ca class=\"nolink\" style=\"color: #000 !important;\"\u003E576505898\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
};
pug_mixins["SIGNATURE"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var date = node.date; //日期
pug_html = pug_html + "\u003Cp style=\"text-align: right;font-size: 16px;line-height:32px;color: #66686C;\"\u003E腾讯企业产品中心\u003Cbr\u002F\u003E\u003Ca class=\"nolink\" style=\"color: #66686C !important;\"\u003E" + (pug_escape(null == (pug_interp = date) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E";
};
pug_mixins["IMG"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var src = node.src;
var alt = node.alt;
var imgWith = node.imgWidth;
var imgHeight = node.imgHeight;
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", src, true, false)+pug_attr("alt", (alt || false), true, false)+pug_attr("width", (imgWith || false), true, false)+pug_attr("height", (imgHeight || false), true, false)) + "\u002F\u003E";
};
pug_mixins["IMG_LINK"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var src = node.src;
var alt = node.alt;
var url = node.url;
var imgWith = node.imgWidth;
var imgHeight = node.imgHeight;
pug_html = pug_html + "\u003Ca" + (pug_attr("href", url, true, false)+" target=\"_blank\"") + "\u003E\u003Cimg" + (pug_attr("src", src || false, true, false)+pug_attr("alt", alt || false, true, false)+pug_attr("width", imgWith || false, true, false)+pug_attr("height", imgHeight || false, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
};
pug_mixins["CONTAINER"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var bgColor = node.bgColor;
var paddingLeft = node.paddingLeft;
var paddingRight = node.paddingRight;
var paddingTop = node.paddingTop;
var paddingBottom = node.paddingBottom;
var childNodes = node.childNodes;

pug_html = pug_html + "\u003Cdiv" + (pug_attr("style", pug_style(parseStyle({
            'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
            'background-color': bgColor
        })), true, false)) + "\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var childNode = $$obj[pug_index3];
pug_mixins["createPartialPug"](childNode, node);
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index3];
pug_mixins["createPartialPug"](childNode, node);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["TEXT"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var text = node.text;
var fontColor = node.fontColor;
var fontSize = node.fontSize;
var lineHeight = node.lineHeight;
var paddingLeft = node.paddingLeft;
var paddingRight = node.paddingRight;
var paddingTop = node.paddingTop;
var paddingBottom = node.paddingBottom;
pug_html = pug_html + "\u003Cp" + (pug_attr("style", pug_style(parseStyle({
            'color': fontColor,
            'font-size': fontSize,
            'line-height': lineHeight,
            'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
        })), true, false)) + "\u003E" + (pug_escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
};
pug_mixins["HTML"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var html = node.html;
pug_html = pug_html + (null == (pug_interp = html) ? "" : pug_interp);
};
pug_mixins["BLANK"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var height = node.height;
if ((parentNode && parentNode.type === Types.MAIN)) {
pug_html = pug_html + "\u003Ctd" + (pug_attr("style", pug_style(parseStyle({
                'height': height,
                'line-height': height
            })), true, false)) + "\u003E&nbsp;\u003C\u002Ftd\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv" + (pug_attr("style", pug_style(parseStyle({
                'height': height,
                'line-height': height
            })), true, false)) + "\u003E&nbsp;\u003C\u002Fdiv\u003E";
}
};
pug_mixins["LIST"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var bulletColor = node.bulletColor;
var paddingLeft = node.paddingLeft;
var paddingRight = node.paddingRight;
var paddingTop = node.paddingTop;
var paddingBottom = node.paddingBottom;
var childNodes = node.childNodes;
pug_html = pug_html + "\u003Cul" + (pug_attr("style", pug_style(parseStyle({
            'margin': 0,
            'list-style-type': 'disc',
            'color': bulletColor,
            'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
        })), true, false)) + "\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var childNode = $$obj[pug_index4];
pug_mixins["createPartialPug"](childNode, node);
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index4];
pug_mixins["createPartialPug"](childNode, node);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["LIST_ITEM"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var fontColor = node.fontColor || (parentNode && parentNode.fontColor);
var childNodes = node.childNodes;
pug_html = pug_html + "\u003Cli\u003E";
// iterate childNodes
(function(){
  var $$obj = childNodes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var childNode = $$obj[pug_index5];
pug_html = pug_html + "\u003Cspan" + (pug_attr("style", pug_style(parseStyle({
                    'color': fontColor
                })), true, false)) + "\u003E";
pug_mixins["createPartialPug"](childNode, node);
pug_html = pug_html + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var childNode = $$obj[pug_index5];
pug_html = pug_html + "\u003Cspan" + (pug_attr("style", pug_style(parseStyle({
                    'color': fontColor
                })), true, false)) + "\u003E";
pug_mixins["createPartialPug"](childNode, node);
pug_html = pug_html + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fli\u003E";
};
pug_mixins["createPartialPug"] = pug_interp = function(node, parentNode){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var type = node.type;
if (type === Types.MAIN) {
pug_mixins["MAIN"](node, parentNode);
}
else
if (type === Types.IMG_CONTENT) {
pug_mixins["IMG_CONTENT"](node, parentNode);
}
else
if (type === Types.TITLE_CONTENT) {
pug_mixins["TITLE_CONTENT"](node, parentNode);
}
else
if (type === Types.BOTTOM_QR) {
pug_mixins["BOTTOM_QR"](node, parentNode);
}
else
if (type === Types.SIGNATURE) {
pug_mixins["SIGNATURE"](node, parentNode);
}
else
if (type === Types.IMG) {
pug_mixins["IMG"](node, parentNode);
}
else
if (type === Types.IMG_LINK) {
pug_mixins["IMG_LINK"](node, parentNode);
}
else
if (type === Types.CONTAINER) {
pug_mixins["CONTAINER"](node, parentNode);
}
else
if (type === Types.TEXT) {
pug_mixins["TEXT"](node, parentNode);
}
else
if (type === Types.HTML) {
pug_mixins["HTML"](node, parentNode);
}
else
if (type === Types.BLANK) {
pug_mixins["BLANK"](node, parentNode);
}
else
if (type === Types.LIST) {
pug_mixins["LIST"](node, parentNode);
}
else
if (type === Types.LIST_ITEM) {
pug_mixins["LIST_ITEM"](node, parentNode);
}
};
pug_mixins["createPartialPug"](node, null);}.call(this,"node" in locals_for_with?locals_for_with.node:typeof node!=="undefined"?node:undefined));return pug_html;}

var css_code = "::-webkit-scrollbar{display:none}a{text-decoration:none}a:not(.nolink){color:#0067ed;cursor:pointer}.main,body,p{margin:0;padding:0}img{display:inline-block;border:0}table{border-collapse:collapse;border:0}.main{font-family:Helvetica,\"Helvetica Neue\",\"Helvetica Neue Light\",HelveticaNeue-Light,'微软雅黑','Microsoft Yahei',Calibri,Arial,sans-serif;padding:40px}.main>table,.section,img{margin:auto}.section{background-color:#fff;border-radius:10px;overflow:hidden;width:640px}.section.title>tbody>tr>th{padding:32px 40px 0;font-weight:400}.section.title>tbody>tr>th>p{text-align:center;font-size:26px;margin:0}.section.title>tbody>tr>th>p>span{padding:0 15px}";

var buildHtmlFromNode = (node) => {
    let html_code = xtmpl({node});

    let $ = cheerio.load(html_code, {
        lowerCaseTags: true,
        lowerCaseAttributeNames: true,
        decodeEntities: false,
        recognizeSelfClosing: true
    });
    juice.juiceDocument($, {
        extraCss: css_code,
        applyAttributesTableElements: true
    });

    //删除id和class
    $('[id]').removeAttr('id');
    $('[class]').removeAttr('class');

    //压缩优化style
    $('[style]').each((i, el) => {
        let $el = $(el);
        let style = $el.attr('style');
        style = csso.minifyBlock(style, {}).css;
        $el.attr('style', style);
    });

    html_code = $.html();
    return html_code;
};

const createNode = (nodeType) => {
    let {properties, isContainer} = config[nodeType];
    let json = {};
    json.type = nodeType;
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

const appendChild = (parentNode, childNode) => {
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

const removeNode = (childNode) => {
    if(childNode.parentId) {
        let parentNode = childNode.getParentNode();
        let index = parentNode.childNodes.indexOf(childNode);
        parentNode.childNodes.splice(index, 1);
        childNode.parentId = 0;
        childNode.getParentNode = () => null;
    }
};

const insertBefore = (baseNode, childNode) => {
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

const insertAfter = (baseNode, childNode) => {
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

var modules = [
    'MAIN',   //主框架，邮件最顶层结构有且只有一个主框架
    'IMG_CONTENT', //图片标题栏，下侧正文
    'TITLE_CONTENT', //文字标题栏，下侧正文
    'BOTTOM_QR',         //底部二维码扫描关注提示
    'SIGNATURE',         //落款企点签名
    'IMG',                     //但图片组件
    'IMG_LINK',           //图片超链接组件
    'CONTAINER',         //容器组件，用于布局结构占位
    'TEXT',                   //文字组件
    'HTML',                    //富文本HTML组件（开发中）
    'BLANK',                //空白，用于实现段落间隔
    'LIST',                 //列表
    'LIST_ITEM'             //列表项
];

const Types = {};
modules.forEach((m) => {Types[m] = m;});

export { config, Types, parseNodeFromJSON, serializeNode as serializeNodeToJSON, buildHtmlFromNode, createNode, removeNode, appendChild, insertBefore, insertAfter };
