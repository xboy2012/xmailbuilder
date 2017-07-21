Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertAfter = exports.insertBefore = exports.appendChild = exports.removeNode = exports.createNode = exports.buildHtmlFromNode = exports.serializeNodeToJSON = exports.parseNodeFromJSON = exports.Types = exports.config = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _client = require('juice/client');

var _client2 = _interopRequireDefault(_client);

var _csso = require('csso');

var _csso2 = _interopRequireDefault(_csso);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAIN = {
    properties: [{ name: 'bgColor', type: 'string' }],
    isContainer: true
};

var IMG_CONTENT = {
    properties: [{ name: 'src', type: 'string' }, { name: 'alt', type: 'string' }, { name: 'fontSize', type: 'string' }, { name: 'fontColor', type: 'string' }, { name: 'lineHeight', type: 'string' }, { name: 'bgColor', type: 'string' }, { name: 'paddingLeft', type: 'string', defaultValue: '0' }, { name: 'paddingTop', type: 'string', defaultValue: '0' }, { name: 'paddingRight', type: 'string', defaultValue: '0' }, { name: 'paddingBottom', type: 'string', defaultValue: '0' }, { name: 'imgWidth', type: 'string' }, { name: 'imgHeight', type: 'string' }],
    isContainer: true
};

var TITLE_CONTENT = {
    properties: [{ name: 'title', type: 'string', defaultValue: '这是标题' }, { name: 'fontSize', type: 'string' }, { name: 'fontColor', type: 'string' }, { name: 'lineHeight', type: 'string' }, { name: 'bgColor', type: 'string' }, { name: 'paddingLeft', type: 'string', defaultValue: '0' }, { name: 'paddingTop', type: 'string', defaultValue: '0' }, { name: 'paddingRight', type: 'string', defaultValue: '0' }, { name: 'paddingBottom', type: 'string', defaultValue: '0' }],
    isContainer: true
};

var BOTTOM_QR = {
    properties: [],
    isContainer: false
};

var SIGNATURE = {
    properties: [{ name: 'date', type: 'string' }],
    isContainer: false
};

var IMG = {
    properties: [{ name: 'src', type: 'string' }, { name: 'alt', type: 'string' }, { name: 'imgWidth', type: 'string' }, { name: 'imgHeight', type: 'string' }],
    isContainer: false
};

var IMG_LINK = {
    properties: [{ name: 'src', type: 'string' }, { name: 'alt', type: 'string' }, { name: 'url', type: 'string' }, { name: 'imgWidth', type: 'string' }, { name: 'imgHeight', type: 'string' }],
    isContainer: false
};

var CONTAINER = {
    properties: [{ name: 'bgColor', type: 'string' }, { name: 'paddingLeft', type: 'string', defaultValue: '0' }, { name: 'paddingTop', type: 'string', defaultValue: '0' }, { name: 'paddingRight', type: 'string', defaultValue: '0' }, { name: 'paddingBottom', type: 'string', defaultValue: '0' }],
    isContainer: true
};

var TEXT = {
    properties: [{ name: 'text', type: 'string' }, { name: 'fontColor', type: 'string' }, { name: 'fontSize', type: 'string' }, { name: 'lineHeight', type: 'string' }, { name: 'paddingLeft', type: 'string', defaultValue: '0' }, { name: 'paddingTop', type: 'string', defaultValue: '0' }, { name: 'paddingRight', type: 'string', defaultValue: '0' }, { name: 'paddingBottom', type: 'string', defaultValue: '0' }],
    isContainer: false
};

var HTML = {
    properties: [{ name: 'html', type: 'string', defaultValue: '' }],
    isContainer: false
};

var BLANK = {
    properties: [{ name: 'height', type: 'string', defaultValue: '0' }],
    isContainer: false
};

var LIST = {
    properties: [{ name: 'bulletColor', type: 'string' }, { name: 'fontColor', type: 'string' }, { name: 'paddingLeft', type: 'string', defaultValue: '0' }, { name: 'paddingTop', type: 'string', defaultValue: '0' }, { name: 'paddingRight', type: 'string', defaultValue: '0' }, { name: 'paddingBottom', type: 'string', defaultValue: '0' }],
    isContainer: true
};

var LIST_ITEM = {
    properties: [{ name: 'fontColor', type: 'string' }],
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

var ct = 0;
var getNewId = function getNewId() {
    ct++;
    return ct;
};

//格式化节点，添加默认值
var parseNodeFromJSON = function parseNodeFromJSON(json) {
    var nodeType = json.type;
    var cfgNode = config[nodeType];
    var node = {};
    node.type = nodeType;
    node.id = getNewId();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cfgNode.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                name = _step$value.name,
                defaultValue = _step$value.defaultValue;

            node[name] = json.hasOwnProperty(name) ? json[name] : defaultValue;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (cfgNode.isContainer) {
        node.childNodes = (json.childNodes || []).map(function (o) {
            o = parseNodeFromJSON(o);
            o.parentId = node.id; //父节点ID
            o.getParentNode = function () {
                return node;
            }; //父节点信息
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
var serializeNode = function serializeNode(node) {
    var nodeType = node.type;
    var cfgNode = config[nodeType];
    var json = {};
    json.type = nodeType;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = cfgNode.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var name = _step2.value.name;

            json[name] = node[name];
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    if (cfgNode.isContainer) {
        json.childNodes = node.childNodes.map(function (o) {
            return serializeNode(o);
        });
    }

    return json;
};

function pug_attr(t, e, n, f) {
    return e !== !1 && null != e && (e || "class" !== t && "style" !== t) ? e === !0 ? " " + (f ? t : t + '="' + t + '"') : ("function" == typeof e.toJSON && (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'") : "";
}
function pug_escape(e) {
    var a = "" + e,
        t = pug_match_html.exec(a);if (!t) return e;var r,
        c,
        n,
        s = "";for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {case 34:
                n = "&quot;";break;case 38:
                n = "&amp;";break;case 60:
                n = "&lt;";break;case 62:
                n = "&gt;";break;default:
                continue;}c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }return c !== r ? s + a.substring(c, r) : s;
}
var pug_has_own_property = Object.prototype.hasOwnProperty;
var pug_match_html = /["&<>]/;
function pug_style(r) {
    if (!r) return "";if ("object" == (typeof r === 'undefined' ? 'undefined' : _typeof(r))) {
        var t = "";for (var e in r) {
            pug_has_own_property.call(r, e) && (t = t + e + ":" + r[e] + ";");
        }return t;
    }return r += "", ";" !== r[r.length - 1] ? r + ";" : r;
}function xtmpl(locals) {
    var pug_html = "",
        pug_mixins = {},
        _pug_interp4;var locals_for_with = locals || {};(function (node) {
        var Types = { "MAIN": "MAIN", "IMG_CONTENT": "IMG_CONTENT", "TITLE_CONTENT": "TITLE_CONTENT", "BOTTOM_QR": "BOTTOM_QR", "SIGNATURE": "SIGNATURE", "IMG": "IMG", "IMG_LINK": "IMG_LINK", "CONTAINER": "CONTAINER", "TEXT": "TEXT", "HTML": "HTML", "BLANK": "BLANK", "LIST": "LIST", "LIST_ITEM": "LIST_ITEM" };
        var parseStyle = function parseStyle(css) {
            var rules = [];
            for (var key in css) {
                if (!css.hasOwnProperty(key)) continue;
                var value = css[key];
                if (value === false || value === undefined || value === null) continue;
                rules.push(key + ':' + value);
            }
            return rules.length ? rules.join(';') : false;
        };
        pug_mixins["MAIN"] = _pug_interp4 = function pug_interp(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var bgColor = node.bgColor;
            var childNodes = node.childNodes;
            pug_html = pug_html + '<html><head><meta charset="utf-8"/></head><body' + (pug_attr("bgcolor", bgColor || false, true, false) + pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor
            })), true, false)) + '><div' + (" class=\"main\"" + pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor
            })), true, false)) + '><table align="center" width="640" border="0"><tbody>';
            // iterate childNodes
            (function () {
                var $$obj = childNodes;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var childNode = $$obj[pug_index0];
                        pug_html = pug_html + '<tr>';
                        if (childNode.type === Types.BLANK) {
                            pug_mixins["createPartialPug"](childNode, node);
                        } else {
                            pug_html = pug_html + '<td>';
                            pug_mixins["createPartialPug"](childNode, node);
                            pug_html = pug_html + '</td>';
                        }
                        pug_html = pug_html + '</tr>';
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var childNode = $$obj[pug_index0];
                        pug_html = pug_html + '<tr>';
                        if (childNode.type === Types.BLANK) {
                            pug_mixins["createPartialPug"](childNode, node);
                        } else {
                            pug_html = pug_html + '<td>';
                            pug_mixins["createPartialPug"](childNode, node);
                            pug_html = pug_html + '</td>';
                        }
                        pug_html = pug_html + '</tr>';
                    }
                }
            }).call(this);

            pug_html = pug_html + '</tbody></table></div></body></html>';
        };
        pug_mixins["IMG_CONTENT"] = _pug_interp4 = function pug_interp(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
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

            pug_html = pug_html + '<table' + (" class=\"banner section\"" + pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor
            })), true, false) + pug_attr("bgColor", bgColor || false, true, false)) + '><tbody><tr><td><img' + (pug_attr("src", src || false, true, false) + pug_attr("alt", alt || false, true, false) + pug_attr("width", imgWith || false, true, false) + pug_attr("height", imgHeight || false, true, false)) + '/></td></tr><tr><td' + (" class=\"content\"" + pug_attr("style", pug_style(parseStyle({
                'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
                'font-size': fontSize,
                'color': fontColor,
                'line-height': lineHeight
            })), true, false)) + '>';
            // iterate childNodes
            (function () {
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

            pug_html = pug_html + '</td></tr></tbody></table>';
        };
        pug_mixins["TITLE_CONTENT"] = _pug_interp4 = function pug_interp(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
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

            pug_html = pug_html + '<table' + (" class=\"title section\"" + pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor
            })), true, false) + pug_attr("bgcolor", bgColor || false, true, false)) + '><tbody><tr><th><p' + pug_attr("style", pug_style(parseStyle({
                'color': fontColor,
                'background-image': bgColor && 'url("https://bqq.gtimg.com/qidian/src/themes/client/email/mail2-images/titleline_bg.png")',
                'background-size': bgColor && 'auto 100%'
            })), true, false) + '><span' + pug_attr("style", pug_style(parseStyle({
                'background-color': bgColor && '#fff'
            })), true, false) + '>' + pug_escape(null == (_pug_interp4 = title) ? "" : _pug_interp4) + '</span></p></th></tr><tr><td' + (" class=\"content\"" + pug_attr("style", pug_style(parseStyle({
                'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
                'font-size': fontSize,
                'color': fontColor,
                'line-height': lineHeight
            })), true, false)) + '>';
            // iterate childNodes
            (function () {
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

            pug_html = pug_html + '</td></tr></tbody></table>';
        };
        pug_mixins["BOTTOM_QR"] = _pug_interp4 = function _pug_interp(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            pug_html = pug_html + '<table class="section" width="100%" style="background-color:#fff;font-size:18px;"><tbody><tr><th width="200"><img src="https://bqq.gtimg.com/qidian/src/themes/client/email/images-1.7.0/images/wechat-qrcode.png" width="170" height="170" style="border: 6px solid #0067ED;border-radius: 2px;margin: 56px 30px 56px 50px;"/></th><td width="300"><p style="font-size:30px;padding-bottom:26px;">\u626B\u63CF\u4E8C\u7EF4\u7801\u5173\u6CE8\u6211\u4EEC</p><p style="line-height: 32px;">\u66F4\u591A\u4EA7\u54C1\u8D44\u8BAF\u3001\u529F\u80FD\u66F4\u65B0<br/>\u70B9\u51FB\u94FE\u63A5<a href="https://q.url.cn/s/Wl7JmJm" target="_blank">https://q.url.cn/s/Wl7JmJm</a><br/>\u52A0\u5165\u5B98\u65B9\u7FA4<a class="nolink" style="color: #000 !important;">576505898</a></p></td></tr></tbody></table>';
        };
        pug_mixins["SIGNATURE"] = _pug_interp4 = function _pug_interp(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var date = node.date; //日期
            pug_html = pug_html + '<p style="text-align: right;font-size: 16px;line-height:32px;color: #66686C;">\u817E\u8BAF\u4F01\u4E1A\u4EA7\u54C1\u4E2D\u5FC3<br/><a class="nolink" style="color: #66686C !important;">' + pug_escape(null == (_pug_interp4 = date) ? "" : _pug_interp4) + '</a></p>';
        };
        pug_mixins["IMG"] = _pug_interp4 = function _pug_interp2(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var src = node.src;
            var alt = node.alt;
            var imgWith = node.imgWidth;
            var imgHeight = node.imgHeight;
            pug_html = pug_html + '<img' + (pug_attr("src", src, true, false) + pug_attr("alt", alt || false, true, false) + pug_attr("width", imgWith || false, true, false) + pug_attr("height", imgHeight || false, true, false)) + '/>';
        };
        pug_mixins["IMG_LINK"] = _pug_interp4 = function _pug_interp2(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var src = node.src;
            var alt = node.alt;
            var url = node.url;
            var imgWith = node.imgWidth;
            var imgHeight = node.imgHeight;
            pug_html = pug_html + '<a' + (pug_attr("href", url, true, false) + " target=\"_blank\"") + '><img' + (pug_attr("src", src || false, true, false) + pug_attr("alt", alt || false, true, false) + pug_attr("width", imgWith || false, true, false) + pug_attr("height", imgHeight || false, true, false)) + '/></a>';
        };
        pug_mixins["CONTAINER"] = _pug_interp4 = function _pug_interp2(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var bgColor = node.bgColor;
            var paddingLeft = node.paddingLeft;
            var paddingRight = node.paddingRight;
            var paddingTop = node.paddingTop;
            var paddingBottom = node.paddingBottom;
            var childNodes = node.childNodes;

            pug_html = pug_html + '<div' + pug_attr("style", pug_style(parseStyle({
                'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
                'background-color': bgColor
            })), true, false) + '>';
            // iterate childNodes
            (function () {
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

            pug_html = pug_html + '</div>';
        };
        pug_mixins["TEXT"] = _pug_interp4 = function _pug_interp2(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var text = node.text;
            var fontColor = node.fontColor;
            var fontSize = node.fontSize;
            var lineHeight = node.lineHeight;
            var paddingLeft = node.paddingLeft;
            var paddingRight = node.paddingRight;
            var paddingTop = node.paddingTop;
            var paddingBottom = node.paddingBottom;
            pug_html = pug_html + '<p' + pug_attr("style", pug_style(parseStyle({
                'color': fontColor,
                'font-size': fontSize,
                'line-height': lineHeight,
                'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
            })), true, false) + '>' + pug_escape(null == (_pug_interp4 = text) ? "" : _pug_interp4) + '</p>';
        };
        pug_mixins["HTML"] = _pug_interp4 = function _pug_interp3(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var html = node.html;
            pug_html = pug_html + (null == (_pug_interp4 = html) ? "" : _pug_interp4);
        };
        pug_mixins["BLANK"] = _pug_interp4 = function _pug_interp4(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var height = node.height;
            if (parentNode && parentNode.type === Types.MAIN) {
                pug_html = pug_html + '<td' + pug_attr("style", pug_style(parseStyle({
                    'height': height,
                    'line-height': height
                })), true, false) + '>&nbsp;</td>';
            } else {
                pug_html = pug_html + '<div' + pug_attr("style", pug_style(parseStyle({
                    'height': height,
                    'line-height': height
                })), true, false) + '>&nbsp;</div>';
            }
        };
        pug_mixins["LIST"] = _pug_interp4 = function _pug_interp4(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var bulletColor = node.bulletColor;
            var paddingLeft = node.paddingLeft;
            var paddingRight = node.paddingRight;
            var paddingTop = node.paddingTop;
            var paddingBottom = node.paddingBottom;
            var childNodes = node.childNodes;
            pug_html = pug_html + '<ul' + pug_attr("style", pug_style(parseStyle({
                'margin': 0,
                'list-style-type': 'disc',
                'color': bulletColor,
                'padding': paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
            })), true, false) + '>';
            // iterate childNodes
            (function () {
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

            pug_html = pug_html + '</ul>';
        };
        pug_mixins["LIST_ITEM"] = _pug_interp4 = function _pug_interp4(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var fontColor = node.fontColor || parentNode && parentNode.fontColor;
            var childNodes = node.childNodes;
            pug_html = pug_html + '<li>';
            // iterate childNodes
            (function () {
                var $$obj = childNodes;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
                        var childNode = $$obj[pug_index5];
                        pug_html = pug_html + '<span' + pug_attr("style", pug_style(parseStyle({
                            'color': fontColor
                        })), true, false) + '>';
                        pug_mixins["createPartialPug"](childNode, node);
                        pug_html = pug_html + '</span>';
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index5 in $$obj) {
                        $$l++;
                        var childNode = $$obj[pug_index5];
                        pug_html = pug_html + '<span' + pug_attr("style", pug_style(parseStyle({
                            'color': fontColor
                        })), true, false) + '>';
                        pug_mixins["createPartialPug"](childNode, node);
                        pug_html = pug_html + '</span>';
                    }
                }
            }).call(this);

            pug_html = pug_html + '</li>';
        };
        pug_mixins["createPartialPug"] = _pug_interp4 = function _pug_interp4(node, parentNode) {
            var block = this && this.block,
                attributes = this && this.attributes || {};
            var type = node.type;
            if (type === Types.MAIN) {
                pug_mixins["MAIN"](node, parentNode);
            } else if (type === Types.IMG_CONTENT) {
                pug_mixins["IMG_CONTENT"](node, parentNode);
            } else if (type === Types.TITLE_CONTENT) {
                pug_mixins["TITLE_CONTENT"](node, parentNode);
            } else if (type === Types.BOTTOM_QR) {
                pug_mixins["BOTTOM_QR"](node, parentNode);
            } else if (type === Types.SIGNATURE) {
                pug_mixins["SIGNATURE"](node, parentNode);
            } else if (type === Types.IMG) {
                pug_mixins["IMG"](node, parentNode);
            } else if (type === Types.IMG_LINK) {
                pug_mixins["IMG_LINK"](node, parentNode);
            } else if (type === Types.CONTAINER) {
                pug_mixins["CONTAINER"](node, parentNode);
            } else if (type === Types.TEXT) {
                pug_mixins["TEXT"](node, parentNode);
            } else if (type === Types.HTML) {
                pug_mixins["HTML"](node, parentNode);
            } else if (type === Types.BLANK) {
                pug_mixins["BLANK"](node, parentNode);
            } else if (type === Types.LIST) {
                pug_mixins["LIST"](node, parentNode);
            } else if (type === Types.LIST_ITEM) {
                pug_mixins["LIST_ITEM"](node, parentNode);
            }
        };
        pug_mixins["createPartialPug"](node, null);
    }).call(this, "node" in locals_for_with ? locals_for_with.node : typeof node !== "undefined" ? node : undefined);return pug_html;
}

var css_code = "::-webkit-scrollbar{display:none}a{text-decoration:none}a:not(.nolink){color:#0067ed;cursor:pointer}.main,body,p{margin:0;padding:0}img{display:inline-block;border:0}table{border-collapse:collapse;border:0}.main{font-family:Helvetica,\"Helvetica Neue\",\"Helvetica Neue Light\",HelveticaNeue-Light,'微软雅黑','Microsoft Yahei',Calibri,Arial,sans-serif;padding:40px}.main>table,.section,img{margin:auto}.section{background-color:#fff;border-radius:10px;overflow:hidden;width:640px}.section.title>tbody>tr>th{padding:32px 40px 0;font-weight:400}.section.title>tbody>tr>th>p{text-align:center;font-size:26px;margin:0}.section.title>tbody>tr>th>p>span{padding:0 15px}";

var buildHtmlFromNode = function buildHtmlFromNode(node) {
    var html_code = xtmpl({ node: node });

    var $ = _cheerio2.default.load(html_code, {
        lowerCaseTags: true,
        lowerCaseAttributeNames: true,
        decodeEntities: false,
        recognizeSelfClosing: true
    });
    _client2.default.juiceDocument($, {
        extraCss: css_code,
        applyAttributesTableElements: true
    });

    //删除id和class
    $('[id]').removeAttr('id');
    $('[class]').removeAttr('class');

    //压缩优化style
    $('[style]').each(function (i, el) {
        var $el = $(el);
        var style = $el.attr('style');
        style = _csso2.default.minifyBlock(style, {}).css;
        $el.attr('style', style);
    });

    html_code = $.html();
    return html_code;
};

var createNode = function createNode(nodeType) {
    var _config$nodeType = config[nodeType],
        properties = _config$nodeType.properties,
        isContainer = _config$nodeType.isContainer;

    var json = {};
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _step3.value,
                name = _step3$value.name,
                defaultValue = _step3$value.defaultValue;

            if (defaultValue !== undefined) {
                json[name] = defaultValue;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    if (isContainer) {
        json.childNodes = [];
    }
    return parseNodeFromJSON(json);
};

var appendChild = function appendChild(parentNode, childNode) {
    //不是容器，不能插入子元素
    if (!config[parentNode.type].isContainer) {
        throw Error('Cannot appendChild in a non-container element');
    }
    //如果已经在树中，先移除
    removeNode(childNode);
    //插入新树
    parentNode.childNodes.push(childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = function () {
        return parentNode;
    };
};

var removeNode = function removeNode(childNode) {
    if (childNode.parentId) {
        var parentNode = childNode.getParentNode();
        var index = parentNode.childNodes.indexOf(childNode);
        parentNode.childNodes.splice(index, 1);
        childNode.parentId = 0;
        childNode.getParentNode = function () {
            return null;
        };
    }
};

var insertBefore = function insertBefore(baseNode, childNode) {
    if (!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(childNode);
    var parentNode = baseNode.getParentNode();
    var index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index, 0, childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = function () {
        return parentNode;
    };
};

var insertAfter = function insertAfter(baseNode, childNode) {
    if (!baseNode.parentId) {
        throw Error('Cannot insertBefore an element without parent');
    }
    removeNode(childNode);
    var parentNode = baseNode.getParentNode();
    var index = parentNode.childNodes.indexOf(baseNode);
    parentNode.childNodes.splice(index + 1, 0, childNode);
    childNode.parentId = parentNode.id;
    childNode.getParentNode = function () {
        return parentNode;
    };
};

var modules = ['MAIN', //主框架，邮件最顶层结构有且只有一个主框架
'IMG_CONTENT', //图片标题栏，下侧正文
'TITLE_CONTENT', //文字标题栏，下侧正文
'BOTTOM_QR', //底部二维码扫描关注提示
'SIGNATURE', //落款企点签名
'IMG', //但图片组件
'IMG_LINK', //图片超链接组件
'CONTAINER', //容器组件，用于布局结构占位
'TEXT', //文字组件
'HTML', //富文本HTML组件（开发中）
'BLANK', //空白，用于实现段落间隔
'LIST', //列表
'LIST_ITEM' //列表项
];

var Types = {};
modules.forEach(function (m) {
    Types[m] = m;
});

exports.config = config;
exports.Types = Types;
exports.parseNodeFromJSON = parseNodeFromJSON;
exports.serializeNodeToJSON = serializeNode;
exports.buildHtmlFromNode = buildHtmlFromNode;
exports.createNode = createNode;
exports.removeNode = removeNode;
exports.appendChild = appendChild;
exports.insertBefore = insertBefore;
exports.insertAfter = insertAfter;