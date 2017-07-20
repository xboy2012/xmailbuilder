function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}function xtmpl(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (node) {var Types = {"MAIN":"MAIN","IMG_CONTENT":"IMG_CONTENT","TITLE_CONTENT":"TITLE_CONTENT","BOTTOM_QR":"BOTTOM_QR","SIGNATURE":"SIGNATURE","IMG":"IMG","IMG_LINK":"IMG_LINK","CONTAINER":"CONTAINER","TEXT":"TEXT","HTML":"HTML","BLANK":"BLANK","LIST":"LIST","LIST_ITEM":"LIST_ITEM"};
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
;(function(){
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
;(function(){
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
;(function(){
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
;(function(){
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
if (parentNode.type === Types.MAIN) {
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
;(function(){
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
var fontColor = node.fontColor || parentNode.fontColor;
var childNodes = node.childNodes;
pug_html = pug_html + "\u003Cli\u003E";
// iterate childNodes
;(function(){
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
pug_mixins["createPartialPug"](node, null);}.call(this,"node" in locals_for_with?locals_for_with.node:typeof node!=="undefined"?node:undefined));;return pug_html;};
export default xtmpl;