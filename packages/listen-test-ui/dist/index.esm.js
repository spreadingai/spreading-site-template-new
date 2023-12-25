import * as React from 'react';
import React__default, { useRef, useEffect, useCallback } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$J = ".index-module_wrapper__sE9zS{background:#18181b;border-radius:8px;margin:28px 0;position:relative}.index-module_wrapper__sE9zS.index-module_noSpacing__29gZH{margin:0}.index-module_wrapper__sE9zS pre{margin-top:0}.index-module_tab_wrapper__wsOQg{align-items:center;background:#27272a;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;padding-right:12px;padding-top:4px}.index-module_tab_wrapper__wsOQg .index-module_tabList__vmLZA{align-items:center;background:#18181b;border-radius:8px 0 0 0;display:flex;overflow:auto}.index-module_tab_wrapper__wsOQg .index-module_tabList__vmLZA::-webkit-scrollbar{height:0;width:0}.index-module_tab_ai_switch_wrapper__jswxf{align-items:center;color:#fff;cursor:pointer;display:flex;flex-shrink:0;font-family:LexendDeca-Light,LexendDeca;font-size:12px;font-weight:300;justify-content:flex-end;line-height:14px;margin-inline-start:24px}.index-module_tab_ai_switch_wrapper__jswxf .index-module_ai_icon__I7u9l{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA+lJREFUGBntwU9o1nUcwPH35/P9/n6/zU1BbIWOFXaSCkYgSkSIFEKgmNtOER66KESHHbRbeDCICAIJRAJvEngIPMQy0IP9Be0Q0qlLqKBmWWx7tj3P7/v9fHqeudl43OY6t9eLdev+94QVNG98eM5yetMl4CRM/IWNz7z/C6u4/+fhjzxwzBE6nDbJuBimGTcQiTgRl7K5rf+zHmUZ/uupymbyfizSYThgozyOgCE4grNIcQR3QASngLwByyUdyjJyCvsCPZvEFdwBxzWP8Biu4CKggAIxk0KNaQIMEDDaMouUZQQvxpQCJSC0ieMw/PedE8+ympxPStRBgg4SwqA5P4IDDigqxXCMOhjrNJhivZ22SBe/dqYAP8BDDq6AoTmPAB+zgi1bzk0Ckyy4O/1WC1dAccDd7wz0n/2dJZRuveWrqGwGpUPcf+IhG+U/MKdNgQBUQB/dlG5BxkBQVdp+c+QU/9rduHF8G2vkAk7AibhHlqMs4efPB0wOssiZyFJ8jbiDAS4W5BBr5ERMCoyKTMU0/XRTlkg7Zvfi9gTOPEMm+rcfvwP+MzjgtI2wRpmS5BU1FTUVy1GWiGajnhKWM27WrGbyZdoELoLwQN4zeeudLaxB8pIWPTS9opkDDR6lLHA/oWYcyiaYCTnLNzJ8rEGbu1wEARxRQojVQdag6ZFWVlo50LISGv10UxZdfe4VcnhKTPGsWC0TLOif9u9AG8IDThphDeqstCzS8khtBdM8KrJIwph4BaYoGVeGG9dPn7Rijukyocz9JaQ+JCEir9279/bGgYGzU6xizkoSBXhJRlFadIu0ubtw9cKICAhgBkg8LOaIRB4oEKlBBFGqPnr2A5+zijkUd8WJmEBNH92Ujh++fIms28gBPKJEgkWEgLgCESEACg7mThYb4TFMIrUGWgrJA8uJtJmFMXUBUQgKwjWCN2JO5LoErUEhx/pFC/UmlxrHX795c7x3aOiTWVbQ8hL3SDYh5UySQLdIRypHIYEauDbplT1x5+gMXaZuj5+udfJo0kySsi/15n3ABRZcuffB1hTDk60W81LWPrOAuZDdCZnnv7h1aitt6mJvDL17PbYufb8Ly09DgXtCkCuyc+8My2gW9cXZonm0qcpcrmjoxlHgAgumrBz3OT2WXXAEQ8AFTACniVwWAiAktAn0xGDVmJABQXDAJ1jBHz506b6XdY0Wc9ZHM206cObameLIziM1bVOtAkExOgRHAEEccMFFQRQEcKUjilUv43KXeQ5iE6xgx8B7U5/ePv9VEZq7Qp0ISejZvGE38C1ts7l3CpG7OAscBDwAJswzhSCANFm3bl3bP+0AzlBg5MzhAAAAAElFTkSuQmCC\") no-repeat 50%;background-size:100%;display:inline-block;height:10px;margin-left:5px;margin-right:12px;width:15px}.index-module_tab_item__BsN4n{align-items:center;background:#27272a;box-sizing:border-box;color:hsla(0,0%,100%,.6);cursor:pointer;display:flex;justify-content:center;margin-right:2px;padding:10px 16px;width:max-content}.index-module_tab_item__BsN4n.index-module_active__mPAn5{background:#18181b;color:hsla(0,0%,100%,.9)}.index-module_tab_item__BsN4n:hover .index-module_tab_draggle_icon__0MBCP{display:block}.index-module_tab_item__BsN4n .index-module_tab_draggle_icon__0MBCP{cursor:move;display:none;height:16px;margin-right:3px;width:16px}.index-module_tab_item__BsN4n .index-module_tab_lang_icon__8oj3P{height:12px;width:12px}.index-module_tab_item__BsN4n .index-module_tab_lang_icon__8oj3P g[fill=\"#171717\"],.index-module_tab_item__BsN4n .index-module_tab_lang_icon__8oj3P path[fill=\"#171717\"]{fill:hsla(0,0%,100%,.6)}.index-module_tab_item__BsN4n .index-module_tab_lang_icon__8oj3P.index-module_active__mPAn5 g[fill=\"#171717\"],.index-module_tab_item__BsN4n .index-module_tab_lang_icon__8oj3P.index-module_active__mPAn5 path[fill=\"#171717\"]{fill:hsla(0,0%,100%,.9)}.index-module_tab_item__BsN4n .index-module_tab_filename__hpC6e{font-family:RobotoMono-Medium,RobotoMono;font-size:12px;font-weight:500;line-height:18px;margin-left:6px;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:max-content}.index-module_tab_item__BsN4n .index-module_tab_arrow_icon__NW5T8{height:14px;margin-left:6px;width:14px}.index-module_tab_add_icon__2trAo{cursor:pointer;height:20px;margin-left:8px;width:20px}.index-module_tab_blank__uwSiO{flex:1}";
var styles$7 = {
  "wrapper": "index-module_wrapper__sE9zS",
  "noSpacing": "index-module_noSpacing__29gZH",
  "tab_wrapper": "index-module_tab_wrapper__wsOQg",
  "tabList": "index-module_tabList__vmLZA",
  "tab_ai_switch_wrapper": "index-module_tab_ai_switch_wrapper__jswxf",
  "ai_icon": "index-module_ai_icon__I7u9l",
  "tab_item": "index-module_tab_item__BsN4n",
  "active": "index-module_active__mPAn5",
  "tab_draggle_icon": "index-module_tab_draggle_icon__0MBCP",
  "tab_lang_icon": "index-module_tab_lang_icon__8oj3P",
  "tab_filename": "index-module_tab_filename__hpC6e",
  "tab_arrow_icon": "index-module_tab_arrow_icon__NW5T8",
  "tab_add_icon": "index-module_tab_add_icon__2trAo",
  "tab_blank": "index-module_tab_blank__uwSiO"
};
styleInject(css_248z$J);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var IconCodeAdd = function IconCodeAdd(props) {
  return React__default.createElement("svg", __assign({
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    version: "1.1"
  }, props), React__default.createElement("title", null, "icon_code_add"), React__default.createElement("g", {
    id: "\u8BBE\u8BA1\uFF08\u6574\u7406\u7248\uFF09",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React__default.createElement("g", {
    id: "icon",
    transform: "translate(-400.000000, -912.000000)"
  }, React__default.createElement("g", {
    id: "icon_code_add",
    transform: "translate(400.000000, 912.000000)"
  }, React__default.createElement("rect", {
    id: "\u77E9\u5F62",
    fillOpacity: "0.293986287",
    fill: "#C8C8CE",
    opacity: "0",
    x: "0",
    y: "0",
    width: "20",
    height: "20",
    rx: "4"
  }), React__default.createElement("g", {
    id: "\u7F16\u7EC4",
    transform: "translate(5.500000, 5.500000)",
    stroke: "#E8E8E8",
    strokeLinecap: "square",
    strokeLinejoin: "round",
    strokeWidth: "1.4"
  }, React__default.createElement("line", {
    x1: "4.51944643",
    y1: "0",
    x2: "4.50768214",
    y2: "9",
    id: "\u8DEF\u5F84"
  }), React__default.createElement("line", {
    x1: "0",
    y1: "4.5",
    x2: "9",
    y2: "4.5",
    id: "\u8DEF\u5F84"
  }))))));
};

var IconCodeDown = function IconCodeDown(props) {
  return React__default.createElement("svg", __assign({
    width: "14px",
    height: "14px",
    viewBox: "0 0 14 14",
    version: "1.1"
  }, props), React__default.createElement("title", null, "icon_code_arrow"), React__default.createElement("g", {
    id: "\u8BBE\u8BA1\uFF08\u6574\u7406\u7248\uFF09",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, React__default.createElement("g", {
    id: "icon",
    transform: "translate(-240.000000, -915.000000)"
  }, React__default.createElement("g", {
    id: "icon_code_arrow",
    transform: "translate(247.000000, 922.000000) rotate(-270.000000) translate(-247.000000, -922.000000) translate(240.000000, 915.000000)"
  }, React__default.createElement("rect", {
    id: "\u77E9\u5F62",
    fill: "#D8D8D8",
    opacity: "0",
    x: "0",
    y: "0",
    width: "14",
    height: "14"
  }), React__default.createElement("polyline", {
    id: "\u8DEF\u5F84",
    stroke: "#E8E8E8",
    strokeWidth: "1.4",
    transform: "translate(7.750000, 7.250000) scale(-1, 1) translate(-7.750000, -7.250000) ",
    points: "9.39644661 10.5428932 6.10355339 7.25 9.39644661 3.95710678"
  })))));
};

var css_248z$I = ".index-module_toggle_switch__nU04G{display:inline-block;margin-right:10px;position:relative;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:middle}.index-module_toggle_switch_checkbox__e-D2d{display:none}.index-module_toggle_switch_label__hdurb{border:0 solid hsla(0,0%,100%,.3);border-radius:5px;cursor:pointer;display:block;margin:0;overflow:hidden}.index-module_toggle_switch_label__hdurb:focus{outline:none}.index-module_toggle_switch_label__hdurb:focus>span{box-shadow:0 0 2px 5px red}.index-module_toggle_switch_label__hdurb>span:focus{outline:none}.index-module_toggle_switch_inner__CK2lD{display:block;margin-left:-100%;transition:margin .3s ease-in 0s;width:200%}.index-module_toggle_switch_inner__CK2lD:after,.index-module_toggle_switch_inner__CK2lD:before{box-sizing:border-box;color:#fff;display:block;float:left;font-size:14px;font-weight:700;height:34px;line-height:34px;padding:0;width:50%}.index-module_toggle_switch_inner__CK2lD:before{background:linear-gradient(37deg,#0ce412,#a6ffc0);color:hsla(0,0%,100%,.8);content:attr(data-yes);padding-left:10px;text-transform:uppercase}.index-module_toggle_switch_inner__CK2lD:after{background-color:hsla(0,0%,100%,.3);color:hsla(0,0%,100%,.8);content:attr(data-no);padding-right:10px;text-align:right;text-transform:uppercase}.index-module_toggle_switch_disabled__x-oFI,.index-module_toggle_switch_disabled__x-oFI:before{background-color:#ddd;cursor:not-allowed}.index-module_toggle_switch_switch__IvjmG{background:hsla(0,0%,100%,.8);border:0 solid hsla(0,0%,100%,.3);border-radius:20px;bottom:0;display:block;margin:5px;position:absolute;right:40px;top:0;transition:all .3s ease-in 0s;width:24px}.index-module_toggle_switch_checkbox__e-D2d:checked+.index-module_toggle_switch_label__hdurb .index-module_toggle_switch_inner__CK2lD{margin-left:0}.index-module_toggle_switch_checkbox__e-D2d:checked+.index-module_toggle_switch_label__hdurb .index-module_toggle_switch_switch__IvjmG{background-color:#27272a;right:0}.index-module_toggle_switch__nU04G.index-module_small_switch__2oSpD{width:18px}.index-module_toggle_switch__nU04G.index-module_small_switch__2oSpD .index-module_toggle_switch_inner__CK2lD:after,.index-module_toggle_switch__nU04G.index-module_small_switch__2oSpD .index-module_toggle_switch_inner__CK2lD:before{content:\"\";height:10px;line-height:10px}.index-module_toggle_switch__nU04G.index-module_small_switch__2oSpD .index-module_toggle_switch_switch__IvjmG{height:8px;margin:1px;right:8px;width:8px}@media screen and (max-width:991px){.index-module_toggle_switch__nU04G{transform:scale(.9)}}@media screen and (max-width:767px){.index-module_toggle_switch__nU04G{transform:scale(.825)}}@media screen and (max-width:575px){.index-module_toggle_switch__nU04G{transform:scale(.75)}}";
var styles$6 = {
  "toggle_switch": "index-module_toggle_switch__nU04G",
  "toggle_switch_checkbox": "index-module_toggle_switch_checkbox__e-D2d",
  "toggle_switch_label": "index-module_toggle_switch_label__hdurb",
  "toggle_switch_inner": "index-module_toggle_switch_inner__CK2lD",
  "toggle_switch_disabled": "index-module_toggle_switch_disabled__x-oFI",
  "toggle_switch_switch": "index-module_toggle_switch_switch__IvjmG",
  "small_switch": "index-module_small_switch__2oSpD"
};
styleInject(css_248z$I);

var Switch = function Switch(_a) {
  var id = _a.id,
    name = _a.name,
    checked = _a.checked,
    _onChange = _a.onChange,
    disabled = _a.disabled;
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;
    e.preventDefault();
    _onChange(!checked);
  }
  return React__default.createElement("div", {
    className: "".concat(styles$6.toggle_switch, " ").concat(styles$6.small_switch)
  }, React__default.createElement("input", {
    type: "checkbox",
    name: name,
    className: styles$6.toggle_switch_checkbox,
    id: id,
    checked: checked,
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    disabled: disabled
  }), id ? React__default.createElement("label", {
    className: styles$6.toggle_switch_label,
    tabIndex: disabled ? -1 : 1,
    onKeyDown: function onKeyDown(e) {
      return handleKeyPress(e);
    },
    htmlFor: id
  }, React__default.createElement("span", {
    className: "".concat(styles$6.toggle_switch_inner, " ").concat(disabled ? styles$6.toggle_switch_disabled : ""),
    "data-yes": "Yes",
    "data-no": "No",
    tabIndex: -1
  }), React__default.createElement("span", {
    className: "".concat(styles$6.toggle_switch_switch, "  ").concat(disabled ? styles$6.toggle_switch_disabled : ""),
    tabIndex: -1
  })) : null);
};

var _path$3;
function _extends$O() { _extends$O = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$O.apply(this, arguments); }
var SvgIconLanguageAsp = function SvgIconLanguageAsp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$O({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "evenodd",
    d: "M12 0v12H0V0h12ZM6.073 7.421a1.63 1.63 0 0 0-.503.077c-.159.051-.3.124-.42.22a1.08 1.08 0 0 0-.29.34.895.895 0 0 0-.107.432c0 .147.023.28.07.398a.876.876 0 0 0 .212.315c.096.091.215.17.358.233.143.064.31.117.501.16.072.014.14.03.207.048.067.017.13.038.189.063a.81.81 0 0 1 .156.082c.044.031.079.067.104.107.024.04.037.085.037.135 0 .065-.02.12-.061.165a.386.386 0 0 1-.17.104.785.785 0 0 1-.245.035c-.18 0-.354-.038-.522-.116-.169-.078-.335-.227-.5-.45l-.517.584c.113.146.24.271.384.376.143.104.307.184.492.239.184.055.393.082.625.082.265 0 .5-.044.706-.133.205-.088.367-.217.484-.386.118-.169.177-.374.177-.617a.874.874 0 0 0-.335-.72 1.537 1.537 0 0 0-.387-.219 2.791 2.791 0 0 0-.499-.144 2.465 2.465 0 0 1-.227-.055 1.02 1.02 0 0 1-.195-.078.44.44 0 0 1-.136-.108.221.221 0 0 1-.05-.143c0-.066.02-.122.061-.167a.385.385 0 0 1 .169-.103.931.931 0 0 1 .797.137c.082.058.158.13.228.218l.524-.507a1.312 1.312 0 0 0-.302-.325c-.118-.09-.26-.16-.426-.207a2.147 2.147 0 0 0-.59-.072ZM3.102 7.5H2.38L.996 11h.837l.249-.67h1.285l.25.67h.858L3.102 7.5Zm6.488 0H8.078V11h.85V9.832h.662a1.119 1.119 0 0 0 .999-.58c.1-.179.151-.38.151-.605a1.11 1.11 0 0 0-.563-.997c-.173-.1-.369-.15-.587-.15ZM2.728 8.544l.026.082.04.126a15.81 15.81 0 0 0 .16.471l.173.464h-.805l.171-.456.044-.123.044-.12a6.88 6.88 0 0 0 .157-.472l-.01.028ZM9.47 8.25c.075 0 .142.016.202.05a.38.38 0 0 1 .143.141c.036.06.054.133.054.217a.443.443 0 0 1-.054.221.4.4 0 0 1-.143.149.382.382 0 0 1-.202.055h-.553V8.25Z"
  })));
};

var _g$K;
function _extends$N() { _extends$N = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$N.apply(this, arguments); }
var SvgIconLanguageC$2 = function SvgIconLanguageC(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$N({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$K || (_g$K = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6.005 0a.53.53 0 0 1 .287.068l4.476 2.699a.678.678 0 0 1 .223.262l-.032.02a.61.61 0 0 1 .041.242V8.7c0 .184-.111.427-.269.524l-4.448 2.709a.633.633 0 0 1-.288.068.53.53 0 0 1-.287-.068L1.241 9.223a.545.545 0 0 1-.176-.184l.015-.01a.605.605 0 0 1-.08-.32V3.3c0-.184.111-.427.269-.524L5.717.068A.633.633 0 0 1 6.005 0Zm0 2.165c-2.02 0-3.661 1.718-3.661 3.835s1.64 3.835 3.66 3.835c1.354 0 2.54-.777 3.17-1.922L7.98 7.175c-.39.718-1.131 1.204-1.974 1.204C4.753 8.379 3.734 7.31 3.734 6c0-1.31 1.02-2.379 2.27-2.379.844 0 1.585.486 1.975 1.214l1.205-.728c-.63-1.156-1.817-1.942-3.18-1.942Z"
  }))));
};

var _g$J;
function _extends$M() { _extends$M = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$M.apply(this, arguments); }
var SvgIconLanguageC$1 = function SvgIconLanguageC(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$M({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$J || (_g$J = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6.005 0a.53.53 0 0 1 .287.068l4.476 2.699a.678.678 0 0 1 .223.262l-.032.02a.61.61 0 0 1 .041.242V8.7c0 .184-.111.427-.269.524l-4.448 2.709a.633.633 0 0 1-.288.068.53.53 0 0 1-.287-.068L1.241 9.223a.545.545 0 0 1-.176-.184l.015-.01a.605.605 0 0 1-.08-.32V3.3c0-.184.111-.427.269-.524L5.717.068A.633.633 0 0 1 6.005 0Zm0 2.165c-2.02 0-3.661 1.718-3.661 3.835s1.64 3.835 3.66 3.835c1.354 0 2.54-.777 3.17-1.922L7.98 7.175c-.39.718-1.131 1.204-1.974 1.204C4.753 8.379 3.734 7.31 3.734 6c0-1.31 1.02-2.379 2.27-2.379.844 0 1.585.486 1.975 1.214l1.205-.728c-.63-1.156-1.817-1.942-3.18-1.942ZM9.047 4.9h-.373l-.077.445H8.24v.343l.297-.001-.085.498h-.326v.343l.267-.001-.08.473h.373l.08-.473h.417L9.104 7h.373l.08-.473h.353v-.342h-.293l.085-.498h.32v-.342H9.76l.076-.445h-.374l-.076.445H8.97l.076-.445Zm.28.787-.084.498h-.416l.085-.498h.416Z"
  }))));
};

var _g$I;
function _extends$L() { _extends$L = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$L.apply(this, arguments); }
var SvgIconLanguageClojure = function SvgIconLanguageClojure(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$L({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$I || (_g$I = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M5.752 6.108c-.06.13-.126.275-.194.429-.24.546-.508 1.21-.605 1.636-.04.18-.058.363-.056.548 0 .082.005.168.011.257.341.125.709.194 1.093.195.34-.001.678-.056 1-.163a1.904 1.904 0 0 1-.208-.221c-.427-.544-.665-1.341-1.041-2.681M4.178 3.407A3.174 3.174 0 0 0 2.828 6a3.174 3.174 0 0 0 1.313 2.567c.195-.811.683-1.553 1.415-3.042-.043-.12-.093-.25-.148-.387-.203-.51-.496-1.1-.757-1.367-.14-.143-.3-.266-.473-.364m4.586 6.232c-.42-.053-.767-.116-1.07-.223a3.812 3.812 0 0 1-4.206-6.281 2.79 2.79 0 0 0-.662-.081c-1.118.01-2.298.629-2.79 2.301-.046.243-.035.427-.035.645A6 6 0 0 0 10.91 9.45a6.984 6.984 0 0 1-1.636.218c-.181 0-.351-.01-.51-.03M7.638 8.477c.037.018.12.049.237.082A3.177 3.177 0 0 0 9.174 6h-.001a3.177 3.177 0 0 0-3.172-3.172c-.339 0-.675.055-.996.162.644.734.954 1.783 1.253 2.93v.002c.001.001.097.319.26.74s.394.943.646 1.323c.166.255.349.438.473.491M6 0a5.99 5.99 0 0 0-4.876 2.507 3.044 3.044 0 0 1 1.65-.479 3.223 3.223 0 0 1 1.509.366c.063.037.124.076.183.117a3.812 3.812 0 0 1 4.212 6.202c.172.019.354.031.542.03.664 0 1.383-.146 1.92-.599.352-.296.646-.729.809-1.378A6 6 0 0 0 6 0"
  }))));
};

var _g$H;
function _extends$K() { _extends$K = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$K.apply(this, arguments); }
var SvgIconLanguageC = function SvgIconLanguageC(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$K({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$H || (_g$H = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6.005 0a.53.53 0 0 1 .287.068l4.476 2.699a.678.678 0 0 1 .223.262l-.032.02a.61.61 0 0 1 .041.242V8.7c0 .184-.111.427-.269.524l-4.448 2.709a.633.633 0 0 1-.288.068.53.53 0 0 1-.287-.068L1.241 9.223a.545.545 0 0 1-.176-.184l.015-.01a.605.605 0 0 1-.08-.32V3.3c0-.184.111-.427.269-.524L5.717.068A.633.633 0 0 1 6.005 0Zm0 2.165c-2.02 0-3.661 1.718-3.661 3.835s1.64 3.835 3.66 3.835c1.354 0 2.54-.777 3.17-1.922L7.98 7.175c-.39.718-1.131 1.204-1.974 1.204C4.753 8.379 3.734 7.31 3.734 6c0-1.31 1.02-2.379 2.27-2.379.844 0 1.585.486 1.975 1.214l1.205-.728c-.63-1.156-1.817-1.942-3.18-1.942Zm2.101 3.251h-.425v.538h-.537v.391h.537v.538h.425v-.539l.54.001v-.39h-.54v-.539Zm1.79 0h-.425v.538h-.537v.391h.537v.538h.426v-.539l.54.001v-.39h-.54v-.539Z"
  }))));
};

var _g$G;
function _extends$J() { _extends$J = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$J.apply(this, arguments); }
var SvgIconLanguageCss = function SvgIconLanguageCss(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$J({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$G || (_g$G = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "m1 0 .91 10.8L5.993 12l4.096-1.2L11 0H1Zm7.57 8.97L6 9.725l-2.564-.757-.175-2.082h1.256l.09 1.06 1.396.407.004.006h.001l1.393-.398.145-1.718H4.62l-.104-1.34h3.142l.114-1.365H2.98l-.104-1.312H9.14l-.57 6.746Z"
  }))));
};

var _g$F;
function _extends$I() { _extends$I = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$I.apply(this, arguments); }
var SvgIconLanguageCypher = function SvgIconLanguageCypher(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$I({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$F || (_g$F = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM5.318 8.413a1.506 1.506 0 0 0 0 1.714c.226.257.565.395.914.37.249.007.492-.07.688-.218.21-.166.347-.403.384-.662h-.391a.731.731 0 0 1-.296.457.834.834 0 0 1-1.024-.12 1.022 1.022 0 0 1-.179-.66c-.02-.234.043-.468.179-.662a.698.698 0 0 1 .584-.258.75.75 0 0 1 .426.105.548.548 0 0 1 .234.344h.392a.865.865 0 0 0-.323-.568 1.128 1.128 0 0 0-.688-.219 1.091 1.091 0 0 0-.9.377ZM2.016 1.002a.965.965 0 0 0 .175 1.2L1.6 8.445H1.53C.961 8.446.5 8.891.5 9.44s.462.992 1.031.992c.57 0 1.03-.444 1.03-.992a.95.95 0 0 0-.123-.463L5.256 5.72c.302.123.648.098.928-.066l3.313 2.13a.97.97 0 0 0 .35 1.122c.36.261.852.268 1.218.018.367-.25.523-.7.386-1.112a1.028 1.028 0 0 0-.985-.69v.013a.992.992 0 0 0-.158 0L9.27 3.127c.43-.07.767-.395.841-.808a.98.98 0 0 0-.51-1.034A1.063 1.063 0 0 0 8.42 1.4a.968.968 0 0 0-.283 1.111L6.163 3.934a1.03 1.03 0 0 0-.88-.06L3.807 1.977a.951.951 0 0 0 .137-.483 1 1 0 0 0-.766-.96 1.048 1.048 0 0 0-1.16.469Zm-.485 8.12c.19 0 .344.147.344.33 0 .183-.154.33-.344.33a.337.337 0 0 1-.344-.33c0-.183.154-.33.344-.33Zm8.935-1.324c.19 0 .344.148.344.33 0 .183-.154.332-.344.332a.337.337 0 0 1-.344-.331c0-.183.154-.331.344-.331ZM3.284 2.426 4.76 4.325a.928.928 0 0 0 0 .952l-.013.007-2.433 2.812.529-5.597h.062c.13-.001.258-.026.378-.073Zm5.264.675L9.58 7.07 6.624 5.15a.92.92 0 0 0 0-.66L8.548 3.1ZM5.655 4.49c.19 0 .344.147.344.33 0 .183-.154.33-.344.33a.337.337 0 0 1-.344-.33c0-.183.154-.33.344-.33ZM9.09 1.843c.19 0 .344.148.344.33 0 .183-.154.331-.344.331v-.079l-.15.033a.323.323 0 0 1-.186-.284c0-.18.15-.328.336-.331Zm-6.185-.662c.19 0 .343.148.343.331 0 .183-.154.33-.343.33a.337.337 0 0 1-.344-.33c0-.183.154-.33.344-.33Z"
  }))));
};

var _g$E;
function _extends$H() { _extends$H = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$H.apply(this, arguments); }
var SvgIconLanguageD = function SvgIconLanguageD(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$H({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$E || (_g$E = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM8.026 5.4H5.728V11h2.298c.408 0 .78-.068 1.116-.203a2.474 2.474 0 0 0 1.419-1.463c.13-.344.195-.722.195-1.134a3.16 3.16 0 0 0-.195-1.133 2.575 2.575 0 0 0-.558-.886 2.488 2.488 0 0 0-.864-.578A2.94 2.94 0 0 0 8.026 5.4Zm-.04 1.08c.24 0 .456.042.646.123.19.081.352.197.488.347.136.15.24.33.312.542.072.212.107.448.107.708 0 .26-.035.497-.107.71a1.515 1.515 0 0 1-.31.543 1.376 1.376 0 0 1-.488.344 1.643 1.643 0 0 1-.648.122H6.927V6.48Z"
  }))));
};

var _g$D;
function _extends$G() { _extends$G = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$G.apply(this, arguments); }
var SvgIconLanguageDart = function SvgIconLanguageDart(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$G({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$D || (_g$D = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M2.053 2.053 5.841.159A1.54 1.54 0 0 1 6.582 0c.384.024.839.394.839.394L12 4.975v4.894H9.868V12H4.894l-4.5-4.5A1.395 1.395 0 0 1 0 6.553c0-.16.09-.41.158-.553l1.895-3.947Zm.339.34v5.893c.001.271.01.512.249.754l2.461 2.46h4.266V9.369L2.392 2.393Zm6.027-.34c-.449-.447-.904-.89-1.37-1.32C6.9.598 6.766.497 6.514.5A1.793 1.793 0 0 0 6.08.6L3.17 2.053h5.25Z"
  }))));
};

var _g$C;
function _extends$F() { _extends$F = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$F.apply(this, arguments); }
var SvgIconLanguageDiff = function SvgIconLanguageDiff(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$F({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$C || (_g$C = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M10.875 3.25 7.769.12A.402.402 0 0 0 7.486 0H3.739a.105.105 0 0 0-.103.107v.75c0 .06.046.107.103.107h3.54l2.8 2.82v6.395c0 .059.047.107.103.107h.716a.105.105 0 0 0 .102-.107V3.557a.434.434 0 0 0-.125-.308ZM7.029 1.84a.4.4 0 0 0-.289-.126H2.41a.419.419 0 0 0-.41.429v9.428c0 .237.183.429.41.429h6.545c.226 0 .409-.192.409-.429V4.464a.438.438 0 0 0-.12-.303l-2.215-2.32Zm.187 7.388c0 .05-.044.093-.096.093H4.244a.096.096 0 0 1-.096-.093v-.563c0-.05.043-.094.096-.094H7.12c.052 0 .096.043.096.094v.563Zm0-2.947c0 .051-.044.094-.096.094H6.04v1.137c0 .052-.04.095-.09.095h-.537c-.048 0-.09-.043-.09-.095V6.375h-1.08a.096.096 0 0 1-.095-.094V5.72c0-.052.043-.094.096-.094h1.08V4.488c0-.052.04-.095.09-.095h.536c.05 0 .09.043.09.095v1.137h1.08c.052 0 .096.042.096.094v.562Z"
  }))));
};

var _g$B;
function _extends$E() { _extends$E = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$E.apply(this, arguments); }
var SvgIconLanguageDockerfile = function SvgIconLanguageDockerfile(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$E({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$B || (_g$B = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm2.765 3.783-.135.202c-.175.296-.255.64-.228.983.015.189.076.372.178.532a1.41 1.41 0 0 1-.685.157H1.79l-.015.07a3.15 3.15 0 0 0 .633 2.298c.522.64 1.3.965 2.322.965 2.212 0 3.85-1.063 4.617-2.985a1.275 1.275 0 0 0 1.286-.66l.085-.183.032-.072-.185-.112a1.59 1.59 0 0 0-1.03-.123 1.415 1.415 0 0 0-.575-.933l-.195-.14Zm-5.388.825H2.45V5.5h.927v-.893Zm1.098 0h-.927V5.5h.927v-.893Zm1.1 0h-.93V5.5h.93v-.893Zm1.105 0h-.93V5.5h.93v-.893Zm1.09 0h-.93V5.5h.93v-.893ZM6.68 3.554h-.93v.877h.93v-.877Zm-1.105 0h-.93v.877h.93v-.877Zm-1.1 0h-.927v.877h.927v-.877ZM6.673 2.5H5.75v.877h.93L6.673 2.5Z"
  }))));
};

var _g$A;
function _extends$D() { _extends$D = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$D.apply(this, arguments); }
var SvgIconLanguageErlang = function SvgIconLanguageErlang(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$D({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$A || (_g$A = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M.407 5.785C.405 7.488.95 8.915 1.883 9.946H0V2h1.635C.857 2.985.405 4.28.407 5.785ZM12 2.002h-1.568c.59.838.914 1.913.867 3.192.01.118.01.23 0 .473H4.316c-.003 2.153.73 3.824 2.599 3.832 1.284-.006 2.212-1 2.848-2.082l1.808.946a8.253 8.253 0 0 1-1.086 1.585H12V2.002ZM10.548 10s0-.02 0 0h-.04.04Zm-.103-7.941h.06l-.02-.021-.04.02Zm-4.344.131c-.86.002-1.595.658-1.672 1.633h3.185c-.02-.975-.646-1.63-1.513-1.633Z"
  }))));
};

var _g$z;
function _extends$C() { _extends$C = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }
var SvgIconLanguageGo = function SvgIconLanguageGo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$C({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$z || (_g$z = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M5.083 3.015c.426.32.73.76.932 1.29.048.083.016.128-.08.156-.507.146-.852.256-1.35.402-.12.037-.129.046-.233-.091-.12-.156-.209-.256-.377-.348-.506-.283-.996-.201-1.454.137-.546.403-.827.997-.82 1.738.009.732.45 1.336 1.085 1.437.546.082 1.004-.138 1.365-.604.073-.1.137-.21.217-.339h-1.55c-.169 0-.209-.119-.153-.274.105-.284.297-.76.41-.997.024-.055.08-.147.2-.147h2.496a4.05 4.05 0 0 1 .548-1.159c.584-.87 1.289-1.323 2.24-1.513.817-.163 1.585-.073 2.282.462.632.49 1.024 1.151 1.128 2.021.136 1.224-.176 2.22-.92 3.072a3.557 3.557 0 0 1-1.92 1.16c-.217.046-.433.055-.641.082-.728-.018-1.393-.254-1.953-.798a2.9 2.9 0 0 1-.765-1.28c-.082.17-.174.333-.277.487-.579.87-1.334 1.41-2.29 1.555-.787.12-1.518-.055-2.16-.603C.449 8.348.11 7.67.023 6.83c-.105-.997.153-1.894.683-2.68.57-.85 1.325-1.39 2.249-1.583.755-.155 1.477-.055 2.128.448Zm3.653 1.32c-.744.19-1.224.724-1.4 1.576-.144.707.16 1.423.736 1.713.44.218.88.19 1.304-.054.632-.372.977-.952 1.017-1.731-.008-.118-.008-.209-.024-.3-.144-.897-.873-1.404-1.633-1.205Z"
  }))));
};

var _path$2;
function _extends$B() { _extends$B = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$B.apply(this, arguments); }
var SvgIconLanguageGraphql = function SvgIconLanguageGraphql(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$B({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "evenodd",
    d: "M12 0v12H6c.647 0 1.181-.495 1.22-1.129l2.665-1.333A1.233 1.233 0 0 0 11.335 9c.178-.3.214-.662.099-.99a1.207 1.207 0 0 0-.698-.722V4.713c.327-.13.581-.394.697-.722.115-.329.08-.69-.096-.991a1.236 1.236 0 0 0-1.534-.506l-2.58-1.292A1.21 1.21 0 0 0 6 0a1.21 1.21 0 0 0-1.222 1.2L2.197 2.493A1.235 1.235 0 0 0 .663 3a1.182 1.182 0 0 0-.096.99c.115.33.37.593.697.723v2.574c-.328.13-.582.394-.697.722-.115.329-.08.69.096.991.296.505.907.717 1.451.537l2.666 1.334C4.817 11.505 5.353 12 6 12H0V0h12ZM9.144 8.85l.017.04-2.24 1.12A1.228 1.228 0 0 0 6 9.6c-.368 0-.697.158-.921.41L2.839 8.89l.016-.039h6.289ZM5.991 2.58l3.155 5.366-6.29.004-.01-.022L5.991 2.58Zm.884-.542L9.137 3.17c-.24.61.064 1.297.682 1.542v2.576L6.781 2.123a1.39 1.39 0 0 0 .094-.085Zm-1.75 0c.026.027.053.052.082.076L2.18 7.26V4.712c.618-.245.922-.93.682-1.542Z"
  })));
};

var _g$y;
function _extends$A() { _extends$A = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$A.apply(this, arguments); }
var SvgIconLanguageGroovy = function SvgIconLanguageGroovy(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$A({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$y || (_g$y = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6 0a6 6 0 1 0-.001 11.997A6 6 0 0 0 6 .001V0Zm.743 1.436c.54 0 .977.155 1.313.463.338.307.508.704.508 1.193 0 .527-.19.992-.569 1.394-.38.401-.816.601-1.308.601-.289 0-.528-.07-.72-.211-.188-.141-.282-.316-.282-.522 0-.126.036-.237.107-.334.076-.097.163-.146.26-.146.094 0 .141.055.141.165 0 .097.036.171.108.225.072.053.155.08.25.08.25 0 .49-.171.72-.513.231-.345.348-.713.348-1.105 0-.275-.09-.5-.269-.673a.945.945 0 0 0-.691-.263c-.424 0-.834.188-1.232.565-.395.376-.718.871-.97 1.485-.247.612-.371 1.195-.371 1.747 0 .508.11.913.329 1.213.219.299.511.448.875.448.615 0 1.202-.436 1.764-1.305l.885-.126c.11-.015.164.011.164.08 0 .032-.043.166-.128.404-.084.239-.2.637-.347 1.196.486-.283.863-.595 1.129-.937v.542c-.214.248-.62.526-1.223.837-.125.834-.404 1.478-.833 1.933-.43.458-.913.688-1.45.688-.256 0-.459-.06-.606-.18a.604.604 0 0 1-.216-.493c0-.584.566-1.15 1.698-1.699.119-.423.235-.804.348-1.143-.198.286-.484.538-.86.758-.377.219-.727.328-1.05.328-.527 0-.965-.227-1.316-.682-.349-.458-.522-1.036-.522-1.736 0-.737.197-1.435.593-2.094a4.593 4.593 0 0 1 1.556-1.585c.643-.399 1.265-.598 1.867-.598Zm-.725 7.227c-.815.407-1.223.81-1.223 1.204 0 .21.1.316.301.316.395 0 .702-.507.922-1.52Z"
  }))));
};

var _g$x;
function _extends$z() { _extends$z = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }
var SvgIconLanguageHandlebars = function SvgIconLanguageHandlebars(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$z({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$x || (_g$x = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM4.259 5C2.878 5 2.152 6.792 1.354 6.792c-.492 0-.565-.349-.565-.471 0-.171.118-.364.283-.364.296 0 .208.397.208.397s.4-.286.136-.669c-.211-.306-.657-.32-.963-.087-.31.235-.53.59-.428 1.178.05.283.235.695.619.93.383.234.965.291 1.17.291 1.101 0 2.178-.84 3.33-1.196.244-.073.496-.112.75-.114.326-.013.65.026.964.116C8.009 7.158 9.086 8 10.187 8c.205 0 .787-.057 1.17-.292.384-.234.568-.647.617-.93.103-.588-.117-.943-.427-1.179-.306-.233-.75-.218-.962.089-.263.382.136.668.136.668s-.089-.397.207-.397c.165 0 .284.192.284.363 0 .123-.074.472-.566.472-.797 0-1.524-1.792-2.905-1.792-1.286 0-1.542.606-1.736.885-.006.005-.007.001-.01-.002C5.802 5.606 5.545 5 4.26 5Z"
  }))));
};

var _g$w;
function _extends$y() { _extends$y = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }
var SvgIconLanguageHaml = function SvgIconLanguageHaml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$y({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$w || (_g$w = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM2.338 0C1.74-.015 1 .313 1 .313l2.447 5.204-1.298 5.815a2.552 2.552 0 0 0 2.437.566l.047-.016.608-4.502c.076.075.156.145.237.208.261.194.544.342.826.456a5.937 5.937 0 0 0 1.445.376 1.492 1.492 0 0 0-.13.66c0 .024.01.046.033.058h.01c.207.114.424.205.663.262.228.045.478.068.718.034.25-.034.5-.137.695-.308.196-.17.337-.398.424-.638l.01-.011v-.011l.033-.308v-.011c.11-.069.218-.137.326-.228.13-.114.25-.24.337-.4a1.04 1.04 0 0 0 .13-.546 1.452 1.452 0 0 0-.152-.524 2.338 2.338 0 0 0-.282-.444 3.009 3.009 0 0 0-.76-.65 3.75 3.75 0 0 0-.881-.433l-.12-.034-.097-.034c-.065-.023-.12-.057-.174-.08a.682.682 0 0 1-.24-.228c-.108-.17-.119-.433-.064-.706.01-.068.032-.137.054-.205.022-.069.043-.137.065-.217a1.46 1.46 0 0 0 .03-.23l1.452-1.332C9.716 1.418 8.462.962 8.462.962L4.735 4.285 2.585.03l-.12-.02L2.338 0Zm5.357 3.814c-.023.122-.032.25-.032.379.01.194.065.41.184.593.12.182.283.319.446.398.08.042.164.077.25.103l.13.034.109.023c.283.08.554.193.804.342.25.148.49.33.685.535.195.205.347.467.37.73a.862.862 0 0 1-.066.432 1.2 1.2 0 0 1-.24.342 1.39 1.39 0 0 1-.14.125 1.481 1.481 0 0 0-.076-.467c-.022-.045-.044-.102-.098-.136-.011 0-.022 0-.022.01-.065.172-.174.32-.293.423a.725.725 0 0 1-.424.159 1.427 1.427 0 0 1-.478-.068c-.163-.046-.326-.103-.49-.16L8.294 7.6a.1.1 0 0 0-.098.023c-.087.114-.152.216-.228.33a3.093 3.093 0 0 0-.141.262l-.576-.228c-.272-.114-.544-.228-.794-.364a3.948 3.948 0 0 1-.728-.445 2.042 2.042 0 0 1-.407-.4l.12-.896 2.254-2.068Z"
  }))));
};

var _g$v;
function _extends$x() { _extends$x = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }
var SvgIconLanguageHaxe = function SvgIconLanguageHaxe(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$x({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$v || (_g$v = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M11.967 8.697 10.617 6l1.349-2.697.034-.067V0H8.764l-.067.033L6 1.381 3.303.033 3.236 0H0v3.236l.033.067L1.383 6 .033 8.697 0 8.765V12h3.236l.067-.034L6 10.616l2.697 1.35.067.034H12V8.765l-.033-.068ZM9.995 5.736l-3.73-3.733L11.236.761l-1.24 4.975Zm-7.992 0L.76.765l4.976 1.242-3.732 3.729Zm0 .53 3.731 3.73L.763 11.24l1.24-4.974Zm7.993 0 1.244 4.971-4.972-1.243 3.728-3.728Z"
  }))));
};

var _g$u;
function _extends$w() { _extends$w = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }
var SvgIconLanguageHtml = function SvgIconLanguageHtml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$w({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$u || (_g$u = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M.5 0h11l-.9 10.553L5.937 12 1.5 10.553.5 0Zm8.808 3.189.266-1.601-7.084-.013.456 4.803h4.613v1.255l-1.546.55-1.61-.576-.101-.679-1.267.013.19 1.69 2.712.961 2.851-.909.368-3.868H4.137L4.01 3.19h5.298Z"
  }))));
};

var _g$t;
function _extends$v() { _extends$v = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }
var SvgIconLanguageHttp = function SvgIconLanguageHttp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$v({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$t || (_g$t = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM1.964 8.2h-.6V11h.6l-.001-1.123h1.166V11h.6V8.2h-.6v1.13H1.963l.001-1.13Zm4.516 0H4.226v.54h.815V11h.6V8.74h.84V8.2ZM9 8.2H6.745v.54h.815V11h.6V8.74h.839V8.2Zm1.683 0H9.495V11h.6v-.979h.587a.85.85 0 0 0 .452-.122.903.903 0 0 0 .319-.331.933.933 0 0 0 .118-.47c0-.17-.04-.323-.118-.458a.876.876 0 0 0-.771-.44Zm-.067.54c.063 0 .121.016.172.047a.348.348 0 0 1 .124.128c.03.055.046.118.046.19a.393.393 0 0 1-.046.193.364.364 0 0 1-.124.133.312.312 0 0 1-.172.05h-.526v-.74Z"
  }))));
};

var _g$s;
function _extends$u() { _extends$u = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }
var SvgIconLanguageJava = function SvgIconLanguageJava(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$u({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$s || (_g$s = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M12 0v12H0V0h12ZM3.593 8.503c-4.586 1.462 5.179 2.29 6.279.234-1.241.68-7.941 1.228-6.28-.234Zm4.024-.728c-.921.38-2.412.621-2.605 0-1.05.899 2.15 1.293 2.605 0Zm.54-1.6c.907-.103 1.112.657.235 1.49 1.973-.73.672-2.47-.234-1.49Zm-3.361-.103c-3.83.994 2.719 2.236 3.362.292-.772.68-5.336.775-3.362-.292Zm2.95-2.836c-2.281.668-1.67 1.667-1.302 2.377l.066.13c.081.167.135.314.113.431.512-.265.43-.639.287-1.049l-.069-.192c-.208-.58-.377-1.21.905-1.697Zm-.787-1.77c.322 1.74-4.078 2.048-1.005 4.46-1.363-2.807 1.78-1.667 1.005-4.46Z"
  }))));
};

var _g$r;
function _extends$t() { _extends$t = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }
var SvgIconLanguageJavascript = function SvgIconLanguageJavascript(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$t({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$r || (_g$r = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M0 0h12v12H0V0Zm11.017 9.138c-.087-.547-.444-1.008-1.502-1.436-.368-.173-.777-.293-.898-.57-.046-.165-.053-.255-.023-.353.075-.323.458-.42.758-.33.194.06.374.21.487.45.518-.338.518-.338.878-.563-.135-.21-.202-.3-.293-.39-.315-.352-.734-.532-1.417-.516l-.352.044c-.339.082-.66.263-.855.502-.57.646-.406 1.771.284 2.236.683.51 1.68.622 1.808 1.103.12.585-.435.772-.983.705-.405-.09-.63-.294-.878-.668l-.915.525c.106.24.226.345.405.554.87.879 3.045.834 3.436-.501.014-.046.12-.353.037-.825l.023.033ZM6.526 5.516H5.402c0 .968-.005 1.931-.005 2.902 0 .616.031 1.182-.069 1.356-.165.344-.59.3-.783.24-.198-.099-.298-.234-.415-.428-.032-.053-.055-.098-.064-.098l-.912.563c.152.315.375.585.662.758.428.255 1.002.338 1.604.203.391-.114.729-.346.905-.706.255-.465.201-1.035.199-1.673.005-1.027 0-2.054 0-3.09l.002-.027Z"
  }))));
};

var _g$q;
function _extends$s() { _extends$s = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }
var SvgIconLanguageJson = function SvgIconLanguageJson(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$s({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$q || (_g$q = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM2.884 8.2H1.35v.53h.514v1.352a.46.46 0 0 1-.047.211.353.353 0 0 1-.329.196.388.388 0 0 1-.231-.067.647.647 0 0 1-.152-.141l-.083-.11-.352.364c.043.077.092.147.15.21a.873.873 0 0 0 .438.26 1.081 1.081 0 0 0 .645-.03.835.835 0 0 0 .48-.464.932.932 0 0 0 .069-.363V8.731h.432V8.2Zm1.535-.056c-.14 0-.271.02-.395.06-.124.041-.233.098-.327.173a.838.838 0 0 0-.223.264.701.701 0 0 0-.082.336c0 .116.019.222.055.315a.697.697 0 0 0 .167.25.96.96 0 0 0 .28.185c.112.05.243.091.393.123.068.013.131.028.19.045.058.017.112.037.16.06.05.022.092.047.126.075.035.028.062.06.08.095a.249.249 0 0 1 .029.118.221.221 0 0 1-.057.151.363.363 0 0 1-.155.099.666.666 0 0 1-.222.035.924.924 0 0 1-.421-.098c-.13-.066-.26-.188-.392-.369l-.376.426c.088.118.188.218.3.3.111.084.238.147.38.19.141.042.3.063.474.063.212 0 .398-.035.558-.106a.86.86 0 0 0 .376-.307.844.844 0 0 0 .136-.484.699.699 0 0 0-.067-.31.698.698 0 0 0-.193-.239 1.215 1.215 0 0 0-.304-.174 2.214 2.214 0 0 0-.397-.118l-.109-.025-.1-.029a.736.736 0 0 1-.163-.073.342.342 0 0 1-.105-.098.224.224 0 0 1-.038-.128c0-.06.018-.112.054-.155a.346.346 0 0 1 .15-.1.665.665 0 0 1 .227-.034.728.728 0 0 1 .447.152c.066.051.126.114.181.19l.382-.372a1.005 1.005 0 0 0-.238-.263 1.007 1.007 0 0 0-.334-.166 1.586 1.586 0 0 0-.447-.057Zm2.838 0c-.206 0-.395.036-.568.108a1.37 1.37 0 0 0-.752.762c-.07.175-.105.368-.105.578 0 .21.035.402.105.578a1.356 1.356 0 0 0 .752.762c.173.072.363.108.57.108.205 0 .395-.036.567-.108a1.363 1.363 0 0 0 .75-.764c.071-.177.106-.369.106-.577 0-.208-.035-.4-.105-.575a1.371 1.371 0 0 0-1.32-.872Zm2.506.056h-.537V11h.587V9.992l-.002-.152-.013-.24-.044-.48L11.162 11h.545V8.2h-.588v.928l.006.296.012.263.02.245.018.178L9.763 8.2Zm-2.506.512a.759.759 0 0 1 .583.25.86.86 0 0 1 .17.28c.04.106.06.223.06.35 0 .127-.02.244-.06.351a.86.86 0 0 1-.17.28.759.759 0 0 1-.583.25.78.78 0 0 1-.754-.528 1.012 1.012 0 0 1-.06-.353c0-.128.02-.246.06-.353a.82.82 0 0 1 .17-.278.78.78 0 0 1 .584-.249Z"
  }))));
};

var _g$p;
function _extends$r() { _extends$r = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }
var SvgIconLanguageKotlin = function SvgIconLanguageKotlin(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$r({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$p || (_g$p = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M.65 12 6.3 6.25 12 12H.65ZM0 0h6L0 6.25V0Zm6.7 0L0 7v5l6-6 6-6H6.7Z"
  }))));
};

var _g$o;
function _extends$q() { _extends$q = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }
var SvgIconLanguageLess = function SvgIconLanguageLess(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$q({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$o || (_g$o = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 12H0V6.75c.384.01.511.222.511.423 0 .354-.06.566-.06.978 0 .624.236.825.76.825h.384v-.442h-.118c-.246 0-.325-.097-.325-.413 0-.315.03-.586.03-.94 0-.442-.147-.612-.442-.68v-.03c.296-.067.442-.238.442-.68 0-.345-.03-.625-.03-.94 0-.316.07-.403.325-.403h.264V7.2c0 .586.206.97.808.97.188 0 .336-.03.443-.068l-.1-.624a.386.386 0 0 1-.115.015c-.07 0-.158-.06-.158-.24V4H1.22c-.532 0-.768.2-.768.825 0 .412.06.642.06.996 0 .201-.128.413-.512.431V0h12v6.25c-.384-.013-.512-.226-.512-.426 0-.375.06-.595.06-.996 0-.624-.236-.826-.76-.826h-.384v.442h.119c.266 0 .324.086.324.404 0 .297-.03.595-.03.94 0 .441.148.613.443.68v.03c-.297.067-.443.239-.443.68 0 .345.03.624.03.94 0 .327-.07.413-.324.413v.01h-.12V9h.386c.521 0 .76-.2.76-.825 0-.412-.06-.624-.06-.996 0-.201.127-.413.511-.431V12ZM6.865 5.161c-.669 0-1.123.375-1.123.902 0 .47.424.71.779.843.305.115.6.212.6.404 0 .144-.117.238-.383.238-.246 0-.493-.096-.76-.297l-.384.557c.296.239.748.403 1.123.403.787 0 1.212-.403 1.212-.93.002-.528-.423-.749-.807-.873-.306-.115-.581-.182-.581-.374 0-.144.118-.23.335-.23.218 0 .415.085.63.239l.394-.507c-.245-.183-.581-.375-1.035-.375Zm2.395 0c-.67 0-1.123.375-1.123.902 0 .47.424.71.778.843.305.115.602.212.602.404 0 .144-.118.238-.384.238-.246 0-.494-.096-.76-.297l-.394.557c.297.239.748.403 1.123.403.788 0 1.213-.403 1.213-.93 0-.528-.423-.749-.807-.873-.297-.115-.573-.182-.573-.374 0-.144.12-.23.337-.23.217 0 .414.085.63.239l.393-.507c-.246-.183-.582-.375-1.035-.375Zm-5.045-.009c-.72 0-1.409.587-1.39 1.507 0 .949.642 1.505 1.488 1.505a1.99 1.99 0 0 0 1.054-.326L5.07 7.33a1.262 1.262 0 0 1-.641.183c-.394 0-.7-.183-.779-.624h1.786c.01-.068.03-.201.03-.354.012-.779-.423-1.383-1.25-1.383Zm.01.643c.354 0 .493.239.493.566H3.653c.06-.384.296-.566.572-.566Z"
  }))));
};

var _g$n;
function _extends$p() { _extends$p = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }
var SvgIconLanguageLiquid = function SvgIconLanguageLiquid(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$p({
    xmlns: "http://www.w3.org/2000/svg",
    width: 10,
    height: 12
  }, props), _g$n || (_g$n = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M-1 0h12v12H-1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "m5.118.045.294.181C8.47 2.521 10 4.755 10 6.868 10 9.706 7.765 12 5 12S0 9.706 0 6.868C0 4.694 1.588 2.4 4.824.045c.117-.06.235-.06.294 0Zm1.94 6.823h-.587c-.118 0-.236.12-.295.241v.121c-.058.604-.529 1.087-1.058 1.087L5 8.377h-.059c-.117 0-.235.121-.235.242v.664c0 .12.118.242.235.302h.177c1.176-.06 2.176-1.027 2.235-2.294v-.182c0-.12-.118-.241-.294-.241Z"
  }))));
};

var _g$m;
function _extends$o() { _extends$o = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }
var SvgIconLanguageMarkdown = function SvgIconLanguageMarkdown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$o({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$m || (_g$m = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M10.462 4H8.615v2.353H7.077L9.538 9 12 6.353h-1.538V4ZM0 0h12v12H0V8.706h1.23V5.665l1.847 1.764 1.846-1.764v3.04h1.23V4h-1.23L3.077 5.765 1.23 4H0V0Z"
  }))));
};

var _g$l;
function _extends$n() { _extends$n = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }
var SvgIconLanguageObjectiveC = function SvgIconLanguageObjectiveC(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$n({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$l || (_g$l = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M2.55 0v.954H1.155v10.092h1.393V12H0V0h2.55ZM12 0v12H9.45v-.955h1.394V.955H9.451V0H12ZM7.921 1.35a3.632 3.632 0 0 1 2.343 2.615l.043.158a74.35 74.35 0 0 0-2.37.46c-.139-.726-.482-1.298-1.216-1.476a2.004 2.004 0 0 0-2.515 1.354c-.061.178-.11.36-.146.545-.062.324-.09.654-.083.984a3.802 3.802 0 0 0 .446 1.952 2.072 2.072 0 0 0 2.397.913 1.625 1.625 0 0 0 1.174-1.363c.04-.23.043-.231.043-.231l2.384.343-.043.166a4.265 4.265 0 0 1-1.027 2.044 3.59 3.59 0 0 1-2.04 1.019 5.563 5.563 0 0 1-3.145-.31 3.852 3.852 0 0 1-2.193-2.368 6.138 6.138 0 0 1 .007-4.34A4.003 4.003 0 0 1 5.387 1.14a5.09 5.09 0 0 1 2.534.21Z"
  }))));
};

var _g$k;
function _extends$m() { _extends$m = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }
var SvgIconLanguageOcaml = function SvgIconLanguageOcaml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$m({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$k || (_g$k = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M0 5.275v-2.83C.007 1.642.684.995 1.512 1h8.976c.828-.006 1.505.64 1.512 1.446V11H7.02a8.383 8.383 0 0 1-.394-1.237 1.677 1.677 0 0 0-.02-.31.728.728 0 0 0-.135-.166 1.448 1.448 0 0 1-.24-.646c-.009-.202-.085-.386-.098-.583-.004-.097.007-.198 0-.292a.92.92 0 0 0-.031-.222l.026-.062c.099-.019.2-.023.3-.013.12 0 .233.007.352.014.234.014.469.005.701-.027.327-.042.636-.171.893-.373.31-.229.553-.532.706-.88.037-.22.123-.428.25-.612.246-.116.505-.2.772-.25a.564.564 0 0 1 .373-.06c.103.02.288.133.331-.026a.284.284 0 0 1-.066-.083c.192-.019.005-.442-.073-.527a1.018 1.018 0 0 0-.514-.242 1.64 1.64 0 0 0-.701-.092 1.168 1.168 0 0 1-.614-.146.966.966 0 0 0-.884.28.602.602 0 0 1-.154.224.708.708 0 0 0-.021.25c-.031.097-.078.433-.127.552a.575.575 0 0 1-.359.448c-.217.04-.442.03-.654-.033-.121-.043-.328-.11-.428-.15a.916.916 0 0 1-.554-.394A32.676 32.676 0 0 1 5.036 4.1a1.352 1.352 0 0 0-.322-.468.63.63 0 0 0-.578-.263.768.768 0 0 0-.394.137c-.09.12-.166.25-.225.387-.054.084-.148.315-.234.507a.806.806 0 0 1-.153.285.227.227 0 0 1-.334-.018 4.533 4.533 0 0 1-.32-.5c-.322-.534-.448-.774-.817-.776-.468 0-.504.25-.71.617A2.562 2.562 0 0 1 0 5.275ZM0 8.55V11h2.325s.188-.692.23-.833c.042-.1.076-.201.102-.305.01-.1.005-.202-.012-.301a.998.998 0 0 1 .281-.531c.086-.186.14-.397.214-.583a.964.964 0 0 1 .37-.531 3.93 3.93 0 0 0-.492-.047 9.368 9.368 0 0 1-.935-.166 6.447 6.447 0 0 1-.609-.203 1.53 1.53 0 0 0-.497-.308.355.355 0 0 0-.262.146c-.043.1-.079.203-.106.309a1.93 1.93 0 0 1-.175.307A4.17 4.17 0 0 0 0 8.55Zm6.466 2.076c-.044-.09-.1-.264-.138-.343a2.165 2.165 0 0 0-.197-.321.497.497 0 0 1-.18-.308 5.344 5.344 0 0 0-.406-1.174A1.812 1.812 0 0 0 5.143 8a1.598 1.598 0 0 0-.469-.31 1.44 1.44 0 0 0-.842.887c-.13.181-.247.37-.351.567-.046.2-.125.39-.234.565a1.548 1.548 0 0 0-.338.563c-.017.042-.15.728-.15.728h3.856l-.006-.016a4.15 4.15 0 0 0-.143-.358Z"
  }))));
};

var _g$j;
function _extends$l() { _extends$l = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }
var SvgIconLanguagePerl = function SvgIconLanguagePerl(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$l({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$j || (_g$j = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 11.465h-.899c-.003-.04-.005-.08-.003-.12.019-.03-.026-.247-.1-.477-.118-.367-.127-.425-.067-.674.011-.043.027-.186.034-.32.012-.256.024-.32.09-.487a.943.943 0 0 0 .086-.368.854.854 0 0 0-.076-.435.54.54 0 0 1-.043-.382c.032-.175.032-.585 0-.716-.032-.13-.048-.603-.043-1.209l.067-.74c.102-.401.165-.545.247-.545.076 0 .147.124.195.349.03.208.015.422.053.63.048.287-.03.574-.176.822-.088.153-.118.264-.096.344.018.064.083.135.134.148.022.006.05-.003.08-.02.04-.019.079-.068.215-.271.092-.139.18-.285.195-.325.127-.558.132-.97.062-1.52 0-.356-.05-.49-.295-.759-.46-.575-.726-1.08-.99-1.758a3.398 3.398 0 0 0-.324-.449 1.582 1.582 0 0 1-.333-.611C9.89 1.26 9.785.89 9.603.62c-.171-.193-.33-.404-.58-.502a1.227 1.227 0 0 0-.51-.118L12 0v11.465ZM9.699 6.062c.117 0 .189.13.223.406.04.27.17.502.253.76.05.183.085.266.2.496.108.22.2.463.228.612.015.079.02.188.02.416 0 .335.01.468.051.64.032.13.047.503.034.754-.008.147-.011.166-.09.402-.118.345-.145.446-.167.62a.884.884 0 0 1-.078.297H8.945c-.164-.02-.329-.037-.494-.053.082-.045.137-.15.162-.325a.565.565 0 0 0-.005-.22c-.038-.221-.09-.307-.247-.439a.86.86 0 0 1-.129-.129.343.343 0 0 1-.042-.258c.023-.111.132-.31.257-.477.111-.151.17-.245.261-.42a.92.92 0 0 1 .162-.21c.062-.065.13-.154.153-.197l.038-.076v-.435c-.002-.31.016-.61.057-.917.034-.368.164-.658.343-.975.102-.212.15-.272.238-.272Zm-1.843 4.954c.048.004.103.065.176.177a.679.679 0 0 0 .186.2 20.633 20.633 0 0 0-.657-.043c.07-.044.12-.1.162-.186.048-.101.085-.152.133-.148ZM6.124 6.788c.168 0 .243.023.295.09.048.065.054.144.014.316-.018.078-.04.217-.048.31-.016.205-.052.321-.142.483-.102.18-.117.217-.12.454v.115c0 .276.003.304.03.387.015.049.046.115.07.148.055.073.215.211.386.334.165.119.353.302.467.454.12.16.292.318.314.525a.722.722 0 0 1-.452.626c-.177.087-.244.143-.257.215a.123.123 0 0 0 .014.077 21.02 21.02 0 0 0-1.81.062c.036-.172.07-.355.077-.483.007-.12.023-.258.043-.353a3.17 3.17 0 0 0 .043-.32 1.09 1.09 0 0 1 .133-.488c.045-.097.097-.226.114-.286a.601.601 0 0 0 .03-.19v-.142l-.001-.103c-.003-.28.004-.338.028-.487.05-.296.072-.384.167-.578.13-.264.14-.304.152-.545.015-.28.06-.425.157-.525a.275.275 0 0 1 .19-.096c.03-.003.066 0 .106 0Zm1.966-.162c.018.001.036.012.057.028.058.047.072.098.104.45.017.183.04.412.053.51.06.434.07.57.052.717a7.015 7.015 0 0 0-.024.344c-.016.317-.06.457-.233.755a4.89 4.89 0 0 0-.143.263c-.051.108-.106.181-.162.21-.054.028-.125.023-.195-.014a1.836 1.836 0 0 1-.357-.278 1.31 1.31 0 0 1-.233-.334c-.119-.213-.133-.258-.133-.353 0-.125.045-.217.166-.335.086-.083.17-.167.253-.253.175-.182.18-.19.223-.45.04-.233.041-.237.205-.477.059-.086.087-.164.157-.43.065-.246.095-.307.148-.334.025-.013.043-.02.062-.02ZM8.1.014c-.264.055-.51.178-.763.268-.39.154-.767.417-.928.817-.04.088-.217.376-.31.506a2.87 2.87 0 0 1-.609.511c-.272.163-.494.377-.761.736-.27.372-.294.696-.429 1.118-.207.22-.372-.084-.318-.297.127-.514.355-.978.323-1.523C4.227 1.43 3.931.472 3.082.416c-.19 0-.244.03-.457.224-.143.13-.238.174-.471.234-.28.069-.577.021-.838.143-.125.074-.276.298-.31.459-.027.134.04.267.172.34.267.125.723.031.78.405-.09.396-.338.67-.323 1.066-.018.432.037.79.066 1.213.039.519.413.794.672 1.228.39.499 1.081 1.02 1.747.817.23-.075.323-.062.409.062.059.084.067.162.033.348-.04.228-.04.66 0 .903.03.18.053.454.053.607 0 .125.024.281.057.41.02.085.025.173.033.46.006.192.016.381.024.42.027.13.02.237-.038.645a3.173 3.173 0 0 1-.172.62c-.032.073-.114.241-.185.378l-.02.038c-.082.009-.123.018-.13.029H1V12H0V0h8.383C8.294.004 8.2.01 8.099.015Z"
  }))));
};

var _g$i;
function _extends$k() { _extends$k = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }
var SvgIconLanguagePhp = function SvgIconLanguagePhp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$k({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$i || (_g$i = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12Zm-1.53 4.05H8.576L7.695 8h.986l.234-1.05h.845c.372 0 .68-.035.92-.103.245-.07.469-.188.656-.344.165-.133.299-.28.401-.439a1.6 1.6 0 0 0 .218-.528c.105-.469.026-.833-.236-1.094-.262-.261-.678-.392-1.248-.392Zm-7.694 0H.88L0 8h.986l.234-1.05h.845c.372 0 .679-.035.92-.103a1.8 1.8 0 0 0 .656-.344c.165-.133.299-.28.4-.439.105-.165.18-.343.22-.528.104-.469.025-.833-.237-1.094-.262-.262-.678-.392-1.248-.392ZM5.962 3h-.978l-.88 3.95h.979l.504-2.263h.781c.251 0 .415.036.492.109.076.072.093.208.048.406L6.52 6.95h.994l.409-1.838c.082-.374.02-.645-.188-.811-.209-.167-.586-.25-1.135-.25h-.872L5.962 3Zm-3.56 1.673c.376 0 .625.06.75.18.124.121.154.329.089.622-.068.306-.2.524-.394.655-.195.13-.49.196-.889.196h-.6l.37-1.653Zm7.697 0c.374 0 .624.06.749.18.124.121.155.329.09.622-.07.306-.2.524-.395.655-.194.13-.49.196-.889.196h-.6l.37-1.653Z"
  }))));
};

var _g$h;
function _extends$j() { _extends$j = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }
var SvgIconLanguagePowershell = function SvgIconLanguagePowershell(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$j({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$h || (_g$h = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M9.488 10.5H.48a.502.502 0 0 1-.379-.186.455.455 0 0 1-.087-.397l1.77-7.7c.038-.397.38-.704.796-.717h8.957c.143.004.278.07.365.179.087.109.118.25.085.383l-1.81 7.89a.706.706 0 0 1-.69.548Zm-6.44-1.204L7.19 6.327a.526.526 0 0 0 .076-.785L4.53 2.645c-.45-.477-1.221.246-.771.723l2.327 2.458-3.652 2.618a.515.515 0 0 0-.28.478.52.52 0 0 0 .325.452c.19.08.41.05.568-.078ZM8.112 8.27H5.915c-.276 0-.5.214-.5.477 0 .264.224.477.5.477h2.198a.487.487 0 0 0 .465-.477.488.488 0 0 0-.465-.476Z"
  }))));
};

var _g$g;
function _extends$i() { _extends$i = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }
var SvgIconLanguagePython = function SvgIconLanguagePython(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$i({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$g || (_g$g = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M4.495.118c-1.211.214-1.43.661-1.43 1.49v1.09h2.863v.364H1.99c-.833 0-1.561.5-1.79 1.451-.262 1.09-.272 1.77 0 2.91.204.846.69 1.45 1.522 1.45h.983V7.568c0-.946.817-1.779 1.79-1.779h2.86c.796 0 1.43-.656 1.43-1.454v-2.73c0-.776-.653-1.358-1.43-1.489-.959-.158-2-.15-2.86.003Zm-.18.76a.545.545 0 0 1 0 1.09.541.541 0 0 1-.538-.543.544.544 0 0 1 .538-.546Zm4.96 2.18v1.273c0 .986-.835 1.816-1.789 1.816h-2.86c-.782 0-1.43.67-1.43 1.455v2.726c0 .777.674 1.232 1.43 1.455.905.265 1.776.313 2.86 0 .72-.21 1.43-.63 1.43-1.455v-1.09H6.06v-.364h4.29c.834 0 1.142-.581 1.431-1.452.3-.897.287-1.76 0-2.909-.206-.827-.597-1.451-1.43-1.451H9.276v-.003Zm-1.61 6.906c.298 0 .54.244.54.544a.542.542 0 0 1-.54.546.545.545 0 0 1 0-1.09Z"
  }))));
};

var _g$f;
function _extends$h() { _extends$h = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }
var SvgIconLanguageR = function SvgIconLanguageR(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$h({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$f || (_g$f = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM6 1.5c-3.312 0-6 1.811-6 4.044 0 2.016 2.192 3.685 5.056 3.99v.934l1.888.032-.004-.966a8.266 8.266 0 0 0 1.437-.28l.605 1.237h2.105l-.01-.014-.066-.104a80.707 80.707 0 0 1-.531-.883l-.184-.309a74.907 74.907 0 0 1-.35-.595C11.204 7.845 12 6.756 12 5.544 12 3.31 9.312 1.5 6 1.5Zm.935 6.543s.294.018.547.018c.253 0 .492.371.492.371l.106.215c-.328.046-.668.07-1.018.07l-.125-.003Zm.127-4.938c2.539 0 4.6 1.256 4.6 2.806 0 .945-.768 1.781-1.945 2.287-.08-.117-.134-.145-.197-.206-.082-.078-.389-.22-.651-.302.642-.033 1.626-.404 1.626-1.798 0-1.394-1.658-1.595-1.658-1.595H5.056l-.001 4.139C3.521 7.98 2.462 7.02 2.462 5.91c0-1.55 2.06-2.806 4.6-2.806Zm1.136 2.512.02.002c.09.01.384.084.384.58 0 .413-.479.519-.479.519H6.881v-1.1h1.317Z"
  }))));
};

var _g$e;
function _extends$g() { _extends$g = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }
var SvgIconLanguageRuby = function SvgIconLanguageRuby(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$g({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$e || (_g$e = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M10.078.005c1.517.264 1.946 1.307 1.915 2.4L12 2.388l-.682 9L2.445 12h.008C1.716 11.97.075 11.901 0 9.592l.822-1.51 1.41 3.314.251.59 1.403-4.6-.015.003.007-.015L8.506 8.86l-.698-2.732-.495-1.962 4.41-.287-.307-.257L8.25 1.026 10.08 0l-.002.005ZM.044 9.575v.09-.1.01Zm2.521-7.06C4.345.738 6.644-.312 7.525.583c.882.895-.052 3.072-1.836 4.848C3.909 7.21 1.638 8.316.758 7.422c-.883-.894.022-3.128 1.805-4.905l.002-.002Z"
  }))));
};

var _g$d;
function _extends$f() { _extends$f = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }
var SvgIconLanguageRust = function SvgIconLanguageRust(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$f({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$d || (_g$d = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M11.887 6.163c-.136.087-.275.17-.412.256a.14.14 0 0 0-.024.233c.117.112.238.22.355.333.127.123.103.256-.062.322-.146.058-.295.11-.443.166-.12.045-.148.141-.072.247l.255.356c.125.175.076.295-.137.333-.144.026-.288.046-.432.072-.136.024-.177.106-.118.235.061.136.126.272.186.409.076.174-.002.288-.193.282-.158-.005-.316-.013-.474-.016a.138.138 0 0 0-.147.18l.106.462c.041.188-.052.283-.237.241-.154-.034-.307-.07-.461-.105a.139.139 0 0 0-.184.154c.003.146.008.292.015.438.01.221-.103.302-.302.212-.136-.062-.272-.125-.409-.186a.141.141 0 0 0-.212.113c-.03.163-.053.328-.084.49-.031.159-.158.21-.291.117-.134-.093-.262-.19-.394-.284-.1-.071-.196-.041-.24.074-.056.148-.109.296-.166.443-.065.164-.2.192-.321.067-.11-.114-.216-.232-.324-.347-.085-.09-.184-.08-.249.023-.07.114-.14.228-.212.342-.145.235-.263.233-.41-.005-.07-.114-.14-.228-.212-.342a.141.141 0 0 0-.24-.022c-.11.115-.216.232-.325.346-.127.133-.259.106-.327-.066-.056-.143-.108-.288-.162-.432-.045-.121-.141-.152-.245-.078-.128.092-.255.187-.385.276-.14.097-.265.048-.298-.117-.032-.163-.055-.327-.085-.49a.137.137 0 0 0-.205-.11c-.137.061-.273.124-.41.186-.206.093-.316.017-.307-.214.006-.146.013-.292.016-.438.003-.115-.074-.174-.188-.149-.158.036-.315.074-.473.109-.161.036-.264-.066-.228-.226.035-.154.073-.307.108-.461.03-.136-.027-.205-.17-.201-.138.003-.276.008-.414.015-.23.01-.308-.1-.215-.307.062-.136.125-.272.185-.41a.139.139 0 0 0-.108-.205C.943 8.454.778 8.43.616 8.4.449 8.368.4 8.243.497 8.103.59 7.97.686 7.841.78 7.71a.145.145 0 0 0-.072-.233C.56 7.42.412 7.366.265 7.31c-.172-.066-.2-.2-.069-.326.105-.101.214-.2.32-.3.126-.118.117-.198-.033-.29-.124-.077-.25-.152-.372-.231-.148-.096-.148-.233.001-.328.136-.087.275-.17.412-.257a.14.14 0 0 0 .026-.232c-.117-.112-.238-.22-.355-.332-.127-.123-.101-.258.061-.323.147-.058.295-.11.443-.166.119-.045.147-.142.072-.247-.087-.123-.176-.243-.263-.366-.112-.158-.065-.282.123-.317.147-.028.296-.048.444-.074.148-.026.19-.105.128-.24-.061-.137-.125-.272-.186-.41-.076-.172.004-.287.194-.28.075.002.15.007.225.012v.004h.238c.124 0 .181-.071.154-.194L1.72 1.95c-.039-.169.061-.269.23-.231.159.035.316.072.473.109a.14.14 0 0 0 .184-.143c-.003-.159-.013-.316-.017-.474-.006-.197.11-.274.291-.194.14.062.28.128.42.191a.14.14 0 0 0 .213-.111c.029-.163.052-.328.085-.49.032-.16.156-.21.291-.117.134.091.263.19.395.283.1.07.195.04.239-.074.054-.144.106-.289.161-.432.07-.18.202-.207.334-.07l.308.33c.095.102.19.095.263-.02.081-.131.16-.263.243-.393.099-.154.235-.153.334.002.087.136.17.275.256.412a.14.14 0 0 0 .226.023c.112-.117.22-.238.332-.355.128-.134.26-.107.328.064.054.136.104.273.156.409.06.158.14.182.28.081l.346-.25c.152-.106.277-.058.311.122.028.147.048.296.074.444.027.155.106.197.246.133.133-.06.265-.123.398-.182.18-.08.295-.002.288.196-.006.154-.012.308-.016.462a.14.14 0 0 0 .185.152c.13-.03.264-.052.391-.093.251-.082.373.047.297.289-.04.127-.064.26-.094.391-.028.12.032.194.157.19.154-.003.308-.01.462-.015.19-.006.268.11.191.284-.063.144-.13.287-.194.431a.139.139 0 0 0 .106.207c.163.03.327.053.49.085.167.032.218.156.121.296-.092.133-.19.262-.283.394a.144.144 0 0 0 .07.233c.143.055.288.106.432.161.192.074.215.206.063.349l-.31.292c-.115.107-.105.191.03.275.128.08.257.156.383.238.148.096.146.231-.003.328Zm-3.272 3.871a.354.354 0 0 0 .36-.346.359.359 0 0 0-.343-.366.363.363 0 0 0-.369.354c0 .195.157.354.352.358Zm-5.265-.017a.357.357 0 0 0 .168-.666.356.356 0 1 0-.168.666ZM2.802 8.96c.031.04.086.055.133.037.207-.05.416-.09.625-.133.222-.046.376.055.424.28.05.23.099.462.147.694a.165.165 0 0 0 .105.14c1.164.487 2.329.496 3.497.012a.141.141 0 0 0 .097-.117c.048-.243.1-.486.157-.728.05-.219.205-.312.425-.266.104.023.207.05.312.066.141.021.294.127.418.059s.204-.215.301-.33c.022-.025.065-.05.05-.086-.019-.048-.07-.023-.106-.023-.545-.002-1.09-.005-1.636 0a.537.537 0 0 1-.394-.157 1.265 1.265 0 0 1-.36-.653c-.064-.277-.1-.56-.186-.83-.103-.324-.344-.515-.66-.52-.355-.006-.71 0-1.066-.003-.063 0-.08.017-.08.08.004.21.006.419 0 .628-.003.089.03.101.107.1.289-.004.577.003.866-.004.11-.003.15.022.147.141-.008.356-.008.711 0 1.067.003.118-.024.153-.148.153-1.122-.006-2.244-.003-3.367-.003h-.135c.102.138.21.27.327.396Zm2.203-3.83c-.002.077.025.09.094.089.23-.004.459-.002.688-.002v-.002c.217 0 .434.003.652 0a.831.831 0 0 0 .408-.104.325.325 0 0 0 .06-.546.669.669 0 0 0-.454-.174c-.45-.004-.901.001-1.351-.003-.082 0-.098.027-.096.101.004.214.005.427 0 .64Zm-3.26-.834c-.199 0-.362.16-.365.359.002.195.161.353.356.353a.349.349 0 0 0 .356-.35.356.356 0 0 0-.346-.362Zm.673.066.137.31c.1.232.037.393-.196.498l-.637.284a.107.107 0 0 0-.087.095 4.487 4.487 0 0 0 .129 1.539.081.081 0 0 0 .093.076c.367-.003.735-.003 1.102 0 .061 0 .082-.015.08-.078-.005-.134-.002-.269-.002-.403V4.464c0-.043.03-.107-.063-.105-.181.005-.362.002-.556.002Zm3.57-3.299a.334.334 0 0 0-.346.34.352.352 0 0 0 .348.358.332.332 0 0 0 .347-.34.351.351 0 0 0-.348-.358ZM9.755 3.69C9.082 2.614 8.126 1.938 6.89 1.662a.141.141 0 0 0-.146.046c-.172.17-.346.336-.522.501-.17.16-.347.156-.51-.011a27.67 27.67 0 0 1-.465-.49.133.133 0 0 0-.145-.043 4.496 4.496 0 0 0-1.057.37 4.34 4.34 0 0 0-1.305.998h4.543c.405-.003.8.127 1.127.368.286.209.496.475.577.827.101.438-.052.798-.353 1.11a3.045 3.045 0 0 1-.508.405c.51.475.51.475.704 1.193.01.043.032.082.065.11.189.156.4.172.625.1.198-.064.294-.212.328-.41a1.94 1.94 0 0 0 .016-.355.082.082 0 0 1 .099-.098c.106.003.213-.004.32.002.07.004.096-.015.1-.088a5.262 5.262 0 0 0-.01-.58.128.128 0 0 0-.09-.132c-.224-.095-.446-.196-.67-.295-.239-.108-.302-.268-.198-.506.115-.264.23-.528.35-.789a.19.19 0 0 0-.01-.205Zm.483.615a.358.358 0 0 0-.364.358.363.363 0 0 0 .358.354.356.356 0 0 0 .354-.354.351.351 0 0 0-.348-.358Z"
  }))));
};

var _g$c;
function _extends$e() { _extends$e = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }
var SvgIconLanguageScss = function SvgIconLanguageScss(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$e({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$c || (_g$c = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0ZM4.808 7.999c.087.323.078.624-.013.896l-.032.09c-.012.03-.026.06-.039.088-.07.145-.163.28-.277.405-.35.38-.837.524-1.046.402-.224-.13-.113-.667.292-1.095.436-.459 1.06-.754 1.06-.754v-.002L4.808 8Zm4.955-5.43c-.271-1.067-2.038-1.417-3.711-.823-.994.353-2.072.909-2.846 1.634-.922.86-1.068 1.61-1.008 1.923.214 1.106 1.729 1.829 2.352 2.365v.003c-.184.09-1.528.765-1.843 1.463-.338.735.052 1.26.307 1.327.788.219 1.598-.18 2.033-.824.42-.63.383-1.44.202-1.838.248-.068.54-.098.915-.052 1.05.12 1.26.78 1.215 1.05-.045.27-.262.427-.337.472-.075.046-.098.06-.091.09.008.046.046.046.105.038.082-.015.548-.225.57-.736.023-.644-.593-1.364-1.687-1.35-.45.009-.736.046-.938.128a.181.181 0 0 0-.052-.052C4.274 6.66 3.022 6.15 3.074 5.182c.015-.353.143-1.282 2.4-2.407 1.853-.923 3.33-.667 3.585-.105.367.802-.788 2.295-2.715 2.512-.735.082-1.118-.202-1.216-.308-.104-.112-.119-.12-.157-.096-.06.03-.022.127 0 .187.06.15.293.413.699.548.351.112 1.215.179 2.25-.226 1.161-.449 2.069-1.702 1.806-2.752l.037.033Z"
  }))));
};

var _g$b;
function _extends$d() { _extends$d = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }
var SvgIconLanguageScala = function SvgIconLanguageScala(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$d({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$b || (_g$b = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H2.5c2.143 0 6.522-.758 7-1.5V7.635c-.452.704-4.857 1.457-7 1.457V12H0V0h12ZM9.5 3.818c-.452.704-4.857 1.456-7 1.456v2.908c2.143 0 6.522-.757 7-1.5V3.819ZM9.5 0c-.452.704-4.857 1.456-7 1.456v2.909c2.143 0 6.522-.758 7-1.5V0Z"
  }))));
};

var _g$a;
function _extends$c() { _extends$c = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }
var SvgIconLanguageShell = function SvgIconLanguageShell(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$c({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$a || (_g$a = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M12 3.4V12H0V3.4h12ZM9.6 9.333H6v1.223h3.6V9.333ZM3 4.907l-.849.865L3.85 7.5 2.15 9.228l.849.865L5.546 7.5 3 4.907ZM0 0h12v2H0V0Z"
  }))));
};

var _g$9;
function _extends$b() { _extends$b = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }
var SvgIconLanguageSmarty = function SvgIconLanguageSmarty(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$b({
    xmlns: "http://www.w3.org/2000/svg",
    width: 8.5,
    height: 12
  }, props), _g$9 || (_g$9 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M-1.75 0h12v12h-12z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M2.428 11.4c0 .35.253.6.607.6h2.429c.354 0 .607-.25.607-.6v-.6H2.428v.6ZM4.25 0C1.923 0 0 1.9 0 4.2c0 1.45.708 2.7 1.821 3.45V9c0 .35.253.6.607.6h3.643c.354 0 .607-.25.607-.6V7.65C7.791 6.9 8.5 5.65 8.5 4.2 8.5 1.9 6.577 0 4.25 0Z"
  }))));
};

var _g$8;
function _extends$a() { _extends$a = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
var SvgIconLanguageSolidity = function SvgIconLanguageSolidity(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$8 || (_g$8 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "m2 3.429 1.994 3.428 1.994-3.428H10L7.984 0H12v12H8.003L10 8.571 8.003 5.143 6.01 8.571H2L4.013 12H0V0h3.994L2 3.429Z"
  }))));
};

var _g$7;
function _extends$9() { _extends$9 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }
var SvgIconLanguageSql = function SvgIconLanguageSql(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$7 || (_g$7 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM6.198 7.421a1.9 1.9 0 0 0-.724.135 1.692 1.692 0 0 0-.955.953c-.089.22-.133.463-.133.727 0 .262.044.503.133.724a1.69 1.69 0 0 0 .955.955c.221.09.462.135.724.135.198 0 .384-.025.557-.076l.05-.019.44.595.608-.45-.391-.532.037-.033a1.7 1.7 0 0 0 .379-.577c.089-.221.133-.462.133-.722 0-.263-.044-.504-.133-.724a1.704 1.704 0 0 0-.954-.956 1.897 1.897 0 0 0-.726-.135Zm-3.597 0a1.63 1.63 0 0 0-.502.077c-.16.051-.3.124-.421.22a1.08 1.08 0 0 0-.29.34.895.895 0 0 0-.107.432c0 .147.024.28.07.398a.876.876 0 0 0 .213.315c.095.091.215.17.358.233.143.064.31.117.501.16.071.014.14.03.207.048.067.017.13.038.189.063a.81.81 0 0 1 .155.082c.045.031.08.067.104.107.025.04.038.085.038.135 0 .065-.02.12-.062.165a.386.386 0 0 1-.17.104.785.785 0 0 1-.245.035c-.18 0-.354-.038-.522-.116-.168-.078-.335-.227-.5-.45l-.516.584c.113.146.24.271.384.376.143.104.307.184.491.239.185.055.393.082.626.082.265 0 .5-.044.705-.133.206-.088.367-.217.485-.386s.176-.374.176-.617a.874.874 0 0 0-.335-.72 1.537 1.537 0 0 0-.386-.219 2.791 2.791 0 0 0-.499-.144 2.465 2.465 0 0 1-.227-.055 1.02 1.02 0 0 1-.195-.078.44.44 0 0 1-.136-.108.221.221 0 0 1-.05-.143c0-.066.02-.122.061-.167a.385.385 0 0 1 .169-.103.931.931 0 0 1 .797.137c.081.058.157.13.228.218l.523-.507a1.312 1.312 0 0 0-.301-.325c-.119-.09-.26-.16-.426-.207a2.147 2.147 0 0 0-.59-.072Zm6.915.079h-.85V11h2.41v-.75h-1.56V7.5Zm-3.318.719a.94.94 0 0 1 .379.075c.115.05.215.12.3.213.085.092.151.2.198.323.047.123.07.259.07.406 0 .147-.023.282-.07.405a.969.969 0 0 1-.125.232l-.421-.571-.623.436.376.508-.084.006a.903.903 0 0 1-.68-.287.948.948 0 0 1-.197-.323 1.159 1.159 0 0 1-.07-.406c0-.149.024-.285.07-.408a.95.95 0 0 1 .198-.322.904.904 0 0 1 .68-.287Z"
  }))));
};

var _g$6;
function _extends$8() { _extends$8 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
var SvgIconLanguageStylus = function SvgIconLanguageStylus(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$6 || (_g$6 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM5.535 4.849c-.136 0-.288.06-.456.179a1.81 1.81 0 0 0-.437.447c-.006.024-.002.044.014.059.015.014.032.016.05.004.094-.12.176-.209.247-.269a.339.339 0 0 1 .22-.089c.105 0 .157.09.157.269 0 .334-.045.704-.135 1.11-.09.405-.212.814-.367 1.226a9.551 9.551 0 0 1-.55 1.2c-.21.387-.437.73-.679 1.03a3.813 3.813 0 0 1-.75.72c-.257.182-.512.273-.767.273-.136 0-.237-.024-.302-.072-.066-.048-.092-.107-.08-.179a.086.086 0 0 0-.037-.045c-.018-.012-.034-.012-.046 0A.833.833 0 0 0 1.51 11a.58.58 0 0 0 .009.255.337.337 0 0 0 .12.179c.06.045.136.067.229.067.26 0 .54-.116.838-.35.297-.232.594-.535.888-.908.295-.373.58-.792.852-1.258.273-.465.514-.932.721-1.4a10.9 10.9 0 0 0 .498-1.334c.125-.421.187-.772.187-1.052a.423.423 0 0 0-.07-.25c-.047-.067-.129-.1-.247-.1ZM10.132.5c-.26 0-.54.116-.838.35a5.373 5.373 0 0 0-.888.908c-.295.373-.58.792-.852 1.258-.273.465-.514.932-.721 1.4-.208.469-.374.914-.498 1.334-.125.42-.187.772-.187 1.052 0 .102.024.185.07.25.047.066.129.1.247.1.136 0 .288-.06.456-.18.168-.12.313-.268.437-.447.007-.024.002-.043-.014-.059-.015-.014-.032-.016-.05-.004a1.79 1.79 0 0 1-.247.269.339.339 0 0 1-.22.09c-.105 0-.157-.09-.157-.27 0-.334.045-.704.135-1.11.09-.405.212-.814.367-1.226.155-.411.339-.812.55-1.2.21-.387.437-.73.679-1.029a3.82 3.82 0 0 1 .75-.72c.257-.183.512-.274.767-.274.136 0 .237.024.302.072.066.048.092.107.08.179a.087.087 0 0 0 .037.045c.018.012.034.012.046 0A.83.83 0 0 0 10.49 1a.579.579 0 0 0-.009-.255.337.337 0 0 0-.12-.179.367.367 0 0 0-.229-.067Z"
  }))));
};

var _g$5;
function _extends$7() { _extends$7 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
var SvgIconLanguageSwift = function SvgIconLanguageSwift(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$5 || (_g$5 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H0V0h12ZM7.374.5C8.58 2.175 9.057 4.167 8.636 5.958a2.902 2.902 0 0 1-.14.462 2.576 2.576 0 0 1-.225-.144S5.551 4.543 2.636 1.51c-.084-.087 1.57 2.425 3.42 4.418-.868-.52-3.336-2.339-4.878-3.812.168.318.42.635.673.953 1.29 1.704 2.972 3.783 4.991 5.37-1.43.897-3.421.954-5.44 0C.897 8.21.477 7.922 0 7.576c.841 1.357 2.159 2.6 3.73 3.263 1.878.838 3.785.78 5.159 0h.028c.056-.029.112-.058.168-.115.673-.347 1.991-.722 2.72.721.196.405.56-1.472-.813-3.205.028-.058.028-.115.056-.173.673-2.715-.926-5.89-3.674-7.566Z"
  }))));
};

var _g$4;
function _extends$6() { _extends$6 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
var SvgIconLanguageToml = function SvgIconLanguageToml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$4 || (_g$4 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#171717",
    fillRule: "nonzero"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.304 0v1.348h1.213v9.304H9.304V12H12V0zM3.034 3.91V2.427h5.932V3.91H6.742v6.472H5.258V3.91zM2.696 0v1.348H1.483v9.304h1.213V12H0V0z"
  })))));
};

var _g$3;
function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
var SvgIconLanguageTwig = function SvgIconLanguageTwig(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$3 || (_g$3 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    d: "M12 0v12H1.718c.057 0 .11-.007.118-.016.02-.023.21-.021.3.002.056.014.121.013.301-.01.277-.033.306-.048.268-.139-.076-.18-.073-.59.006-.854a.748.748 0 0 1 .588-.547c.149-.029.094-.056-.088-.044a1.377 1.377 0 0 0-.64.183c-.016.009-.034.012-.04.008a2.744 2.744 0 0 1-.048-.296 23.17 23.17 0 0 0-.587-2.872c-.138-.511-.172-.57-.154-.257.042.696.114 3.122.095 3.158-.011.021-.046-.015-.128-.132a2.547 2.547 0 0 0-.246-.294c-.13-.129-.439-.355-.462-.338-.007.004.03.051.08.104.296.312.508.819.591 1.415.044.313.056.607.025.61-.012.001-.05-.053-.083-.12a.822.822 0 0 0-.076-.133c-.029-.02.014.463.046.519.028.049.039.053.134.053H0V0h12ZM9.903 1a1.946 1.946 0 0 0-1.008.238c-.697.354-1.512 1.199-1.978 2.05-.65 1.183-1.08 2.884-1.25 4.938-.02.23-.035.431-.035.449 0 .067-.047.024-.16-.146a2.756 2.756 0 0 0-.583-.621c-.421-.322-.874-.476-1.467-.498-.28-.01-.341.008-.15.045.35.068.743.233 1.016.426.621.439.976 1.079 1.089 1.962.026.205.033.984.01 1.068-.021.074-.046.064-.078-.031-.015-.045-.037-.082-.049-.082-.027 0-.026.726.001.757.012.013.072.028.133.034.158.016.18.012.183-.034.004-.079.008-.084.05-.075.022.005.16.02.305.035.199.019.3.021.404.009.278-.033.719-.068.857-.068.167 0 .178-.01.146-.135-.044-.179-.092-.836-.092-1.269.001-.923.109-1.646.344-2.312.246-.7.57-1.198 1.062-1.635a.481.481 0 0 0 .108-.112c-.026-.019-.262.094-.43.206-.555.368-1.052 1.04-1.453 1.966-.063.147-.122.27-.13.276-.022.014.008-.546.05-.92.187-1.729.617-3.211 1.326-4.58.247-.475.634-1.05.912-1.353.516-.562 1.12-.625 1.786-.184.09.06.17.105.177.1.018-.013-.156-.161-.31-.262a1.718 1.718 0 0 0-.342-.165c-.19-.067-.21-.07-.444-.076Z"
  }))));
};

var _g$2;
function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var SvgIconLanguageTypescript = function SvgIconLanguageTypescript(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$2 || (_g$2 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M0 6v6h12V0H0v6Zm9.67-.478c.306.076.537.212.751.433.11.117.274.332.288.385.004.014-.518.365-.835.561-.011.008-.057-.042-.108-.118-.155-.225-.316-.322-.564-.339-.364-.025-.598.165-.596.484a.44.44 0 0 0 .051.224c.08.166.229.266.695.467.86.37 1.227.614 1.455.96.255.386.313 1.004.14 1.463-.19.499-.663.838-1.328.95a3.662 3.662 0 0 1-.914-.009c-.482-.086-.939-.324-1.221-.636-.11-.122-.326-.44-.313-.463a.79.79 0 0 1 .11-.07l.447-.258.345-.2.072.107c.101.154.322.365.455.436.383.202.909.174 1.168-.059a.442.442 0 0 0 .156-.36.44.44 0 0 0-.09-.305c-.093-.133-.284-.245-.825-.48-.618-.267-.885-.432-1.129-.695a1.582 1.582 0 0 1-.33-.6 2.413 2.413 0 0 1-.02-.766c.127-.598.578-1.014 1.23-1.139.212-.04.703-.024.91.027Zm-2.816.501.003.492H5.295v4.438H4.19V6.515H2.629v-.482c0-.268.005-.49.013-.496.006-.008.957-.011 2.108-.01l2.098.006.006.49Z"
  }))));
};

var _path$1;
function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var SvgIconLanguageXml = function SvgIconLanguageXml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "evenodd",
    d: "M12 0v12H0V0h12ZM1.718 7.5H.525l1.23 1.708L.5 11h1.143l.676-.986L3 11h1.193L2.934 9.265 4.144 7.5H3l-.627.957-.655-.957Zm8.237 0h-.99V11h2.513v-.853H9.955V7.5Zm-4.547 0h-.863V11h.957v-.935c0-.323-.008-.602-.023-.838l-.008-.103.694 1.096h.33l.718-1.112-.012.147c-.01.16-.017.333-.02.52l-.003.29V11h.957V7.5h-.833l-.956 1.534L5.408 7.5Z"
  })));
};

var _path;
function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var SvgIconLanguageYaml = function SvgIconLanguageYaml(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "evenodd",
    d: "M12 0v10.38H9.273V6.346h-1.13v5.13H12V12H0V0h12ZM3.493 6.347H2.055V11.5h1.11V7.946l1.16 2.389h.872l1.2-2.473v3.637h1.064V6.347H6.008L4.72 8.677l-1.227-2.33ZM7.128.512H6.047L3.81 5.77h1.057l.486-1.17H7.74l.402 1.17h1.13L7.128.512ZM1.482.5H0l2.056 3.218v2.04h1.318v-2.04L5.526.5H4.107L2.79 2.572 1.482.5Zm5.13 1.122.733 1.929H5.796l.817-1.93Z"
  })));
};

var _g$1;
function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var SvgIconLanguagePlaintext = function SvgIconLanguagePlaintext(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g$1 || (_g$1 = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h12v12H0z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#171717",
    fillRule: "nonzero",
    d: "M12 0v12H0V0h12ZM5.3 3H3v1.4h2.3V10h1.4V4.4H9V3H5.3Z"
  }))));
};

var Icons = {
  aspnet: React__default.createElement(SvgIconLanguageAsp, null),
  c: React__default.createElement(SvgIconLanguageC$2, null),
  cs: React__default.createElement(SvgIconLanguageC$1, null),
  clojure: React__default.createElement(SvgIconLanguageClojure, null),
  cpp: React__default.createElement(SvgIconLanguageC, null),
  css: React__default.createElement(SvgIconLanguageCss, null),
  cypher: React__default.createElement(SvgIconLanguageCypher, null),
  d: React__default.createElement(SvgIconLanguageD, null),
  dart: React__default.createElement(SvgIconLanguageDart, null),
  diff: React__default.createElement(SvgIconLanguageDiff, null),
  docker: React__default.createElement(SvgIconLanguageDockerfile, null),
  erlang: React__default.createElement(SvgIconLanguageErlang, null),
  go: React__default.createElement(SvgIconLanguageGo, null),
  graphql: React__default.createElement(SvgIconLanguageGraphql, null),
  groovy: React__default.createElement(SvgIconLanguageGroovy, null),
  handlebars: React__default.createElement(SvgIconLanguageHandlebars, null),
  haml: React__default.createElement(SvgIconLanguageHaml, null),
  haxe: React__default.createElement(SvgIconLanguageHaxe, null),
  html: React__default.createElement(SvgIconLanguageHtml, null),
  http: React__default.createElement(SvgIconLanguageHttp, null),
  java: React__default.createElement(SvgIconLanguageJava, null),
  javascript: React__default.createElement(SvgIconLanguageJavascript, null),
  json: React__default.createElement(SvgIconLanguageJson, null),
  kotlin: React__default.createElement(SvgIconLanguageKotlin, null),
  less: React__default.createElement(SvgIconLanguageLess, null),
  liquid: React__default.createElement(SvgIconLanguageLiquid, null),
  markdown: React__default.createElement(SvgIconLanguageMarkdown, null),
  objectivec: React__default.createElement(SvgIconLanguageObjectiveC, null),
  ocaml: React__default.createElement(SvgIconLanguageOcaml, null),
  perl: React__default.createElement(SvgIconLanguagePerl, null),
  php: React__default.createElement(SvgIconLanguagePhp, null),
  powershell: React__default.createElement(SvgIconLanguagePowershell, null),
  python: React__default.createElement(SvgIconLanguagePython, null),
  r: React__default.createElement(SvgIconLanguageR, null),
  ruby: React__default.createElement(SvgIconLanguageRuby, null),
  rust: React__default.createElement(SvgIconLanguageRust, null),
  sass: React__default.createElement(SvgIconLanguageScss, null),
  scala: React__default.createElement(SvgIconLanguageScala, null),
  scss: React__default.createElement(SvgIconLanguageScss, null),
  bash: React__default.createElement(SvgIconLanguageShell, null),
  smarty: React__default.createElement(SvgIconLanguageSmarty, null),
  solidity: React__default.createElement(SvgIconLanguageSolidity, null),
  sql: React__default.createElement(SvgIconLanguageSql, null),
  stylus: React__default.createElement(SvgIconLanguageStylus, null),
  swift: React__default.createElement(SvgIconLanguageSwift, null),
  toml: React__default.createElement(SvgIconLanguageToml, null),
  twig: React__default.createElement(SvgIconLanguageTwig, null),
  typescript: React__default.createElement(SvgIconLanguageTypescript, null),
  xml: React__default.createElement(SvgIconLanguageXml, null),
  yaml: React__default.createElement(SvgIconLanguageYaml, null)
};
var CodeIcon = function CodeIcon(props) {
  var Tag = props.iconName.toLowerCase();
  return Icons[Tag] || React__default.createElement(SvgIconLanguagePlaintext, null);
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$3(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$3;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var root = _root;

/** Built-in value references. */
var Symbol$2 = root.Symbol;

var _Symbol = Symbol$2;

var Symbol$1 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var baseTrim = _baseTrim,
    isObject$2 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject$1 = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce$1;

var debounce = debounce_1,
    isObject = isObject_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle$1(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle$1;

var throttle$2 = /*@__PURE__*/getDefaultExportFromCjs(throttle_1);

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

var getTabID = function getTabID(codes) {
  var max = 0;
  codes.forEach(function (code) {
    max = Math.max(max, code.tabid || 0);
  });
  return max + 1;
};
var SCodeBlockTab = function SCodeBlockTab(props) {
  var _a;
  var editable = props.editable,
    children = props.children,
    editor = props.editor,
    showSetting = props.showSetting,
    aiCodeSwitchChanged = props.aiCodeSwitchChanged,
    getPos = props.getPos,
    node = props.node,
    addTab = props.addTab,
    extension = props.extension,
    _b = props.disabled,
    disabled = _b === void 0 ? false : _b;
  var _c = React__default.useState(props.codes || []),
    codes = _c[0],
    setCodes = _c[1];
  var codeWrapperRef = React__default.useRef();
  var tabListRef = React__default.useRef();
  var _d = React__default.useState(0),
    selectIndex = _d[0],
    setSelectIndex = _d[1];
  var _e = React__default.useState(720),
    width = _e[0],
    setWidth = _e[1];
  var tabIdIndexRef = React__default.useRef(-1);
  // 站点和编辑器切换 tab 要隐藏的元素
  var codeBlockSelector = !!editor ? "[data-code-block-wrapper]" : "[data-code-block]";
  var switchID = useRef("switch_".concat(Math.floor(Math.random() * 0xffffffff)));
  var handleAddTab = function handleAddTab() {
    var _a;
    addTab && addTab();
    if ((_a = node === null || node === void 0 ? void 0 : node.attrs) === null || _a === void 0 ? void 0 : _a.aiEnabled) return;
    var tabid = getTabID(codes);
    var baseCodeBlock = node.attrs.codes[0];
    editor.commands.addCodeBlock(getPos(), {
      tabid: tabid,
      autoWrap: baseCodeBlock.autoWrap,
      showLineNumber: baseCodeBlock.showLineNumber,
      theme: baseCodeBlock.theme,
      totalLineNumber: baseCodeBlock.totalLineNumber
    });
    switchTab(tabid);
  };
  var switchTab = function switchTab(tabid, e) {
    if (tabid === undefined) return;
    if (tabid === selectIndex && editable) {
      e === null || e === void 0 ? void 0 : e.stopPropagation();
      showSetting(codes.find(function (code) {
        return code.tabid === tabid;
      }));
      return;
    }
    var activeDom = null;
    var codeBlockList = codeWrapperRef.current.querySelectorAll(codeBlockSelector);
    console.log("codeWrapperRef.current", codeBlockList);
    Array.from(codeBlockList).forEach(function (el) {
      if (el.dataset.tabid === tabid.toString()) {
        el.style.display = "block";
        activeDom = el;
        setSelectIndex(Number(tabid));
      } else {
        el.style.display = "none";
      }
    });
    if (editable) {
      var pos = editor.view.posAtDOM(activeDom, 0);
      editor.commands.focus(pos);
    }
  };
  var onSwitchChange = function onSwitchChange(checked) {
    aiCodeSwitchChanged(checked);
    console.log(checked);
  };
  useEffect(function () {
    var _a, _b, _c;
    if (editor) {
      setCodes(props.codes || []);
      var tabIdIndex = (_a = props.codes) === null || _a === void 0 ? void 0 : _a.findIndex(function (code) {
        return code.tabid === selectIndex;
      });
      // 当删除tab时，切换tab
      if (tabIdIndex === -1) {
        var oldIndex = tabIdIndexRef.current;
        var newTabId_1 = (_c = (_b = props.codes) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.tabid;
        if (oldIndex > 0 && props.codes[oldIndex - 1]) {
          newTabId_1 = props.codes[oldIndex - 1].tabid;
        }
        setTimeout(function () {
          switchTab(newTabId_1);
        }, 10);
      } else {
        tabIdIndexRef.current = tabIdIndex;
      }
    }
  }, [props.codes, selectIndex]);
  useEffect(function () {
    var _a;
    var preventEvent = function preventEvent(e) {
      return e.preventDefault();
    };
    if ((_a = tabListRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
      tabListRef.current.parentElement.addEventListener("mousedown", preventEvent);
    }
    return function () {
      var _a;
      if ((_a = tabListRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) {
        tabListRef.current.parentElement.removeEventListener("mousedown", preventEvent);
      }
    };
  }, []);
  useEffect(function () {
    var ob = new MutationObserver(function (mutationRecord) {
      mutationRecord.forEach(function (item) {
        if (item.removedNodes.length || item.addedNodes.length) {
          /**
           * 新增或删除tab
           */
          setTimeout(function () {
            var t = item.target;
            var activeTab = t.querySelector(".".concat(styles$7.active));
            if (activeTab) {
              t.scrollTo({
                behavior: "smooth",
                left: activeTab.offsetLeft
              });
            }
          }, 10);
        }
      });
    });
    if (tabListRef.current) {
      ob.observe(tabListRef.current, {
        attributes: true,
        childList: true
      });
    }
    return function () {
      ob.disconnect();
    };
  }, []);
  useEffect(function () {
    if (codeWrapperRef.current) {
      setTimeout(function () {
        var codeBlockList = codeWrapperRef.current.querySelectorAll(codeBlockSelector);
        var codeList = [];
        Array.from(codeBlockList).forEach(function (el, i) {
          if (i === 0) {
            el.style.display = "block";
            setSelectIndex(Number(el.dataset.tabid));
          } else {
            el.style.display = "none";
          }
          codeList.push({
            tabid: Number(el.dataset.tabid),
            filename: el.dataset.filename,
            language: el.dataset.language,
            focus: el.dataset.focus
          });
        });
        if (!editor) {
          setCodes(codeList);
        }
        setContentWidth();
      }, 0);
    }
  }, []);
  useEffect(function () {
    if (editor) {
      // 节点内容变化可能导致滚动条出现，需要重新取 width
      setTimeout(setContentWidth, 10);
    }
  }, [node, editor]);
  useEffect(function () {
    var handleResize = throttle$2(function () {
      setContentWidth();
    }, 20);
    var resizeObserver = new index(handleResize);
    resizeObserver.observe(codeWrapperRef.current);
    return function () {
      resizeObserver.disconnect();
    };
  }, []);
  var setContentWidth = function setContentWidth() {
    var _a;
    var codeBlockList = (_a = codeWrapperRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll(codeBlockSelector);
    var displayCodeBlock = Array.from(codeBlockList).find(function (el) {
      return el.style.display === "block";
    });
    if (!displayCodeBlock) return;
    var preEl = displayCodeBlock.querySelector("pre:first-child");
    if (preEl && preEl.offsetWidth) {
      setWidth(preEl.offsetWidth);
    } else {
      setWidth(displayCodeBlock.offsetWidth);
    }
  };
  return React__default.createElement("div", {
    className: "".concat(styles$7.wrapper, " ").concat(((_a = extension === null || extension === void 0 ? void 0 : extension.options) === null || _a === void 0 ? void 0 : _a.isToolsPage) ? styles$7.noSpacing : "")
  }, React__default.createElement("div", {
    style: {
      display: (editor === null || editor === void 0 ? void 0 : editor.isCodeShotEditor) ? "none" : null
    },
    className: styles$7.tab_wrapper,
    contentEditable: false
  }, React__default.createElement("div", {
    className: styles$7.tabList,
    ref: tabListRef
  }, codes.map(function (code, index) {
    return React__default.createElement("div", {
      key: index,
      tabid: code.tabid,
      className: "".concat(styles$7.tab_item, " ").concat(selectIndex === code.tabid ? styles$7.active : ""),
      onClick: function onClick(e) {
        return switchTab(code.tabid, e);
      }
    }, React__default.createElement("span", {
      className: "".concat(styles$7.tab_lang_icon, " ").concat(selectIndex === code.tabid ? styles$7.active : "")
    }, React__default.createElement(CodeIcon, {
      iconName: code.language
    })), React__default.createElement("span", {
      className: styles$7.tab_filename
    }, code.filename), editable && selectIndex === index && React__default.createElement("span", {
      className: styles$7.tab_arrow_icon
    }, React__default.createElement(IconCodeDown, null)));
  })), editable && React__default.createElement("span", {
    className: styles$7.tab_add_icon,
    onClick: handleAddTab
  }, React__default.createElement(IconCodeAdd, null)), editable && React__default.createElement("div", {
    className: styles$7.tab_blank
  }), editable && !editor.isToolEditor && React__default.createElement("div", {
    className: styles$7.tab_ai_switch_wrapper
  }, React__default.createElement("label", {
    htmlFor: "ai"
  }, "Code with ", React__default.createElement("span", {
    className: styles$7.ai_icon
  })), React__default.createElement(Switch, {
    id: switchID.current,
    name: switchID.current,
    checked: node.attrs.aiEnabled,
    onChange: onSwitchChange,
    disabled: disabled
  }))), React__default.createElement("div", {
    style: {
      "--preWidth": width + "px"
    },
    ref: codeWrapperRef
  }, children));
};

var css_248z$H = "code[class*=language-],pre[class*=language-]{word-wrap:normal;background:0 0;color:#e1e3e7;font-family:RobotoMono-Regular,RobotoMono;font-size:12px;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}pre[class*=language-]{margin:0}:not(pre)>code[class*=language-],pre[class*=language-]{background:#18181b}pre::-webkit-scrollbar{height:4px;width:4px}pre::-webkit-scrollbar-thumb{background:#999;border-radius:2px}pre::-webkit-scrollbar-thumb:hover{background:#999}pre::-webkit-scrollbar-track{background-color:transparent}:not(pre)>code[class*=language-]{border-radius:.3em;padding:.1em;white-space:normal}.index-module_code_position_wrapper__h82uQ{position:relative}.index-module_code_position_wrapper__h82uQ .index-module_copy_button__Gmm1m{align-items:center;background:#27272a;color:hsla(0,0%,100%,.6);cursor:pointer;display:none;font-family:RobotoMono-Medium,RobotoMono;font-size:12px;font-weight:500;justify-content:center;line-height:16px;padding:2px 8px 4px;position:absolute;right:12px;top:12px;user-select:none;z-index:10}.index-module_code_position_wrapper__h82uQ .index-module_copy_button__Gmm1m svg{margin-right:4px;margin-top:2px}.index-module_code_position_wrapper__h82uQ:hover .index-module_copy_button__Gmm1m{display:flex}.index-module_code_wrapper__Ej0kZ{border-radius:0 0 8px 8px;font-family:RobotoMono-Regular,RobotoMono;font-size:12px;font-weight:400;height:auto;line-height:18px;min-height:128px;overflow:auto;position:relative}.index-module_code_wrapper__Ej0kZ pre[class*=language-]{min-height:100%;min-width:100%;padding:16px 16px 30px 54px;width:fit-content}.index-module_code_wrapper__Ej0kZ.index-module_auto_height__QBuRT pre[class*=language-]{min-height:128px}.index-module_code_wrapper__Ej0kZ[data-showlinenumber=false] pre[class*=language-]{padding-left:16px}.index-module_code_wrapper__Ej0kZ::-webkit-scrollbar{height:4px;width:4px}.index-module_code_wrapper__Ej0kZ::-webkit-scrollbar-thumb{background:#999;border-radius:2px}.index-module_code_wrapper__Ej0kZ::-webkit-scrollbar-thumb:hover{background:#999}.index-module_code_wrapper__Ej0kZ::-webkit-scrollbar-track{background-color:transparent}.index-module_code_wrapper__Ej0kZ .index-module_line_number_wrapper__6aH-v{color:#6e7781;display:flex;flex-direction:column;left:0;position:absolute;text-align:right;top:16px;user-select:none}.index-module_code_wrapper__Ej0kZ .index-module_line_number_wrapper__6aH-v span{color:#6e7781;cursor:pointer;font-family:RobotoMono-Regular,RobotoMono;font-size:12px;font-weight:400;height:22px;line-height:18px;padding:2px 0;position:relative;white-space:nowrap;width:38px}.index-module_code_wrapper__Ej0kZ .index-module_line_number_wrapper__6aH-v .index-module_high_light__c6Oba:after{background:#00ed00;content:\"\";display:block;height:100%;left:0;opacity:.2;pointer-events:none;position:absolute;top:0;width:var(--preWidth)}";
var styles$5 = {
  "code_position_wrapper": "index-module_code_position_wrapper__h82uQ",
  "copy_button": "index-module_copy_button__Gmm1m",
  "code_wrapper": "index-module_code_wrapper__Ej0kZ",
  "auto_height": "index-module_auto_height__QBuRT",
  "line_number_wrapper": "index-module_line_number_wrapper__6aH-v",
  "high_light": "index-module_high_light__c6Oba"
};
styleInject(css_248z$H);

var prism = {exports: {}};

(function (module) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	/// <reference lib="WebWorker"/>

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
				? self // if in worker
				: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 *
	 * @license MIT <https://opensource.org/licenses/MIT>
	 * @author Lea Verou <https://lea.verou.me>
	 * @namespace
	 * @public
	 */
	var Prism = (function (_self) {

		// Private helper vars
		var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
		var uniqueId = 0;

		// The grammar object for plaintext
		var plainTextGrammar = {};


		var _ = {
			/**
			 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
			 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
			 * additional languages or plugins yourself.
			 *
			 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
			 *
			 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.manual = true;
			 * // add a new <script> to load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			manual: _self.Prism && _self.Prism.manual,
			/**
			 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
			 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
			 * own worker, you don't want it to do this.
			 *
			 * By setting this value to `true`, Prism will not add its own listeners to the worker.
			 *
			 * You obviously have to change this value before Prism executes. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.disableWorkerMessageHandler = true;
			 * // Load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

			/**
			 * A namespace for utility methods.
			 *
			 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
			 * change or disappear at any time.
			 *
			 * @namespace
			 * @memberof Prism
			 */
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, encode(tokens.content), tokens.alias);
					} else if (Array.isArray(tokens)) {
						return tokens.map(encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				/**
				 * Returns the name of the type of the given value.
				 *
				 * @param {any} o
				 * @returns {string}
				 * @example
				 * type(null)      === 'Null'
				 * type(undefined) === 'Undefined'
				 * type(123)       === 'Number'
				 * type('foo')     === 'String'
				 * type(true)      === 'Boolean'
				 * type([1, 2])    === 'Array'
				 * type({})        === 'Object'
				 * type(String)    === 'Function'
				 * type(/abc+/)    === 'RegExp'
				 */
				type: function (o) {
					return Object.prototype.toString.call(o).slice(8, -1);
				},

				/**
				 * Returns a unique number for the given object. Later calls will still return the same number.
				 *
				 * @param {Object} obj
				 * @returns {number}
				 */
				objId: function (obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				/**
				 * Creates a deep clone of the given object.
				 *
				 * The main intended use of this function is to clone language definitions.
				 *
				 * @param {T} o
				 * @param {Record<number, any>} [visited]
				 * @returns {T}
				 * @template T
				 */
				clone: function deepClone(o, visited) {
					visited = visited || {};

					var clone; var id;
					switch (_.util.type(o)) {
						case 'Object':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = /** @type {Record<string, any>} */ ({});
							visited[id] = clone;

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = deepClone(o[key], visited);
								}
							}

							return /** @type {any} */ (clone);

						case 'Array':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = [];
							visited[id] = clone;

							(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
								clone[i] = deepClone(v, visited);
							});

							return /** @type {any} */ (clone);

						default:
							return o;
					}
				},

				/**
				 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
				 *
				 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
				 *
				 * @param {Element} element
				 * @returns {string}
				 */
				getLanguage: function (element) {
					while (element) {
						var m = lang.exec(element.className);
						if (m) {
							return m[1].toLowerCase();
						}
						element = element.parentElement;
					}
					return 'none';
				},

				/**
				 * Sets the Prism `language-xxxx` class of the given element.
				 *
				 * @param {Element} element
				 * @param {string} language
				 * @returns {void}
				 */
				setLanguage: function (element, language) {
					// remove all `language-xxxx` classes
					// (this might leave behind a leading space)
					element.className = element.className.replace(RegExp(lang, 'gi'), '');

					// add the new `language-xxxx` class
					// (using `classList` will automatically clean up spaces for us)
					element.classList.add('language-' + language);
				},

				/**
				 * Returns the script element that is currently executing.
				 *
				 * This does __not__ work for line script element.
				 *
				 * @returns {HTMLScriptElement | null}
				 */
				currentScript: function () {
					if (typeof document === 'undefined') {
						return null;
					}
					if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
						return /** @type {any} */ (document.currentScript);
					}

					// IE11 workaround
					// we'll get the src of the current script by parsing IE11's error stack trace
					// this will not work for inline scripts

					try {
						throw new Error();
					} catch (err) {
						// Get file src url from stack. Specifically works with the format of stack traces in IE.
						// A stack will look like this:
						//
						// Error
						//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
						//    at Global code (http://localhost/components/prism-core.js:606:1)

						var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
						if (src) {
							var scripts = document.getElementsByTagName('script');
							for (var i in scripts) {
								if (scripts[i].src == src) {
									return scripts[i];
								}
							}
						}
						return null;
					}
				},

				/**
				 * Returns whether a given class is active for `element`.
				 *
				 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
				 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
				 * given class is just the given class with a `no-` prefix.
				 *
				 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
				 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
				 * ancestors have the given class or the negated version of it, then the default activation will be returned.
				 *
				 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
				 * version of it, the class is considered active.
				 *
				 * @param {Element} element
				 * @param {string} className
				 * @param {boolean} [defaultActivation=false]
				 * @returns {boolean}
				 */
				isActive: function (element, className, defaultActivation) {
					var no = 'no-' + className;

					while (element) {
						var classList = element.classList;
						if (classList.contains(className)) {
							return true;
						}
						if (classList.contains(no)) {
							return false;
						}
						element = element.parentElement;
					}
					return !!defaultActivation;
				}
			},

			/**
			 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
			 *
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			languages: {
				/**
				 * The grammar for plain, unformatted text.
				 */
				plain: plainTextGrammar,
				plaintext: plainTextGrammar,
				text: plainTextGrammar,
				txt: plainTextGrammar,

				/**
				 * Creates a deep copy of the language with the given id and appends the given tokens.
				 *
				 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
				 * will be overwritten at its original position.
				 *
				 * ## Best practices
				 *
				 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
				 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
				 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
				 *
				 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
				 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
				 *
				 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
				 * @param {Grammar} redef The new tokens to append.
				 * @returns {Grammar} The new language created.
				 * @public
				 * @example
				 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
				 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
				 *     // at its original position
				 *     'comment': { ... },
				 *     // CSS doesn't have a 'color' token, so this token will be appended
				 *     'color': /\b(?:red|green|blue)\b/
				 * });
				 */
				extend: function (id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
				 * Inserts tokens _before_ another token in a language definition or any other grammar.
				 *
				 * ## Usage
				 *
				 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
				 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
				 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
				 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
				 * this:
				 *
				 * ```js
				 * Prism.languages.markup.style = {
				 *     // token
				 * };
				 * ```
				 *
				 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
				 * before existing tokens. For the CSS example above, you would use it like this:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'cdata', {
				 *     'style': {
				 *         // token
				 *     }
				 * });
				 * ```
				 *
				 * ## Special cases
				 *
				 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
				 * will be ignored.
				 *
				 * This behavior can be used to insert tokens after `before`:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'comment', {
				 *     'comment': Prism.languages.markup.comment,
				 *     // tokens after 'comment'
				 * });
				 * ```
				 *
				 * ## Limitations
				 *
				 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
				 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
				 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
				 * deleting properties which is necessary to insert at arbitrary positions.
				 *
				 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
				 * Instead, it will create a new object and replace all references to the target object with the new one. This
				 * can be done without temporarily deleting properties, so the iteration order is well-defined.
				 *
				 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
				 * you hold the target object in a variable, then the value of the variable will not change.
				 *
				 * ```js
				 * var oldMarkup = Prism.languages.markup;
				 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
				 *
				 * assert(oldMarkup !== Prism.languages.markup);
				 * assert(newMarkup === Prism.languages.markup);
				 * ```
				 *
				 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
				 * object to be modified.
				 * @param {string} before The key to insert before.
				 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
				 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
				 * object to be modified.
				 *
				 * Defaults to `Prism.languages`.
				 * @returns {Grammar} The new grammar object.
				 * @public
				 */
				insertBefore: function (inside, before, insert, root) {
					root = root || /** @type {any} */ (_.languages);
					var grammar = root[inside];
					/** @type {Grammar} */
					var ret = {};

					for (var token in grammar) {
						if (grammar.hasOwnProperty(token)) {

							if (token == before) {
								for (var newToken in insert) {
									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							// Do not insert token which also occur in insert. See #1525
							if (!insert.hasOwnProperty(token)) {
								ret[token] = grammar[token];
							}
						}
					}

					var old = root[inside];
					root[inside] = ret;

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === old && key != inside) {
							this[key] = ret;
						}
					});

					return ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};

					var objId = _.util.objId;

					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							var property = o[i];
							var propertyType = _.util.type(property);

							if (propertyType === 'Object' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, null, visited);
							} else if (propertyType === 'Array' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, i, visited);
							}
						}
					}
				}
			},

			plugins: {},

			/**
			 * This is the most high-level function in Prism’s API.
			 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
			 * each one of them.
			 *
			 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
			 *
			 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
			 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
			 * @memberof Prism
			 * @public
			 */
			highlightAll: function (async, callback) {
				_.highlightAllUnder(document, async, callback);
			},

			/**
			 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
			 * {@link Prism.highlightElement} on each one of them.
			 *
			 * The following hooks will be run:
			 * 1. `before-highlightall`
			 * 2. `before-all-elements-highlight`
			 * 3. All hooks of {@link Prism.highlightElement} for each element.
			 *
			 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
			 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
			 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
			 * @memberof Prism
			 * @public
			 */
			highlightAllUnder: function (container, async, callback) {
				var env = {
					callback: callback,
					container: container,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run('before-highlightall', env);

				env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

				_.hooks.run('before-all-elements-highlight', env);

				for (var i = 0, element; (element = env.elements[i++]);) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			/**
			 * Highlights the code inside a single element.
			 *
			 * The following hooks will be run:
			 * 1. `before-sanity-check`
			 * 2. `before-highlight`
			 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
			 * 4. `before-insert`
			 * 5. `after-highlight`
			 * 6. `complete`
			 *
			 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
			 * the element's language.
			 *
			 * @param {Element} element The element containing the code.
			 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
			 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
			 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
			 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
			 *
			 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
			 * asynchronous highlighting to work. You can build your own bundle on the
			 * [Download page](https://prismjs.com/download.html).
			 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
			 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
			 * @memberof Prism
			 * @public
			 */
			highlightElement: function (element, async, callback) {
				// Find language
				var language = _.util.getLanguage(element);
				var grammar = _.languages[language];

				// Set language on the element, if not present
				_.util.setLanguage(element, language);

				// Set language on the parent, for styling
				var parent = element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre') {
					_.util.setLanguage(parent, language);
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				function insertHighlightedCode(highlightedCode) {
					env.highlightedCode = highlightedCode;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
				}

				_.hooks.run('before-sanity-check', env);

				// plugins may change/add the parent/element
				parent = env.element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
					parent.setAttribute('tabindex', '0');
				}

				if (!env.code) {
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (!env.grammar) {
					insertHighlightedCode(_.util.encode(env.code));
					return;
				}

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						insertHighlightedCode(evt.data);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
				}
			},

			/**
			 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
			 * and the language definitions to use, and returns a string with the HTML produced.
			 *
			 * The following hooks will be run:
			 * 1. `before-tokenize`
			 * 2. `after-tokenize`
			 * 3. `wrap`: On each {@link Token}.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @param {string} language The name of the language definition passed to `grammar`.
			 * @returns {string} The highlighted HTML.
			 * @memberof Prism
			 * @public
			 * @example
			 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
			 */
			highlight: function (text, grammar, language) {
				var env = {
					code: text,
					grammar: grammar,
					language: language
				};
				_.hooks.run('before-tokenize', env);
				if (!env.grammar) {
					throw new Error('The language "' + env.language + '" has no grammar.');
				}
				env.tokens = _.tokenize(env.code, env.grammar);
				_.hooks.run('after-tokenize', env);
				return Token.stringify(_.util.encode(env.tokens), env.language);
			},

			/**
			 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
			 * and the language definitions to use, and returns an array with the tokenized code.
			 *
			 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
			 *
			 * This method could be useful in other contexts as well, as a very crude parser.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @returns {TokenStream} An array of strings and tokens, a token stream.
			 * @memberof Prism
			 * @public
			 * @example
			 * let code = `var foo = 0;`;
			 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
			 * tokens.forEach(token => {
			 *     if (token instanceof Prism.Token && token.type === 'number') {
			 *         console.log(`Found numeric literal: ${token.content}`);
			 *     }
			 * });
			 */
			tokenize: function (text, grammar) {
				var rest = grammar.rest;
				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				var tokenList = new LinkedList();
				addAfter(tokenList, tokenList.head, text);

				matchGrammar(text, tokenList, grammar, tokenList.head, 0);

				return toArray(tokenList);
			},

			/**
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			hooks: {
				all: {},

				/**
				 * Adds the given callback to the list of callbacks for the given hook.
				 *
				 * The callback will be invoked when the hook it is registered for is run.
				 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
				 *
				 * One callback function can be registered to multiple hooks and the same hook multiple times.
				 *
				 * @param {string} name The name of the hook.
				 * @param {HookCallback} callback The callback function which is given environment variables.
				 * @public
				 */
				add: function (name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				/**
				 * Runs a hook invoking all registered callbacks with the given environment variables.
				 *
				 * Callbacks will be invoked synchronously and in the order in which they were registered.
				 *
				 * @param {string} name The name of the hook.
				 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
				 * @public
				 */
				run: function (name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; (callback = callbacks[i++]);) {
						callback(env);
					}
				}
			},

			Token: Token
		};
		_self.Prism = _;


		// Typescript note:
		// The following can be used to import the Token type in JSDoc:
		//
		//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

		/**
		 * Creates a new token.
		 *
		 * @param {string} type See {@link Token#type type}
		 * @param {string | TokenStream} content See {@link Token#content content}
		 * @param {string|string[]} [alias] The alias(es) of the token.
		 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
		 * @class
		 * @global
		 * @public
		 */
		function Token(type, content, alias, matchedStr) {
			/**
			 * The type of the token.
			 *
			 * This is usually the key of a pattern in a {@link Grammar}.
			 *
			 * @type {string}
			 * @see GrammarToken
			 * @public
			 */
			this.type = type;
			/**
			 * The strings or tokens contained by this token.
			 *
			 * This will be a token stream if the pattern matched also defined an `inside` grammar.
			 *
			 * @type {string | TokenStream}
			 * @public
			 */
			this.content = content;
			/**
			 * The alias(es) of the token.
			 *
			 * @type {string|string[]}
			 * @see GrammarToken
			 * @public
			 */
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || '').length | 0;
		}

		/**
		 * A token stream is an array of strings and {@link Token Token} objects.
		 *
		 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
		 * them.
		 *
		 * 1. No adjacent strings.
		 * 2. No empty strings.
		 *
		 *    The only exception here is the token stream that only contains the empty string and nothing else.
		 *
		 * @typedef {Array<string | Token>} TokenStream
		 * @global
		 * @public
		 */

		/**
		 * Converts the given token or token stream to an HTML representation.
		 *
		 * The following hooks will be run:
		 * 1. `wrap`: On each {@link Token}.
		 *
		 * @param {string | Token | TokenStream} o The token or token stream to be converted.
		 * @param {string} language The name of current language.
		 * @returns {string} The HTML representation of the token or token stream.
		 * @memberof Token
		 * @static
		 */
		Token.stringify = function stringify(o, language) {
			if (typeof o == 'string') {
				return o;
			}
			if (Array.isArray(o)) {
				var s = '';
				o.forEach(function (e) {
					s += stringify(e, language);
				});
				return s;
			}

			var env = {
				type: o.type,
				content: stringify(o.content, language),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language
			};

			var aliases = o.alias;
			if (aliases) {
				if (Array.isArray(aliases)) {
					Array.prototype.push.apply(env.classes, aliases);
				} else {
					env.classes.push(aliases);
				}
			}

			_.hooks.run('wrap', env);

			var attributes = '';
			for (var name in env.attributes) {
				attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
		};

		/**
		 * @param {RegExp} pattern
		 * @param {number} pos
		 * @param {string} text
		 * @param {boolean} lookbehind
		 * @returns {RegExpExecArray | null}
		 */
		function matchPattern(pattern, pos, text, lookbehind) {
			pattern.lastIndex = pos;
			var match = pattern.exec(text);
			if (match && lookbehind && match[1]) {
				// change the match to remove the text matched by the Prism lookbehind group
				var lookbehindLength = match[1].length;
				match.index += lookbehindLength;
				match[0] = match[0].slice(lookbehindLength);
			}
			return match;
		}

		/**
		 * @param {string} text
		 * @param {LinkedList<string | Token>} tokenList
		 * @param {any} grammar
		 * @param {LinkedListNode<string | Token>} startNode
		 * @param {number} startPos
		 * @param {RematchOptions} [rematch]
		 * @returns {void}
		 * @private
		 *
		 * @typedef RematchOptions
		 * @property {string} cause
		 * @property {number} reach
		 */
		function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = Array.isArray(patterns) ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					if (rematch && rematch.cause == token + ',' + j) {
						return;
					}

					var patternObj = patterns[j];
					var inside = patternObj.inside;
					var lookbehind = !!patternObj.lookbehind;
					var greedy = !!patternObj.greedy;
					var alias = patternObj.alias;

					if (greedy && !patternObj.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
						patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
					}

					/** @type {RegExp} */
					var pattern = patternObj.pattern || patternObj;

					for ( // iterate the token list and keep track of the current token/string position
						var currentNode = startNode.next, pos = startPos;
						currentNode !== tokenList.tail;
						pos += currentNode.value.length, currentNode = currentNode.next
					) {

						if (rematch && pos >= rematch.reach) {
							break;
						}

						var str = currentNode.value;

						if (tokenList.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						var removeCount = 1; // this is the to parameter of removeBetween
						var match;

						if (greedy) {
							match = matchPattern(pattern, pos, text, lookbehind);
							if (!match || match.index >= text.length) {
								break;
							}

							var from = match.index;
							var to = match.index + match[0].length;
							var p = pos;

							// find the node that contains the match
							p += currentNode.value.length;
							while (from >= p) {
								currentNode = currentNode.next;
								p += currentNode.value.length;
							}
							// adjust pos (and p)
							p -= currentNode.value.length;
							pos = p;

							// the current node is a Token, then the match starts inside another Token, which is invalid
							if (currentNode.value instanceof Token) {
								continue;
							}

							// find the last node which is affected by this match
							for (
								var k = currentNode;
								k !== tokenList.tail && (p < to || typeof k.value === 'string');
								k = k.next
							) {
								removeCount++;
								p += k.value.length;
							}
							removeCount--;

							// replace with the new match
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							match = matchPattern(pattern, 0, str, lookbehind);
							if (!match) {
								continue;
							}
						}

						// eslint-disable-next-line no-redeclare
						var from = match.index;
						var matchStr = match[0];
						var before = str.slice(0, from);
						var after = str.slice(from + matchStr.length);

						var reach = pos + str.length;
						if (rematch && reach > rematch.reach) {
							rematch.reach = reach;
						}

						var removeFrom = currentNode.prev;

						if (before) {
							removeFrom = addAfter(tokenList, removeFrom, before);
							pos += before.length;
						}

						removeRange(tokenList, removeFrom, removeCount);

						var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
						currentNode = addAfter(tokenList, removeFrom, wrapped);

						if (after) {
							addAfter(tokenList, currentNode, after);
						}

						if (removeCount > 1) {
							// at least one Token object was removed, so we have to do some rematching
							// this can only happen if the current pattern is greedy

							/** @type {RematchOptions} */
							var nestedRematch = {
								cause: token + ',' + j,
								reach: reach
							};
							matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

							// the reach might have been extended because of the rematching
							if (rematch && nestedRematch.reach > rematch.reach) {
								rematch.reach = nestedRematch.reach;
							}
						}
					}
				}
			}
		}

		/**
		 * @typedef LinkedListNode
		 * @property {T} value
		 * @property {LinkedListNode<T> | null} prev The previous node.
		 * @property {LinkedListNode<T> | null} next The next node.
		 * @template T
		 * @private
		 */

		/**
		 * @template T
		 * @private
		 */
		function LinkedList() {
			/** @type {LinkedListNode<T>} */
			var head = { value: null, prev: null, next: null };
			/** @type {LinkedListNode<T>} */
			var tail = { value: null, prev: head, next: null };
			head.next = tail;

			/** @type {LinkedListNode<T>} */
			this.head = head;
			/** @type {LinkedListNode<T>} */
			this.tail = tail;
			this.length = 0;
		}

		/**
		 * Adds a new node with the given value to the list.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {T} value
		 * @returns {LinkedListNode<T>} The added node.
		 * @template T
		 */
		function addAfter(list, node, value) {
			// assumes that node != list.tail && values.length >= 0
			var next = node.next;

			var newNode = { value: value, prev: node, next: next };
			node.next = newNode;
			next.prev = newNode;
			list.length++;

			return newNode;
		}
		/**
		 * Removes `count` nodes after the given node. The given node will not be removed.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {number} count
		 * @template T
		 */
		function removeRange(list, node, count) {
			var next = node.next;
			for (var i = 0; i < count && next !== list.tail; i++) {
				next = next.next;
			}
			node.next = next;
			next.prev = node;
			list.length -= i;
		}
		/**
		 * @param {LinkedList<T>} list
		 * @returns {T[]}
		 * @template T
		 */
		function toArray(list) {
			var array = [];
			var node = list.head.next;
			while (node !== list.tail) {
				array.push(node.value);
				node = node.next;
			}
			return array;
		}


		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _;
			}

			if (!_.disableWorkerMessageHandler) {
				// In worker
				_self.addEventListener('message', function (evt) {
					var message = JSON.parse(evt.data);
					var lang = message.language;
					var code = message.code;
					var immediateClose = message.immediateClose;

					_self.postMessage(_.highlight(code, _.languages[lang], lang));
					if (immediateClose) {
						_self.close();
					}
				}, false);
			}

			return _;
		}

		// Get current script and highlight
		var script = _.util.currentScript();

		if (script) {
			_.filename = script.src;

			if (script.hasAttribute('data-manual')) {
				_.manual = true;
			}
		}

		function highlightAutomaticallyCallback() {
			if (!_.manual) {
				_.highlightAll();
			}
		}

		if (!_.manual) {
			// If the document state is "loading", then we'll use DOMContentLoaded.
			// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
			// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
			// might take longer one animation frame to execute which can create a race condition where only some plugins have
			// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
			// See https://github.com/PrismJS/prism/issues/2102
			var readyState = document.readyState;
			if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
				document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
			} else {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(highlightAutomaticallyCallback);
				} else {
					window.setTimeout(highlightAutomaticallyCallback, 16);
				}
			}
		}

		return _;

	}(_self));

	if (module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}

	// some additional documentation/types

	/**
	 * The expansion of a simple `RegExp` literal to support additional properties.
	 *
	 * @typedef GrammarToken
	 * @property {RegExp} pattern The regular expression of the token.
	 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	 * @property {boolean} [greedy=false] Whether the token is greedy.
	 * @property {string|string[]} [alias] An optional alias or list of aliases.
	 * @property {Grammar} [inside] The nested grammar of this token.
	 *
	 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
	 *
	 * This can be used to make nested and even recursive language definitions.
	 *
	 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	 * each another.
	 * @global
	 * @public
	 */

	/**
	 * @typedef Grammar
	 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	 * @global
	 * @public
	 */

	/**
	 * A function which will invoked after an element was successfully highlighted.
	 *
	 * @callback HighlightCallback
	 * @param {Element} element The element successfully highlighted.
	 * @returns {void}
	 * @global
	 * @public
	 */

	/**
	 * @callback HookCallback
	 * @param {Object<string, any>} env The environment variables of the hook.
	 * @returns {void}
	 * @global
	 * @public
	 */


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		'prolog': {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		'doctype': {
			// https://www.w3.org/TR/xml/#NT-doctypedecl
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				'internal-subset': {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null // see below
				},
				'string': {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				'punctuation': /^<!|>$|[[\]]/,
				'doctype-tag': /^DOCTYPE/i,
				'name': /[^\s<>'"]+/
			}
		},
		'cdata': {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'special-attr': [],
				'attr-value': {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: {
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': [
			{
				pattern: /&[\da-z]{1,8};/i,
				alias: 'named-entity'
			},
			/&#x?[\da-f]{1,8};/i
		]
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];
	Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		/**
		 * Adds an inlined language to markup.
		 *
		 * An example of an inlined language is CSS with `<style>` tags.
		 *
		 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addInlined('style', 'css');
		 */
		value: function addInlined(tagName, lang) {
			var includedCdataInside = {};
			includedCdataInside['language-' + lang] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: true,
				inside: Prism.languages[lang]
			};
			includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

			var inside = {
				'included-cdata': {
					pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
					inside: includedCdataInside
				}
			};
			inside['language-' + lang] = {
				pattern: /[\s\S]+/,
				inside: Prism.languages[lang]
			};

			var def = {};
			def[tagName] = {
				pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
				lookbehind: true,
				greedy: true,
				inside: inside
			};

			Prism.languages.insertBefore('markup', 'cdata', def);
		}
	});
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		/**
		 * Adds an pattern to highlight languages embedded in HTML attributes.
		 *
		 * An example of an inlined language is CSS with `style` attributes.
		 *
		 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addAttribute('style', 'css');
		 */
		value: function (attrName, lang) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
					'i'
				),
				lookbehind: true,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							'value': {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: true,
								alias: [lang, 'language-' + lang],
								inside: Prism.languages[lang]
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					}
				}
			});
		}
	});

	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.xml = Prism.languages.extend('markup', {});
	Prism.languages.ssml = Prism.languages.xml;
	Prism.languages.atom = Prism.languages.xml;
	Prism.languages.rss = Prism.languages.xml;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	(function (Prism) {

		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

		Prism.languages.css = {
			'comment': /\/\*[\s\S]*?\*\//,
			'atrule': {
				pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
				inside: {
					'rule': /^@[\w-]+/,
					'selector-function-argument': {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: 'selector'
					},
					'keyword': {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
					// See rest below
				}
			},
			'url': {
				// https://drafts.csswg.org/css-values-3/#urls
				pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
				greedy: true,
				inside: {
					'function': /^url/i,
					'punctuation': /^\(|\)$/,
					'string': {
						pattern: RegExp('^' + string.source + '$'),
						alias: 'url'
					}
				}
			},
			'selector': {
				pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
				lookbehind: true
			},
			'string': {
				pattern: string,
				greedy: true
			},
			'property': {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			'important': /!important\b/i,
			'function': {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			'punctuation': /[(){};:,]/
		};

		Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

		var markup = Prism.languages.markup;
		if (markup) {
			markup.tag.addInlined('style', 'css');
			markup.tag.addAttribute('style', 'css');
		}

	}(Prism));


	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b\w+(?=\()/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'class-name': [
			Prism.languages.clike['class-name'],
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
				lookbehind: true
			}
		],
		'keyword': [
			{
				pattern: /((?:^|\})\s*)catch\b/,
				lookbehind: true
			},
			{
				pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
				lookbehind: true
			},
		],
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		'number': {
			pattern: RegExp(
				/(^|[^\w$])/.source +
				'(?:' +
				(
					// constant
					/NaN|Infinity/.source +
					'|' +
					// binary integer
					/0[bB][01]+(?:_[01]+)*n?/.source +
					'|' +
					// octal integer
					/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
					'|' +
					// hexadecimal integer
					/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
					'|' +
					// decimal bigint
					/\d+(?:_\d+)*n/.source +
					'|' +
					// decimal number (integer or float) but no bigint
					/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
				) +
				')' +
				/(?![\w$])/.source
			),
			lookbehind: true
		},
		'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});

	Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: RegExp(
				// lookbehind
				// eslint-disable-next-line regexp/no-dupe-characters-character-class
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
				// Regex pattern:
				// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
				// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
				// with the only syntax, so we have to define 2 different regex patterns.
				/\//.source +
				'(?:' +
				/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
				'|' +
				// `v` flag syntax. This supports 3 levels of nested character classes.
				/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
				')' +
				// lookahead
				/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: 'language-regex',
					inside: Prism.languages.regex
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			}
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function'
		},
		'parameter': [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			}
		],
		'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'hashbang': {
			pattern: /^#!.*/,
			greedy: true,
			alias: 'comment'
		},
		'template-string': {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				'template-punctuation': {
					pattern: /^`|`$/,
					alias: 'string'
				},
				'interpolation': {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string-property': {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: 'property'
		}
	});

	Prism.languages.insertBefore('javascript', 'operator', {
		'literal-property': {
			pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
			lookbehind: true,
			alias: 'property'
		},
	});

	if (Prism.languages.markup) {
		Prism.languages.markup.tag.addInlined('script', 'javascript');

		// add attribute support for all DOM events.
		// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
		Prism.languages.markup.tag.addAttribute(
			/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
			'javascript'
		);
	}

	Prism.languages.js = Prism.languages.javascript;


	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {

		if (typeof Prism === 'undefined' || typeof document === 'undefined') {
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}

		var LOADING_MESSAGE = 'Loading…';
		var FAILURE_MESSAGE = function (status, message) {
			return '✖ Error ' + status + ' while fetching file: ' + message;
		};
		var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

		var EXTENSIONS = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		var STATUS_ATTR = 'data-src-status';
		var STATUS_LOADING = 'loading';
		var STATUS_LOADED = 'loaded';
		var STATUS_FAILED = 'failed';

		var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
			+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

		/**
		 * Loads the given file.
		 *
		 * @param {string} src The URL or path of the source file to load.
		 * @param {(result: string) => void} success
		 * @param {(reason: string) => void} error
		 */
		function loadFile(src, success, error) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						success(xhr.responseText);
					} else {
						if (xhr.status >= 400) {
							error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
						} else {
							error(FAILURE_EMPTY_MESSAGE);
						}
					}
				}
			};
			xhr.send(null);
		}

		/**
		 * Parses the given range.
		 *
		 * This returns a range with inclusive ends.
		 *
		 * @param {string | null | undefined} range
		 * @returns {[number, number | undefined] | undefined}
		 */
		function parseRange(range) {
			var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
			if (m) {
				var start = Number(m[1]);
				var comma = m[2];
				var end = m[3];

				if (!comma) {
					return [start, start];
				}
				if (!end) {
					return [start, undefined];
				}
				return [start, Number(end)];
			}
			return undefined;
		}

		Prism.hooks.add('before-highlightall', function (env) {
			env.selector += ', ' + SELECTOR;
		});

		Prism.hooks.add('before-sanity-check', function (env) {
			var pre = /** @type {HTMLPreElement} */ (env.element);
			if (pre.matches(SELECTOR)) {
				env.code = ''; // fast-path the whole thing and go to complete

				pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

				// add code element with loading message
				var code = pre.appendChild(document.createElement('CODE'));
				code.textContent = LOADING_MESSAGE;

				var src = pre.getAttribute('data-src');

				var language = env.language;
				if (language === 'none') {
					// the language might be 'none' because there is no language set;
					// in this case, we want to use the extension as the language
					var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
					language = EXTENSIONS[extension] || extension;
				}

				// set language classes
				Prism.util.setLanguage(code, language);
				Prism.util.setLanguage(pre, language);

				// preload the language
				var autoloader = Prism.plugins.autoloader;
				if (autoloader) {
					autoloader.loadLanguages(language);
				}

				// load file
				loadFile(
					src,
					function (text) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// handle data-range
						var range = parseRange(pre.getAttribute('data-range'));
						if (range) {
							var lines = text.split(/\r\n?|\n/g);

							// the range is one-based and inclusive on both ends
							var start = range[0];
							var end = range[1] == null ? lines.length : range[1];

							if (start < 0) { start += lines.length; }
							start = Math.max(0, Math.min(start - 1, lines.length));
							if (end < 0) { end += lines.length; }
							end = Math.max(0, Math.min(end, lines.length));

							text = lines.slice(start, end).join('\n');

							// add data-start for line numbers
							if (!pre.hasAttribute('data-start')) {
								pre.setAttribute('data-start', String(start + 1));
							}
						}

						// highlight code
						code.textContent = text;
						Prism.highlightElement(code);
					},
					function (error) {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						code.textContent = error;
					}
				);
			}
		});

		Prism.plugins.fileHighlight = {
			/**
			 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
			 *
			 * Note: Elements which are already loaded or currently loading will not be touched by this method.
			 *
			 * @param {ParentNode} [container=document]
			 */
			highlight: function highlight(container) {
				var elements = (container || document).querySelectorAll(SELECTOR);

				for (var i = 0, element; (element = elements[i++]);) {
					Prism.highlightElement(element);
				}
			}
		};

		var logged = false;
		/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
		Prism.fileHighlight = function () {
			if (!logged) {
				console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
				logged = true;
			}
			Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};

	}()); 
} (prism));

var prismExports = prism.exports;
var prismjs = /*@__PURE__*/getDefaultExportFromCjs(prismExports);

(function (Prism) {

	/**
	 * Returns the placeholder for the given language id and index.
	 *
	 * @param {string} language
	 * @param {string|number} index
	 * @returns {string}
	 */
	function getPlaceholder(language, index) {
		return '___' + language.toUpperCase() + index + '___';
	}

	Object.defineProperties(Prism.languages['markup-templating'] = {}, {
		buildPlaceholders: {
			/**
			 * Tokenize all inline templating expressions matching `placeholderPattern`.
			 *
			 * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
			 * `true` will be replaced.
			 *
			 * @param {object} env The environment of the `before-tokenize` hook.
			 * @param {string} language The language id.
			 * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
			 * @param {(match: string) => boolean} [replaceFilter]
			 */
			value: function (env, language, placeholderPattern, replaceFilter) {
				if (env.language !== language) {
					return;
				}

				var tokenStack = env.tokenStack = [];

				env.code = env.code.replace(placeholderPattern, function (match) {
					if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
						return match;
					}
					var i = tokenStack.length;
					var placeholder;

					// Check for existing strings
					while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
						++i;
					}

					// Create a sparse array
					tokenStack[i] = match;

					return placeholder;
				});

				// Switch the grammar to markup
				env.grammar = Prism.languages.markup;
			}
		},
		tokenizePlaceholders: {
			/**
			 * Replace placeholders with proper tokens after tokenizing.
			 *
			 * @param {object} env The environment of the `after-tokenize` hook.
			 * @param {string} language The language id.
			 */
			value: function (env, language) {
				if (env.language !== language || !env.tokenStack) {
					return;
				}

				// Switch the grammar back
				env.grammar = Prism.languages[language];

				var j = 0;
				var keys = Object.keys(env.tokenStack);

				function walkTokens(tokens) {
					for (var i = 0; i < tokens.length; i++) {
						// all placeholders are replaced already
						if (j >= keys.length) {
							break;
						}

						var token = tokens[i];
						if (typeof token === 'string' || (token.content && typeof token.content === 'string')) {
							var k = keys[j];
							var t = env.tokenStack[k];
							var s = typeof token === 'string' ? token : token.content;
							var placeholder = getPlaceholder(language, k);

							var index = s.indexOf(placeholder);
							if (index > -1) {
								++j;

								var before = s.substring(0, index);
								var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
								var after = s.substring(index + placeholder.length);

								var replacement = [];
								if (before) {
									replacement.push.apply(replacement, walkTokens([before]));
								}
								replacement.push(middle);
								if (after) {
									replacement.push.apply(replacement, walkTokens([after]));
								}

								if (typeof token === 'string') {
									tokens.splice.apply(tokens, [i, 1].concat(replacement));
								} else {
									token.content = replacement;
								}
							}
						} else if (token.content /* && typeof token.content !== 'string' */) {
							walkTokens(token.content);
						}
					}

					return tokens;
				}

				walkTokens(env.tokens);
			}
		}
	});

}(Prism));

Prism.languages.aspnet = Prism.languages.extend('markup', {
	'page-directive': {
		pattern: /<%\s*@.*%>/,
		alias: 'tag',
		inside: {
			'page-directive': {
				pattern: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
				alias: 'tag'
			},
			rest: Prism.languages.markup.tag.inside
		}
	},
	'directive': {
		pattern: /<%.*%>/,
		alias: 'tag',
		inside: {
			'directive': {
				pattern: /<%\s*?[$=%#:]{0,2}|%>/,
				alias: 'tag'
			},
			rest: Prism.languages.csharp
		}
	}
});
// Regexp copied from prism-markup, with a negative look-ahead added
Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/;

// match directives of attribute value foo="<% Bar %>"
Prism.languages.insertBefore('inside', 'punctuation', {
	'directive': Prism.languages.aspnet['directive']
}, Prism.languages.aspnet.tag.inside['attr-value']);

Prism.languages.insertBefore('aspnet', 'comment', {
	'asp-comment': {
		pattern: /<%--[\s\S]*?--%>/,
		alias: ['asp', 'comment']
	}
});

// script runat="server" contains csharp, not javascript
Prism.languages.insertBefore('aspnet', Prism.languages.javascript ? 'script' : 'tag', {
	'asp-script': {
		pattern: /(<script(?=.*runat=['"]?server\b)[^>]*>)[\s\S]*?(?=<\/script>)/i,
		lookbehind: true,
		alias: ['asp', 'script'],
		inside: Prism.languages.csharp || {}
	}
});

Prism.languages.c = Prism.languages.extend('clike', {
	'comment': {
		pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'string': {
		// https://en.cppreference.com/w/c/language/string_literal
		pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
		lookbehind: true
	},
	'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
	'function': /\b[a-z_]\w*(?=\s*\()/i,
	'number': /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
	'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});

Prism.languages.insertBefore('c', 'string', {
	'char': {
		// https://en.cppreference.com/w/c/language/character_constant
		pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
		greedy: true
	}
});

Prism.languages.insertBefore('c', 'string', {
	'macro': {
		// allow for multiline macro definitions
		// spaces after the # character compile fine with gcc
		pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
		lookbehind: true,
		greedy: true,
		alias: 'property',
		inside: {
			'string': [
				{
					// highlight the path of the include statement as a string
					pattern: /^(#\s*include\s*)<[^>]+>/,
					lookbehind: true
				},
				Prism.languages.c['string']
			],
			'char': Prism.languages.c['char'],
			'comment': Prism.languages.c['comment'],
			'macro-name': [
				{
					pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
					lookbehind: true
				},
				{
					pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
					lookbehind: true,
					alias: 'function'
				}
			],
			// highlight macro directives as keywords
			'directive': {
				pattern: /^(#\s*)[a-z]+/,
				lookbehind: true,
				alias: 'keyword'
			},
			'directive-hash': /^#/,
			'punctuation': /##|\\(?=[\r\n])/,
			'expression': {
				pattern: /\S[\s\S]*/,
				inside: Prism.languages.c
			}
		}
	}
});

Prism.languages.insertBefore('c', 'function', {
	// highlight predefined macros as constants
	'constant': /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});

delete Prism.languages.c['boolean'];

(function (Prism) {

	/**
	 * Replaces all placeholders "<<n>>" of given pattern with the n-th replacement (zero based).
	 *
	 * Note: This is a simple text based replacement. Be careful when using backreferences!
	 *
	 * @param {string} pattern the given pattern.
	 * @param {string[]} replacements a list of replacement which can be inserted into the given pattern.
	 * @returns {string} the pattern with all placeholders replaced with their corresponding replacements.
	 * @example replace(/a<<0>>a/.source, [/b+/.source]) === /a(?:b+)a/.source
	 */
	function replace(pattern, replacements) {
		return pattern.replace(/<<(\d+)>>/g, function (m, index) {
			return '(?:' + replacements[+index] + ')';
		});
	}
	/**
	 * @param {string} pattern
	 * @param {string[]} replacements
	 * @param {string} [flags]
	 * @returns {RegExp}
	 */
	function re(pattern, replacements, flags) {
		return RegExp(replace(pattern, replacements), flags || '');
	}

	/**
	 * Creates a nested pattern where all occurrences of the string `<<self>>` are replaced with the pattern itself.
	 *
	 * @param {string} pattern
	 * @param {number} depthLog2
	 * @returns {string}
	 */
	function nested(pattern, depthLog2) {
		for (var i = 0; i < depthLog2; i++) {
			pattern = pattern.replace(/<<self>>/g, function () { return '(?:' + pattern + ')'; });
		}
		return pattern.replace(/<<self>>/g, '[^\\s\\S]');
	}

	// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
	var keywordKinds = {
		// keywords which represent a return or variable type
		type: 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
		// keywords which are used to declare a type
		typeDeclaration: 'class enum interface record struct',
		// contextual keywords
		// ("var" and "dynamic" are missing because they are used like types)
		contextual: 'add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)',
		// all other keywords
		other: 'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
	};

	// keywords
	function keywordsToPattern(words) {
		return '\\b(?:' + words.trim().replace(/ /g, '|') + ')\\b';
	}
	var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
	var keywords = RegExp(keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other));
	var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other);
	var nonContextualKeywords = keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.other);

	// types
	var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2); // the idea behind the other forbidden characters is to prevent false positives. Same for tupleElement.
	var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
	var name = /@?\b[A-Za-z_]\w*\b/.source;
	var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
	var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [nonTypeKeywords, genericName]);
	var array = /\[\s*(?:,\s*)*\]/.source;
	var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [identifier, array]);
	var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [generic, nestedRound, array]);
	var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
	var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [tuple, identifier, array]);

	var typeInside = {
		'keyword': keywords,
		'punctuation': /[<>()?,.:[\]]/
	};

	// strings & characters
	// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#character-literals
	// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#string-literals
	var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source; // simplified pattern
	var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
	var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;


	Prism.languages.csharp = Prism.languages.extend('clike', {
		'string': [
			{
				pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
				lookbehind: true,
				greedy: true
			},
			{
				pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
				lookbehind: true,
				greedy: true
			}
		],
		'class-name': [
			{
				// Using static
				// using static System.Math;
				pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
				lookbehind: true,
				inside: typeInside
			},
			{
				// Using alias (type)
				// using Project = PC.MyCompany.Project;
				pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [name, typeExpression]),
				lookbehind: true,
				inside: typeInside
			},
			{
				// Using alias (alias)
				// using Project = PC.MyCompany.Project;
				pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
				lookbehind: true
			},
			{
				// Type declarations
				// class Foo<A, B>
				// interface Foo<out A, B>
				pattern: re(/(\b<<0>>\s+)<<1>>/.source, [typeDeclarationKeywords, genericName]),
				lookbehind: true,
				inside: typeInside
			},
			{
				// Single catch exception declaration
				// catch(Foo)
				// (things like catch(Foo e) is covered by variable declaration)
				pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
				lookbehind: true,
				inside: typeInside
			},
			{
				// Name of the type parameter of generic constraints
				// where Foo : class
				pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
				lookbehind: true
			},
			{
				// Casts and checks via as and is.
				// as Foo<A>, is Bar<B>
				// (things like if(a is Foo b) is covered by variable declaration)
				pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
				lookbehind: true,
				inside: typeInside
			},
			{
				// Variable, field and parameter declaration
				// (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
				pattern: re(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [typeExpression, nonContextualKeywords, name]),
				inside: typeInside
			}
		],
		'keyword': keywords,
		// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
		'number': /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
		'operator': />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
		'punctuation': /\?\.?|::|[{}[\];(),.:]/
	});

	Prism.languages.insertBefore('csharp', 'number', {
		'range': {
			pattern: /\.\./,
			alias: 'operator'
		}
	});

	Prism.languages.insertBefore('csharp', 'punctuation', {
		'named-parameter': {
			pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
			lookbehind: true,
			alias: 'punctuation'
		}
	});

	Prism.languages.insertBefore('csharp', 'class-name', {
		'namespace': {
			// namespace Foo.Bar {}
			// using Foo.Bar;
			pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
			lookbehind: true,
			inside: {
				'punctuation': /\./
			}
		},
		'type-expression': {
			// default(Foo), typeof(Foo<Bar>), sizeof(int)
			pattern: re(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source, [nestedRound]),
			lookbehind: true,
			alias: 'class-name',
			inside: typeInside
		},
		'return-type': {
			// Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
			// int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
			// int Foo => 0; int Foo { get; set } = 0;
			pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [typeExpression, identifier]),
			inside: typeInside,
			alias: 'class-name'
		},
		'constructor-invocation': {
			// new List<Foo<Bar[]>> { }
			pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
			lookbehind: true,
			inside: typeInside,
			alias: 'class-name'
		},
		/*'explicit-implementation': {
			// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
			pattern: replace(/\b<<0>>(?=\.<<1>>)/, className, methodOrPropertyDeclaration),
			inside: classNameInside,
			alias: 'class-name'
		},*/
		'generic-method': {
			// foo<Bar>()
			pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
			inside: {
				'function': re(/^<<0>>/.source, [name]),
				'generic': {
					pattern: RegExp(generic),
					alias: 'class-name',
					inside: typeInside
				}
			}
		},
		'type-list': {
			// The list of types inherited or of generic constraints
			// class Foo<F> : Bar, IList<FooBar>
			// where F : Bar, IList<int>
			pattern: re(
				/\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,
				[typeDeclarationKeywords, genericName, name, typeExpression, keywords.source, nestedRound, /\bnew\s*\(\s*\)/.source]
			),
			lookbehind: true,
			inside: {
				'record-arguments': {
					pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [genericName, nestedRound]),
					lookbehind: true,
					greedy: true,
					inside: Prism.languages.csharp
				},
				'keyword': keywords,
				'class-name': {
					pattern: RegExp(typeExpression),
					greedy: true,
					inside: typeInside
				},
				'punctuation': /[,()]/
			}
		},
		'preprocessor': {
			pattern: /(^[\t ]*)#.*/m,
			lookbehind: true,
			alias: 'property',
			inside: {
				// highlight preprocessor directives as keywords
				'directive': {
					pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
					lookbehind: true,
					alias: 'keyword'
				}
			}
		}
	});

	// attributes
	var regularStringOrCharacter = regularString + '|' + character;
	var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
	var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);

	// https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes/#attribute-targets
	var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
	var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [identifier, roundExpression]);

	Prism.languages.insertBefore('csharp', 'class-name', {
		'attribute': {
			// Attributes
			// [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
			pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [attrTarget, attr]),
			lookbehind: true,
			greedy: true,
			inside: {
				'target': {
					pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
					alias: 'keyword'
				},
				'attribute-arguments': {
					pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
					inside: Prism.languages.csharp
				},
				'class-name': {
					pattern: RegExp(identifier),
					inside: {
						'punctuation': /\./
					}
				},
				'punctuation': /[:,]/
			}
		}
	});


	// string interpolation
	var formatString = /:[^}\r\n]+/.source;
	// multi line
	var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
	var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [mInterpolationRound, formatString]);
	// single line
	var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
	var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [sInterpolationRound, formatString]);

	function createInterpolationInside(interpolation, interpolationRound) {
		return {
			'interpolation': {
				pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
				lookbehind: true,
				inside: {
					'format-string': {
						pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [interpolationRound, formatString]),
						lookbehind: true,
						inside: {
							'punctuation': /^:/
						}
					},
					'punctuation': /^\{|\}$/,
					'expression': {
						pattern: /[\s\S]+/,
						alias: 'language-csharp',
						inside: Prism.languages.csharp
					}
				}
			},
			'string': /[\s\S]+/
		};
	}

	Prism.languages.insertBefore('csharp', 'string', {
		'interpolation-string': [
			{
				pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
				lookbehind: true,
				greedy: true,
				inside: createInterpolationInside(mInterpolation, mInterpolationRound),
			},
			{
				pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
				lookbehind: true,
				greedy: true,
				inside: createInterpolationInside(sInterpolation, sInterpolationRound),
			}
		],
		'char': {
			pattern: RegExp(character),
			greedy: true
		}
	});

	Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;

}(Prism));

// Copied from https://github.com/jeluard/prism-clojure
Prism.languages.clojure = {
	'comment': {
		pattern: /;.*/,
		greedy: true
	},
	'string': {
		pattern: /"(?:[^"\\]|\\.)*"/,
		greedy: true
	},
	'char': /\\\w+/,
	'symbol': {
		pattern: /(^|[\s()\[\]{},])::?[\w*+!?'<>=/.-]+/,
		lookbehind: true
	},
	'keyword': {
		pattern: /(\()(?:-|->|->>|\.|\.\.|\*|\/|\+|<|<=|=|==|>|>=|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|cond|conj|cons|constantly|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|declare|def|def-|definline|definterface|defmacro|defmethod|defmulti|defn|defn-|defonce|defproject|defprotocol|defrecord|defstruct|deftype|deref|difference|disj|dissoc|distinct|do|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|fn|fnseq|for|frest|gensym|get|get-proxy-class|hash-map|hash-set|identical\?|identity|if|if-let|if-not|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|let|line-seq|list|list\*|load|load-file|locking|long|loop|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|monitor-enter|name|namespace|neg\?|new|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|quote|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|recur|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|set!|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|throw|time|to-array|to-array-2d|tree-seq|true\?|try|union|up|update-proxy|val|vals|var|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[\s)]|$)/,
		lookbehind: true
	},
	'boolean': /\b(?:false|nil|true)\b/,
	'number': {
		pattern: /(^|[^\w$@])(?:\d+(?:[/.]\d+)?(?:e[+-]?\d+)?|0x[a-f0-9]+|[1-9]\d?r[a-z0-9]+)[lmn]?(?![\w$@])/i,
		lookbehind: true
	},
	'function': {
		pattern: /((?:^|[^'])\()[\w*+!?'<>=/.-]+(?=[\s)]|$)/,
		lookbehind: true
	},
	'operator': /[#@^`~]/,
	'punctuation': /[{}\[\](),]/
};

(function (Prism) {

	var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
	var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function () { return keyword.source; });

	Prism.languages.cpp = Prism.languages.extend('c', {
		'class-name': [
			{
				pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source
					.replace(/<keyword>/g, function () { return keyword.source; })),
				lookbehind: true
			},
			// This is intended to capture the class name of method implementations like:
			//   void foo::bar() const {}
			// However! The `foo` in the above example could also be a namespace, so we only capture the class name if
			// it starts with an uppercase letter. This approximation should give decent results.
			/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
			// This will capture the class name before destructors like:
			//   Foo::~Foo() {}
			/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
			// This also intends to capture the class name of method implementations but here the class has template
			// parameters, so it can't be a namespace (until C++ adds generic namespaces).
			/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
		],
		'keyword': keyword,
		'number': {
			pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
			greedy: true
		},
		'operator': />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
		'boolean': /\b(?:false|true)\b/
	});

	Prism.languages.insertBefore('cpp', 'string', {
		'module': {
			// https://en.cppreference.com/w/cpp/language/modules
			pattern: RegExp(
				/(\b(?:import|module)\s+)/.source +
				'(?:' +
				// header-name
				/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source +
				'|' +
				// module name or partition or both
				/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function () { return modName; }) +
				')'
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'string': /^[<"][\s\S]+/,
				'operator': /:/,
				'punctuation': /\./
			}
		},
		'raw-string': {
			pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
			alias: 'string',
			greedy: true
		}
	});

	Prism.languages.insertBefore('cpp', 'keyword', {
		'generic-function': {
			pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
			inside: {
				'function': /^\w+/,
				'generic': {
					pattern: /<[\s\S]+/,
					alias: 'class-name',
					inside: Prism.languages.cpp
				}
			}
		}
	});

	Prism.languages.insertBefore('cpp', 'operator', {
		'double-colon': {
			pattern: /::/,
			alias: 'punctuation'
		}
	});

	Prism.languages.insertBefore('cpp', 'class-name', {
		// the base clause is an optional list of parent classes
		// https://en.cppreference.com/w/cpp/language/class
		'base-clause': {
			pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
			lookbehind: true,
			greedy: true,
			inside: Prism.languages.extend('cpp', {})
		}
	});

	Prism.languages.insertBefore('inside', 'double-colon', {
		// All untokenized words that are not namespaces should be class names
		'class-name': /\b[a-z_]\w*\b(?!\s*::)/i
	}, Prism.languages.cpp['base-clause']);

}(Prism));

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));

Prism.languages.cypher = {
	// https://neo4j.com/docs/cypher-manual/current/syntax/comments/
	'comment': /\/\/.*/,
	'string': {
		pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/,
		greedy: true
	},
	'class-name': {
		pattern: /(:\s*)(?:\w+|`(?:[^`\\\r\n])*`)(?=\s*[{):])/,
		lookbehind: true,
		greedy: true
	},
	'relationship': {
		pattern: /(-\[\s*(?:\w+\s*|`(?:[^`\\\r\n])*`\s*)?:\s*|\|\s*:\s*)(?:\w+|`(?:[^`\\\r\n])*`)/,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	},
	'identifier': {
		pattern: /`(?:[^`\\\r\n])*`/,
		greedy: true
	},

	'variable': /\$\w+/,

	// https://neo4j.com/docs/cypher-manual/current/syntax/reserved/
	'keyword': /\b(?:ADD|ALL|AND|AS|ASC|ASCENDING|ASSERT|BY|CALL|CASE|COMMIT|CONSTRAINT|CONTAINS|CREATE|CSV|DELETE|DESC|DESCENDING|DETACH|DISTINCT|DO|DROP|ELSE|END|ENDS|EXISTS|FOR|FOREACH|IN|INDEX|IS|JOIN|KEY|LIMIT|LOAD|MANDATORY|MATCH|MERGE|NODE|NOT|OF|ON|OPTIONAL|OR|ORDER(?=\s+BY)|PERIODIC|REMOVE|REQUIRE|RETURN|SCALAR|SCAN|SET|SKIP|START|STARTS|THEN|UNION|UNIQUE|UNWIND|USING|WHEN|WHERE|WITH|XOR|YIELD)\b/i,

	'function': /\b\w+\b(?=\s*\()/,

	'boolean': /\b(?:false|null|true)\b/i,
	'number': /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
	// https://neo4j.com/docs/cypher-manual/current/syntax/operators/
	'operator': /:|<--?|--?>?|<>|=~?|[<>]=?|[+*/%^|]|\.\.\.?/,
	'punctuation': /[()[\]{},;.]/
};

Prism.languages.d = Prism.languages.extend('clike', {
	'comment': [
		{
			// Shebang
			pattern: /^\s*#!.+/,
			greedy: true
		},
		{
			pattern: RegExp(/(^|[^\\])/.source + '(?:' + [
				// /+ comment +/
				// Allow one level of nesting
				/\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[\s\S])*?\+\//.source,
				// // comment
				/\/\/.*/.source,
				// /* comment */
				/\/\*[\s\S]*?\*\//.source
			].join('|') + ')'),
			lookbehind: true,
			greedy: true
		}
	],
	'string': [
		{
			pattern: RegExp([
				// r"", x""
				/\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?/.source,

				// q"[]", q"()", q"<>", q"{}"
				/\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|\{[\s\S]*?\})"/.source,

				// q"IDENT
				// ...
				// IDENT"
				/\bq"((?!\d)\w+)$[\s\S]*?^\1"/.source,

				// q"//", q"||", etc.
				// eslint-disable-next-line regexp/strict
				/\bq"(.)[\s\S]*?\2"/.source,

				// eslint-disable-next-line regexp/strict
				/(["`])(?:\\[\s\S]|(?!\3)[^\\])*\3[cwd]?/.source
			].join('|'), 'm'),
			greedy: true
		},
		{
			pattern: /\bq\{(?:\{[^{}]*\}|[^{}])*\}/,
			greedy: true,
			alias: 'token-string'
		}
	],

	// In order: $, keywords and special tokens, globally defined symbols
	'keyword': /\$|\b(?:__(?:(?:DATE|EOF|FILE|FUNCTION|LINE|MODULE|PRETTY_FUNCTION|TIMESTAMP|TIME|VENDOR|VERSION)__|gshared|parameters|traits|vector)|abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|dstring|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|ptrdiff_t|public|pure|real|ref|return|scope|shared|short|size_t|static|string|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|wstring)\b/,

	'number': [
		// The lookbehind and the negative look-ahead try to prevent bad highlighting of the .. operator
		// Hexadecimal numbers must be handled separately to avoid problems with exponent "e"
		/\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]{0,4}/i,
		{
			pattern: /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]{0,4}/i,
			lookbehind: true
		}
	],

	'operator': /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/
});

Prism.languages.insertBefore('d', 'string', {
	// Characters
	// 'a', '\\', '\n', '\xFF', '\377', '\uFFFF', '\U0010FFFF', '\quot'
	'char': /'(?:\\(?:\W|\w+)|[^\\])'/
});

Prism.languages.insertBefore('d', 'keyword', {
	'property': /\B@\w*/
});

Prism.languages.insertBefore('d', 'function', {
	'register': {
		// Iasm registers
		pattern: /\b(?:[ABCD][LHX]|E?(?:BP|DI|SI|SP)|[BS]PL|[ECSDGF]S|CR[0234]|[DS]IL|DR[012367]|E[ABCD]X|X?MM[0-7]|R(?:1[0-5]|[89])[BWD]?|R[ABCD]X|R[BS]P|R[DS]I|TR[3-7]|XMM(?:1[0-5]|[89])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
		alias: 'variable'
	}
});

(function (Prism) {
	var keywords = [
		/\b(?:async|sync|yield)\*/,
		/\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
	];

	// Handles named imports, such as http.Client
	var packagePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;

	// based on the dart naming conventions
	var className = {
		pattern: RegExp(packagePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
		lookbehind: true,
		inside: {
			'namespace': {
				pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
				inside: {
					'punctuation': /\./
				}
			},
		}
	};

	Prism.languages.dart = Prism.languages.extend('clike', {
		'class-name': [
			className,
			{
				// variables and parameters
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				pattern: RegExp(packagePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),
				lookbehind: true,
				inside: className.inside
			}
		],
		'keyword': keywords,
		'operator': /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
	});

	Prism.languages.insertBefore('dart', 'string', {
		'string-literal': {
			pattern: /r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
					lookbehind: true,
					inside: {
						'punctuation': /^\$\{?|\}$/,
						'expression': {
							pattern: /[\s\S]+/,
							inside: Prism.languages.dart
						}
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string': undefined
	});

	Prism.languages.insertBefore('dart', 'class-name', {
		'metadata': {
			pattern: /@\w+/,
			alias: 'function'
		}
	});

	Prism.languages.insertBefore('dart', 'class-name', {
		'generics': {
			pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
			inside: {
				'class-name': className,
				'keyword': keywords,
				'punctuation': /[<>(),.:]/,
				'operator': /[?&|]/
			}
		},
	});
}(Prism));

(function (Prism) {

	Prism.languages.diff = {
		'coord': [
			// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
			/^(?:\*{3}|-{3}|\+{3}).*$/m,
			// Match "@@ ... @@" coord lines in unified diff.
			/^@@.*@@$/m,
			// Match coord lines in normal diff (starts with a number).
			/^\d.*$/m
		]

		// deleted, inserted, unchanged, diff
	};

	/**
	 * A map from the name of a block to its line prefix.
	 *
	 * @type {Object<string, string>}
	 */
	var PREFIXES = {
		'deleted-sign': '-',
		'deleted-arrow': '<',
		'inserted-sign': '+',
		'inserted-arrow': '>',
		'unchanged': ' ',
		'diff': '!',
	};

	// add a token for each prefix
	Object.keys(PREFIXES).forEach(function (name) {
		var prefix = PREFIXES[name];

		var alias = [];
		if (!/^\w+$/.test(name)) { // "deleted-sign" -> "deleted"
			alias.push(/\w+/.exec(name)[0]);
		}
		if (name === 'diff') {
			alias.push('bold');
		}

		Prism.languages.diff[name] = {
			pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
			alias: alias,
			inside: {
				'line': {
					pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
					lookbehind: true
				},
				'prefix': {
					pattern: /[\s\S]/,
					alias: /\w+/.exec(name)[0]
				}
			}
		};

	});

	// make prefixes available to Diff plugin
	Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
		value: PREFIXES
	});

}(Prism));

(function (Prism) {

	// Many of the following regexes will contain negated lookaheads like `[ \t]+(?![ \t])`. This is a trick to ensure
	// that quantifiers behave *atomically*. Atomic quantifiers are necessary to prevent exponential backtracking.

	var spaceAfterBackSlash = /\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source;
	// At least one space, comment, or line break
	var space = /(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source
		.replace(/<SP_BS>/g, function () { return spaceAfterBackSlash; });

	var string = /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source;
	var option = /--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g, function () { return string; });

	var stringRule = {
		pattern: RegExp(string),
		greedy: true
	};
	var commentRule = {
		pattern: /(^[ \t]*)#.*/m,
		lookbehind: true,
		greedy: true
	};

	/**
	 * @param {string} source
	 * @param {string} flags
	 * @returns {RegExp}
	 */
	function re(source, flags) {
		source = source
			.replace(/<OPT>/g, function () { return option; })
			.replace(/<SP>/g, function () { return space; });

		return RegExp(source, flags);
	}

	Prism.languages.docker = {
		'instruction': {
			pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
			lookbehind: true,
			greedy: true,
			inside: {
				'options': {
					pattern: re(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source, 'i'),
					lookbehind: true,
					greedy: true,
					inside: {
						'property': {
							pattern: /(^|\s)--[\w-]+/,
							lookbehind: true
						},
						'string': [
							stringRule,
							{
								pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
								lookbehind: true
							}
						],
						'operator': /\\$/m,
						'punctuation': /=/
					}
				},
				'keyword': [
					{
						// https://docs.docker.com/engine/reference/builder/#healthcheck
						pattern: re(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source, 'i'),
						lookbehind: true,
						greedy: true
					},
					{
						// https://docs.docker.com/engine/reference/builder/#from
						pattern: re(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source, 'i'),
						lookbehind: true,
						greedy: true
					},
					{
						// https://docs.docker.com/engine/reference/builder/#onbuild
						pattern: re(/(^ONBUILD<SP>)\w+/.source, 'i'),
						lookbehind: true,
						greedy: true
					},
					{
						pattern: /^\w+/,
						greedy: true
					}
				],
				'comment': commentRule,
				'string': stringRule,
				'variable': /\$(?:\w+|\{[^{}"'\\]*\})/,
				'operator': /\\$/m
			}
		},
		'comment': commentRule
	};

	Prism.languages.dockerfile = Prism.languages.docker;

}(Prism));

Prism.languages.erlang = {
	'comment': /%.+/,
	'string': {
		pattern: /"(?:\\.|[^\\"\r\n])*"/,
		greedy: true
	},
	'quoted-function': {
		pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
		alias: 'function'
	},
	'quoted-atom': {
		pattern: /'(?:\\.|[^\\'\r\n])+'/,
		alias: 'atom'
	},
	'boolean': /\b(?:false|true)\b/,
	'keyword': /\b(?:after|begin|case|catch|end|fun|if|of|receive|try|when)\b/,
	'number': [
		/\$\\?./,
		/\b\d+#[a-z0-9]+/i,
		/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i
	],
	'function': /\b[a-z][\w@]*(?=\()/,
	'variable': {
		// Look-behind is used to prevent wrong highlighting of atoms containing "@"
		pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
		lookbehind: true
	},
	'operator': [
		/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:and|andalso|band|bnot|bor|bsl|bsr|bxor|div|not|or|orelse|rem|xor)\b/,
		{
			// We don't want to match <<
			pattern: /(^|[^<])<(?!<)/,
			lookbehind: true
		},
		{
			// We don't want to match >>
			pattern: /(^|[^>])>(?!>)/,
			lookbehind: true
		}
	],
	'atom': /\b[a-z][\w@]*/,
	'punctuation': /[()[\]{}:;,.#|]|<<|>>/

};

Prism.languages.go = Prism.languages.extend('clike', {
	'string': {
		pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
		lookbehind: true,
		greedy: true
	},
	'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
	'boolean': /\b(?:_|false|iota|nil|true)\b/,
	'number': [
		// binary and octal integers
		/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
		// hexadecimal integers and floats
		/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
		// decimal integers and floats
		/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
	],
	'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
	'builtin': /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
});

Prism.languages.insertBefore('go', 'string', {
	'char': {
		pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
		greedy: true
	}
});

delete Prism.languages.go['class-name'];

Prism.languages.graphql = {
	'comment': /#.*/,
	'description': {
		pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
		greedy: true,
		alias: 'string',
		inside: {
			'language-markdown': {
				pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
				lookbehind: true,
				inside: Prism.languages.markdown
			}
		}
	},
	'string': {
		pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
		greedy: true
	},
	'number': /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	'boolean': /\b(?:false|true)\b/,
	'variable': /\$[a-z_]\w*/i,
	'directive': {
		pattern: /@[a-z_]\w*/i,
		alias: 'function'
	},
	'attr-name': {
		pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
		greedy: true
	},
	'atom-input': {
		pattern: /\b[A-Z]\w*Input\b/,
		alias: 'class-name'
	},
	'scalar': /\b(?:Boolean|Float|ID|Int|String)\b/,
	'constant': /\b[A-Z][A-Z_\d]*\b/,
	'class-name': {
		pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
		lookbehind: true
	},
	'fragment': {
		pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
		lookbehind: true,
		alias: 'function'
	},
	'definition-mutation': {
		pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
		lookbehind: true,
		alias: 'function'
	},
	'definition-query': {
		pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
		lookbehind: true,
		alias: 'function'
	},
	'keyword': /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
	'operator': /[!=|&]|\.{3}/,
	'property-query': /\w+(?=\s*\()/,
	'object': /\w+(?=\s*\{)/,
	'punctuation': /[!(){}\[\]:=,]/,
	'property': /\w+/
};

Prism.hooks.add('after-tokenize', function afterTokenizeGraphql(env) {
	if (env.language !== 'graphql') {
		return;
	}

	/**
	 * get the graphql token stream that we want to customize
	 *
	 * @typedef {InstanceType<import("./prism-core")["Token"]>} Token
	 * @type {Token[]}
	 */
	var validTokens = env.tokens.filter(function (token) {
		return typeof token !== 'string' && token.type !== 'comment' && token.type !== 'scalar';
	});

	var currentIndex = 0;

	/**
	 * Returns whether the token relative to the current index has the given type.
	 *
	 * @param {number} offset
	 * @returns {Token | undefined}
	 */
	function getToken(offset) {
		return validTokens[currentIndex + offset];
	}

	/**
	 * Returns whether the token relative to the current index has the given type.
	 *
	 * @param {readonly string[]} types
	 * @param {number} [offset=0]
	 * @returns {boolean}
	 */
	function isTokenType(types, offset) {
		offset = offset || 0;
		for (var i = 0; i < types.length; i++) {
			var token = getToken(i + offset);
			if (!token || token.type !== types[i]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Returns the index of the closing bracket to an opening bracket.
	 *
	 * It is assumed that `token[currentIndex - 1]` is an opening bracket.
	 *
	 * If no closing bracket could be found, `-1` will be returned.
	 *
	 * @param {RegExp} open
	 * @param {RegExp} close
	 * @returns {number}
	 */
	function findClosingBracket(open, close) {
		var stackHeight = 1;

		for (var i = currentIndex; i < validTokens.length; i++) {
			var token = validTokens[i];
			var content = token.content;

			if (token.type === 'punctuation' && typeof content === 'string') {
				if (open.test(content)) {
					stackHeight++;
				} else if (close.test(content)) {
					stackHeight--;

					if (stackHeight === 0) {
						return i;
					}
				}
			}
		}

		return -1;
	}

	/**
	 * Adds an alias to the given token.
	 *
	 * @param {Token} token
	 * @param {string} alias
	 * @returns {void}
	 */
	function addAlias(token, alias) {
		var aliases = token.alias;
		if (!aliases) {
			token.alias = aliases = [];
		} else if (!Array.isArray(aliases)) {
			token.alias = aliases = [aliases];
		}
		aliases.push(alias);
	}

	for (; currentIndex < validTokens.length;) {
		var startToken = validTokens[currentIndex++];

		// add special aliases for mutation tokens
		if (startToken.type === 'keyword' && startToken.content === 'mutation') {
			// any array of the names of all input variables (if any)
			var inputVariables = [];

			if (isTokenType(['definition-mutation', 'punctuation']) && getToken(1).content === '(') {
				// definition

				currentIndex += 2; // skip 'definition-mutation' and 'punctuation'

				var definitionEnd = findClosingBracket(/^\($/, /^\)$/);
				if (definitionEnd === -1) {
					continue;
				}

				// find all input variables
				for (; currentIndex < definitionEnd; currentIndex++) {
					var t = getToken(0);
					if (t.type === 'variable') {
						addAlias(t, 'variable-input');
						inputVariables.push(t.content);
					}
				}

				currentIndex = definitionEnd + 1;
			}

			if (isTokenType(['punctuation', 'property-query']) && getToken(0).content === '{') {
				currentIndex++; // skip opening bracket

				addAlias(getToken(0), 'property-mutation');

				if (inputVariables.length > 0) {
					var mutationEnd = findClosingBracket(/^\{$/, /^\}$/);
					if (mutationEnd === -1) {
						continue;
					}

					// give references to input variables a special alias
					for (var i = currentIndex; i < mutationEnd; i++) {
						var varToken = validTokens[i];
						if (varToken.type === 'variable' && inputVariables.indexOf(varToken.content) >= 0) {
							addAlias(varToken, 'variable-input');
						}
					}
				}
			}
		}
	}
});

(function (Prism) {

	var interpolation = {
		pattern: /((?:^|[^\\$])(?:\\{2})*)\$(?:\w+|\{[^{}]*\})/,
		lookbehind: true,
		inside: {
			'interpolation-punctuation': {
				pattern: /^\$\{?|\}$/,
				alias: 'punctuation'
			},
			'expression': {
				pattern: /[\s\S]+/,
				inside: null // see below
			}
		}
	};

	Prism.languages.groovy = Prism.languages.extend('clike', {
		'string': {
			// https://groovy-lang.org/syntax.html#_dollar_slashy_string
			pattern: /'''(?:[^\\]|\\[\s\S])*?'''|'(?:\\.|[^\\'\r\n])*'/,
			greedy: true
		},
		'keyword': /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
		'number': /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
		'operator': {
			pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
			lookbehind: true
		},
		'punctuation': /\.+|[{}[\];(),:$]/
	});

	Prism.languages.insertBefore('groovy', 'string', {
		'shebang': {
			pattern: /#!.+/,
			alias: 'comment',
			greedy: true
		},
		'interpolation-string': {
			// TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
			// simple division (see JS regex), so find a fix maybe?
			pattern: /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
			greedy: true,
			inside: {
				'interpolation': interpolation,
				'string': /[\s\S]+/
			}
		}
	});

	Prism.languages.insertBefore('groovy', 'punctuation', {
		'spock-block': /\b(?:and|cleanup|expect|given|setup|then|when|where):/
	});

	Prism.languages.insertBefore('groovy', 'function', {
		'annotation': {
			pattern: /(^|[^.])@\w+/,
			lookbehind: true,
			alias: 'punctuation'
		}
	});

	interpolation.inside.expression.inside = Prism.languages.groovy;

}(Prism));

(function (Prism) {

	Prism.languages.handlebars = {
		'comment': /\{\{![\s\S]*?\}\}/,
		'delimiter': {
			pattern: /^\{\{\{?|\}\}\}?$/,
			alias: 'punctuation'
		},
		'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
		'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
		'boolean': /\b(?:false|true)\b/,
		'block': {
			pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,
			lookbehind: true,
			alias: 'keyword'
		},
		'brackets': {
			pattern: /\[[^\]]+\]/,
			inside: {
				punctuation: /\[|\]/,
				variable: /[\s\S]+/
			}
		},
		'punctuation': /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
		'variable': /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
	};

	Prism.hooks.add('before-tokenize', function (env) {
		var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
		Prism.languages['markup-templating'].buildPlaceholders(env, 'handlebars', handlebarsPattern);
	});

	Prism.hooks.add('after-tokenize', function (env) {
		Prism.languages['markup-templating'].tokenizePlaceholders(env, 'handlebars');
	});

	Prism.languages.hbs = Prism.languages.handlebars;
	Prism.languages.mustache = Prism.languages.handlebars;

}(Prism));

/* TODO
	Handle multiline code after tag
	    %foo= some |
			multiline |
			code |
*/

(function (Prism) {

	Prism.languages.haml = {
		// Multiline stuff should appear before the rest

		'multiline-comment': {
			pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/,
			lookbehind: true,
			alias: 'comment'
		},

		'multiline-code': [
			{
				pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/,
				lookbehind: true,
				inside: Prism.languages.ruby
			},
			{
				pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/,
				lookbehind: true,
				inside: Prism.languages.ruby
			}
		],

		// See at the end of the file for known filters
		'filter': {
			pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/,
			lookbehind: true,
			inside: {
				'filter-name': {
					pattern: /^:[\w-]+/,
					alias: 'symbol'
				}
			}
		},

		'markup': {
			pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
			lookbehind: true,
			inside: Prism.languages.markup
		},
		'doctype': {
			pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
			lookbehind: true
		},
		'tag': {
			// Allows for one nested group of braces
			pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
			lookbehind: true,
			inside: {
				'attributes': [
					{
						// Lookbehind tries to prevent interpolations from breaking it all
						// Allows for one nested group of braces
						pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/,
						lookbehind: true,
						inside: Prism.languages.ruby
					},
					{
						pattern: /\([^)]+\)/,
						inside: {
							'attr-value': {
								pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
								lookbehind: true
							},
							'attr-name': /[\w:-]+(?=\s*!?=|\s*[,)])/,
							'punctuation': /[=(),]/
						}
					},
					{
						pattern: /\[[^\]]+\]/,
						inside: Prism.languages.ruby
					}
				],
				'punctuation': /[<>]/
			}
		},
		'code': {
			pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
			lookbehind: true,
			inside: Prism.languages.ruby
		},
		// Interpolations in plain text
		'interpolation': {
			pattern: /#\{[^}]+\}/,
			inside: {
				'delimiter': {
					pattern: /^#\{|\}$/,
					alias: 'punctuation'
				},
				'ruby': {
					pattern: /[\s\S]+/,
					inside: Prism.languages.ruby
				}
			}
		},
		'punctuation': {
			pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
			lookbehind: true
		}
	};

	var filter_pattern = '((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+';

	// Non exhaustive list of available filters and associated languages
	var filters = [
		'css',
		{ filter: 'coffee', language: 'coffeescript' },
		'erb',
		'javascript',
		'less',
		'markdown',
		'ruby',
		'scss',
		'textile'
	];
	var all_filters = {};
	for (var i = 0, l = filters.length; i < l; i++) {
		var filter = filters[i];
		filter = typeof filter === 'string' ? { filter: filter, language: filter } : filter;
		if (Prism.languages[filter.language]) {
			all_filters['filter-' + filter.filter] = {
				pattern: RegExp(filter_pattern.replace('{{filter_name}}', function () { return filter.filter; })),
				lookbehind: true,
				inside: {
					'filter-name': {
						pattern: /^:[\w-]+/,
						alias: 'symbol'
					},
					'text': {
						pattern: /[\s\S]+/,
						alias: [filter.language, 'language-' + filter.language],
						inside: Prism.languages[filter.language]
					}
				}
			};
		}
	}

	Prism.languages.insertBefore('haml', 'filter', all_filters);

}(Prism));

Prism.languages.haxe = Prism.languages.extend('clike', {
	'string': {
		// Strings can be multi-line
		pattern: /"(?:[^"\\]|\\[\s\S])*"/,
		greedy: true
	},
	'class-name': [
		{
			pattern: /(\b(?:abstract|class|enum|extends|implements|interface|new|typedef)\s+)[A-Z_]\w*/,
			lookbehind: true,
		},
		// based on naming convention
		/\b[A-Z]\w*/
	],
	// The final look-ahead prevents highlighting of keywords if expressions such as "haxe.macro.Expr"
	'keyword': /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|final|for|from|function|if|implements|import|in|inline|interface|macro|new|null|operator|overload|override|package|private|public|return|static|super|switch|throw|to|try|typedef|untyped|using|var|while)(?!\.)\b/,
	'function': {
		pattern: /\b[a-z_]\w*(?=\s*(?:<[^<>]*>\s*)?\()/i,
		greedy: true
	},
	'operator': /\.{3}|\+\+|--|&&|\|\||->|=>|(?:<<?|>{1,3}|[-+*/%!=&|^])=?|[?:~]/
});

Prism.languages.insertBefore('haxe', 'string', {
	'string-interpolation': {
		pattern: /'(?:[^'\\]|\\[\s\S])*'/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /(^|[^\\])\$(?:\w+|\{[^{}]+\})/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{?|\}$/,
						alias: 'punctuation'
					},
					'expression': {
						pattern: /[\s\S]+/,
						inside: Prism.languages.haxe
					},
				}
			},
			'string': /[\s\S]+/
		}
	}
});

Prism.languages.insertBefore('haxe', 'class-name', {
	'regex': {
		pattern: /~\/(?:[^\/\\\r\n]|\\.)+\/[a-z]*/,
		greedy: true,
		inside: {
			'regex-flags': /\b[a-z]+$/,
			'regex-source': {
				pattern: /^(~\/)[\s\S]+(?=\/$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^~\/|\/$/,
		}
	}
});

Prism.languages.insertBefore('haxe', 'keyword', {
	'preprocessor': {
		pattern: /#(?:else|elseif|end|if)\b.*/,
		alias: 'property'
	},
	'metadata': {
		pattern: /@:?[\w.]+/,
		alias: 'symbol'
	},
	'reification': {
		pattern: /\$(?:\w+|(?=\{))/,
		alias: 'important'
	}
});

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

(function (Prism) {

	/**
	 * @param {string} name
	 * @returns {RegExp}
	 */
	function headerValueOf(name) {
		return RegExp('(^(?:' + name + '):[ \t]*(?![ \t]))[^]+', 'i');
	}

	Prism.languages.http = {
		'request-line': {
			pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,
			inside: {
				// HTTP Method
				'method': {
					pattern: /^[A-Z]+\b/,
					alias: 'property'
				},
				// Request Target e.g. http://example.com, /path/to/file
				'request-target': {
					pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
					lookbehind: true,
					alias: 'url',
					inside: Prism.languages.uri
				},
				// HTTP Version
				'http-version': {
					pattern: /^(\s)HTTP\/[\d.]+/,
					lookbehind: true,
					alias: 'property'
				},
			}
		},
		'response-status': {
			pattern: /^HTTP\/[\d.]+ \d+ .+/m,
			inside: {
				// HTTP Version
				'http-version': {
					pattern: /^HTTP\/[\d.]+/,
					alias: 'property'
				},
				// Status Code
				'status-code': {
					pattern: /^(\s)\d+(?=\s)/,
					lookbehind: true,
					alias: 'number'
				},
				// Reason Phrase
				'reason-phrase': {
					pattern: /^(\s).+/,
					lookbehind: true,
					alias: 'string'
				}
			}
		},
		'header': {
			pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,
			inside: {
				'header-value': [
					{
						pattern: headerValueOf(/Content-Security-Policy/.source),
						lookbehind: true,
						alias: ['csp', 'languages-csp'],
						inside: Prism.languages.csp
					},
					{
						pattern: headerValueOf(/Public-Key-Pins(?:-Report-Only)?/.source),
						lookbehind: true,
						alias: ['hpkp', 'languages-hpkp'],
						inside: Prism.languages.hpkp
					},
					{
						pattern: headerValueOf(/Strict-Transport-Security/.source),
						lookbehind: true,
						alias: ['hsts', 'languages-hsts'],
						inside: Prism.languages.hsts
					},
					{
						pattern: headerValueOf(/[^:]+/.source),
						lookbehind: true
					}
				],
				'header-name': {
					pattern: /^[^:]+/,
					alias: 'keyword'
				},
				'punctuation': /^:/
			}
		}
	};

	// Create a mapping of Content-Type headers to language definitions
	var langs = Prism.languages;
	var httpLanguages = {
		'application/javascript': langs.javascript,
		'application/json': langs.json || langs.javascript,
		'application/xml': langs.xml,
		'text/xml': langs.xml,
		'text/html': langs.html,
		'text/css': langs.css,
		'text/plain': langs.plain
	};

	// Declare which types can also be suffixes
	var suffixTypes = {
		'application/json': true,
		'application/xml': true
	};

	/**
	 * Returns a pattern for the given content type which matches it and any type which has it as a suffix.
	 *
	 * @param {string} contentType
	 * @returns {string}
	 */
	function getSuffixPattern(contentType) {
		var suffix = contentType.replace(/^[a-z]+\//, '');
		var suffixPattern = '\\w+/(?:[\\w.-]+\\+)+' + suffix + '(?![+\\w.-])';
		return '(?:' + contentType + '|' + suffixPattern + ')';
	}

	// Insert each content type parser that has its associated language
	// currently loaded.
	var options;
	for (var contentType in httpLanguages) {
		if (httpLanguages[contentType]) {
			options = options || {};

			var pattern = suffixTypes[contentType] ? getSuffixPattern(contentType) : contentType;
			options[contentType.replace(/\//g, '-')] = {
				pattern: RegExp(
					'(' + /content-type:\s*/.source + pattern + /(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source + ')' +
					// This is a little interesting:
					// The HTTP format spec required 1 empty line before the body to make everything unambiguous.
					// However, when writing code by hand (e.g. to display on a website) people can forget about this,
					// so we want to be liberal here. We will allow the empty line to be omitted if the first line of
					// the body does not start with a [\w-] character (as headers do).
					/[^ \t\w-][\s\S]*/.source,
					'i'
				),
				lookbehind: true,
				inside: httpLanguages[contentType]
			};
		}
	}
	if (options) {
		Prism.languages.insertBefore('http', 'header', options);
	}

}(Prism));

(function (Prism) {

	var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;

	// full package (optional) + parent classes (optional)
	var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;

	// based on the java naming conventions
	var className = {
		pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
		lookbehind: true,
		inside: {
			'namespace': {
				pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
				inside: {
					'punctuation': /\./
				}
			},
			'punctuation': /\./
		}
	};

	Prism.languages.java = Prism.languages.extend('clike', {
		'string': {
			pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
			lookbehind: true,
			greedy: true
		},
		'class-name': [
			className,
			{
				// variables, parameters, and constructor references
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
				lookbehind: true,
				inside: className.inside
			},
			{
				// class names based on keyword
				// this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
				pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
				lookbehind: true,
				inside: className.inside
			}
		],
		'keyword': keywords,
		'function': [
			Prism.languages.clike.function,
			{
				pattern: /(::\s*)[a-z_]\w*/,
				lookbehind: true
			}
		],
		'number': /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
		'operator': {
			pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
			lookbehind: true
		},
		'constant': /\b[A-Z][A-Z_\d]+\b/
	});

	Prism.languages.insertBefore('java', 'string', {
		'triple-quoted-string': {
			// http://openjdk.java.net/jeps/355#Description
			pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
			greedy: true,
			alias: 'string'
		},
		'char': {
			pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
			greedy: true
		}
	});

	Prism.languages.insertBefore('java', 'class-name', {
		'annotation': {
			pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
			lookbehind: true,
			alias: 'punctuation'
		},
		'generics': {
			pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
			inside: {
				'class-name': className,
				'keyword': keywords,
				'punctuation': /[<>(),.:]/,
				'operator': /[?&|]/
			}
		},
		'import': [
			{
				pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
				lookbehind: true,
				inside: {
					'namespace': className.inside.namespace,
					'punctuation': /\./,
					'operator': /\*/,
					'class-name': /\w+/
				}
			},
			{
				pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
				lookbehind: true,
				alias: 'static',
				inside: {
					'namespace': className.inside.namespace,
					'static': /\b\w+$/,
					'punctuation': /\./,
					'operator': /\*/,
					'class-name': /\w+/
				}
			}
		],
		'namespace': {
			pattern: RegExp(
				/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/
					.source.replace(/<keyword>/g, function () { return keywords.source; })),
			lookbehind: true,
			inside: {
				'punctuation': /\./,
			}
		}
	});
}(Prism));

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;

// https://www.json.org/json-en.html
Prism.languages.json = {
	'property': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'string': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'comment': {
		pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	'punctuation': /[{}[\],]/,
	'operator': /:/,
	'boolean': /\b(?:false|true)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	}
};

Prism.languages.webmanifest = Prism.languages.json;

(function (Prism) {
	Prism.languages.kotlin = Prism.languages.extend('clike', {
		'keyword': {
			// The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
			pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
			lookbehind: true
		},
		'function': [
			{
				pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
				greedy: true
			},
			{
				pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
				lookbehind: true,
				greedy: true
			}
		],
		'number': /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
		'operator': /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
	});

	delete Prism.languages.kotlin['class-name'];

	var interpolationInside = {
		'interpolation-punctuation': {
			pattern: /^\$\{?|\}$/,
			alias: 'punctuation'
		},
		'expression': {
			pattern: /[\s\S]+/,
			inside: Prism.languages.kotlin
		}
	};

	Prism.languages.insertBefore('kotlin', 'string', {
		// https://kotlinlang.org/spec/expressions.html#string-interpolation-expressions
		'string-literal': [
			{
				pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
				alias: 'multiline',
				inside: {
					'interpolation': {
						pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
						inside: interpolationInside
					},
					'string': /[\s\S]+/
				}
			},
			{
				pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
				alias: 'singleline',
				inside: {
					'interpolation': {
						pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
						lookbehind: true,
						inside: interpolationInside
					},
					'string': /[\s\S]+/
				}
			}
		],
		'char': {
			// https://kotlinlang.org/spec/expressions.html#character-literals
			pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
			greedy: true
		}
	});

	delete Prism.languages.kotlin['string'];

	Prism.languages.insertBefore('kotlin', 'keyword', {
		'annotation': {
			pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
			alias: 'builtin'
		}
	});

	Prism.languages.insertBefore('kotlin', 'function', {
		'label': {
			pattern: /\b\w+@|@\w+\b/,
			alias: 'symbol'
		}
	});

	Prism.languages.kt = Prism.languages.kotlin;
	Prism.languages.kts = Prism.languages.kotlin;
}(Prism));

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

Prism.languages.less = Prism.languages.extend('css', {
	'comment': [
		/\/\*[\s\S]*?\*\//,
		{
			pattern: /(^|[^\\])\/\/.*/,
			lookbehind: true
		}
	],
	'atrule': {
		pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
		inside: {
			'punctuation': /[:()]/
		}
	},
	// selectors and mixins are considered the same
	'selector': {
		pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
		inside: {
			// mixin parameters
			'variable': /@+[\w-]+/
		}
	},

	'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
	'operator': /[+\-*\/]/
});

Prism.languages.insertBefore('less', 'property', {
	'variable': [
		// Variable declaration (the colon must be consumed!)
		{
			pattern: /@[\w-]+\s*:/,
			inside: {
				'punctuation': /:/
			}
		},

		// Variable usage
		/@@?[\w-]+/
	],
	'mixin-usage': {
		pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
		lookbehind: true,
		alias: 'function'
	}
});

Prism.languages.liquid = {
	'comment': {
		pattern: /(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,
		lookbehind: true
	},
	'delimiter': {
		pattern: /^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,
		alias: 'punctuation'
	},
	'string': {
		pattern: /"[^"]*"|'[^']*'/,
		greedy: true
	},
	'keyword': /\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
	'object': /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
	'function': [
		{
			pattern: /(\|\s*)\w+/,
			lookbehind: true,
			alias: 'filter'
		},
		{
			// array functions
			pattern: /(\.\s*)(?:first|last|size)/,
			lookbehind: true
		}
	],
	'boolean': /\b(?:false|nil|true)\b/,
	'range': {
		pattern: /\.\./,
		alias: 'operator'
	},
	// https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
	'number': /\b\d+(?:\.\d+)?\b/,
	'operator': /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,
	'punctuation': /[.,\[\]()]/,
	'empty': {
		pattern: /\bempty\b/,
		alias: 'keyword'
	},
};

Prism.hooks.add('before-tokenize', function (env) {
	var liquidPattern = /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g;
	var insideRaw = false;

	Prism.languages['markup-templating'].buildPlaceholders(env, 'liquid', liquidPattern, function (match) {
		var tagMatch = /^\{%-?\s*(\w+)/.exec(match);
		if (tagMatch) {
			var tag = tagMatch[1];
			if (tag === 'raw' && !insideRaw) {
				insideRaw = true;
				return true;
			} else if (tag === 'endraw') {
				insideRaw = false;
				return true;
			}
		}

		return !insideRaw;
	});
});

Prism.hooks.add('after-tokenize', function (env) {
	Prism.languages['markup-templating'].tokenizePlaceholders(env, 'liquid');
});

(function (Prism) {

	// Allow only one line break
	var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;

	/**
	 * This function is intended for the creation of the bold or italic pattern.
	 *
	 * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
	 *
	 * _Note:_ Keep in mind that this adds a capturing group.
	 *
	 * @param {string} pattern
	 * @returns {RegExp}
	 */
	function createInline(pattern) {
		pattern = pattern.replace(/<inner>/g, function () { return inner; });
		return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
	}


	var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
	var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () { return tableCell; });
	var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;


	Prism.languages.markdown = Prism.languages.extend('markup', {});
	Prism.languages.insertBefore('markdown', 'prolog', {
		'front-matter-block': {
			pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
			lookbehind: true,
			greedy: true,
			inside: {
				'punctuation': /^---|---$/,
				'front-matter': {
					pattern: /\S+(?:\s+\S+)*/,
					alias: ['yaml', 'language-yaml'],
					inside: Prism.languages.yaml
				}
			}
		},
		'blockquote': {
			// > ...
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation'
		},
		'table': {
			pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
			inside: {
				'table-data-rows': {
					pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
					lookbehind: true,
					inside: {
						'table-data': {
							pattern: RegExp(tableCell),
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				},
				'table-line': {
					pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
					lookbehind: true,
					inside: {
						'punctuation': /\||:?-{3,}:?/
					}
				},
				'table-header-row': {
					pattern: RegExp('^' + tableRow + '$'),
					inside: {
						'table-header': {
							pattern: RegExp(tableCell),
							alias: 'important',
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				}
			}
		},
		'code': [
			{
				// Prefixed by 4 spaces or 1 tab and preceded by an empty line
				pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
				lookbehind: true,
				alias: 'keyword'
			},
			{
				// ```optional language
				// code block
				// ```
				pattern: /^```[\s\S]*?^```$/m,
				greedy: true,
				inside: {
					'code-block': {
						pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
						lookbehind: true
					},
					'code-language': {
						pattern: /^(```).+/,
						lookbehind: true
					},
					'punctuation': /```/
				}
			}
		],
		'title': [
			{
				// title 1
				// =======

				// title 2
				// -------
				pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
				alias: 'important',
				inside: {
					punctuation: /==+$|--+$/
				}
			},
			{
				// # title 1
				// ###### title 6
				pattern: /(^\s*)#.+/m,
				lookbehind: true,
				alias: 'important',
				inside: {
					punctuation: /^#+|#+$/
				}
			}
		],
		'hr': {
			// ***
			// ---
			// * * *
			// -----------
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'list': {
			// * item
			// + item
			// - item
			// 1. item
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'url-reference': {
			// [id]: http://example.com "Optional title"
			// [id]: http://example.com 'Optional title'
			// [id]: http://example.com (Optional title)
			// [id]: <http://example.com> "Optional title"
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				'variable': {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: true
				},
				'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				'punctuation': /^[\[\]!:]|[<>]/
			},
			alias: 'url'
		},
		'bold': {
			// **strong**
			// __strong__

			// allow one nested instance of italic text using the same delimiter
			pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^..)[\s\S]+(?=..$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /\*\*|__/
			}
		},
		'italic': {
			// *em*
			// _em_

			// allow one nested instance of bold text using the same delimiter
			pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^.)[\s\S]+(?=.$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /[*_]/
			}
		},
		'strike': {
			// ~~strike through~~
			// ~strike~
			// eslint-disable-next-line regexp/strict
			pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^~~?)[\s\S]+(?=\1$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /~~?/
			}
		},
		'code-snippet': {
			// `code`
			// ``code``
			pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
			lookbehind: true,
			greedy: true,
			alias: ['code', 'keyword']
		},
		'url': {
			// [example](http://example.com "Optional title")
			// [example][id]
			// [example] [id]
			pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'operator': /^!/,
				'content': {
					pattern: /(^\[)[^\]]+(?=\])/,
					lookbehind: true,
					inside: {} // see below
				},
				'variable': {
					pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
					lookbehind: true
				},
				'url': {
					pattern: /(^\]\()[^\s)]+/,
					lookbehind: true
				},
				'string': {
					pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
					lookbehind: true
				}
			}
		}
	});

	['url', 'bold', 'italic', 'strike'].forEach(function (token) {
		['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (inside) {
			if (token !== inside) {
				Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
			}
		});
	});

	Prism.hooks.add('after-tokenize', function (env) {
		if (env.language !== 'markdown' && env.language !== 'md') {
			return;
		}

		function walkTokens(tokens) {
			if (!tokens || typeof tokens === 'string') {
				return;
			}

			for (var i = 0, l = tokens.length; i < l; i++) {
				var token = tokens[i];

				if (token.type !== 'code') {
					walkTokens(token.content);
					continue;
				}

				/*
				 * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
				 * is optional. But the grammar is defined so that there is only one case we have to handle:
				 *
				 * token.content = [
				 *     <span class="punctuation">```</span>,
				 *     <span class="code-language">xxxx</span>,
				 *     '\n', // exactly one new lines (\r or \n or \r\n)
				 *     <span class="code-block">...</span>,
				 *     '\n', // exactly one new lines again
				 *     <span class="punctuation">```</span>
				 * ];
				 */

				var codeLang = token.content[1];
				var codeBlock = token.content[3];

				if (codeLang && codeBlock &&
					codeLang.type === 'code-language' && codeBlock.type === 'code-block' &&
					typeof codeLang.content === 'string') {

					// this might be a language that Prism does not support

					// do some replacements to support C++, C#, and F#
					var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp');
					// only use the first word
					lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
					var alias = 'language-' + lang;

					// add alias
					if (!codeBlock.alias) {
						codeBlock.alias = [alias];
					} else if (typeof codeBlock.alias === 'string') {
						codeBlock.alias = [codeBlock.alias, alias];
					} else {
						codeBlock.alias.push(alias);
					}
				}
			}
		}

		walkTokens(env.tokens);
	});

	Prism.hooks.add('wrap', function (env) {
		if (env.type !== 'code-block') {
			return;
		}

		var codeLang = '';
		for (var i = 0, l = env.classes.length; i < l; i++) {
			var cls = env.classes[i];
			var match = /language-(.+)/.exec(cls);
			if (match) {
				codeLang = match[1];
				break;
			}
		}

		var grammar = Prism.languages[codeLang];

		if (!grammar) {
			if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
				var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
				env.attributes['id'] = id;

				Prism.plugins.autoloader.loadLanguages(codeLang, function () {
					var ele = document.getElementById(id);
					if (ele) {
						ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
					}
				});
			}
		} else {
			env.content = Prism.highlight(textContent(env.content), grammar, codeLang);
		}
	});

	var tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi');

	/**
	 * A list of known entity names.
	 *
	 * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
	 *
	 * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
	 */
	var KNOWN_ENTITY_NAMES = {
		'amp': '&',
		'lt': '<',
		'gt': '>',
		'quot': '"',
	};

	// IE 11 doesn't support `String.fromCodePoint`
	var fromCodePoint = String.fromCodePoint || String.fromCharCode;

	/**
	 * Returns the text content of a given HTML source code string.
	 *
	 * @param {string} html
	 * @returns {string}
	 */
	function textContent(html) {
		// remove all tags
		var text = html.replace(tagPattern, '');

		// decode known entities
		text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (m, code) {
			code = code.toLowerCase();

			if (code[0] === '#') {
				var value;
				if (code[1] === 'x') {
					value = parseInt(code.slice(2), 16);
				} else {
					value = Number(code.slice(1));
				}

				return fromCodePoint(value);
			} else {
				var known = KNOWN_ENTITY_NAMES[code];
				if (known) {
					return known;
				}

				// unable to decode
				return m;
			}
		});

		return text;
	}

	Prism.languages.md = Prism.languages.markdown;

}(Prism));

Prism.languages.objectivec = Prism.languages.extend('c', {
	'string': {
		pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: true
	},
	'keyword': /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
	'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});

delete Prism.languages.objectivec['class-name'];

Prism.languages.objc = Prism.languages.objectivec;

// https://ocaml.org/manual/lex.html

Prism.languages.ocaml = {
	'comment': {
		pattern: /\(\*[\s\S]*?\*\)/,
		greedy: true
	},
	'char': {
		pattern: /'(?:[^\\\r\n']|\\(?:.|[ox]?[0-9a-f]{1,3}))'/i,
		greedy: true
	},
	'string': [
		{
			pattern: /"(?:\\(?:[\s\S]|\r\n)|[^\\\r\n"])*"/,
			greedy: true
		},
		{
			pattern: /\{([a-z_]*)\|[\s\S]*?\|\1\}/,
			greedy: true
		}
	],
	'number': [
		// binary and octal
		/\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i,
		// hexadecimal
		/\b0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i,
		// decimal
		/\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i,
	],
	'directive': {
		pattern: /\B#\w+/,
		alias: 'property'
	},
	'label': {
		pattern: /\B~\w+/,
		alias: 'property'
	},
	'type-variable': {
		pattern: /\B'\w+/,
		alias: 'function'
	},
	'variant': {
		pattern: /`\w+/,
		alias: 'symbol'
	},
	// For the list of keywords and operators,
	// see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
	'keyword': /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
	'boolean': /\b(?:false|true)\b/,

	'operator-like-punctuation': {
		pattern: /\[[<>|]|[>|]\]|\{<|>\}/,
		alias: 'punctuation'
	},
	// Custom operators are allowed
	'operator': /\.[.~]|:[=>]|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
	'punctuation': /;;|::|[(){}\[\].,:;#]|\b_\b/
};

(function (Prism) {

	var brackets = /(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source;

	Prism.languages.perl = {
		'comment': [
			{
				// POD
				pattern: /(^\s*)=\w[\s\S]*?=cut.*/m,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\$])#.*/,
				lookbehind: true,
				greedy: true
			}
		],
		// TODO Could be nice to handle Heredoc too.
		'string': [
			{
				pattern: RegExp(
					/\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source +
					'(?:' +
					[
						// q/.../
						/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,

						// q a...a
						// eslint-disable-next-line regexp/strict
						/([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,

						// q(...)
						// q{...}
						// q[...]
						// q<...>
						brackets,
					].join('|') +
					')'
				),
				greedy: true
			},

			// "...", `...`
			{
				pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true
			},

			// '...'
			// FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
			{
				pattern: /'(?:[^'\\\r\n]|\\.)*'/,
				greedy: true
			}
		],
		'regex': [
			{
				pattern: RegExp(
					/\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source +
					'(?:' +
					[
						// m/.../
						/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,

						// m a...a
						// eslint-disable-next-line regexp/strict
						/([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,

						// m(...)
						// m{...}
						// m[...]
						// m<...>
						brackets,
					].join('|') +
					')' +
					/[msixpodualngc]*/.source
				),
				greedy: true
			},

			// The lookbehinds prevent -s from breaking
			{
				pattern: RegExp(
					/(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source +
					'(?:' +
					[
						// s/.../.../
						// eslint-disable-next-line regexp/strict
						/([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,

						// s a...a...a
						// eslint-disable-next-line regexp/strict
						/([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,

						// s(...)(...)
						// s{...}{...}
						// s[...][...]
						// s<...><...>
						// s(...)[...]
						brackets + /\s*/.source + brackets,
					].join('|') +
					')' +
					/[msixpodualngcer]*/.source
				),
				lookbehind: true,
				greedy: true
			},

			// /.../
			// The look-ahead tries to prevent two divisions on
			// the same line from being highlighted as regex.
			// This does not support multi-line regex.
			{
				pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
				greedy: true
			}
		],

		// FIXME Not sure about the handling of ::, ', and #
		'variable': [
			// ${^POSTMATCH}
			/[&*$@%]\{\^[A-Z]+\}/,
			// $^V
			/[&*$@%]\^[A-Z_]/,
			// ${...}
			/[&*$@%]#?(?=\{)/,
			// $foo
			/[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
			// $1
			/[&*$@%]\d+/,
			// $_, @_, %!
			// The negative lookahead prevents from breaking the %= operator
			/(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
		],
		'filehandle': {
			// <>, <FOO>, _
			pattern: /<(?![<=])\S*?>|\b_\b/,
			alias: 'symbol'
		},
		'v-string': {
			// v1.2, 1.2.3
			pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
			alias: 'string'
		},
		'function': {
			pattern: /(\bsub[ \t]+)\w+/,
			lookbehind: true
		},
		'keyword': /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
		'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
		'operator': /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
		'punctuation': /[{}[\];(),:]/
	};

}(Prism));

/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 * Rewritten by Tom Pavelec
 *
 * Supports PHP 5.3 - 8.0
 */
(function (Prism) {
	var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
	var constant = [
		{
			pattern: /\b(?:false|true)\b/i,
			alias: 'boolean'
		},
		{
			pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
			greedy: true,
			lookbehind: true,
		},
		{
			pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
			greedy: true,
			lookbehind: true,
		},
		/\b(?:null)\b/i,
		/\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
	];
	var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
	var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
	var punctuation = /[{}\[\](),:;]/;

	Prism.languages.php = {
		'delimiter': {
			pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
			alias: 'important'
		},
		'comment': comment,
		'variable': /\$+(?:\w+\b|(?=\{))/,
		'package': {
			pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
			lookbehind: true,
			inside: {
				'punctuation': /\\/
			}
		},
		'class-name-definition': {
			pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
			lookbehind: true,
			alias: 'class-name'
		},
		'function-definition': {
			pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
			lookbehind: true,
			alias: 'function'
		},
		'keyword': [
			{
				pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
				alias: 'type-casting',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
				alias: 'type-hint',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
				alias: 'return-type',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
				alias: 'type-declaration',
				greedy: true
			},
			{
				pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
				alias: 'type-declaration',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /\b(?:parent|self|static)(?=\s*::)/i,
				alias: 'static-context',
				greedy: true
			},
			{
				// yield from
				pattern: /(\byield\s+)from\b/i,
				lookbehind: true
			},
			// `class` is always a keyword unlike other keywords
			/\bclass\b/i,
			{
				// https://www.php.net/manual/en/reserved.keywords.php
				//
				// keywords cannot be preceded by "->"
				// the complex lookbehind means `(?<!(?:->|::)\s*)`
				pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
				lookbehind: true
			}
		],
		'argument-name': {
			pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
			lookbehind: true
		},
		'class-name': [
			{
				pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
				greedy: true
			},
			{
				pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
				alias: 'class-name-fully-qualified',
				greedy: true,
				lookbehind: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
				alias: 'class-name-fully-qualified',
				greedy: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
				alias: 'class-name-fully-qualified',
				greedy: true,
				lookbehind: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /\b[a-z_]\w*(?=\s*\$)/i,
				alias: 'type-declaration',
				greedy: true
			},
			{
				pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
				alias: ['class-name-fully-qualified', 'type-declaration'],
				greedy: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /\b[a-z_]\w*(?=\s*::)/i,
				alias: 'static-context',
				greedy: true
			},
			{
				pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
				alias: ['class-name-fully-qualified', 'static-context'],
				greedy: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
				alias: 'type-hint',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
				alias: ['class-name-fully-qualified', 'type-hint'],
				greedy: true,
				lookbehind: true,
				inside: {
					'punctuation': /\\/
				}
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
				alias: 'return-type',
				greedy: true,
				lookbehind: true
			},
			{
				pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
				alias: ['class-name-fully-qualified', 'return-type'],
				greedy: true,
				lookbehind: true,
				inside: {
					'punctuation': /\\/
				}
			}
		],
		'constant': constant,
		'function': {
			pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
			lookbehind: true,
			inside: {
				'punctuation': /\\/
			}
		},
		'property': {
			pattern: /(->\s*)\w+/,
			lookbehind: true
		},
		'number': number,
		'operator': operator,
		'punctuation': punctuation
	};

	var string_interpolation = {
		pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
		lookbehind: true,
		inside: Prism.languages.php
	};

	var string = [
		{
			pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
			alias: 'nowdoc-string',
			greedy: true,
			inside: {
				'delimiter': {
					pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
					alias: 'symbol',
					inside: {
						'punctuation': /^<<<'?|[';]$/
					}
				}
			}
		},
		{
			pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
			alias: 'heredoc-string',
			greedy: true,
			inside: {
				'delimiter': {
					pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
					alias: 'symbol',
					inside: {
						'punctuation': /^<<<"?|[";]$/
					}
				},
				'interpolation': string_interpolation
			}
		},
		{
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			alias: 'backtick-quoted-string',
			greedy: true
		},
		{
			pattern: /'(?:\\[\s\S]|[^\\'])*'/,
			alias: 'single-quoted-string',
			greedy: true
		},
		{
			pattern: /"(?:\\[\s\S]|[^\\"])*"/,
			alias: 'double-quoted-string',
			greedy: true,
			inside: {
				'interpolation': string_interpolation
			}
		}
	];

	Prism.languages.insertBefore('php', 'variable', {
		'string': string,
		'attribute': {
			pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
			greedy: true,
			inside: {
				'attribute-content': {
					pattern: /^(#\[)[\s\S]+(?=\]$)/,
					lookbehind: true,
					// inside can appear subset of php
					inside: {
						'comment': comment,
						'string': string,
						'attribute-class-name': [
							{
								pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
								alias: 'class-name',
								greedy: true,
								lookbehind: true
							},
							{
								pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
								alias: [
									'class-name',
									'class-name-fully-qualified'
								],
								greedy: true,
								lookbehind: true,
								inside: {
									'punctuation': /\\/
								}
							}
						],
						'constant': constant,
						'number': number,
						'operator': operator,
						'punctuation': punctuation
					}
				},
				'delimiter': {
					pattern: /^#\[|\]$/,
					alias: 'punctuation'
				}
			}
		},
	});

	Prism.hooks.add('before-tokenize', function (env) {
		if (!/<\?/.test(env.code)) {
			return;
		}

		var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
		Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
	});

	Prism.hooks.add('after-tokenize', function (env) {
		Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
	});

}(Prism));

(function (Prism) {

	var powershell = Prism.languages.powershell = {
		'comment': [
			{
				pattern: /(^|[^`])<#[\s\S]*?#>/,
				lookbehind: true
			},
			{
				pattern: /(^|[^`])#.*/,
				lookbehind: true
			}
		],
		'string': [
			{
				pattern: /"(?:`[\s\S]|[^`"])*"/,
				greedy: true,
				inside: null // see below
			},
			{
				pattern: /'(?:[^']|'')*'/,
				greedy: true
			}
		],
		// Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
		// Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
		'namespace': /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
		'boolean': /\$(?:false|true)\b/i,
		'variable': /\$\w+\b/,
		// Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
		// Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
		// Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
		'function': [
			/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
			/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
		],
		// per http://technet.microsoft.com/en-us/library/hh847744.aspx
		'keyword': /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		'operator': {
			pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: true
		},
		'punctuation': /[|{}[\];(),.]/
	};

	// Variable interpolation inside strings, and nested expressions
	powershell.string[0].inside = {
		'function': {
			// Allow for one level of nesting
			pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
			lookbehind: true,
			inside: powershell
		},
		'boolean': powershell.boolean,
		'variable': powershell.variable,
	};

}(Prism));

Prism.languages.python = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		greedy: true
	},
	'string-interpolation': {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'function': {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: true
	},
	'class-name': {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: true
	},
	'decorator': {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: true,
		alias: ['annotation', 'punctuation'],
		inside: {
			'punctuation': /\./
		}
	},
	'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	'boolean': /\b(?:False|None|True)\b/,
	'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;

Prism.languages.py = Prism.languages.python;

Prism.languages.r = {
	'comment': /#.*/,
	'string': {
		pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'percent-operator': {
		// Includes user-defined operators
		// and %%, %*%, %/%, %in%, %o%, %x%
		pattern: /%[^%\s]*%/,
		alias: 'operator'
	},
	'boolean': /\b(?:FALSE|TRUE)\b/,
	'ellipsis': /\.\.(?:\.|\d+)/,
	'number': [
		/\b(?:Inf|NaN)\b/,
		/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
	],
	'keyword': /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
	'operator': /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
	'punctuation': /[(){}\[\],;]/
};

/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 *     constant, builtin, variable, symbol, regex
 */
(function (Prism) {
	Prism.languages.ruby = Prism.languages.extend('clike', {
		'comment': {
			pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
		'operator': /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
		'punctuation': /[(){}[\].,;]/,
	});

	Prism.languages.insertBefore('ruby', 'operator', {
		'double-colon': {
			pattern: /::/,
			alias: 'punctuation'
		},
	});

	var interpolation = {
		pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
		lookbehind: true,
		inside: {
			'content': {
				pattern: /^(#\{)[\s\S]+(?=\}$)/,
				lookbehind: true,
				inside: Prism.languages.ruby
			},
			'delimiter': {
				pattern: /^#\{|\}$/,
				alias: 'punctuation'
			}
		}
	};

	delete Prism.languages.ruby.function;

	var percentExpression = '(?:' + [
		/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
		/\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,
		/\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,
		/\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,
		/<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source
	].join('|') + ')';

	var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;

	Prism.languages.insertBefore('ruby', 'keyword', {
		'regex-literal': [
			{
				pattern: RegExp(/%r/.source + percentExpression + /[egimnosux]{0,6}/.source),
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'regex': /[\s\S]+/
				}
			},
			{
				pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
				lookbehind: true,
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'regex': /[\s\S]+/
				}
			}
		],
		'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
		'symbol': [
			{
				pattern: RegExp(/(^|[^:]):/.source + symbolName),
				lookbehind: true,
				greedy: true
			},
			{
				pattern: RegExp(/([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source),
				lookbehind: true,
				greedy: true
			},
		],
		'method-definition': {
			pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
			lookbehind: true,
			inside: {
				'function': /\b\w+$/,
				'keyword': /^self\b/,
				'class-name': /^\w+/,
				'punctuation': /\./
			}
		}
	});

	Prism.languages.insertBefore('ruby', 'string', {
		'string-literal': [
			{
				pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'string': /[\s\S]+/
				}
			},
			{
				pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'string': /[\s\S]+/
				}
			},
			{
				pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
				alias: 'heredoc-string',
				greedy: true,
				inside: {
					'delimiter': {
						pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
						inside: {
							'symbol': /\b\w+/,
							'punctuation': /^<<[-~]?/
						}
					},
					'interpolation': interpolation,
					'string': /[\s\S]+/
				}
			},
			{
				pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
				alias: 'heredoc-string',
				greedy: true,
				inside: {
					'delimiter': {
						pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
						inside: {
							'symbol': /\b\w+/,
							'punctuation': /^<<[-~]?'|'$/,
						}
					},
					'string': /[\s\S]+/
				}
			}
		],
		'command-literal': [
			{
				pattern: RegExp(/%x/.source + percentExpression),
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'command': {
						pattern: /[\s\S]+/,
						alias: 'string'
					}
				}
			},
			{
				pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
				greedy: true,
				inside: {
					'interpolation': interpolation,
					'command': {
						pattern: /[\s\S]+/,
						alias: 'string'
					}
				}
			}
		]
	});

	delete Prism.languages.ruby.string;

	Prism.languages.insertBefore('ruby', 'number', {
		'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
		'constant': /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
	});

	Prism.languages.rb = Prism.languages.ruby;
}(Prism));

(function (Prism) {

	var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
	for (var i = 0; i < 2; i++) {
		// support 4 levels of nested comments
		multilineComment = multilineComment.replace(/<self>/g, function () { return multilineComment; });
	}
	multilineComment = multilineComment.replace(/<self>/g, function () { return /[^\s\S]/.source; });


	Prism.languages.rust = {
		'comment': [
			{
				pattern: RegExp(/(^|[^\\])/.source + multilineComment),
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
			greedy: true
		},
		'char': {
			pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
			greedy: true
		},
		'attribute': {
			pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
			greedy: true,
			alias: 'attr-name',
			inside: {
				'string': null // see below
			}
		},

		// Closure params should not be confused with bitwise OR |
		'closure-params': {
			pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
			lookbehind: true,
			greedy: true,
			inside: {
				'closure-punctuation': {
					pattern: /^\||\|$/,
					alias: 'punctuation'
				},
				rest: null // see below
			}
		},

		'lifetime-annotation': {
			pattern: /'\w+/,
			alias: 'symbol'
		},

		'fragment-specifier': {
			pattern: /(\$\w+:)[a-z]+/,
			lookbehind: true,
			alias: 'punctuation'
		},
		'variable': /\$\w+/,

		'function-definition': {
			pattern: /(\bfn\s+)\w+/,
			lookbehind: true,
			alias: 'function'
		},
		'type-definition': {
			pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
			lookbehind: true,
			alias: 'class-name'
		},
		'module-declaration': [
			{
				pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
				lookbehind: true,
				alias: 'namespace'
			},
			{
				pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
				lookbehind: true,
				alias: 'namespace',
				inside: {
					'punctuation': /::/
				}
			}
		],
		'keyword': [
			// https://github.com/rust-lang/reference/blob/master/src/keywords.md
			/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
			// primitives and str
			// https://doc.rust-lang.org/stable/rust-by-example/primitives.html
			/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
		],

		// functions can technically start with an upper-case letter, but this will introduce a lot of false positives
		// and Rust's naming conventions recommend snake_case anyway.
		// https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
		'function': /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
		'macro': {
			pattern: /\b\w+!/,
			alias: 'property'
		},
		'constant': /\b[A-Z_][A-Z_\d]+\b/,
		'class-name': /\b[A-Z]\w*\b/,

		'namespace': {
			pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
			inside: {
				'punctuation': /::/
			}
		},

		// Hex, oct, bin, dec numbers with visual separators and type suffix
		'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
		'boolean': /\b(?:false|true)\b/,
		'punctuation': /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
		'operator': /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
	};

	Prism.languages.rust['closure-params'].inside.rest = Prism.languages.rust;
	Prism.languages.rust['attribute'].inside['string'] = Prism.languages.rust['string'];

}(Prism));

(function (Prism) {
	Prism.languages.sass = Prism.languages.extend('css', {
		// Sass comments don't need to be closed, only indented
		'comment': {
			pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
			lookbehind: true,
			greedy: true
		}
	});

	Prism.languages.insertBefore('sass', 'atrule', {
		// We want to consume the whole line
		'atrule-line': {
			// Includes support for = and + shortcuts
			pattern: /^(?:[ \t]*)[@+=].+/m,
			greedy: true,
			inside: {
				'atrule': /(?:@[\w-]+|[+=])/
			}
		}
	});
	delete Prism.languages.sass.atrule;


	var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
	var operator = [
		/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
		{
			pattern: /(\s)-(?=\s)/,
			lookbehind: true
		}
	];

	Prism.languages.insertBefore('sass', 'property', {
		// We want to consume the whole line
		'variable-line': {
			pattern: /^[ \t]*\$.+/m,
			greedy: true,
			inside: {
				'punctuation': /:/,
				'variable': variable,
				'operator': operator
			}
		},
		// We want to consume the whole line
		'property-line': {
			pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
			greedy: true,
			inside: {
				'property': [
					/[^:\s]+(?=\s*:)/,
					{
						pattern: /(:)[^:\s]+/,
						lookbehind: true
					}
				],
				'punctuation': /:/,
				'variable': variable,
				'operator': operator,
				'important': Prism.languages.sass.important
			}
		}
	});
	delete Prism.languages.sass.property;
	delete Prism.languages.sass.important;

	// Now that whole lines for other patterns are consumed,
	// what's left should be selectors
	Prism.languages.insertBefore('sass', 'punctuation', {
		'selector': {
			pattern: /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
			lookbehind: true,
			greedy: true
		}
	});

}(Prism));

Prism.languages.scala = Prism.languages.extend('java', {
	'triple-quoted-string': {
		pattern: /"""[\s\S]*?"""/,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'keyword': /<-|=>|\b(?:abstract|case|catch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|match|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
	'number': /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
	'builtin': /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
	'symbol': /'[^\d\s\\]\w*/
});

Prism.languages.insertBefore('scala', 'triple-quoted-string', {
	'string-interpolation': {
		pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
		greedy: true,
		inside: {
			'id': {
				pattern: /^\w+/,
				greedy: true,
				alias: 'function'
			},
			'escape': {
				pattern: /\\\$"|\$[$"]/,
				greedy: true,
				alias: 'symbol'
			},
			'interpolation': {
				pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
				greedy: true,
				inside: {
					'punctuation': /^\$\{?|\}$/,
					'expression': {
						pattern: /[\s\S]+/,
						inside: Prism.languages.scala
					}
				}
			},
			'string': /[\s\S]+/
		}
	}
});

delete Prism.languages.scala['class-name'];
delete Prism.languages.scala['function'];
delete Prism.languages.scala['constant'];

Prism.languages.scss = Prism.languages.extend('css', {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
		lookbehind: true
	},
	'atrule': {
		pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	// url, compassified
	'url': /(?:[-a-z]+-)?url(?=\()/i,
	// CSS selector regex is not appropriate for Sass
	// since there can be lot more things (var, @ directive, nesting..)
	// a selector must start at the end of a property or after a brace (end of other rules or nesting)
	// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
	// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
	// can "pass" as a selector- e.g: proper#{$erty})
	// this one was hard to do, so please be careful if you edit this one :)
	'selector': {
		// Initial look-ahead is used to prevent matching of blank selectors
		pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
		inside: {
			'parent': {
				pattern: /&/,
				alias: 'important'
			},
			'placeholder': /%[-\w]+/,
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	},
	'property': {
		pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
		inside: {
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	}
});

Prism.languages.insertBefore('scss', 'atrule', {
	'keyword': [
		/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
		{
			pattern: /( )(?:from|through)(?= )/,
			lookbehind: true
		}
	]
});

Prism.languages.insertBefore('scss', 'important', {
	// var and interpolated vars
	'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});

Prism.languages.insertBefore('scss', 'function', {
	'module-modifier': {
		pattern: /\b(?:as|hide|show|with)\b/i,
		alias: 'keyword'
	},
	'placeholder': {
		pattern: /%[-\w]+/,
		alias: 'selector'
	},
	'statement': {
		pattern: /\B!(?:default|optional)\b/i,
		alias: 'keyword'
	},
	'boolean': /\b(?:false|true)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	},
	'operator': {
		pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
		lookbehind: true
	}
});

Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;

(function (Prism) {
	// $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
	// + LC_ALL, RANDOM, REPLY, SECONDS.
	// + make sure PS1..4 are here as they are not always set,
	// - some useless things.
	var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';

	var commandAfterHeredoc = {
		pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
		lookbehind: true,
		alias: 'punctuation', // this looks reasonably well in all themes
		inside: null // see below
	};

	var insideString = {
		'bash': commandAfterHeredoc,
		'environment': {
			pattern: RegExp('\\$' + envVars),
			alias: 'constant'
		},
		'variable': [
			// [0]: Arithmetic Environment
			{
				pattern: /\$?\(\([\s\S]+?\)\)/,
				greedy: true,
				inside: {
					// If there is a $ sign at the beginning highlight $(( and )) as variable
					'variable': [
						{
							pattern: /(^\$\(\([\s\S]+)\)\)/,
							lookbehind: true
						},
						/^\$\(\(/
					],
					'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
					// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
					'operator': /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
					// If there is no $ sign at the beginning highlight (( and )) as punctuation
					'punctuation': /\(\(?|\)\)?|,|;/
				}
			},
			// [1]: Command Substitution
			{
				pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
				greedy: true,
				inside: {
					'variable': /^\$\(|^`|\)$|`$/
				}
			},
			// [2]: Brace expansion
			{
				pattern: /\$\{[^}]+\}/,
				greedy: true,
				inside: {
					'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
					'punctuation': /[\[\]]/,
					'environment': {
						pattern: RegExp('(\\{)' + envVars),
						lookbehind: true,
						alias: 'constant'
					}
				}
			},
			/\$(?:\w+|[#?*!@$])/
		],
		// Escape sequences from echo and printf's manuals, and escaped quotes.
		'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
	};

	Prism.languages.bash = {
		'shebang': {
			pattern: /^#!\s*\/.*/,
			alias: 'important'
		},
		'comment': {
			pattern: /(^|[^"{\\$])#.*/,
			lookbehind: true
		},
		'function-name': [
			// a) function foo {
			// b) foo() {
			// c) function foo() {
			// but not “foo {”
			{
				// a) and c)
				pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: true,
				alias: 'function'
			},
			{
				// b)
				pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
				alias: 'function'
			}
		],
		// Highlight variable names as variables in for and select beginnings.
		'for-or-select': {
			pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
			alias: 'variable',
			lookbehind: true
		},
		// Highlight variable names as variables in the left-hand part
		// of assignments (“=” and “+=”).
		'assign-left': {
			pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
			inside: {
				'environment': {
					pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + envVars),
					lookbehind: true,
					alias: 'constant'
				}
			},
			alias: 'variable',
			lookbehind: true
		},
		// Highlight parameter names as variables
		'parameter': {
			pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
			alias: 'variable',
			lookbehind: true
		},
		'string': [
			// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
				lookbehind: true,
				greedy: true,
				inside: insideString
			},
			// Here-document with quotes around the tag
			// → No expansion (so no “inside”).
			{
				pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
				lookbehind: true,
				greedy: true,
				inside: {
					'bash': commandAfterHeredoc
				}
			},
			// “Normal” string
			{
				// https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
				pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
				lookbehind: true,
				greedy: true,
				inside: insideString
			},
			{
				// https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
				pattern: /(^|[^$\\])'[^']*'/,
				lookbehind: true,
				greedy: true
			},
			{
				// https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
				pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
				greedy: true,
				inside: {
					'entity': insideString.entity
				}
			}
		],
		'environment': {
			pattern: RegExp('\\$?' + envVars),
			alias: 'constant'
		},
		'variable': insideString.variable,
		'function': {
			pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		'keyword': {
			pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		// https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
		'builtin': {
			pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
			lookbehind: true,
			// Alias added to make those easier to distinguish from strings.
			alias: 'class-name'
		},
		'boolean': {
			pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		'file-descriptor': {
			pattern: /\B&\d\b/,
			alias: 'important'
		},
		'operator': {
			// Lots of redirections here, but not just that.
			pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
			inside: {
				'file-descriptor': {
					pattern: /^\d/,
					alias: 'important'
				}
			}
		},
		'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
		'number': {
			pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
			lookbehind: true
		}
	};

	commandAfterHeredoc.inside = Prism.languages.bash;

	/* Patterns in command substitution. */
	var toBeCopied = [
		'comment',
		'function-name',
		'for-or-select',
		'assign-left',
		'parameter',
		'string',
		'environment',
		'function',
		'keyword',
		'builtin',
		'boolean',
		'file-descriptor',
		'operator',
		'punctuation',
		'number'
	];
	var inside = insideString.variable[1].inside;
	for (var i = 0; i < toBeCopied.length; i++) {
		inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
	}

	Prism.languages.sh = Prism.languages.bash;
	Prism.languages.shell = Prism.languages.bash;
}(Prism));

(function (Prism) {

	Prism.languages.smarty = {
		'comment': {
			pattern: /^\{\*[\s\S]*?\*\}/,
			greedy: true
		},
		'embedded-php': {
			pattern: /^\{php\}[\s\S]*?\{\/php\}/,
			greedy: true,
			inside: {
				'smarty': {
					pattern: /^\{php\}|\{\/php\}$/,
					inside: null // see below
				},
				'php': {
					pattern: /[\s\S]+/,
					alias: 'language-php',
					inside: Prism.languages.php
				}
			}
		},
		'string': [
			{
				pattern: /"(?:\\.|[^"\\\r\n])*"/,
				greedy: true,
				inside: {
					'interpolation': {
						pattern: /\{[^{}]*\}|`[^`]*`/,
						inside: {
							'interpolation-punctuation': {
								pattern: /^[{`]|[`}]$/,
								alias: 'punctuation'
							},
							'expression': {
								pattern: /[\s\S]+/,
								inside: null // see below
							}
						}
					},
					'variable': /\$\w+/
				}
			},
			{
				pattern: /'(?:\\.|[^'\\\r\n])*'/,
				greedy: true
			},
		],
		'keyword': {
			pattern: /(^\{\/?)[a-z_]\w*\b(?!\()/i,
			lookbehind: true,
			greedy: true
		},
		'delimiter': {
			pattern: /^\{\/?|\}$/,
			greedy: true,
			alias: 'punctuation'
		},
		'number': /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
		'variable': [
			/\$(?!\d)\w+/,
			/#(?!\d)\w+#/,
			{
				pattern: /(\.|->|\w\s*=)(?!\d)\w+\b(?!\()/,
				lookbehind: true
			},
			{
				pattern: /(\[)(?!\d)\w+(?=\])/,
				lookbehind: true
			}
		],
		'function': {
			pattern: /(\|\s*)@?[a-z_]\w*|\b[a-z_]\w*(?=\()/i,
			lookbehind: true
		},
		'attr-name': /\b[a-z_]\w*(?=\s*=)/i,
		'boolean': /\b(?:false|no|off|on|true|yes)\b/,
		'punctuation': /[\[\](){}.,:`]|->/,
		'operator': [
			/[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
			/\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
			/\b(?:and|eq|gt?e|gt|lt?e|lt|mod|neq?|not|or)\b/
		]
	};

	Prism.languages.smarty['embedded-php'].inside.smarty.inside = Prism.languages.smarty;
	Prism.languages.smarty.string[0].inside.interpolation.inside.expression.inside = Prism.languages.smarty;

	var string = /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/;
	var smartyPattern = RegExp(
		// comments
		/\{\*[\s\S]*?\*\}/.source +
		'|' +
		// php tags
		/\{php\}[\s\S]*?\{\/php\}/.source +
		'|' +
		// smarty blocks
		/\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>)*\})*\})*\}/.source
			.replace(/<str>/g, function () { return string.source; }),
		'g'
	);

	// Tokenize all inline Smarty expressions
	Prism.hooks.add('before-tokenize', function (env) {
		var smartyLiteralStart = '{literal}';
		var smartyLiteralEnd = '{/literal}';
		var smartyLiteralMode = false;

		Prism.languages['markup-templating'].buildPlaceholders(env, 'smarty', smartyPattern, function (match) {
			// Smarty tags inside {literal} block are ignored
			if (match === smartyLiteralEnd) {
				smartyLiteralMode = false;
			}

			if (!smartyLiteralMode) {
				if (match === smartyLiteralStart) {
					smartyLiteralMode = true;
				}

				return true;
			}
			return false;
		});
	});

	// Re-insert the tokens after tokenizing
	Prism.hooks.add('after-tokenize', function (env) {
		Prism.languages['markup-templating'].tokenizePlaceholders(env, 'smarty');
	});

}(Prism));

Prism.languages.solidity = Prism.languages.extend('clike', {
	'class-name': {
		pattern: /(\b(?:contract|enum|interface|library|new|struct|using)\s+)(?!\d)[\w$]+/,
		lookbehind: true
	},
	'keyword': /\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\b/,
	'operator': /=>|->|:=|=:|\*\*|\+\+|--|\|\||&&|<<=?|>>=?|[-+*/%^&|<>!=]=?|[~?]/
});

Prism.languages.insertBefore('solidity', 'keyword', {
	'builtin': /\b(?:address|bool|byte|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|string|bytes(?:[1-9]|[12]\d|3[0-2])?)\b/
});

Prism.languages.insertBefore('solidity', 'number', {
	'version': {
		pattern: /([<>]=?|\^)\d+\.\d+\.\d+\b/,
		lookbehind: true,
		alias: 'number',
	}
});

Prism.languages.sol = Prism.languages.solidity;

Prism.languages.sql = {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
		lookbehind: true
	},
	'variable': [
		{
			pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
			greedy: true
		},
		/@[\w.$]+/
	],
	'string': {
		pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
		greedy: true,
		lookbehind: true
	},
	'identifier': {
		pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
		greedy: true,
		lookbehind: true,
		inside: {
			'punctuation': /^`|`$/
		}
	},
	'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i, // Should we highlight user defined functions too?
	'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
	'boolean': /\b(?:FALSE|NULL|TRUE)\b/i,
	'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
	'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
	'punctuation': /[;[\]()`,.]/
};

(function (Prism) {
	var unit = {
		pattern: /(\b\d+)(?:%|[a-z]+)/,
		lookbehind: true
	};
	// 123 -123 .123 -.123 12.3 -12.3
	var number = {
		pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
		lookbehind: true
	};

	var inside = {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true
		},
		'url': {
			pattern: /\burl\((["']?).*?\1\)/i,
			greedy: true
		},
		'string': {
			pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
			greedy: true
		},
		'interpolation': null, // See below
		'func': null, // See below
		'important': /\B!(?:important|optional)\b/i,
		'keyword': {
			pattern: /(^|\s+)(?:(?:else|for|if|return|unless)(?=\s|$)|@[\w-]+)/,
			lookbehind: true
		},
		'hexcode': /#[\da-f]{3,6}/i,
		'color': [
			/\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
			{
				pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
				inside: {
					'unit': unit,
					'number': number,
					'function': /[\w-]+(?=\()/,
					'punctuation': /[(),]/
				}
			}
		],
		'entity': /\\[\da-f]{1,8}/i,
		'unit': unit,
		'boolean': /\b(?:false|true)\b/,
		'operator': [
			// We want non-word chars around "-" because it is
			// accepted in property names.
			/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
		],
		'number': number,
		'punctuation': /[{}()\[\];:,]/
	};

	inside['interpolation'] = {
		pattern: /\{[^\r\n}:]+\}/,
		alias: 'variable',
		inside: {
			'delimiter': {
				pattern: /^\{|\}$/,
				alias: 'punctuation'
			},
			rest: inside
		}
	};
	inside['func'] = {
		pattern: /[\w-]+\([^)]*\).*/,
		inside: {
			'function': /^[^(]+/,
			rest: inside
		}
	};

	Prism.languages.stylus = {
		'atrule-declaration': {
			pattern: /(^[ \t]*)@.+/m,
			lookbehind: true,
			inside: {
				'atrule': /^@[\w-]+/,
				rest: inside
			}
		},
		'variable-declaration': {
			pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
			lookbehind: true,
			inside: {
				'variable': /^\S+/,
				rest: inside
			}
		},

		'statement': {
			pattern: /(^[ \t]*)(?:else|for|if|return|unless)[ \t].+/m,
			lookbehind: true,
			inside: {
				'keyword': /^\S+/,
				rest: inside
			}
		},

		// A property/value pair cannot end with a comma or a brace
		// It cannot have indented content unless it ended with a semicolon
		'property-declaration': {
			pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,]$(?!(?:\r?\n|\r)(?:\{|\2[ \t])))/m,
			lookbehind: true,
			inside: {
				'property': {
					pattern: /^[^\s:]+/,
					inside: {
						'interpolation': inside.interpolation
					}
				},
				rest: inside
			}
		},


		// A selector can contain parentheses only as part of a pseudo-element
		// It can span multiple lines.
		// It must end with a comma or an accolade or have indented content.
		'selector': {
			pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t])))/m,
			lookbehind: true,
			inside: {
				'interpolation': inside.interpolation,
				'comment': inside.comment,
				'punctuation': /[{},]/
			}
		},

		'func': inside.func,
		'string': inside.string,
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true,
			greedy: true
		},
		'interpolation': inside.interpolation,
		'punctuation': /[{}()\[\];:.]/
	};
}(Prism));

Prism.languages.swift = {
	'comment': {
		// Nested comments are supported up to 2 levels
		pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
		lookbehind: true,
		greedy: true
	},
	'string-literal': [
		// https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
		{
			pattern: RegExp(
				/(^|[^"#])/.source
				+ '(?:'
				// single-line string
				+ /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source
				+ '|'
				// multi-line string
				+ /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source
				+ ')'
				+ /(?!["#])/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
					lookbehind: true,
					inside: null // see below
				},
				'interpolation-punctuation': {
					pattern: /^\)|\\\($/,
					alias: 'punctuation'
				},
				'punctuation': /\\(?=[\r\n])/,
				'string': /[\s\S]+/
			}
		},
		{
			pattern: RegExp(
				/(^|[^"#])(#+)/.source
				+ '(?:'
				// single-line string
				+ /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source
				+ '|'
				// multi-line string
				+ /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source
				+ ')'
				+ '\\2'
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
					lookbehind: true,
					inside: null // see below
				},
				'interpolation-punctuation': {
					pattern: /^\)|\\#+\($/,
					alias: 'punctuation'
				},
				'string': /[\s\S]+/
			}
		},
	],

	'directive': {
		// directives with conditions
		pattern: RegExp(
			/#/.source
			+ '(?:'
			+ (
				/(?:elseif|if)\b/.source
				+ '(?:[ \t]*'
				// This regex is a little complex. It's equivalent to this:
				//   (?:![ \t]*)?(?:\b\w+\b(?:[ \t]*<round>)?|<round>)(?:[ \t]*(?:&&|\|\|))?
				// where <round> is a general parentheses expression.
				+ /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source
				+ ')+'
			)
			+ '|'
			+ /(?:else|endif)\b/.source
			+ ')'
		),
		alias: 'property',
		inside: {
			'directive-name': /^#\w+/,
			'boolean': /\b(?:false|true)\b/,
			'number': /\b\d+(?:\.\d+)*\b/,
			'operator': /!|&&|\|\||[<>]=?/,
			'punctuation': /[(),]/
		}
	},
	'literal': {
		pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
		alias: 'constant'
	},
	'other-directive': {
		pattern: /#\w+\b/,
		alias: 'property'
	},

	'attribute': {
		pattern: /@\w+/,
		alias: 'atrule'
	},

	'function-definition': {
		pattern: /(\bfunc\s+)\w+/,
		lookbehind: true,
		alias: 'function'
	},
	'label': {
		// https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
		pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
		lookbehind: true,
		alias: 'important'
	},

	'keyword': /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
	'boolean': /\b(?:false|true)\b/,
	'nil': {
		pattern: /\bnil\b/,
		alias: 'constant'
	},

	'short-argument': /\$\d+\b/,
	'omit': {
		pattern: /\b_\b/,
		alias: 'keyword'
	},
	'number': /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,

	// A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
	'class-name': /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
	'function': /\b[a-z_]\w*(?=\s*\()/i,
	'constant': /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,

	// Operators are generic in Swift. Developers can even create new operators (e.g. +++).
	// https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
	// This regex only supports ASCII operators.
	'operator': /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
	'punctuation': /[{}[\]();,.:\\]/
};

Prism.languages.swift['string-literal'].forEach(function (rule) {
	rule.inside['interpolation'].inside = Prism.languages.swift;
});

(function (Prism) {

	var key = /(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;

	/**
	 * @param {string} pattern
	 */
	function insertKey(pattern) {
		return pattern.replace(/__/g, function () { return key; });
	}

	Prism.languages.toml = {
		'comment': {
			pattern: /#.*/,
			greedy: true
		},
		'table': {
			pattern: RegExp(insertKey(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source), 'm'),
			lookbehind: true,
			greedy: true,
			alias: 'class-name'
		},
		'key': {
			pattern: RegExp(insertKey(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source), 'm'),
			lookbehind: true,
			greedy: true,
			alias: 'property'
		},
		'string': {
			pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
			greedy: true
		},
		'date': [
			{
				// Offset Date-Time, Local Date-Time, Local Date
				pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
				alias: 'number'
			},
			{
				// Local Time
				pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
				alias: 'number'
			}
		],
		'number': /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
		'boolean': /\b(?:false|true)\b/,
		'punctuation': /[.,=[\]{}]/
	};
}(Prism));

Prism.languages.twig = {
	'comment': /^\{#[\s\S]*?#\}$/,

	'tag-name': {
		pattern: /(^\{%-?\s*)\w+/,
		lookbehind: true,
		alias: 'keyword'
	},
	'delimiter': {
		pattern: /^\{[{%]-?|-?[%}]\}$/,
		alias: 'punctuation'
	},

	'string': {
		pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
		inside: {
			'punctuation': /^['"]|['"]$/
		}
	},
	'keyword': /\b(?:even|if|odd)\b/,
	'boolean': /\b(?:false|null|true)\b/,
	'number': /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
	'operator': [
		{
			pattern: /(\s)(?:and|b-and|b-or|b-xor|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
			lookbehind: true
		},
		/[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
	],
	'punctuation': /[()\[\]{}:.,]/
};

Prism.hooks.add('before-tokenize', function (env) {
	if (env.language !== 'twig') {
		return;
	}

	var pattern = /\{(?:#[\s\S]*?#|%[\s\S]*?%|\{[\s\S]*?\})\}/g;
	Prism.languages['markup-templating'].buildPlaceholders(env, 'twig', pattern);
});

Prism.hooks.add('after-tokenize', function (env) {
	Prism.languages['markup-templating'].tokenizePlaceholders(env, 'twig');
});

(function (Prism) {

	Prism.languages.typescript = Prism.languages.extend('javascript', {
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: true,
			greedy: true,
			inside: null // see below
		},
		'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
	});

	// The keywords TypeScript adds to JavaScript
	Prism.languages.typescript.keyword.push(
		/\b(?:abstract|declare|is|keyof|readonly|require)\b/,
		// keywords that have to be followed by an identifier
		/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
		// This is for `import type *, {}`
		/\btype\b(?=\s*(?:[\{*]|$))/
	);

	// doesn't work with TS because TS is too complex
	delete Prism.languages.typescript['parameter'];
	delete Prism.languages.typescript['literal-property'];

	// a version of typescript specifically for highlighting types
	var typeInside = Prism.languages.extend('typescript', {});
	delete typeInside['class-name'];

	Prism.languages.typescript['class-name'].inside = typeInside;

	Prism.languages.insertBefore('typescript', 'function', {
		'decorator': {
			pattern: /@[$\w\xA0-\uFFFF]+/,
			inside: {
				'at': {
					pattern: /^@/,
					alias: 'operator'
				},
				'function': /^[\s\S]+/
			}
		},
		'generic-function': {
			// e.g. foo<T extends "bar" | "baz">( ...
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
			greedy: true,
			inside: {
				'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
				'generic': {
					pattern: /<[\s\S]+/, // everything after the first <
					alias: 'class-name',
					inside: typeInside
				}
			}
		}
	});

	Prism.languages.ts = Prism.languages.typescript;

}(Prism));

(function (Prism) {

	// https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
	// https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
	var anchorOrAlias = /[*&][^\s[\]{},]+/;
	// https://yaml.org/spec/1.2/spec.html#c-ns-tag-property
	var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
	// https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)
	var properties = '(?:' + tag.source + '(?:[ \t]+' + anchorOrAlias.source + ')?|'
		+ anchorOrAlias.source + '(?:[ \t]+' + tag.source + ')?)';
	// https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
	// This is a simplified version that doesn't support "#" and multiline keys
	// All these long scarry character classes are simplified versions of YAML's characters
	var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source
		.replace(/<PLAIN>/g, function () { return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source; });
	var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;

	/**
	 *
	 * @param {string} value
	 * @param {string} [flags]
	 * @returns {RegExp}
	 */
	function createValuePattern(value, flags) {
		flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag
		var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source
			.replace(/<<prop>>/g, function () { return properties; }).replace(/<<value>>/g, function () { return value; });
		return RegExp(pattern, flags);
	}

	Prism.languages.yaml = {
		'scalar': {
			pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source
				.replace(/<<prop>>/g, function () { return properties; })),
			lookbehind: true,
			alias: 'string'
		},
		'comment': /#.*/,
		'key': {
			pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
				.replace(/<<prop>>/g, function () { return properties; })
				.replace(/<<key>>/g, function () { return '(?:' + plainKey + '|' + string + ')'; })),
			lookbehind: true,
			greedy: true,
			alias: 'atrule'
		},
		'directive': {
			pattern: /(^[ \t]*)%.+/m,
			lookbehind: true,
			alias: 'important'
		},
		'datetime': {
			pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
			lookbehind: true,
			alias: 'number'
		},
		'boolean': {
			pattern: createValuePattern(/false|true/.source, 'i'),
			lookbehind: true,
			alias: 'important'
		},
		'null': {
			pattern: createValuePattern(/null|~/.source, 'i'),
			lookbehind: true,
			alias: 'important'
		},
		'string': {
			pattern: createValuePattern(string),
			lookbehind: true,
			greedy: true
		},
		'number': {
			pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
			lookbehind: true
		},
		'tag': tag,
		'important': anchorOrAlias,
		'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
	};

	Prism.languages.yml = Prism.languages.yaml;

}(Prism));

globalThis.Prism = prismjs;

var _g;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SvgIconCopy = function SvgIconCopy(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    stroke: "#979797",
    strokeWidth: 1.6
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 1h7v8"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#27272A",
    d: "M8.7 3.3v7.4H2.3V3.3h6.4Z"
  }))));
};

var toggleSelection = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};

var deselectCurrent = /*@__PURE__*/getDefaultExportFromCjs(toggleSelection);

/* eslint-disable */
function copy(text, onCopy) {
  console.log(text);
  var range,
    selection,
    mark,
    success = false;
  deselectCurrent();
  range = document.createRange();
  selection = document.getSelection();
  mark = document.createElement("span");
  mark.textContent = text;
  mark.style.all = "unset";
  mark.style.position = "fixed";
  mark.style.top = 0;
  mark.style.clip = "rect(0, 0, 0, 0)";
  mark.style.whiteSpace = "pre";
  mark.style.webkitUserSelect = "text";
  mark.style.MozUserSelect = "text";
  mark.style.msUserSelect = "text";
  mark.style.userSelect = "text";
  mark.addEventListener("copy", function (e) {
    var data = [];
    if (typeof text === "string") {
      data = [{
        format: "text/plain",
        text: text
      }];
    } else if (Array.isArray(text)) {
      text.forEach(function (item) {
        data.push({
          format: item.format || "text/plain",
          text: item.text || item
        });
      });
    } else {
      data.push({
        format: "text/plain",
        text: text
      });
    }
    data.forEach(function (item) {
      e.clipboardData.setData(item.format, item.text);
    });
    e.preventDefault();
    onCopy && onCopy();
  });
  document.body.appendChild(mark);
  range.selectNodeContents(mark);
  selection.addRange(range);
  var successful = document.execCommand("copy");
  if (!successful) {
    throw new Error("copy command was unsuccessful");
  }
  mark.remove();
  success = true;
  return success;
}

// 将字符串转换为数字数组，例如：1-3,5,7-9 => [1,2,3,5,7,8,9]
function parseRange(rangeString) {
  var ranges = rangeString.split(",");
  var result = [];
  for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
    var range = ranges_1[_i];
    var _a = range.split("-"),
      start = _a[0],
      end = _a[1];
    if (end) {
      for (var i = parseInt(start); i <= parseInt(end); i++) {
        result.push(i);
      }
    } else {
      result.push(parseInt(start));
    }
  }
  return result;
}

var css_248z$G = ".default .token.cdata,.default .token.comment,.default .token.doctype,.default .token.prolog{color:#8292a2}.default .token.punctuation{color:#f8f8f2}.default .token.namespace{opacity:.7}.default .token.constant,.default .token.deleted,.default .token.property,.default .token.symbol,.default .token.tag{color:#f92672}.default .token.boolean,.default .token.number{color:#ae81ff}.default .token.attr-name,.default .token.builtin,.default .token.char,.default .token.inserted,.default .token.selector,.default .token.string{color:#a6e22e}.default .language-css .token.string,.default .style .token.string,.default .token.entity,.default .token.operator,.default .token.url,.default .token.variable{color:#f8f8f2}.default .token.atrule,.default .token.attr-value,.default .token.class-name,.default .token.function{color:#e6db74}.default .token.keyword{color:#66d9ef}.default .token.important,.default .token.regex{color:#fd971f}.default .token.bold,.default .token.important{font-weight:700}.default .token.italic{font-style:italic}.default .token.entity{cursor:help}";
styleInject(css_248z$G);

var css_248z$F = ".prism-a11y-dark code[class*=language-],.prism-a11y-dark pre[class*=language-]{word-wrap:normal;background:none;color:#f8f8f2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-a11y-dark :not(pre)>code[class*=language-],.prism-a11y-dark pre[class*=language-]{background:#2b2b2b}.prism-a11y-dark :not(pre)>code[class*=language-]{white-space:normal}.prism-a11y-dark .token.cdata,.prism-a11y-dark .token.comment,.prism-a11y-dark .token.doctype,.prism-a11y-dark .token.prolog{color:#d4d0ab}.prism-a11y-dark .token.punctuation{color:#fefefe}.prism-a11y-dark .token.constant,.prism-a11y-dark .token.deleted,.prism-a11y-dark .token.property,.prism-a11y-dark .token.symbol,.prism-a11y-dark .token.tag{color:#ffa07a}.prism-a11y-dark .token.boolean,.prism-a11y-dark .token.number{color:#00e0e0}.prism-a11y-dark .token.attr-name,.prism-a11y-dark .token.builtin,.prism-a11y-dark .token.char,.prism-a11y-dark .token.inserted,.prism-a11y-dark .token.selector,.prism-a11y-dark .token.string{color:#abe338}.prism-a11y-dark .language-css .token.string,.prism-a11y-dark .style .token.string,.prism-a11y-dark .token.entity,.prism-a11y-dark .token.operator,.prism-a11y-dark .token.url,.prism-a11y-dark .token.variable{color:#00e0e0}.prism-a11y-dark .token.atrule,.prism-a11y-dark .token.attr-value,.prism-a11y-dark .token.function{color:gold}.prism-a11y-dark .token.keyword{color:#00e0e0}.prism-a11y-dark .token.important,.prism-a11y-dark .token.regex{color:gold}.prism-a11y-dark .token.bold,.prism-a11y-dark .token.important{font-weight:700}.prism-a11y-dark .token.italic{font-style:italic}.prism-a11y-dark .token.entity{cursor:help}@media screen and (-ms-high-contrast:active){.prism-a11y-dark code[class*=language-],.prism-a11y-dark pre[class*=language-]{background:window;color:windowText}.prism-a11y-dark :not(pre)>code[class*=language-],.prism-a11y-dark pre[class*=language-]{background:window}.prism-a11y-dark .token.important{background:highlight;color:window;font-weight:400}.prism-a11y-dark .token.atrule,.prism-a11y-dark .token.attr-value,.prism-a11y-dark .token.function,.prism-a11y-dark .token.keyword,.prism-a11y-dark .token.operator,.prism-a11y-dark .token.selector{font-weight:700}.prism-a11y-dark .token.attr-value,.prism-a11y-dark .token.comment,.prism-a11y-dark .token.doctype,.prism-a11y-dark .token.function,.prism-a11y-dark .token.keyword,.prism-a11y-dark .token.operator,.prism-a11y-dark .token.property,.prism-a11y-dark .token.string{color:highlight}.prism-a11y-dark .token.attr-value,.prism-a11y-dark .token.url{font-weight:400}}";
styleInject(css_248z$F);

var css_248z$E = ".prism-atom-dark code[class*=language-],.prism-atom-dark pre[class*=language-]{color:#c5c8c6;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}.prism-atom-dark :not(pre)>code[class*=language-],.prism-atom-dark pre[class*=language-]{background:#1d1f21}.prism-atom-dark :not(pre)>code[class*=language-]{border-radius:.3em}.prism-atom-dark .token.cdata,.prism-atom-dark .token.comment,.prism-atom-dark .token.doctype,.prism-atom-dark .token.prolog{color:#7c7c7c}.prism-atom-dark .token.punctuation{color:#c5c8c6}.prism-atom-dark .namespace{opacity:.7}.prism-atom-dark .token.keyword,.prism-atom-dark .token.property,.prism-atom-dark .token.tag{color:#96cbfe}.prism-atom-dark .token.class-name{color:#ffffb6;text-decoration:underline}.prism-atom-dark .token.boolean,.prism-atom-dark .token.constant{color:#9c9}.prism-atom-dark .token.deleted,.prism-atom-dark .token.symbol{color:#f92672}.prism-atom-dark .token.number{color:#ff73fd}.prism-atom-dark .token.attr-name,.prism-atom-dark .token.builtin,.prism-atom-dark .token.char,.prism-atom-dark .token.inserted,.prism-atom-dark .token.selector,.prism-atom-dark .token.string{color:#a8ff60}.prism-atom-dark .token.variable{color:#c6c5fe}.prism-atom-dark .token.operator{color:#ededed}.prism-atom-dark .token.entity{color:#ffffb6;cursor:help}.prism-atom-dark .token.url{color:#96cbfe}.prism-atom-dark .language-css .token.string,.prism-atom-dark .style .token.string{color:#87c38a}.prism-atom-dark .token.atrule,.prism-atom-dark .token.attr-value{color:#f9ee98}.prism-atom-dark .token.function{color:#dad085}.prism-atom-dark .token.regex{color:#e9c062}.prism-atom-dark .token.important{color:#fd971f}.prism-atom-dark .token.bold,.prism-atom-dark .token.important{font-weight:700}.prism-atom-dark .token.italic{font-style:italic}";
styleInject(css_248z$E);

var css_248z$D = ".prism-base16-ateliersulphurpool-light .line-number-wrapper{background:#f5f7ff}.prism-base16-ateliersulphurpool-light code[class*=language-],.prism-base16-ateliersulphurpool-light pre[class*=language-]{background:#f5f7ff;color:#5e6687;direction:ltr;font-size:14px;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.375;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-base16-ateliersulphurpool-light pre>code[class*=language-]{font-size:1em}.prism-base16-ateliersulphurpool-light code[class*=language-] ::-moz-selection,.prism-base16-ateliersulphurpool-light code[class*=language-]::-moz-selection,.prism-base16-ateliersulphurpool-light pre[class*=language-] ::-moz-selection,.prism-base16-ateliersulphurpool-light pre[class*=language-]::-moz-selection{background:#dfe2f1;text-shadow:none}.prism-base16-ateliersulphurpool-light code[class*=language-] ::selection,.prism-base16-ateliersulphurpool-light code[class*=language-]::selection,.prism-base16-ateliersulphurpool-light pre[class*=language-] ::selection,.prism-base16-ateliersulphurpool-light pre[class*=language-]::selection{background:#dfe2f1;text-shadow:none}.prism-base16-ateliersulphurpool-light pre[class*=language-]{overflow:auto}.prism-base16-ateliersulphurpool-light :not(pre)>code[class*=language-]{border-radius:.3em}.prism-base16-ateliersulphurpool-light .token.cdata,.prism-base16-ateliersulphurpool-light .token.comment,.prism-base16-ateliersulphurpool-light .token.doctype,.prism-base16-ateliersulphurpool-light .token.prolog{color:#898ea4}.prism-base16-ateliersulphurpool-light .token.punctuation{color:#5e6687}.prism-base16-ateliersulphurpool-light .token.namespace{opacity:.7}.prism-base16-ateliersulphurpool-light .token.boolean,.prism-base16-ateliersulphurpool-light .token.number,.prism-base16-ateliersulphurpool-light .token.operator{color:#c76b29}.prism-base16-ateliersulphurpool-light .token.property{color:#c08b30}.prism-base16-ateliersulphurpool-light .token.tag{color:#3d8fd1}.prism-base16-ateliersulphurpool-light .token.string{color:#22a2c9}.prism-base16-ateliersulphurpool-light .token.selector{color:#6679cc}.prism-base16-ateliersulphurpool-light .token.attr-name{color:#c76b29}.prism-base16-ateliersulphurpool-light .language-css .token.string,.prism-base16-ateliersulphurpool-light .style .token.string,.prism-base16-ateliersulphurpool-light .token.entity,.prism-base16-ateliersulphurpool-light .token.url{color:#22a2c9}.prism-base16-ateliersulphurpool-light .token.attr-value,.prism-base16-ateliersulphurpool-light .token.control,.prism-base16-ateliersulphurpool-light .token.directive,.prism-base16-ateliersulphurpool-light .token.keyword,.prism-base16-ateliersulphurpool-light .token.unit{color:#ac9739}.prism-base16-ateliersulphurpool-light .token.atrule,.prism-base16-ateliersulphurpool-light .token.regex,.prism-base16-ateliersulphurpool-light .token.statement{color:#22a2c9}.prism-base16-ateliersulphurpool-light .token.placeholder,.prism-base16-ateliersulphurpool-light .token.variable{color:#3d8fd1}.prism-base16-ateliersulphurpool-light .token.deleted{text-decoration:line-through}.prism-base16-ateliersulphurpool-light .token.inserted{border-bottom:1px dotted #202746;text-decoration:none}.prism-base16-ateliersulphurpool-light .token.italic{font-style:italic}.prism-base16-ateliersulphurpool-light .token.bold,.prism-base16-ateliersulphurpool-light .token.important{font-weight:700}.prism-base16-ateliersulphurpool-light .token.important{color:#c94922}.prism-base16-ateliersulphurpool-light .token.entity{cursor:help}.prism-base16-ateliersulphurpool-light pre>code.highlight{outline:.4em solid #c94922;outline-offset:.4em}.prism-base16-ateliersulphurpool-light .line-numbers.line-numbers .line-numbers-rows{border-right-color:#dfe2f1}.prism-base16-ateliersulphurpool-light .line-numbers .line-numbers-rows>span:before{color:#979db4}.prism-base16-ateliersulphurpool-light .line-highlight.line-highlight{background:rgba(107,115,148,.2);background:-webkit-linear-gradient(left,rgba(107,115,148,.2) 70%,rgba(107,115,148,0));background:linear-gradient(90deg,rgba(107,115,148,.2) 70%,rgba(107,115,148,0))}";
styleInject(css_248z$D);

var css_248z$C = ".prism-cb code[class*=language-],.prism-cb pre[class*=language-]{word-wrap:normal;background:none;border:0;color:#fff;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.4;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px 1px #000;white-space:pre;word-spacing:normal}.prism-cb :not(pre)>code[class*=language-],.prism-cb pre[class*=language-]{background:#222}.prism-cb .token.cdata,.prism-cb .token.comment,.prism-cb .token.doctype,.prism-cb .token.prolog{color:#797979}.prism-cb .token.operator,.prism-cb .token.punctuation,.prism-cb .token.selector{color:#fff}.prism-cb .token.namespace{opacity:.7}.prism-cb .token.boolean,.prism-cb .token.tag{color:#ffd893}.prism-cb .token.atrule,.prism-cb .token.attr-value,.prism-cb .token.hex,.prism-cb .token.string{color:#b0c975}.prism-cb .token.attr-name,.prism-cb .token.entity,.prism-cb .token.keyword,.prism-cb .token.property,.prism-cb .token.url{color:#c27628}.prism-cb .token.regex{color:#9b71c6}.prism-cb .token.entity{cursor:help}.prism-cb .token.constant,.prism-cb .token.function{color:#e5a638}.prism-cb .token.variable{color:#fdfba8}.prism-cb .token.number{color:#8799b0}.prism-cb .token.deliminator,.prism-cb .token.important{color:#e45734}.prism-cb .line-highlight.line-highlight{background:hsla(0,0%,100%,.2)}.prism-cb .line-highlight.line-highlight:before,.prism-cb .line-highlight.line-highlight[data-end]:after{background-color:hsla(0,0%,100%,.3);-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px;color:#fff;top:.3em}.prism-cb .line-numbers .line-numbers-rows>span{border-right:3px solid #d9d336}";
styleInject(css_248z$C);

var css_248z$B = ".prism-coldark-cold code[class*=language-],.prism-coldark-cold pre[class*=language-]{word-wrap:normal;background:none;color:#111b27;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-coldark-cold code[class*=language-] ::-moz-selection,.prism-coldark-cold code[class*=language-]::-moz-selection,.prism-coldark-cold pre[class*=language-] ::-moz-selection,.prism-coldark-cold pre[class*=language-]::-moz-selection{background:#8da1b9}.prism-coldark-cold code[class*=language-] ::selection,.prism-coldark-cold code[class*=language-]::selection,.prism-coldark-cold pre[class*=language-] ::selection,.prism-coldark-cold pre[class*=language-]::selection{background:#8da1b9}.prism-coldark-cold :not(pre)>code[class*=language-],.prism-coldark-cold pre[class*=language-]{background:#e3eaf2}.prism-coldark-cold .token.cdata,.prism-coldark-cold .token.comment,.prism-coldark-cold .token.doctype,.prism-coldark-cold .token.prolog{color:#3c526d}.prism-coldark-cold .token.punctuation{color:#111b27}.prism-coldark-cold .token.delimiter.important,.prism-coldark-cold .token.selector .parent,.prism-coldark-cold .token.tag,.prism-coldark-cold .token.tag .token.punctuation{color:#006d6d}.prism-coldark-cold .token.attr-name,.prism-coldark-cold .token.boolean,.prism-coldark-cold .token.boolean.important,.prism-coldark-cold .token.constant,.prism-coldark-cold .token.number,.prism-coldark-cold .token.selector .token.attribute{color:#755f00}.prism-coldark-cold .token.class-name,.prism-coldark-cold .token.key,.prism-coldark-cold .token.parameter,.prism-coldark-cold .token.property,.prism-coldark-cold .token.property-access,.prism-coldark-cold .token.variable{color:#005a8e}.prism-coldark-cold .token.attr-value,.prism-coldark-cold .token.color,.prism-coldark-cold .token.inserted,.prism-coldark-cold .token.selector .token.value,.prism-coldark-cold .token.string,.prism-coldark-cold .token.string .token.url-link{color:#116b00}.prism-coldark-cold .token.builtin,.prism-coldark-cold .token.keyword-array,.prism-coldark-cold .token.package,.prism-coldark-cold .token.regex{color:#af00af}.prism-coldark-cold .token.function,.prism-coldark-cold .token.selector .token.class,.prism-coldark-cold .token.selector .token.id{color:#7c00aa}.prism-coldark-cold .token.atrule .token.rule,.prism-coldark-cold .token.combinator,.prism-coldark-cold .token.keyword,.prism-coldark-cold .token.operator,.prism-coldark-cold .token.pseudo-class,.prism-coldark-cold .token.pseudo-element,.prism-coldark-cold .token.selector,.prism-coldark-cold .token.unit{color:#a04900}.prism-coldark-cold .token.deleted,.prism-coldark-cold .token.important{color:#c22f2e}.prism-coldark-cold .token.keyword-this,.prism-coldark-cold .token.this{color:#005a8e}.prism-coldark-cold .token.bold,.prism-coldark-cold .token.important,.prism-coldark-cold .token.keyword-this,.prism-coldark-cold .token.this{font-weight:700}.prism-coldark-cold .token.delimiter.important{font-weight:inherit}.prism-coldark-cold .token.italic{font-style:italic}.prism-coldark-cold .token.entity{cursor:help}.prism-coldark-cold .language-markdown .token.title,.prism-coldark-cold .language-markdown .token.title .token.punctuation{color:#005a8e;font-weight:700}.prism-coldark-cold .language-markdown .token.blockquote.punctuation{color:#af00af}.prism-coldark-cold .language-markdown .token.code{color:#006d6d}.prism-coldark-cold .language-markdown .token.hr.punctuation{color:#005a8e}.prism-coldark-cold .language-markdown .token.url>.token.content{color:#116b00}.prism-coldark-cold .language-markdown .token.url-link{color:#755f00}.prism-coldark-cold .language-markdown .token.list.punctuation{color:#af00af}.prism-coldark-cold .language-json .token.operator,.prism-coldark-cold .language-markdown .token.table-header{color:#111b27}.prism-coldark-cold .language-scss .token.variable{color:#006d6d}.prism-coldark-cold .token.token.cr:before,.prism-coldark-cold .token.token.lf:before,.prism-coldark-cold .token.token.space:before,.prism-coldark-cold .token.token.tab:not(:empty):before{color:#3c526d}.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>a,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>button{background:#005a8e;color:#e3eaf2}.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:focus,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:hover,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:focus,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:hover{background:rgba(0,90,142,.855);color:#e3eaf2;text-decoration:none}.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>span,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:focus,.prism-coldark-cold div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:hover{background:#3c526d;color:#e3eaf2}.prism-coldark-cold .line-highlight.line-highlight{background:rgba(141,161,185,.184);background:linear-gradient(90deg,rgba(141,161,185,.184) 70%,rgba(141,161,185,.145))}.prism-coldark-cold .line-highlight.line-highlight:before,.prism-coldark-cold .line-highlight.line-highlight[data-end]:after{background-color:#3c526d;box-shadow:0 1px #8da1b9;color:#e3eaf2}.prism-coldark-cold pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows>span:hover:before{background-color:rgba(60,82,109,.122)}.prism-coldark-cold .line-numbers.line-numbers .line-numbers-rows{background:rgba(208,218,231,.478);border-right:1px solid rgba(141,161,185,.478)}.prism-coldark-cold .line-numbers .line-numbers-rows>span:before{color:rgba(60,82,109,.855)}.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-1,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-5,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-9{color:#755f00}.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-10,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-2,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-6{color:#af00af}.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-11,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-3,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-7{color:#005a8e}.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-12,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-4,.prism-coldark-cold .rainbow-braces .token.token.punctuation.brace-level-8{color:#7c00aa}.prism-coldark-cold pre.diff-highlight>code .token.token.deleted:not(.prefix),.prism-coldark-cold pre>code.diff-highlight .token.token.deleted:not(.prefix){background-color:rgba(194,47,46,.122)}.prism-coldark-cold pre.diff-highlight>code .token.token.inserted:not(.prefix),.prism-coldark-cold pre>code.diff-highlight .token.token.inserted:not(.prefix){background-color:rgba(17,107,0,.122)}.prism-coldark-cold .command-line .command-line-prompt{border-right:1px solid rgba(141,161,185,.478)}.prism-coldark-cold .command-line .command-line-prompt>span:before{color:rgba(60,82,109,.855)}";
styleInject(css_248z$B);

var css_248z$A = ".prism-coldark-dark code[class*=language-],.prism-coldark-dark pre[class*=language-]{word-wrap:normal;background:none;color:#e3eaf2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-coldark-dark code[class*=language-] ::-moz-selection,.prism-coldark-dark code[class*=language-]::-moz-selection,.prism-coldark-dark pre[class*=language-] ::-moz-selection,.prism-coldark-dark pre[class*=language-]::-moz-selection{background:#3c526d}.prism-coldark-dark code[class*=language-] ::selection,.prism-coldark-dark code[class*=language-]::selection,.prism-coldark-dark pre[class*=language-] ::selection,.prism-coldark-dark pre[class*=language-]::selection{background:#3c526d}.prism-coldark-dark :not(pre)>code[class*=language-],.prism-coldark-dark pre[class*=language-]{background:#111b27}.prism-coldark-dark .token.cdata,.prism-coldark-dark .token.comment,.prism-coldark-dark .token.doctype,.prism-coldark-dark .token.prolog{color:#8da1b9}.prism-coldark-dark .token.punctuation{color:#e3eaf2}.prism-coldark-dark .token.delimiter.important,.prism-coldark-dark .token.selector .parent,.prism-coldark-dark .token.tag,.prism-coldark-dark .token.tag .token.punctuation{color:#6cc}.prism-coldark-dark .token.attr-name,.prism-coldark-dark .token.boolean,.prism-coldark-dark .token.boolean.important,.prism-coldark-dark .token.constant,.prism-coldark-dark .token.number,.prism-coldark-dark .token.selector .token.attribute{color:#e6d37a}.prism-coldark-dark .token.class-name,.prism-coldark-dark .token.key,.prism-coldark-dark .token.parameter,.prism-coldark-dark .token.property,.prism-coldark-dark .token.property-access,.prism-coldark-dark .token.variable{color:#6cb8e6}.prism-coldark-dark .token.attr-value,.prism-coldark-dark .token.color,.prism-coldark-dark .token.inserted,.prism-coldark-dark .token.selector .token.value,.prism-coldark-dark .token.string,.prism-coldark-dark .token.string .token.url-link{color:#91d076}.prism-coldark-dark .token.builtin,.prism-coldark-dark .token.keyword-array,.prism-coldark-dark .token.package,.prism-coldark-dark .token.regex{color:#f4adf4}.prism-coldark-dark .token.function,.prism-coldark-dark .token.selector .token.class,.prism-coldark-dark .token.selector .token.id{color:#c699e3}.prism-coldark-dark .token.atrule .token.rule,.prism-coldark-dark .token.combinator,.prism-coldark-dark .token.keyword,.prism-coldark-dark .token.operator,.prism-coldark-dark .token.pseudo-class,.prism-coldark-dark .token.pseudo-element,.prism-coldark-dark .token.selector,.prism-coldark-dark .token.unit{color:#e9ae7e}.prism-coldark-dark .token.deleted,.prism-coldark-dark .token.important{color:#cd6660}.prism-coldark-dark .token.keyword-this,.prism-coldark-dark .token.this{color:#6cb8e6}.prism-coldark-dark .token.bold,.prism-coldark-dark .token.important,.prism-coldark-dark .token.keyword-this,.prism-coldark-dark .token.this{font-weight:700}.prism-coldark-dark .token.delimiter.important{font-weight:inherit}.prism-coldark-dark .token.italic{font-style:italic}.prism-coldark-dark .token.entity{cursor:help}.prism-coldark-dark .language-markdown .token.title,.prism-coldark-dark .language-markdown .token.title .token.punctuation{color:#6cb8e6;font-weight:700}.prism-coldark-dark .language-markdown .token.blockquote.punctuation{color:#f4adf4}.prism-coldark-dark .language-markdown .token.code{color:#6cc}.prism-coldark-dark .language-markdown .token.hr.punctuation{color:#6cb8e6}.prism-coldark-dark .language-markdown .token.url .token.content{color:#91d076}.prism-coldark-dark .language-markdown .token.url-link{color:#e6d37a}.prism-coldark-dark .language-markdown .token.list.punctuation{color:#f4adf4}.prism-coldark-dark .language-json .token.operator,.prism-coldark-dark .language-markdown .token.table-header{color:#e3eaf2}.prism-coldark-dark .language-scss .token.variable{color:#6cc}.prism-coldark-dark .token.token.cr:before,.prism-coldark-dark .token.token.lf:before,.prism-coldark-dark .token.token.space:before,.prism-coldark-dark .token.token.tab:not(:empty):before{color:#8da1b9}.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button{background:#6cb8e6;color:#111b27}.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:focus,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:hover,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:focus,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:hover{background:rgba(108,184,230,.855);color:#111b27;text-decoration:none}.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:focus,.prism-coldark-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:hover{background:#8da1b9;color:#111b27}.prism-coldark-dark .line-highlight.line-highlight{background:rgba(60,82,109,.373);background:linear-gradient(90deg,rgba(60,82,109,.373) 70%,rgba(60,82,109,.333))}.prism-coldark-dark .line-highlight.line-highlight:before,.prism-coldark-dark .line-highlight.line-highlight[data-end]:after{background-color:#8da1b9;box-shadow:0 1px #3c526d;color:#111b27}.prism-coldark-dark pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows>span:hover:before{background-color:rgba(141,161,185,.094)}.prism-coldark-dark .line-numbers.line-numbers .line-numbers-rows{background:rgba(11,18,27,.478);border-right:1px solid #0b121b}.prism-coldark-dark .line-numbers .line-numbers-rows>span:before{color:rgba(141,161,185,.855)}.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-1,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-5,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-9{color:#e6d37a}.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-10,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-2,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-6{color:#f4adf4}.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-11,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-3,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-7{color:#6cb8e6}.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-12,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-4,.prism-coldark-dark .rainbow-braces .token.token.punctuation.brace-level-8{color:#c699e3}.prism-coldark-dark pre.diff-highlight>code .token.token.deleted:not(.prefix),.prism-coldark-dark pre>code.diff-highlight .token.token.deleted:not(.prefix){background-color:hsla(3,52%,59%,.122)}.prism-coldark-dark pre.diff-highlight>code .token.token.inserted:not(.prefix),.prism-coldark-dark pre>code.diff-highlight .token.token.inserted:not(.prefix){background-color:rgba(145,208,118,.122)}.prism-coldark-dark .command-line .command-line-prompt{border-right:1px solid #0b121b}.prism-coldark-dark .command-line .command-line-prompt>span:before{color:rgba(141,161,185,.855)}";
styleInject(css_248z$A);

var css_248z$z = ".prism-coy-without-shadows code[class*=language-],.prism-coy-without-shadows pre[class*=language-]{word-wrap:normal;background:none;color:#000;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-coy-without-shadows pre[class*=language-]{background-attachment:local;background-color:#fdfdfd;background-image:linear-gradient(transparent 50%,rgba(69,142,209,.04) 0);background-origin:content-box;background-size:3em 3em;border-left:10px solid #358ccb;box-shadow:-1px 0 0 0 #358ccb,0 0 0 1px #dfdfdf;position:relative}.prism-coy-without-shadows :not(pre)>code[class*=language-]{background-color:#fdfdfd;border:1px solid rgba(0,0,0,.1);border-radius:.3em;box-sizing:border-box;color:#c92c2c;display:inline;padding:.2em;position:relative;white-space:normal}.prism-coy-without-shadows .token.block-comment,.prism-coy-without-shadows .token.cdata,.prism-coy-without-shadows .token.comment,.prism-coy-without-shadows .token.doctype,.prism-coy-without-shadows .token.prolog{color:#7d8b99}.prism-coy-without-shadows .token.punctuation{color:#5f6364}.prism-coy-without-shadows .token.boolean,.prism-coy-without-shadows .token.constant,.prism-coy-without-shadows .token.deleted,.prism-coy-without-shadows .token.function-name,.prism-coy-without-shadows .token.number,.prism-coy-without-shadows .token.property,.prism-coy-without-shadows .token.symbol,.prism-coy-without-shadows .token.tag{color:#c92c2c}.prism-coy-without-shadows .token.attr-name,.prism-coy-without-shadows .token.builtin,.prism-coy-without-shadows .token.char,.prism-coy-without-shadows .token.function,.prism-coy-without-shadows .token.inserted,.prism-coy-without-shadows .token.selector,.prism-coy-without-shadows .token.string{color:#2f9c0a}.prism-coy-without-shadows .token.entity,.prism-coy-without-shadows .token.operator,.prism-coy-without-shadows .token.url,.prism-coy-without-shadows .token.variable{background:hsla(0,0%,100%,.5);color:#a67f59}.prism-coy-without-shadows .token.atrule,.prism-coy-without-shadows .token.attr-value,.prism-coy-without-shadows .token.class-name,.prism-coy-without-shadows .token.keyword{color:#1990b8}.prism-coy-without-shadows .token.important,.prism-coy-without-shadows .token.regex{color:#e90}.prism-coy-without-shadows .language-css .token.string,.prism-coy-without-shadows .style .token.string{background:hsla(0,0%,100%,.5);color:#a67f59}.prism-coy-without-shadows .token.important{font-weight:400}.prism-coy-without-shadows .token.bold{font-weight:700}.prism-coy-without-shadows .token.italic{font-style:italic}.prism-coy-without-shadows .token.entity{cursor:help}.prism-coy-without-shadows .token.namespace{opacity:.7}";
styleInject(css_248z$z);

var css_248z$y = ".prism-darcula code[class*=language-],.prism-darcula pre[class*=language-]{color:#a9b7c6;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-darcula code[class*=language-] ::-moz-selection,.prism-darcula code[class*=language-]::-moz-selection,.prism-darcula pre[class*=language-] ::-moz-selection,.prism-darcula pre[class*=language-]::-moz-selection{background:rgba(33,66,131,.85);color:inherit}.prism-darcula code[class*=language-] ::selection,.prism-darcula code[class*=language-]::selection,.prism-darcula pre[class*=language-] ::selection,.prism-darcula pre[class*=language-]::selection{background:rgba(33,66,131,.85);color:inherit}.prism-darcula :not(pre)>code[class*=language-],.prism-darcula pre[class*=language-]{background:#2b2b2b}.prism-darcula .token.cdata,.prism-darcula .token.comment,.prism-darcula .token.prolog{color:grey}.prism-darcula .token.atrule,.prism-darcula .token.boolean,.prism-darcula .token.delimiter,.prism-darcula .token.important,.prism-darcula .token.keyword,.prism-darcula .token.selector{color:#cc7832}.prism-darcula .token.attr-name,.prism-darcula .token.operator,.prism-darcula .token.punctuation{color:#a9b7c6}.prism-darcula .token.builtin,.prism-darcula .token.doctype,.prism-darcula .token.tag,.prism-darcula .token.tag .punctuation{color:#e8bf6a}.prism-darcula .token.entity,.prism-darcula .token.number,.prism-darcula .token.symbol{color:#6897bb}.prism-darcula .token.constant,.prism-darcula .token.property,.prism-darcula .token.variable{color:#9876aa}.prism-darcula .token.char,.prism-darcula .token.string{color:#6a8759}.prism-darcula .token.attr-value,.prism-darcula .token.attr-value .punctuation{color:#a5c261}.prism-darcula .token.attr-value .punctuation:first-child{color:#a9b7c6}.prism-darcula .token.url{color:#287bde;text-decoration:underline}.prism-darcula .token.function{color:#ffc66d}.prism-darcula .token.regex{background:#364135}.prism-darcula .token.bold{font-weight:700}.prism-darcula .token.italic{font-style:italic}.prism-darcula .token.inserted{background:#294436}.prism-darcula .token.deleted{background:#484a4a}.prism-darcula code.language-css .token.property,.prism-darcula code.language-css .token.property+.token.punctuation{color:#a9b7c6}.prism-darcula code.language-css .token.id,.prism-darcula code.language-css .token.selector>.token.attribute,.prism-darcula code.language-css .token.selector>.token.class,.prism-darcula code.language-css .token.selector>.token.pseudo-class,.prism-darcula code.language-css .token.selector>.token.pseudo-element{color:#ffc66d}";
styleInject(css_248z$y);

var css_248z$x = ".prism-dracula code[class*=language-],.prism-dracula pre[class*=language-]{word-wrap:normal;background:none;color:#f8f8f2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}.prism-dracula :not(pre)>code[class*=language-],.prism-dracula pre[class*=language-]{background:#282a36}.prism-dracula .token.cdata,.prism-dracula .token.comment,.prism-dracula .token.doctype,.prism-dracula .token.prolog{color:#6272a4}.prism-dracula .token.punctuation{color:#f8f8f2}.prism-dracula .namespace{opacity:.7}.prism-dracula .token.constant,.prism-dracula .token.deleted,.prism-dracula .token.property,.prism-dracula .token.symbol,.prism-dracula .token.tag{color:#ff79c6}.prism-dracula .token.boolean,.prism-dracula .token.number{color:#bd93f9}.prism-dracula .token.attr-name,.prism-dracula .token.builtin,.prism-dracula .token.char,.prism-dracula .token.inserted,.prism-dracula .token.selector,.prism-dracula .token.string{color:#50fa7b}.prism-dracula .language-css .token.string,.prism-dracula .style .token.string,.prism-dracula .token.entity,.prism-dracula .token.operator,.prism-dracula .token.url,.prism-dracula .token.variable{color:#f8f8f2}.prism-dracula .token.atrule,.prism-dracula .token.attr-value,.prism-dracula .token.class-name,.prism-dracula .token.function{color:#f1fa8c}.prism-dracula .token.keyword{color:#8be9fd}.prism-dracula .token.important,.prism-dracula .token.regex{color:#ffb86c}.prism-dracula .token.bold,.prism-dracula .token.important{font-weight:700}.prism-dracula .token.italic{font-style:italic}.prism-dracula .token.entity{cursor:help}";
styleInject(css_248z$x);

var css_248z$w = ".prism-duotone-dark .line-number-wrapper{background:#2a2734}.prism-duotone-dark code[class*=language-],.prism-duotone-dark pre[class*=language-]{background:#2a2734;color:#9a86fd;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-dark code[class*=language-] ::-moz-selection,.prism-duotone-dark code[class*=language-]::-moz-selection,.prism-duotone-dark pre[class*=language-] ::-moz-selection,.prism-duotone-dark pre[class*=language-]::-moz-selection{background:#6a51e6;text-shadow:none}.prism-duotone-dark code[class*=language-] ::selection,.prism-duotone-dark code[class*=language-]::selection,.prism-duotone-dark pre[class*=language-] ::selection,.prism-duotone-dark pre[class*=language-]::selection{background:#6a51e6;text-shadow:none}.prism-duotone-dark .token.cdata,.prism-duotone-dark .token.comment,.prism-duotone-dark .token.doctype,.prism-duotone-dark .token.prolog,.prism-duotone-dark .token.punctuation{color:#6c6783}.prism-duotone-dark .token.namespace{opacity:.7}.prism-duotone-dark .token.number,.prism-duotone-dark .token.operator,.prism-duotone-dark .token.tag{color:#e09142}.prism-duotone-dark .token.function,.prism-duotone-dark .token.property{color:#9a86fd}.prism-duotone-dark .token.atrule-id,.prism-duotone-dark .token.selector,.prism-duotone-dark .token.tag-id{color:#eeebff}.prism-duotone-dark .token.attr-name,.prism-duotone-dark code.language-javascript{color:#c4b9fe}.prism-duotone-dark .language-css .token.string,.prism-duotone-dark .language-scss .token.string,.prism-duotone-dark .style .token.string,.prism-duotone-dark .token.atrule,.prism-duotone-dark .token.attr-value,.prism-duotone-dark .token.boolean,.prism-duotone-dark .token.control,.prism-duotone-dark .token.directive,.prism-duotone-dark .token.entity,.prism-duotone-dark .token.keyword,.prism-duotone-dark .token.placeholder,.prism-duotone-dark .token.regex,.prism-duotone-dark .token.statement,.prism-duotone-dark .token.string,.prism-duotone-dark .token.unit,.prism-duotone-dark .token.url,.prism-duotone-dark .token.variable,.prism-duotone-dark code.language-css,.prism-duotone-dark code.language-scss{color:#fc9}.prism-duotone-dark .token.deleted{text-decoration:line-through}.prism-duotone-dark .token.inserted{border-bottom:1px dotted #eeebff;text-decoration:none}.prism-duotone-dark .token.italic{font-style:italic}.prism-duotone-dark .token.bold,.prism-duotone-dark .token.important{font-weight:700}.prism-duotone-dark .token.important{color:#c4b9fe}.prism-duotone-dark .token.entity{cursor:help}.prism-duotone-dark pre>code.highlight{outline:.4em solid #8a75f5;outline-offset:.4em}.prism-duotone-dark .line-numbers.line-numbers .line-numbers-rows{border-right-color:#2c2937}.prism-duotone-dark .line-numbers .line-numbers-rows>span:before{color:#3c3949}.prism-duotone-dark .line-highlight.line-highlight{background:rgba(224,145,66,.2);background:-webkit-linear-gradient(left,rgba(224,145,66,.2) 70%,rgba(224,145,66,0));background:linear-gradient(90deg,rgba(224,145,66,.2) 70%,rgba(224,145,66,0))}";
styleInject(css_248z$w);

var css_248z$v = ".prism-duotone-earth .line-number-wrapper{background:#322d29}.prism-duotone-earth code[class*=language-],.prism-duotone-earth pre[class*=language-]{background:#322d29;color:#88786d;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-earth code[class*=language-] ::-moz-selection,.prism-duotone-earth code[class*=language-]::-moz-selection,.prism-duotone-earth pre[class*=language-] ::-moz-selection,.prism-duotone-earth pre[class*=language-]::-moz-selection{background:#6f5849;text-shadow:none}.prism-duotone-earth code[class*=language-] ::selection,.prism-duotone-earth code[class*=language-]::selection,.prism-duotone-earth pre[class*=language-] ::selection,.prism-duotone-earth pre[class*=language-]::selection{background:#6f5849;text-shadow:none}.prism-duotone-earth .token.cdata,.prism-duotone-earth .token.comment,.prism-duotone-earth .token.doctype,.prism-duotone-earth .token.prolog,.prism-duotone-earth .token.punctuation{color:#6a5f58}.prism-duotone-earth .token.namespace{opacity:.7}.prism-duotone-earth .token.number,.prism-duotone-earth .token.operator,.prism-duotone-earth .token.tag{color:#bfa05a}.prism-duotone-earth .token.function,.prism-duotone-earth .token.property{color:#88786d}.prism-duotone-earth .token.atrule-id,.prism-duotone-earth .token.selector,.prism-duotone-earth .token.tag-id{color:#fff3eb}.prism-duotone-earth .token.attr-name,.prism-duotone-earth code.language-javascript{color:#a48774}.prism-duotone-earth .language-css .token.string,.prism-duotone-earth .language-scss .token.string,.prism-duotone-earth .style .token.string,.prism-duotone-earth .token.atrule,.prism-duotone-earth .token.attr-value,.prism-duotone-earth .token.boolean,.prism-duotone-earth .token.control,.prism-duotone-earth .token.directive,.prism-duotone-earth .token.entity,.prism-duotone-earth .token.keyword,.prism-duotone-earth .token.placeholder,.prism-duotone-earth .token.regex,.prism-duotone-earth .token.statement,.prism-duotone-earth .token.string,.prism-duotone-earth .token.unit,.prism-duotone-earth .token.url,.prism-duotone-earth .token.variable,.prism-duotone-earth code.language-css,.prism-duotone-earth code.language-scss{color:#fcc440}.prism-duotone-earth .token.deleted{text-decoration:line-through}.prism-duotone-earth .token.inserted{border-bottom:1px dotted #fff3eb;text-decoration:none}.prism-duotone-earth .token.italic{font-style:italic}.prism-duotone-earth .token.bold,.prism-duotone-earth .token.important{font-weight:700}.prism-duotone-earth .token.important{color:#a48774}.prism-duotone-earth .token.entity{cursor:help}.prism-duotone-earth pre>code.highlight{outline:.4em solid #816d5f;outline-offset:.4em}.prism-duotone-earth .line-numbers.line-numbers .line-numbers-rows{border-right-color:#35302b}.prism-duotone-earth .line-numbers .line-numbers-rows>span:before{color:#46403d}.prism-duotone-earth .line-highlight.line-highlight{background:rgba(191,160,90,.2);background:-webkit-linear-gradient(left,rgba(191,160,90,.2) 70%,rgba(191,160,90,0));background:linear-gradient(90deg,rgba(191,160,90,.2) 70%,rgba(191,160,90,0))}";
styleInject(css_248z$v);

var css_248z$u = ".prism-duotone-forest .line-number-wrapper{background:#2a2d2a}.prism-duotone-forest code[class*=language-],.prism-duotone-forest pre[class*=language-]{background:#2a2d2a;color:#687d68;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-forest code[class*=language-] ::-moz-selection,.prism-duotone-forest code[class*=language-]::-moz-selection,.prism-duotone-forest pre[class*=language-] ::-moz-selection,.prism-duotone-forest pre[class*=language-]::-moz-selection{background:#435643;text-shadow:none}.prism-duotone-forest code[class*=language-] ::selection,.prism-duotone-forest code[class*=language-]::selection,.prism-duotone-forest pre[class*=language-] ::selection,.prism-duotone-forest pre[class*=language-]::selection{background:#435643;text-shadow:none}.prism-duotone-forest .token.cdata,.prism-duotone-forest .token.comment,.prism-duotone-forest .token.doctype,.prism-duotone-forest .token.prolog,.prism-duotone-forest .token.punctuation{color:#535f53}.prism-duotone-forest .token.namespace{opacity:.7}.prism-duotone-forest .token.number,.prism-duotone-forest .token.operator,.prism-duotone-forest .token.tag{color:#a2b34d}.prism-duotone-forest .token.function,.prism-duotone-forest .token.property{color:#687d68}.prism-duotone-forest .token.atrule-id,.prism-duotone-forest .token.selector,.prism-duotone-forest .token.tag-id{color:#f0fff0}.prism-duotone-forest .token.attr-name,.prism-duotone-forest code.language-javascript{color:#b3d6b3}.prism-duotone-forest .language-css .token.string,.prism-duotone-forest .language-scss .token.string,.prism-duotone-forest .style .token.string,.prism-duotone-forest .token.atrule,.prism-duotone-forest .token.attr-value,.prism-duotone-forest .token.boolean,.prism-duotone-forest .token.control,.prism-duotone-forest .token.directive,.prism-duotone-forest .token.entity,.prism-duotone-forest .token.keyword,.prism-duotone-forest .token.placeholder,.prism-duotone-forest .token.regex,.prism-duotone-forest .token.statement,.prism-duotone-forest .token.string,.prism-duotone-forest .token.unit,.prism-duotone-forest .token.url,.prism-duotone-forest .token.variable,.prism-duotone-forest code.language-css,.prism-duotone-forest code.language-scss{color:#e5fb79}.prism-duotone-forest .token.deleted{text-decoration:line-through}.prism-duotone-forest .token.inserted{border-bottom:1px dotted #f0fff0;text-decoration:none}.prism-duotone-forest .token.italic{font-style:italic}.prism-duotone-forest .token.bold,.prism-duotone-forest .token.important{font-weight:700}.prism-duotone-forest .token.important{color:#b3d6b3}.prism-duotone-forest .token.entity{cursor:help}.prism-duotone-forest pre>code.highlight{outline:.4em solid #5c705c;outline-offset:.4em}.prism-duotone-forest .line-numbers.line-numbers .line-numbers-rows{border-right-color:#2c302c}.prism-duotone-forest .line-numbers .line-numbers-rows>span:before{color:#3b423b}.prism-duotone-forest .line-highlight.line-highlight{background:rgba(162,179,77,.2);background:-webkit-linear-gradient(left,rgba(162,179,77,.2) 70%,rgba(162,179,77,0));background:linear-gradient(90deg,rgba(162,179,77,.2) 70%,rgba(162,179,77,0))}";
styleInject(css_248z$u);

var css_248z$t = ".prism-duotone-light .line-number-wrapper{background:#faf8f5}.prism-duotone-light code[class*=language-],.prism-duotone-light pre[class*=language-]{background:#faf8f5;color:#728fcb;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-light code[class*=language-] ::-moz-selection,.prism-duotone-light code[class*=language-]::-moz-selection,.prism-duotone-light pre[class*=language-] ::-moz-selection,.prism-duotone-light pre[class*=language-]::-moz-selection{background:#faf8f5;text-shadow:none}.prism-duotone-light code[class*=language-] ::selection,.prism-duotone-light code[class*=language-]::selection,.prism-duotone-light pre[class*=language-] ::selection,.prism-duotone-light pre[class*=language-]::selection{background:#faf8f5;text-shadow:none}.prism-duotone-light .token.cdata,.prism-duotone-light .token.comment,.prism-duotone-light .token.doctype,.prism-duotone-light .token.prolog,.prism-duotone-light .token.punctuation{color:#b6ad9a}.prism-duotone-light .token.namespace{opacity:.7}.prism-duotone-light .token.number,.prism-duotone-light .token.operator,.prism-duotone-light .token.tag{color:#063289}.prism-duotone-light .token.function,.prism-duotone-light .token.property{color:#b29762}.prism-duotone-light .token.atrule-id,.prism-duotone-light .token.selector,.prism-duotone-light .token.tag-id{color:#2d2006}.prism-duotone-light .token.attr-name,.prism-duotone-light code.language-javascript{color:#896724}.prism-duotone-light .language-css .token.string,.prism-duotone-light .language-scss .token.string,.prism-duotone-light .style .token.string,.prism-duotone-light .token.atrule,.prism-duotone-light .token.attr-value,.prism-duotone-light .token.boolean,.prism-duotone-light .token.control,.prism-duotone-light .token.directive,.prism-duotone-light .token.entity,.prism-duotone-light .token.keyword,.prism-duotone-light .token.regex,.prism-duotone-light .token.statement,.prism-duotone-light .token.string,.prism-duotone-light .token.unit,.prism-duotone-light .token.url,.prism-duotone-light code.language-css,.prism-duotone-light code.language-scss{color:#728fcb}.prism-duotone-light .token.placeholder,.prism-duotone-light .token.variable{color:#93abdc}.prism-duotone-light .token.deleted{text-decoration:line-through}.prism-duotone-light .token.inserted{border-bottom:1px dotted #2d2006;text-decoration:none}.prism-duotone-light .token.italic{font-style:italic}.prism-duotone-light .token.bold,.prism-duotone-light .token.important{font-weight:700}.prism-duotone-light .token.important{color:#896724}.prism-duotone-light .token.entity{cursor:help}.prism-duotone-light pre>code.highlight{outline:.4em solid #896724;outline-offset:.4em}.prism-duotone-light .line-numbers.line-numbers .line-numbers-rows{border-right-color:#ece8de}.prism-duotone-light .line-numbers .line-numbers-rows>span:before{color:#cdc4b1}.prism-duotone-light .line-highlight.line-highlight{background:rgba(45,32,6,.2);background:-webkit-linear-gradient(left,rgba(45,32,6,.2) 70%,rgba(45,32,6,0));background:linear-gradient(90deg,rgba(45,32,6,.2) 70%,rgba(45,32,6,0))}";
styleInject(css_248z$t);

var css_248z$s = ".prism-duotone-sea .line-number-wrapper{background:#1d262f}.prism-duotone-sea code[class*=language-],.prism-duotone-sea pre[class*=language-]{background:#1d262f;color:#57718e;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-sea code[class*=language-] ::-moz-selection,.prism-duotone-sea code[class*=language-]::-moz-selection,.prism-duotone-sea pre[class*=language-] ::-moz-selection,.prism-duotone-sea pre[class*=language-]::-moz-selection{background:#004a9e;text-shadow:none}.prism-duotone-sea code[class*=language-] ::selection,.prism-duotone-sea code[class*=language-]::selection,.prism-duotone-sea pre[class*=language-] ::selection,.prism-duotone-sea pre[class*=language-]::selection{background:#004a9e;text-shadow:none}.prism-duotone-sea .token.cdata,.prism-duotone-sea .token.comment,.prism-duotone-sea .token.doctype,.prism-duotone-sea .token.prolog,.prism-duotone-sea .token.punctuation{color:#4a5f78}.prism-duotone-sea .token.namespace{opacity:.7}.prism-duotone-sea .token.number,.prism-duotone-sea .token.operator,.prism-duotone-sea .token.tag{color:#0aa370}.prism-duotone-sea .token.function,.prism-duotone-sea .token.property{color:#57718e}.prism-duotone-sea .token.atrule-id,.prism-duotone-sea .token.selector,.prism-duotone-sea .token.tag-id{color:#ebf4ff}.prism-duotone-sea .token.attr-name,.prism-duotone-sea code.language-javascript{color:#7eb6f6}.prism-duotone-sea .language-css .token.string,.prism-duotone-sea .language-scss .token.string,.prism-duotone-sea .style .token.string,.prism-duotone-sea .token.atrule,.prism-duotone-sea .token.attr-value,.prism-duotone-sea .token.boolean,.prism-duotone-sea .token.control,.prism-duotone-sea .token.directive,.prism-duotone-sea .token.entity,.prism-duotone-sea .token.keyword,.prism-duotone-sea .token.placeholder,.prism-duotone-sea .token.regex,.prism-duotone-sea .token.statement,.prism-duotone-sea .token.string,.prism-duotone-sea .token.unit,.prism-duotone-sea .token.url,.prism-duotone-sea .token.variable,.prism-duotone-sea code.language-css,.prism-duotone-sea code.language-scss{color:#47ebb4}.prism-duotone-sea .token.deleted{text-decoration:line-through}.prism-duotone-sea .token.inserted{border-bottom:1px dotted #ebf4ff;text-decoration:none}.prism-duotone-sea .token.italic{font-style:italic}.prism-duotone-sea .token.bold,.prism-duotone-sea .token.important{font-weight:700}.prism-duotone-sea .token.important{color:#7eb6f6}.prism-duotone-sea .token.entity{cursor:help}.prism-duotone-sea pre>code.highlight{outline:.4em solid #34659d;outline-offset:.4em}.prism-duotone-sea .line-numbers.line-numbers .line-numbers-rows{border-right-color:#1f2932}.prism-duotone-sea .line-numbers .line-numbers-rows>span:before{color:#2c3847}.prism-duotone-sea .line-highlight.line-highlight{background:rgba(10,163,112,.2);background:-webkit-linear-gradient(left,rgba(10,163,112,.2) 70%,rgba(10,163,112,0));background:linear-gradient(90deg,rgba(10,163,112,.2) 70%,rgba(10,163,112,0))}";
styleInject(css_248z$s);

var css_248z$r = ".prism-duotone-space .line-number-wrapper{background:#24242e}.prism-duotone-space code[class*=language-],.prism-duotone-space pre[class*=language-]{background:#24242e;color:#767693;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-duotone-space code[class*=language-] ::-moz-selection,.prism-duotone-space code[class*=language-]::-moz-selection,.prism-duotone-space pre[class*=language-] ::-moz-selection,.prism-duotone-space pre[class*=language-]::-moz-selection{background:#5151e6;text-shadow:none}.prism-duotone-space code[class*=language-] ::selection,.prism-duotone-space code[class*=language-]::selection,.prism-duotone-space pre[class*=language-] ::selection,.prism-duotone-space pre[class*=language-]::selection{background:#5151e6;text-shadow:none}.prism-duotone-space .token.cdata,.prism-duotone-space .token.comment,.prism-duotone-space .token.doctype,.prism-duotone-space .token.prolog,.prism-duotone-space .token.punctuation{color:#5b5b76}.prism-duotone-space .token.namespace{opacity:.7}.prism-duotone-space .token.number,.prism-duotone-space .token.operator,.prism-duotone-space .token.tag{color:#dd672c}.prism-duotone-space .token.function,.prism-duotone-space .token.property{color:#767693}.prism-duotone-space .token.atrule-id,.prism-duotone-space .token.selector,.prism-duotone-space .token.tag-id{color:#ebebff}.prism-duotone-space .token.attr-name,.prism-duotone-space code.language-javascript{color:#aaaaca}.prism-duotone-space .language-css .token.string,.prism-duotone-space .language-scss .token.string,.prism-duotone-space .style .token.string,.prism-duotone-space .token.atrule,.prism-duotone-space .token.attr-value,.prism-duotone-space .token.boolean,.prism-duotone-space .token.control,.prism-duotone-space .token.directive,.prism-duotone-space .token.entity,.prism-duotone-space .token.keyword,.prism-duotone-space .token.placeholder,.prism-duotone-space .token.regex,.prism-duotone-space .token.statement,.prism-duotone-space .token.string,.prism-duotone-space .token.unit,.prism-duotone-space .token.url,.prism-duotone-space .token.variable,.prism-duotone-space code.language-css,.prism-duotone-space code.language-scss{color:#fe8c52}.prism-duotone-space .token.deleted{text-decoration:line-through}.prism-duotone-space .token.inserted{border-bottom:1px dotted #ebebff;text-decoration:none}.prism-duotone-space .token.italic{font-style:italic}.prism-duotone-space .token.bold,.prism-duotone-space .token.important{font-weight:700}.prism-duotone-space .token.important{color:#aaaaca}.prism-duotone-space .token.entity{cursor:help}.prism-duotone-space pre>code.highlight{outline:.4em solid #7676f4;outline-offset:.4em}.prism-duotone-space .line-numbers.line-numbers .line-numbers-rows{border-right-color:#262631}.prism-duotone-space .line-numbers .line-numbers-rows>span:before{color:#393949}.prism-duotone-space .line-highlight.line-highlight{background:rgba(221,103,44,.2);background:-webkit-linear-gradient(left,rgba(221,103,44,.2) 70%,rgba(221,103,44,0));background:linear-gradient(90deg,rgba(221,103,44,.2) 70%,rgba(221,103,44,0))}";
styleInject(css_248z$r);

var css_248z$q = ".prism-ghcolors code[class*=language-],.prism-ghcolors pre[class*=language-]{color:#393a34;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-ghcolors code[class*=language-] ::-moz-selection,.prism-ghcolors code[class*=language-]::-moz-selection,.prism-ghcolors pre[class*=language-] ::-moz-selection,.prism-ghcolors pre[class*=language-]::-moz-selection{background:#b3d4fc}.prism-ghcolors code[class*=language-] ::selection,.prism-ghcolors code[class*=language-]::selection,.prism-ghcolors pre[class*=language-] ::selection,.prism-ghcolors pre[class*=language-]::selection{background:#b3d4fc}.prism-ghcolors pre[class*=language-]{background-color:#fff;border:1px solid #ddd}.prism-ghcolors .token.cdata,.prism-ghcolors .token.comment,.prism-ghcolors .token.doctype,.prism-ghcolors .token.prolog{color:#998;font-style:italic}.prism-ghcolors .token.namespace{opacity:.7}.prism-ghcolors .token.attr-value,.prism-ghcolors .token.string{color:#e3116c}.prism-ghcolors .token.operator,.prism-ghcolors .token.punctuation{color:#393a34}.prism-ghcolors .token.boolean,.prism-ghcolors .token.constant,.prism-ghcolors .token.entity,.prism-ghcolors .token.inserted,.prism-ghcolors .token.number,.prism-ghcolors .token.property,.prism-ghcolors .token.regex,.prism-ghcolors .token.symbol,.prism-ghcolors .token.url,.prism-ghcolors .token.variable{color:#36acaa}.prism-ghcolors .language-autohotkey .token.selector,.prism-ghcolors .token.atrule,.prism-ghcolors .token.attr-name,.prism-ghcolors .token.keyword{color:#00a4db}.prism-ghcolors .language-autohotkey .token.tag,.prism-ghcolors .token.deleted,.prism-ghcolors .token.function{color:#9a050f}.prism-ghcolors .language-autohotkey .token.keyword,.prism-ghcolors .token.selector,.prism-ghcolors .token.tag{color:#00009f}.prism-ghcolors .token.bold,.prism-ghcolors .token.function,.prism-ghcolors .token.important{font-weight:700}.prism-ghcolors .token.italic{font-style:italic}";
styleInject(css_248z$q);

var css_248z$p = ".prism-gruvbox-dark code[class*=language-],.prism-gruvbox-dark pre[class*=language-]{color:#ebdbb2;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-gruvbox-dark code[class*=language-] ::-moz-selection,.prism-gruvbox-dark code[class*=language-]::-moz-selection,.prism-gruvbox-dark pre[class*=language-] ::-moz-selection,.prism-gruvbox-dark pre[class*=language-]::-moz-selection{background:#7c6f64;color:#fbf1c7}.prism-gruvbox-dark code[class*=language-] ::selection,.prism-gruvbox-dark code[class*=language-]::selection,.prism-gruvbox-dark pre[class*=language-] ::selection,.prism-gruvbox-dark pre[class*=language-]::selection{background:#7c6f64;color:#fbf1c7}.prism-gruvbox-dark :not(pre)>code[class*=language-],.prism-gruvbox-dark pre[class*=language-]{background:#1d2021}.prism-gruvbox-dark .token.cdata,.prism-gruvbox-dark .token.comment,.prism-gruvbox-dark .token.prolog{color:#a89984}.prism-gruvbox-dark .token.atrule,.prism-gruvbox-dark .token.boolean,.prism-gruvbox-dark .token.delimiter,.prism-gruvbox-dark .token.important,.prism-gruvbox-dark .token.keyword,.prism-gruvbox-dark .token.selector{color:#fb4934}.prism-gruvbox-dark .token.attr-name,.prism-gruvbox-dark .token.operator,.prism-gruvbox-dark .token.punctuation{color:#a89984}.prism-gruvbox-dark .token.builtin,.prism-gruvbox-dark .token.doctype,.prism-gruvbox-dark .token.tag,.prism-gruvbox-dark .token.tag .punctuation{color:#fabd2f}.prism-gruvbox-dark .token.entity,.prism-gruvbox-dark .token.number,.prism-gruvbox-dark .token.symbol{color:#d3869b}.prism-gruvbox-dark .token.constant,.prism-gruvbox-dark .token.property,.prism-gruvbox-dark .token.variable{color:#fb4934}.prism-gruvbox-dark .token.char,.prism-gruvbox-dark .token.string{color:#b8bb26}.prism-gruvbox-dark .token.attr-value,.prism-gruvbox-dark .token.attr-value .punctuation{color:#a89984}.prism-gruvbox-dark .token.url{color:#b8bb26;text-decoration:underline}.prism-gruvbox-dark .token.function{color:#fabd2f}.prism-gruvbox-dark .token.regex{background:#b8bb26}.prism-gruvbox-dark .token.bold{font-weight:700}.prism-gruvbox-dark .token.italic{font-style:italic}.prism-gruvbox-dark .token.inserted{background:#a89984}.prism-gruvbox-dark .token.deleted{background:#fb4934}";
styleInject(css_248z$p);

var css_248z$o = ".prism-gruvbox-light code[class*=language-],.prism-gruvbox-light pre[class*=language-]{color:#3c3836;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-gruvbox-light code[class*=language-] ::-moz-selection,.prism-gruvbox-light code[class*=language-]::-moz-selection,.prism-gruvbox-light pre[class*=language-] ::-moz-selection,.prism-gruvbox-light pre[class*=language-]::-moz-selection{background:#a89984;color:#282828}.prism-gruvbox-light code[class*=language-] ::selection,.prism-gruvbox-light code[class*=language-]::selection,.prism-gruvbox-light pre[class*=language-] ::selection,.prism-gruvbox-light pre[class*=language-]::selection{background:#a89984;color:#282828}.prism-gruvbox-light :not(pre)>code[class*=language-],.prism-gruvbox-light pre[class*=language-]{background:#f9f5d7}.prism-gruvbox-light .token.cdata,.prism-gruvbox-light .token.comment,.prism-gruvbox-light .token.prolog{color:#7c6f64}.prism-gruvbox-light .token.atrule,.prism-gruvbox-light .token.boolean,.prism-gruvbox-light .token.delimiter,.prism-gruvbox-light .token.important,.prism-gruvbox-light .token.keyword,.prism-gruvbox-light .token.selector{color:#9d0006}.prism-gruvbox-light .token.attr-name,.prism-gruvbox-light .token.operator,.prism-gruvbox-light .token.punctuation{color:#7c6f64}.prism-gruvbox-light .token.builtin,.prism-gruvbox-light .token.doctype,.prism-gruvbox-light .token.tag,.prism-gruvbox-light .token.tag .punctuation{color:#b57614}.prism-gruvbox-light .token.entity,.prism-gruvbox-light .token.number,.prism-gruvbox-light .token.symbol{color:#8f3f71}.prism-gruvbox-light .token.constant,.prism-gruvbox-light .token.property,.prism-gruvbox-light .token.variable{color:#9d0006}.prism-gruvbox-light .token.char,.prism-gruvbox-light .token.string{color:#797403}.prism-gruvbox-light .token.attr-value,.prism-gruvbox-light .token.attr-value .punctuation{color:#7c6f64}.prism-gruvbox-light .token.url{color:#797403;text-decoration:underline}.prism-gruvbox-light .token.function{color:#b57614}.prism-gruvbox-light .token.regex{background:#797403}.prism-gruvbox-light .token.bold{font-weight:700}.prism-gruvbox-light .token.italic{font-style:italic}.prism-gruvbox-light .token.inserted{background:#7c6f64}.prism-gruvbox-light .token.deleted{background:#9d0006}";
styleInject(css_248z$o);

var css_248z$n = ".prism-holi-theme .line-number-wrapper{background:#030314}.prism-holi-theme code[class*=language-],.prism-holi-theme pre[class*=language-]{word-wrap:normal;background:#030314;color:#d6e7ff;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;letter-spacing:.2px;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:none;white-space:pre;word-break:normal;word-spacing:normal}.prism-holi-theme code[class*=language-] ::-moz-selection,.prism-holi-theme code[class*=language-] ::selection,.prism-holi-theme code[class*=language-]::-moz-selection,.prism-holi-theme code[class*=language-]::selection,.prism-holi-theme pre[class*=language-] ::-moz-selection,.prism-holi-theme pre[class*=language-] ::selection,.prism-holi-theme pre[class*=language-]::-moz-selection,.prism-holi-theme pre[class*=language-]::selection{background:#1d3b54;color:inherit;text-shadow:none}.prism-holi-theme :not(pre)>code[class*=language-]{background:#2a4555;box-decoration-break:clone;color:#f0f6f6}.prism-holi-theme .token.cdata,.prism-holi-theme .token.comment,.prism-holi-theme .token.doctype,.prism-holi-theme .token.prolog{color:#446e69}.prism-holi-theme .token.punctuation{color:#d6b007}.prism-holi-theme .token.boolean,.prism-holi-theme .token.constant,.prism-holi-theme .token.deleted,.prism-holi-theme .token.number,.prism-holi-theme .token.property,.prism-holi-theme .token.symbol,.prism-holi-theme .token.tag{color:#d6e7ff}.prism-holi-theme .token.attr-name,.prism-holi-theme .token.builtin,.prism-holi-theme .token.inserted,.prism-holi-theme .token.selector{color:#e60067}.prism-holi-theme .token.char,.prism-holi-theme .token.string{color:#49c6ec}.prism-holi-theme .language-css .token.string,.prism-holi-theme .style .token.string,.prism-holi-theme .token.entity,.prism-holi-theme .token.operator,.prism-holi-theme .token.url{background:transparent;color:#ec8e01}.prism-holi-theme .token.atrule,.prism-holi-theme .token.attr-value,.prism-holi-theme .token.keyword{color:#0fe468}.prism-holi-theme .token.class-name,.prism-holi-theme .token.function{color:#78f3e9}.prism-holi-theme .token.important,.prism-holi-theme .token.regex,.prism-holi-theme .token.variable{color:#d6e7ff}";
styleInject(css_248z$n);

var css_248z$m = "@import url(https://fonts.googleapis.com/css?family=Fira+Mono);.prism-hopscotch .line-number-wrapper{background:#322931}.prism-hopscotch code[class*=language-],.prism-hopscotch pre[class*=language-]{word-wrap:break-word;background:#322931;color:#b9b5b8;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;white-space:pre-wrap;word-break:break-all;word-spacing:normal}.prism-hopscotch .token.cdata,.prism-hopscotch .token.comment,.prism-hopscotch .token.doctype,.prism-hopscotch .token.prolog{color:#797379}.prism-hopscotch .token.punctuation{color:#b9b5b8}.prism-hopscotch .namespace{opacity:.7}.prism-hopscotch .token.boolean,.prism-hopscotch .token.null,.prism-hopscotch .token.number,.prism-hopscotch .token.operator{color:#fd8b19}.prism-hopscotch .token.property{color:#fdcc59}.prism-hopscotch .token.tag{color:#1290bf}.prism-hopscotch .token.string{color:#149b93}.prism-hopscotch .token.selector{color:#c85e7c}.prism-hopscotch .token.attr-name{color:#fd8b19}.prism-hopscotch .language-css .token.string,.prism-hopscotch .style .token.string,.prism-hopscotch .token.entity,.prism-hopscotch .token.url{color:#149b93}.prism-hopscotch .token.attr-value,.prism-hopscotch .token.control,.prism-hopscotch .token.directive,.prism-hopscotch .token.keyword,.prism-hopscotch .token.unit{color:#8fc13e}.prism-hopscotch .token.atrule,.prism-hopscotch .token.regex,.prism-hopscotch .token.statement{color:#149b93}.prism-hopscotch .token.placeholder,.prism-hopscotch .token.variable{color:#1290bf}.prism-hopscotch .token.important{color:#dd464c;font-weight:700}.prism-hopscotch .token.entity{cursor:help}.prism-hopscotch pre>code.highlight{outline:.4em solid red;outline-offset:.4em}";
styleInject(css_248z$m);

var css_248z$l = ".prism-laserwave .line-number-wrapper{background:#27212e}.prism-laserwave code[class*=language-],.prism-laserwave pre[class*=language-]{background:#27212e;color:#fff;direction:ltr;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:2;-o-tab-size:2;tab-size:2;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-laserwave code[class*=language-] ::-moz-selection,.prism-laserwave code[class*=language-]::-moz-selection,.prism-laserwave pre[class*=language-] ::-moz-selection,.prism-laserwave pre[class*=language-]::-moz-selection{background:rgba(235,100,185,.153);color:inherit}.prism-laserwave code[class*=language-] ::selection,.prism-laserwave code[class*=language-]::selection,.prism-laserwave pre[class*=language-] ::selection,.prism-laserwave pre[class*=language-]::selection{background:rgba(235,100,185,.153);color:inherit}.prism-laserwave .token.cdata,.prism-laserwave .token.comment,.prism-laserwave .token.prolog{color:#91889b}.prism-laserwave .token.punctuation{color:#7b6995}.prism-laserwave .token.boolean,.prism-laserwave .token.builtin,.prism-laserwave .token.constant{color:#ffe261}.prism-laserwave .token.number{color:#b381c5}.prism-laserwave .token.atrule,.prism-laserwave .token.important,.prism-laserwave .token.keyword,.prism-laserwave .token.property{color:#40b4c4}.prism-laserwave .token.class-name,.prism-laserwave .token.doctype,.prism-laserwave .token.inserted,.prism-laserwave .token.operator,.prism-laserwave .token.symbol,.prism-laserwave .token.tag{color:#74dfc4}.prism-laserwave .token.attr-name,.prism-laserwave .token.deleted,.prism-laserwave .token.function,.prism-laserwave .token.selector{color:#eb64b9}.prism-laserwave .token.attr-value,.prism-laserwave .token.char,.prism-laserwave .token.regex,.prism-laserwave .token.string{color:#b4dce7}.prism-laserwave .token.entity,.prism-laserwave .token.url,.prism-laserwave .token.variable{color:#fff}.prism-laserwave .token.bold{font-weight:700}.prism-laserwave .token.italic{font-style:italic}.prism-laserwave .token.entity{cursor:help}.prism-laserwave .token.namespace{opacity:.7}";
styleInject(css_248z$l);

var css_248z$k = ".prism-lucario code[class*=language-],.prism-lucario pre[class*=language-]{word-wrap:normal;background:none;color:#f8f8f2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}.prism-lucario :not(pre)>code[class*=language-],.prism-lucario pre[class*=language-]{background:#263e52}.prism-lucario .token.cdata,.prism-lucario .token.comment,.prism-lucario .token.doctype,.prism-lucario .token.prolog{color:#5c98cd}.prism-lucario .token.punctuation{color:#f8f8f2}.prism-lucario .namespace{opacity:.7}.prism-lucario .token.constant,.prism-lucario .token.deleted,.prism-lucario .token.property,.prism-lucario .token.symbol,.prism-lucario .token.tag{color:#f05e5d}.prism-lucario .token.boolean,.prism-lucario .token.number{color:#bc94f9}.prism-lucario .token.attr-name,.prism-lucario .token.builtin,.prism-lucario .token.char,.prism-lucario .token.inserted,.prism-lucario .token.selector,.prism-lucario .token.string{color:#fcfcd6}.prism-lucario .language-css .token.string,.prism-lucario .style .token.string,.prism-lucario .token.entity,.prism-lucario .token.operator,.prism-lucario .token.url,.prism-lucario .token.variable{color:#f8f8f2}.prism-lucario .token.atrule,.prism-lucario .token.attr-value,.prism-lucario .token.class-name,.prism-lucario .token.function{color:#66d8ef}.prism-lucario .token.keyword{color:#6eb26e}.prism-lucario .token.important,.prism-lucario .token.regex{color:#f05e5d}.prism-lucario .token.bold,.prism-lucario .token.important{font-weight:700}.prism-lucario .token.italic{font-style:italic}.prism-lucario .token.entity{cursor:help}";
styleInject(css_248z$k);

var css_248z$j = ".prism-material-dark .line-number-wrapper{background:#2f2f2f}.prism-material-dark code[class*=language-],.prism-material-dark pre[class*=language-]{word-wrap:normal;background:#2f2f2f;color:#eee;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5em;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-material-dark [class*=language-] .namespace{opacity:.7}.prism-material-dark code[class*=language-] ::-moz-selection,.prism-material-dark code[class*=language-]::-moz-selection,.prism-material-dark pre[class*=language-] ::-moz-selection,.prism-material-dark pre[class*=language-]::-moz-selection{background:#363636}.prism-material-dark code[class*=language-] ::selection,.prism-material-dark code[class*=language-]::selection,.prism-material-dark pre[class*=language-] ::selection,.prism-material-dark pre[class*=language-]::selection{background:#363636}.prism-material-dark .language-css>code,.prism-material-dark .language-sass>code,.prism-material-dark .language-scss>code{color:#fd9170}.prism-material-dark .token.atrule{color:#c792ea}.prism-material-dark .token.attr-name{color:#ffcb6b}.prism-material-dark .token.attr-value,.prism-material-dark .token.attribute{color:#a5e844}.prism-material-dark .token.boolean{color:#c792ea}.prism-material-dark .token.builtin{color:#ffcb6b}.prism-material-dark .token.cdata,.prism-material-dark .token.char{color:#80cbc4}.prism-material-dark .token.class{color:#ffcb6b}.prism-material-dark .token.class-name{color:#f2ff00}.prism-material-dark .token.comment{color:#616161}.prism-material-dark .token.constant{color:#c792ea}.prism-material-dark .token.deleted{color:#f66}.prism-material-dark .token.doctype{color:#616161}.prism-material-dark .token.entity{color:#f66}.prism-material-dark .token.function{color:#c792ea}.prism-material-dark .token.hexcode{color:#f2ff00}.prism-material-dark .token.id,.prism-material-dark .token.important{color:#c792ea;font-weight:700}.prism-material-dark .token.inserted{color:#80cbc4}.prism-material-dark .token.keyword{color:#c792ea}.prism-material-dark .token.number{color:#fd9170}.prism-material-dark .token.operator{color:#89ddff}.prism-material-dark .token.prolog{color:#616161}.prism-material-dark .token.property{color:#80cbc4}.prism-material-dark .token.pseudo-class,.prism-material-dark .token.pseudo-element{color:#a5e844}.prism-material-dark .token.punctuation{color:#89ddff}.prism-material-dark .token.regex{color:#f2ff00}.prism-material-dark .token.selector{color:#f66}.prism-material-dark .token.string{color:#a5e844}.prism-material-dark .token.symbol{color:#c792ea}.prism-material-dark .token.tag{color:#f66}.prism-material-dark .token.unit{color:#fd9170}.prism-material-dark .token.url,.prism-material-dark .token.variable{color:#f66}";
styleInject(css_248z$j);

var css_248z$i = ".prism-material-light .line-number-wrapper{background:#fafafa}.prism-material-light code[class*=language-],.prism-material-light pre[class*=language-]{word-wrap:normal;background:#fafafa;color:#90a4ae;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5em;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-material-light code[class*=language-] ::-moz-selection,.prism-material-light code[class*=language-]::-moz-selection,.prism-material-light pre[class*=language-] ::-moz-selection,.prism-material-light pre[class*=language-]::-moz-selection{background:#cceae7;color:#263238}.prism-material-light code[class*=language-] ::selection,.prism-material-light code[class*=language-]::selection,.prism-material-light pre[class*=language-] ::selection,.prism-material-light pre[class*=language-]::selection{background:#cceae7;color:#263238}.prism-material-light .language-css>code,.prism-material-light .language-sass>code,.prism-material-light .language-scss>code{color:#f76d47}.prism-material-light [class*=language-] .namespace{opacity:.7}.prism-material-light .token.atrule{color:#7c4dff}.prism-material-light .token.attr-name{color:#39adb5}.prism-material-light .token.attr-value,.prism-material-light .token.attribute{color:#f6a434}.prism-material-light .token.boolean{color:#7c4dff}.prism-material-light .token.builtin,.prism-material-light .token.cdata,.prism-material-light .token.char,.prism-material-light .token.class{color:#39adb5}.prism-material-light .token.class-name{color:#6182b8}.prism-material-light .token.comment{color:#aabfc9}.prism-material-light .token.constant{color:#7c4dff}.prism-material-light .token.deleted{color:#e53935}.prism-material-light .token.doctype{color:#aabfc9}.prism-material-light .token.entity{color:#e53935}.prism-material-light .token.function{color:#7c4dff}.prism-material-light .token.hexcode{color:#f76d47}.prism-material-light .token.id,.prism-material-light .token.important{color:#7c4dff;font-weight:700}.prism-material-light .token.inserted{color:#39adb5}.prism-material-light .token.keyword{color:#7c4dff}.prism-material-light .token.number{color:#f76d47}.prism-material-light .token.operator{color:#39adb5}.prism-material-light .token.prolog{color:#aabfc9}.prism-material-light .token.property{color:#39adb5}.prism-material-light .token.pseudo-class,.prism-material-light .token.pseudo-element{color:#f6a434}.prism-material-light .token.punctuation{color:#39adb5}.prism-material-light .token.regex{color:#6182b8}.prism-material-light .token.selector{color:#e53935}.prism-material-light .token.string{color:#f6a434}.prism-material-light .token.symbol{color:#7c4dff}.prism-material-light .token.tag{color:#e53935}.prism-material-light .token.unit{color:#f76d47}.prism-material-light .token.url,.prism-material-light .token.variable{color:#e53935}";
styleInject(css_248z$i);

var css_248z$h = ".prism-material-oceanic .line-number-wrapper{background:#263238}.prism-material-oceanic code[class*=language-],.prism-material-oceanic pre[class*=language-]{word-wrap:normal;background:#263238;color:#c3cee3;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5em;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-material-oceanic code[class*=language-] ::-moz-selection,.prism-material-oceanic code[class*=language-]::-moz-selection,.prism-material-oceanic pre[class*=language-] ::-moz-selection,.prism-material-oceanic pre[class*=language-]::-moz-selection{background:#363636}.prism-material-oceanic code[class*=language-] ::selection,.prism-material-oceanic code[class*=language-]::selection,.prism-material-oceanic pre[class*=language-] ::selection,.prism-material-oceanic pre[class*=language-]::selection{background:#363636}.prism-material-oceanic .language-css>code,.prism-material-oceanic .language-sass>code,.prism-material-oceanic .language-scss>code{color:#fd9170}.prism-material-oceanic [class*=language-] .namespace{opacity:.7}.prism-material-oceanic .token.atrule{color:#c792ea}.prism-material-oceanic .token.attr-name{color:#ffcb6b}.prism-material-oceanic .token.attr-value,.prism-material-oceanic .token.attribute{color:#c3e88d}.prism-material-oceanic .token.boolean{color:#c792ea}.prism-material-oceanic .token.builtin{color:#ffcb6b}.prism-material-oceanic .token.cdata,.prism-material-oceanic .token.char{color:#80cbc4}.prism-material-oceanic .token.class{color:#ffcb6b}.prism-material-oceanic .token.class-name,.prism-material-oceanic .token.color{color:#f2ff00}.prism-material-oceanic .token.comment{color:#546e7a}.prism-material-oceanic .token.constant{color:#c792ea}.prism-material-oceanic .token.deleted{color:#f07178}.prism-material-oceanic .token.doctype{color:#546e7a}.prism-material-oceanic .token.entity{color:#f07178}.prism-material-oceanic .token.function{color:#c792ea}.prism-material-oceanic .token.hexcode{color:#f2ff00}.prism-material-oceanic .token.id,.prism-material-oceanic .token.important{color:#c792ea;font-weight:700}.prism-material-oceanic .token.inserted{color:#80cbc4}.prism-material-oceanic .token.keyword{color:#c792ea;font-style:italic}.prism-material-oceanic .token.number{color:#fd9170}.prism-material-oceanic .token.operator{color:#89ddff}.prism-material-oceanic .token.prolog{color:#546e7a}.prism-material-oceanic .token.property{color:#80cbc4}.prism-material-oceanic .token.pseudo-class,.prism-material-oceanic .token.pseudo-element{color:#c3e88d}.prism-material-oceanic .token.punctuation{color:#89ddff}.prism-material-oceanic .token.regex{color:#f2ff00}.prism-material-oceanic .token.selector{color:#f07178}.prism-material-oceanic .token.string{color:#c3e88d}.prism-material-oceanic .token.symbol{color:#c792ea}.prism-material-oceanic .token.tag,.prism-material-oceanic .token.unit{color:#f07178}.prism-material-oceanic .token.url{color:#fd9170}.prism-material-oceanic .token.variable{color:#f07178}";
styleInject(css_248z$h);

var css_248z$g = ".prism-night-owl code[class*=language-],.prism-night-owl pre[class*=language-]{word-wrap:normal;color:#d6deeb;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-night-owl code[class*=language-] ::-moz-selection,.prism-night-owl code[class*=language-]::-moz-selection,.prism-night-owl pre[class*=language-] ::-moz-selection,.prism-night-owl pre[class*=language-]::-moz-selection{background:rgba(29,59,83,.99);text-shadow:none}.prism-night-owl code[class*=language-] ::selection,.prism-night-owl code[class*=language-]::selection,.prism-night-owl pre[class*=language-] ::selection,.prism-night-owl pre[class*=language-]::selection{background:rgba(29,59,83,.99);text-shadow:none}@media print{.prism-night-owl code[class*=language-],.prism-night-owl pre[class*=language-]{text-shadow:none}}.prism-night-owl :not(pre)>code[class*=language-],.prism-night-owl pre[class*=language-]{background:#011627;color:#fff}.prism-night-owl .token.cdata,.prism-night-owl .token.comment,.prism-night-owl .token.prolog{color:#637777;font-style:italic}.prism-night-owl .token.punctuation{color:#c792ea}.prism-night-owl .namespace{color:#b2ccd6}.prism-night-owl .token.deleted{color:rgba(239,83,80,.56);font-style:italic}.prism-night-owl .token.property,.prism-night-owl .token.symbol{color:#80cbc4}.prism-night-owl .token.keyword,.prism-night-owl .token.operator,.prism-night-owl .token.tag{color:#7fdbca}.prism-night-owl .token.boolean{color:#ff5874}.prism-night-owl .token.number{color:#f78c6c}.prism-night-owl .token.builtin,.prism-night-owl .token.char,.prism-night-owl .token.constant,.prism-night-owl .token.function{color:#82aaff}.prism-night-owl .token.doctype,.prism-night-owl .token.selector{color:#c792ea;font-style:italic}.prism-night-owl .token.attr-name,.prism-night-owl .token.inserted{color:#addb67;font-style:italic}.prism-night-owl .language-css .token.string,.prism-night-owl .style .token.string,.prism-night-owl .token.entity,.prism-night-owl .token.string,.prism-night-owl .token.url{color:#addb67}.prism-night-owl .token.atrule,.prism-night-owl .token.attr-value,.prism-night-owl .token.class-name{color:#ffcb8b}.prism-night-owl .token.important,.prism-night-owl .token.regex,.prism-night-owl .token.variable{color:#d6deeb}.prism-night-owl .token.bold,.prism-night-owl .token.important{font-weight:700}.prism-night-owl .token.italic{font-style:italic}";
styleInject(css_248z$g);

var css_248z$f = ".prism-nord code[class*=language-],.prism-nord pre[class*=language-]{word-wrap:normal;background:none;color:#f8f8f2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-nord :not(pre)>code[class*=language-],.prism-nord pre[class*=language-]{background:#2e3440}.prism-nord .token.cdata,.prism-nord .token.comment,.prism-nord .token.doctype,.prism-nord .token.prolog{color:#636f88}.prism-nord .token.punctuation{color:#81a1c1}.prism-nord .namespace{opacity:.7}.prism-nord .token.constant,.prism-nord .token.deleted,.prism-nord .token.property,.prism-nord .token.symbol,.prism-nord .token.tag{color:#81a1c1}.prism-nord .token.number{color:#b48ead}.prism-nord .token.boolean{color:#81a1c1}.prism-nord .token.attr-name,.prism-nord .token.builtin,.prism-nord .token.char,.prism-nord .token.inserted,.prism-nord .token.selector,.prism-nord .token.string{color:#a3be8c}.prism-nord .language-css .token.string,.prism-nord .style .token.string,.prism-nord .token.entity,.prism-nord .token.operator,.prism-nord .token.url,.prism-nord .token.variable{color:#81a1c1}.prism-nord .token.atrule,.prism-nord .token.attr-value,.prism-nord .token.class-name,.prism-nord .token.function{color:#88c0d0}.prism-nord .token.keyword{color:#81a1c1}.prism-nord .token.important,.prism-nord .token.regex{color:#ebcb8b}.prism-nord .token.bold,.prism-nord .token.important{font-weight:700}.prism-nord .token.italic{font-style:italic}.prism-nord .token.entity{cursor:help}";
styleInject(css_248z$f);

var css_248z$e = ".prism-one-dark .line-number-wrapper{background:#282c34}.prism-one-dark code[class*=language-],.prism-one-dark pre[class*=language-]{background:#282c34;color:#abb2bf;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:2;-o-tab-size:2;tab-size:2;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}.prism-one-dark code[class*=language-] ::-moz-selection,.prism-one-dark code[class*=language-]::-moz-selection,.prism-one-dark pre[class*=language-] ::-moz-selection{background:#3e4451;color:inherit;text-shadow:none}.prism-one-dark code[class*=language-] ::selection,.prism-one-dark code[class*=language-]::selection,.prism-one-dark pre[class*=language-] ::selection{background:#3e4451;color:inherit;text-shadow:none}@media print{.prism-one-dark code[class*=language-],.prism-one-dark pre[class*=language-]{text-shadow:none}}.prism-one-dark .token.cdata,.prism-one-dark .token.comment,.prism-one-dark .token.prolog{color:#5c6370}.prism-one-dark .token.doctype,.prism-one-dark .token.entity,.prism-one-dark .token.punctuation{color:#abb2bf}.prism-one-dark .token.atrule,.prism-one-dark .token.attr-name,.prism-one-dark .token.boolean,.prism-one-dark .token.class-name,.prism-one-dark .token.constant,.prism-one-dark .token.number{color:#d19a66}.prism-one-dark .token.keyword{color:#c678dd}.prism-one-dark .token.deleted,.prism-one-dark .token.important,.prism-one-dark .token.property,.prism-one-dark .token.symbol,.prism-one-dark .token.tag{color:#e06c75}.prism-one-dark .token.attr-value,.prism-one-dark .token.attr-value>.token.punctuation,.prism-one-dark .token.builtin,.prism-one-dark .token.char,.prism-one-dark .token.inserted,.prism-one-dark .token.regex,.prism-one-dark .token.selector,.prism-one-dark .token.string{color:#98c379}.prism-one-dark .token.function,.prism-one-dark .token.operator,.prism-one-dark .token.variable{color:#61afef}.prism-one-dark .token.url{color:#56b6c2}.prism-one-dark .token.attr-value>.token.punctuation.attr-equals,.prism-one-dark .token.special-attr>.token.attr-value>.token.value.css{color:#abb2bf}.prism-one-dark .language-css .token.selector{color:#e06c75}.prism-one-dark .language-css .token.property{color:#abb2bf}.prism-one-dark .language-css .token.function,.prism-one-dark .language-css .token.url>.token.function{color:#56b6c2}.prism-one-dark .language-css .token.url>.token.string.url{color:#98c379}.prism-one-dark .language-css .token.atrule .token.rule,.prism-one-dark .language-css .token.important,.prism-one-dark .language-javascript .token.operator{color:#c678dd}.prism-one-dark .language-javascript .token.template-string>.token.interpolation>.token.interpolation-punctuation.punctuation{color:#be5046}.prism-one-dark .language-json .token.operator{color:#abb2bf}.prism-one-dark .language-json .token.null.keyword{color:#d19a66}.prism-one-dark .language-markdown .token.url,.prism-one-dark .language-markdown .token.url-reference.url>.token.string,.prism-one-dark .language-markdown .token.url>.token.operator{color:#abb2bf}.prism-one-dark .language-markdown .token.url>.token.content{color:#61afef}.prism-one-dark .language-markdown .token.url-reference.url,.prism-one-dark .language-markdown .token.url>.token.url{color:#56b6c2}.prism-one-dark .language-markdown .token.blockquote.punctuation,.prism-one-dark .language-markdown .token.hr.punctuation{color:#5c6370;font-style:italic}.prism-one-dark .language-markdown .token.code-snippet{color:#98c379}.prism-one-dark .language-markdown .token.bold .token.content{color:#d19a66}.prism-one-dark .language-markdown .token.italic .token.content{color:#c678dd}.prism-one-dark .language-markdown .token.list.punctuation,.prism-one-dark .language-markdown .token.strike .token.content,.prism-one-dark .language-markdown .token.strike .token.punctuation,.prism-one-dark .language-markdown .token.title.important>.token.punctuation{color:#e06c75}.prism-one-dark .token.bold{font-weight:700}.prism-one-dark .token.comment,.prism-one-dark .token.italic{font-style:italic}.prism-one-dark .token.entity{cursor:help}.prism-one-dark .token.namespace{opacity:.8}.prism-one-dark .token.token.cr:before,.prism-one-dark .token.token.lf:before,.prism-one-dark .token.token.space:before,.prism-one-dark .token.token.tab:not(:empty):before{color:rgba(171,178,191,.15);text-shadow:none}.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item{margin-right:.4em}.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span{background:#3a3f4b;border-radius:.3em;color:#828997;padding:.1em .4em}.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:focus,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:hover,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:focus,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:hover,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:focus,.prism-one-dark div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:hover{background:#3e4451;color:#abb2bf}.prism-one-dark .line-highlight.line-highlight{background:rgba(153,187,255,.04)}.prism-one-dark .line-highlight.line-highlight:before,.prism-one-dark .line-highlight.line-highlight[data-end]:after{background:#3a3f4b;border-radius:.3em;box-shadow:0 2px 0 0 rgba(0,0,0,.2);color:#abb2bf;padding:.1em .6em}.prism-one-dark pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows>span:hover:before{background-color:rgba(153,187,255,.04)}.prism-one-dark .command-line .command-line-prompt,.prism-one-dark .line-numbers.line-numbers .line-numbers-rows{border-right-color:rgba(171,178,191,.15)}.prism-one-dark .command-line .command-line-prompt>span:before,.prism-one-dark .line-numbers .line-numbers-rows>span:before{color:#636d83}.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-1,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-5,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-9{color:#e06c75}.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-10,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-2,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-6{color:#98c379}.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-11,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-3,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-7{color:#61afef}.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-12,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-4,.prism-one-dark .rainbow-braces .token.token.punctuation.brace-level-8{color:#c678dd}.prism-one-dark pre.diff-highlight>code .token.token.deleted:not(.prefix),.prism-one-dark pre>code.diff-highlight .token.token.deleted:not(.prefix){background-color:rgba(255,82,102,.15)}.prism-one-dark pre.diff-highlight>code .token.token.deleted:not(.prefix) ::-moz-selection,.prism-one-dark pre.diff-highlight>code .token.token.deleted:not(.prefix)::-moz-selection,.prism-one-dark pre>code.diff-highlight .token.token.deleted:not(.prefix) ::-moz-selection,.prism-one-dark pre>code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection{background-color:rgba(251,86,105,.25)}.prism-one-dark pre.diff-highlight>code .token.token.deleted:not(.prefix) ::selection,.prism-one-dark pre.diff-highlight>code .token.token.deleted:not(.prefix)::selection,.prism-one-dark pre>code.diff-highlight .token.token.deleted:not(.prefix) ::selection,.prism-one-dark pre>code.diff-highlight .token.token.deleted:not(.prefix)::selection{background-color:rgba(251,86,105,.25)}.prism-one-dark pre.diff-highlight>code .token.token.inserted:not(.prefix),.prism-one-dark pre>code.diff-highlight .token.token.inserted:not(.prefix){background-color:rgba(25,255,91,.15)}.prism-one-dark pre.diff-highlight>code .token.token.inserted:not(.prefix) ::-moz-selection,.prism-one-dark pre.diff-highlight>code .token.token.inserted:not(.prefix)::-moz-selection,.prism-one-dark pre>code.diff-highlight .token.token.inserted:not(.prefix) ::-moz-selection,.prism-one-dark pre>code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection{background-color:rgba(56,224,98,.25)}.prism-one-dark pre.diff-highlight>code .token.token.inserted:not(.prefix) ::selection,.prism-one-dark pre.diff-highlight>code .token.token.inserted:not(.prefix)::selection,.prism-one-dark pre>code.diff-highlight .token.token.inserted:not(.prefix) ::selection,.prism-one-dark pre>code.diff-highlight .token.token.inserted:not(.prefix)::selection{background-color:rgba(56,224,98,.25)}.prism-one-dark .prism-previewer-gradient.prism-previewer-gradient div,.prism-one-dark .prism-previewer.prism-previewer:before{border-color:#262931}.prism-one-dark .prism-previewer-color.prism-previewer-color:before,.prism-one-dark .prism-previewer-easing.prism-previewer-easing:before,.prism-one-dark .prism-previewer-gradient.prism-previewer-gradient div{border-radius:.3em}.prism-one-dark .prism-previewer.prism-previewer:after{border-top-color:#262931}.prism-one-dark .prism-previewer-flipped.prism-previewer-flipped.after{border-bottom-color:#262931}.prism-one-dark .prism-previewer-angle.prism-previewer-angle:before,.prism-one-dark .prism-previewer-easing.prism-previewer-easing,.prism-one-dark .prism-previewer-time.prism-previewer-time:before{background:#31363f}.prism-one-dark .prism-previewer-angle.prism-previewer-angle circle,.prism-one-dark .prism-previewer-time.prism-previewer-time circle{stroke:#abb2bf;stroke-opacity:1}.prism-one-dark .prism-previewer-easing.prism-previewer-easing circle,.prism-one-dark .prism-previewer-easing.prism-previewer-easing line,.prism-one-dark .prism-previewer-easing.prism-previewer-easing path{stroke:#abb2bf}.prism-one-dark .prism-previewer-easing.prism-previewer-easing circle{fill:transparent}";
styleInject(css_248z$e);

var css_248z$d = ".prism-one-light .line-number-wrapper{background:#fafafa}.prism-one-light code[class*=language-],.prism-one-light pre[class*=language-]{background:#fafafa;color:#383a42;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:2;-o-tab-size:2;tab-size:2;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-one-light code[class*=language-] ::-moz-selection,.prism-one-light code[class*=language-]::-moz-selection,.prism-one-light pre[class*=language-] ::-moz-selection{background:#e5e5e6;color:inherit}.prism-one-light code[class*=language-] ::selection,.prism-one-light code[class*=language-]::selection,.prism-one-light pre[class*=language-] ::selection{background:#e5e5e6;color:inherit}.prism-one-light .token.cdata,.prism-one-light .token.comment,.prism-one-light .token.prolog{color:#a0a1a7}.prism-one-light .token.doctype,.prism-one-light .token.entity,.prism-one-light .token.punctuation{color:#383a42}.prism-one-light .token.atrule,.prism-one-light .token.attr-name,.prism-one-light .token.boolean,.prism-one-light .token.class-name,.prism-one-light .token.constant,.prism-one-light .token.number{color:#b76b01}.prism-one-light .token.keyword{color:#a626a4}.prism-one-light .token.deleted,.prism-one-light .token.important,.prism-one-light .token.property,.prism-one-light .token.symbol,.prism-one-light .token.tag{color:#e45649}.prism-one-light .token.attr-value,.prism-one-light .token.attr-value>.token.punctuation,.prism-one-light .token.builtin,.prism-one-light .token.char,.prism-one-light .token.inserted,.prism-one-light .token.regex,.prism-one-light .token.selector,.prism-one-light .token.string{color:#50a14f}.prism-one-light .token.function,.prism-one-light .token.operator,.prism-one-light .token.variable{color:#4078f2}.prism-one-light .token.url{color:#0184bc}.prism-one-light .token.attr-value>.token.punctuation.attr-equals,.prism-one-light .token.special-attr>.token.attr-value>.token.value.css{color:#383a42}.prism-one-light .language-css .token.selector{color:#e45649}.prism-one-light .language-css .token.property{color:#383a42}.prism-one-light .language-css .token.function,.prism-one-light .language-css .token.url>.token.function{color:#0184bc}.prism-one-light .language-css .token.url>.token.string.url{color:#50a14f}.prism-one-light .language-css .token.atrule .token.rule,.prism-one-light .language-css .token.important,.prism-one-light .language-javascript .token.operator{color:#a626a4}.prism-one-light .language-javascript .token.template-string>.token.interpolation>.token.interpolation-punctuation.punctuation{color:#ca1243}.prism-one-light .language-json .token.operator{color:#383a42}.prism-one-light .language-json .token.null.keyword{color:#b76b01}.prism-one-light .language-markdown .token.url,.prism-one-light .language-markdown .token.url-reference.url>.token.string,.prism-one-light .language-markdown .token.url>.token.operator{color:#383a42}.prism-one-light .language-markdown .token.url>.token.content{color:#4078f2}.prism-one-light .language-markdown .token.url-reference.url,.prism-one-light .language-markdown .token.url>.token.url{color:#0184bc}.prism-one-light .language-markdown .token.blockquote.punctuation,.prism-one-light .language-markdown .token.hr.punctuation{color:#a0a1a7;font-style:italic}.prism-one-light .language-markdown .token.code-snippet{color:#50a14f}.prism-one-light .language-markdown .token.bold .token.content{color:#b76b01}.prism-one-light .language-markdown .token.italic .token.content{color:#a626a4}.prism-one-light .language-markdown .token.list.punctuation,.prism-one-light .language-markdown .token.strike .token.content,.prism-one-light .language-markdown .token.strike .token.punctuation,.prism-one-light .language-markdown .token.title.important>.token.punctuation{color:#e45649}.prism-one-light .token.bold{font-weight:700}.prism-one-light .token.comment,.prism-one-light .token.italic{font-style:italic}.prism-one-light .token.entity{cursor:help}.prism-one-light .token.namespace{opacity:.8}.prism-one-light .token.token.cr:before,.prism-one-light .token.token.lf:before,.prism-one-light .token.token.space:before,.prism-one-light .token.token.tab:not(:empty):before{color:rgba(56,58,66,.2)}.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item{margin-right:.4em}.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>a,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>button,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>span{background:#e5e5e6;border-radius:.3em;color:#696c77;padding:.1em .4em}.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:focus,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>a:hover,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:focus,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>button:hover,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:focus,.prism-one-light div.code-toolbar>.toolbar.toolbar>.toolbar-item>span:hover{background:#c6c7c7;color:#383a42}.prism-one-light .line-highlight.line-highlight{background:rgba(56,58,66,.05)}.prism-one-light .line-highlight.line-highlight:before,.prism-one-light .line-highlight.line-highlight[data-end]:after{background:#e5e5e6;border-radius:.3em;box-shadow:0 2px 0 0 rgba(0,0,0,.2);color:#383a42;padding:.1em .6em}.prism-one-light pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows>span:hover:before{background-color:rgba(56,58,66,.05)}.prism-one-light .command-line .command-line-prompt,.prism-one-light .line-numbers.line-numbers .line-numbers-rows{border-right-color:rgba(56,58,66,.2)}.prism-one-light .command-line .command-line-prompt>span:before,.prism-one-light .line-numbers .line-numbers-rows>span:before{color:#9d9d9f}.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-1,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-5,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-9{color:#e45649}.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-10,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-2,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-6{color:#50a14f}.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-11,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-3,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-7{color:#4078f2}.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-12,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-4,.prism-one-light .rainbow-braces .token.token.punctuation.brace-level-8{color:#a626a4}.prism-one-light pre.diff-highlight>code .token.token.deleted:not(.prefix),.prism-one-light pre>code.diff-highlight .token.token.deleted:not(.prefix){background-color:rgba(255,82,102,.15)}.prism-one-light pre.diff-highlight>code .token.token.deleted:not(.prefix) ::-moz-selection,.prism-one-light pre.diff-highlight>code .token.token.deleted:not(.prefix)::-moz-selection,.prism-one-light pre>code.diff-highlight .token.token.deleted:not(.prefix) ::-moz-selection,.prism-one-light pre>code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection{background-color:rgba(251,86,105,.25)}.prism-one-light pre.diff-highlight>code .token.token.deleted:not(.prefix) ::selection,.prism-one-light pre.diff-highlight>code .token.token.deleted:not(.prefix)::selection,.prism-one-light pre>code.diff-highlight .token.token.deleted:not(.prefix) ::selection,.prism-one-light pre>code.diff-highlight .token.token.deleted:not(.prefix)::selection{background-color:rgba(251,86,105,.25)}.prism-one-light pre.diff-highlight>code .token.token.inserted:not(.prefix),.prism-one-light pre>code.diff-highlight .token.token.inserted:not(.prefix){background-color:rgba(25,255,91,.15)}.prism-one-light pre.diff-highlight>code .token.token.inserted:not(.prefix) ::-moz-selection,.prism-one-light pre.diff-highlight>code .token.token.inserted:not(.prefix)::-moz-selection,.prism-one-light pre>code.diff-highlight .token.token.inserted:not(.prefix) ::-moz-selection,.prism-one-light pre>code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection{background-color:rgba(56,224,98,.25)}.prism-one-light pre.diff-highlight>code .token.token.inserted:not(.prefix) ::selection,.prism-one-light pre.diff-highlight>code .token.token.inserted:not(.prefix)::selection,.prism-one-light pre>code.diff-highlight .token.token.inserted:not(.prefix) ::selection,.prism-one-light pre>code.diff-highlight .token.token.inserted:not(.prefix)::selection{background-color:rgba(56,224,98,.25)}.prism-one-light .prism-previewer-gradient.prism-previewer-gradient div,.prism-one-light .prism-previewer.prism-previewer:before{border-color:#f2f2f2}.prism-one-light .prism-previewer-color.prism-previewer-color:before,.prism-one-light .prism-previewer-easing.prism-previewer-easing:before,.prism-one-light .prism-previewer-gradient.prism-previewer-gradient div{border-radius:.3em}.prism-one-light .prism-previewer.prism-previewer:after{border-top-color:#f2f2f2}.prism-one-light .prism-previewer-flipped.prism-previewer-flipped.after{border-bottom-color:#f2f2f2}.prism-one-light .prism-previewer-angle.prism-previewer-angle:before,.prism-one-light .prism-previewer-easing.prism-previewer-easing,.prism-one-light .prism-previewer-time.prism-previewer-time:before{background:#fff}.prism-one-light .prism-previewer-angle.prism-previewer-angle circle,.prism-one-light .prism-previewer-time.prism-previewer-time circle{stroke:#383a42;stroke-opacity:1}.prism-one-light .prism-previewer-easing.prism-previewer-easing circle,.prism-one-light .prism-previewer-easing.prism-previewer-easing line,.prism-one-light .prism-previewer-easing.prism-previewer-easing path{stroke:#383a42}.prism-one-light .prism-previewer-easing.prism-previewer-easing circle{fill:transparent}";
styleInject(css_248z$d);

var css_248z$c = ".prism-pojoaque code[class*=language-],.prism-pojoaque pre[class*=language-]{word-wrap:break-word;color:#dccf8f;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-shadow:0;white-space:pre;white-space:pre-wrap;word-break:break-all}.prism-pojoaque :not(pre)>code[class*=language-],.prism-pojoaque pre[class*=language-]{background:#181914 url(\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==\") repeat 0 0;border:1px solid #000;color:#dccf8f}.prism-pojoaque .token.namespace{opacity:.7}.prism-pojoaque .token.cdata,.prism-pojoaque .token.comment,.prism-pojoaque .token.doctype,.prism-pojoaque .token.prolog{color:#586e75;font-style:italic}.prism-pojoaque .token.builtin,.prism-pojoaque .token.char,.prism-pojoaque .token.inserted,.prism-pojoaque .token.number,.prism-pojoaque .token.string{color:#468966}.prism-pojoaque .token.attr-name{color:#b89859}.prism-pojoaque .language-css .token.string,.prism-pojoaque .style .token.string,.prism-pojoaque .token.entity,.prism-pojoaque .token.operator,.prism-pojoaque .token.url{color:#dccf8f}.prism-pojoaque .token.regex,.prism-pojoaque .token.selector{color:#859900}.prism-pojoaque .token.atrule,.prism-pojoaque .token.keyword{color:#cb4b16}.prism-pojoaque .token.attr-value{color:#468966}.prism-pojoaque .token.function,.prism-pojoaque .token.placeholder,.prism-pojoaque .token.variable{color:#b58900}.prism-pojoaque .token.boolean,.prism-pojoaque .token.constant,.prism-pojoaque .token.number,.prism-pojoaque .token.property,.prism-pojoaque .token.symbol,.prism-pojoaque .token.tag{color:#b89859}.prism-pojoaque .token.tag{color:#ffb03b}.prism-pojoaque .token.deleted,.prism-pojoaque .token.important,.prism-pojoaque .token.statement{color:#dc322f}.prism-pojoaque .token.punctuation{color:#dccf8f}.prism-pojoaque .token.entity{cursor:help}.prism-pojoaque .token.bold{font-weight:700}.prism-pojoaque .token.italic{font-style:italic}";
styleInject(css_248z$c);

var css_248z$b = ".prism-shades-of-purple code[class*=language-],.prism-shades-of-purple pre[class*=language-]{color:#9efeff;direction:ltr;font-weight:400;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;letter-spacing:.5px;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px #222245;white-space:pre;word-break:normal;word-spacing:normal}.prism-shades-of-purple code[class*=language-] ::-moz-selection,.prism-shades-of-purple code[class*=language-] ::selection,.prism-shades-of-purple code[class*=language-]::-moz-selection,.prism-shades-of-purple code[class*=language-]::selection,.prism-shades-of-purple pre[class*=language-] ::-moz-selection,.prism-shades-of-purple pre[class*=language-] ::selection,.prism-shades-of-purple pre[class*=language-]::-moz-selection,.prism-shades-of-purple pre[class*=language-]::selection{background:#a599e9;color:inherit}.prism-shades-of-purple :not(pre)>code[class*=language-],.prism-shades-of-purple pre[class*=language-]{background:#1e1e3f}.prism-shades-of-purple .token{font-weight:400}.prism-shades-of-purple .token.cdata,.prism-shades-of-purple .token.comment,.prism-shades-of-purple .token.prolog{color:#b362ff}.prism-shades-of-purple .token.atrule,.prism-shades-of-purple .token.delimiter,.prism-shades-of-purple .token.important,.prism-shades-of-purple .token.keyword,.prism-shades-of-purple .token.selector{color:#ff9d00}.prism-shades-of-purple .token.attr-name,.prism-shades-of-purple .token.operator{color:#ffb454}.prism-shades-of-purple .token.punctuation{color:#fff}.prism-shades-of-purple .token.boolean{color:#ff628c}.prism-shades-of-purple .token.builtin,.prism-shades-of-purple .token.doctype,.prism-shades-of-purple .token.tag,.prism-shades-of-purple .token.tag .punctuation{color:#ff9d00}.prism-shades-of-purple .token.entity,.prism-shades-of-purple .token.symbol{color:#6897bb}.prism-shades-of-purple .token.constant,.prism-shades-of-purple .token.number,.prism-shades-of-purple .token.property,.prism-shades-of-purple .token.variable{color:#ff628c}.prism-shades-of-purple .token.char,.prism-shades-of-purple .token.string{color:#a5ff90}.prism-shades-of-purple .token.attr-value,.prism-shades-of-purple .token.attr-value .punctuation{color:#a5c261}.prism-shades-of-purple .token.attr-value .punctuation:first-child{color:#a9b7c6}.prism-shades-of-purple .token.url{color:#287bde;text-decoration:underline}.prism-shades-of-purple .token.function{color:#fad000}.prism-shades-of-purple .token.regex{background:#364135}.prism-shades-of-purple .token.bold{font-weight:700}.prism-shades-of-purple .token.italic{font-style:italic}.prism-shades-of-purple .token.inserted{background:#0f0}.prism-shades-of-purple .token.deleted{background:#ff000d}.prism-shades-of-purple code.language-css .token.property,.prism-shades-of-purple code.language-css .token.property+.token.punctuation{color:#a9b7c6}.prism-shades-of-purple code.language-css .token.id,.prism-shades-of-purple code.language-css .token.selector>.token.attribute,.prism-shades-of-purple code.language-css .token.selector>.token.class,.prism-shades-of-purple code.language-css .token.selector>.token.pseudo-class,.prism-shades-of-purple code.language-css .token.selector>.token.pseudo-element{color:#ffc66d}.prism-shades-of-purple .token.class-name{color:#fb94ff}.prism-shades-of-purple .language-css .token.string,.prism-shades-of-purple .style .token.string,.prism-shades-of-purple .token.entity,.prism-shades-of-purple .token.operator,.prism-shades-of-purple .token.url{background:none}.prism-shades-of-purple .line-highlight.line-highlight{background:linear-gradient(90deg,rgba(179,98,255,.17),transparent);margin-top:36px}.prism-shades-of-purple .line-highlight.line-highlight:before,.prism-shades-of-purple .line-highlight.line-highlight[data-end]:after{content:\"\"}";
styleInject(css_248z$b);

var css_248z$a = ".prism-solarized-dark-atom code[class*=language-],.prism-solarized-dark-atom pre[class*=language-]{color:#839496;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 1px rgba(0,0,0,.3);white-space:pre;word-break:normal;word-spacing:normal}.prism-solarized-dark-atom :not(pre)>code[class*=language-],.prism-solarized-dark-atom pre[class*=language-]{background:#002b36}.prism-solarized-dark-atom .token.cdata,.prism-solarized-dark-atom .token.comment,.prism-solarized-dark-atom .token.doctype,.prism-solarized-dark-atom .token.prolog{color:#586e75}.prism-solarized-dark-atom .token.punctuation{color:#93a1a1}.prism-solarized-dark-atom .namespace{opacity:.7}.prism-solarized-dark-atom .token.keyword,.prism-solarized-dark-atom .token.property,.prism-solarized-dark-atom .token.tag{color:#268bd2}.prism-solarized-dark-atom .token.class-name{color:#ffffb6;text-decoration:underline}.prism-solarized-dark-atom .token.boolean,.prism-solarized-dark-atom .token.constant{color:#b58900}.prism-solarized-dark-atom .token.deleted,.prism-solarized-dark-atom .token.symbol{color:#dc322f}.prism-solarized-dark-atom .token.attr-name,.prism-solarized-dark-atom .token.builtin,.prism-solarized-dark-atom .token.char,.prism-solarized-dark-atom .token.inserted,.prism-solarized-dark-atom .token.number,.prism-solarized-dark-atom .token.selector,.prism-solarized-dark-atom .token.string{color:#859900}.prism-solarized-dark-atom .token.variable{color:#268bd2}.prism-solarized-dark-atom .token.operator{color:#ededed}.prism-solarized-dark-atom .token.function{color:#268bd2}.prism-solarized-dark-atom .token.regex{color:#e9c062}.prism-solarized-dark-atom .token.important{color:#fd971f}.prism-solarized-dark-atom .token.entity{color:#ffffb6;cursor:help}.prism-solarized-dark-atom .token.url{color:#96cbfe}.prism-solarized-dark-atom .language-css .token.string,.prism-solarized-dark-atom .style .token.string{color:#87c38a}.prism-solarized-dark-atom .token.bold,.prism-solarized-dark-atom .token.important{font-weight:700}.prism-solarized-dark-atom .token.italic{font-style:italic}.prism-solarized-dark-atom .token.atrule,.prism-solarized-dark-atom .token.attr-value{color:#f9ee98}";
styleInject(css_248z$a);

var css_248z$9 = ".prism-synthwave84 code[class*=language-],.prism-synthwave84 pre[class*=language-]{word-wrap:normal;background:none;color:#f92aad;font-size:1em;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:0 0 2px #100c0f,0 0 5px rgba(220,7,142,.2),0 0 10px hsla(0,0%,100%,.2);white-space:pre;word-break:normal;word-spacing:normal}.prism-synthwave84 :not(pre)>code[class*=language-],.prism-synthwave84 pre[class*=language-]{background-color:transparent!important;background-image:linear-gradient(180deg,#2a2139 75%,#34294f)}.prism-synthwave84 .token.block-comment,.prism-synthwave84 .token.cdata,.prism-synthwave84 .token.comment,.prism-synthwave84 .token.doctype,.prism-synthwave84 .token.prolog{color:#8e8e8e}.prism-synthwave84 .token.punctuation{color:#ccc}.prism-synthwave84 .token.attr-name,.prism-synthwave84 .token.deleted,.prism-synthwave84 .token.hexcode,.prism-synthwave84 .token.namespace,.prism-synthwave84 .token.number,.prism-synthwave84 .token.tag,.prism-synthwave84 .token.unit{color:#e2777a}.prism-synthwave84 .token.property,.prism-synthwave84 .token.selector{color:#72f1b8;text-shadow:0 0 2px #100c0f,0 0 10px rgba(37,124,85,.459),0 0 35px rgba(33,39,36,.459)}.prism-synthwave84 .token.function-name{color:#6196cc}.prism-synthwave84 .token.boolean,.prism-synthwave84 .token.function,.prism-synthwave84 .token.selector .token.id{color:#fdfdfd;text-shadow:0 0 2px #001716,0 0 3px rgba(3,237,249,.459),0 0 5px rgba(3,237,249,.459),0 0 8px rgba(3,237,249,.459)}.prism-synthwave84 .token.class-name{color:#fff5f6;text-shadow:0 0 2px #000,0 0 10px rgba(252,31,44,.459),0 0 5px rgba(252,31,44,.459),0 0 25px rgba(252,31,44,.459)}.prism-synthwave84 .token.constant,.prism-synthwave84 .token.symbol{color:#f92aad;text-shadow:0 0 2px #100c0f,0 0 5px rgba(220,7,142,.2),0 0 10px hsla(0,0%,100%,.2)}.prism-synthwave84 .token.atrule,.prism-synthwave84 .token.builtin,.prism-synthwave84 .token.important,.prism-synthwave84 .token.keyword,.prism-synthwave84 .token.selector .token.class{color:#f4eee4;text-shadow:0 0 2px #393a33,0 0 8px rgba(243,159,5,.459),0 0 2px rgba(243,159,5,.459)}.prism-synthwave84 .token.attr-value,.prism-synthwave84 .token.char,.prism-synthwave84 .token.regex,.prism-synthwave84 .token.string,.prism-synthwave84 .token.variable{color:#f87c32}.prism-synthwave84 .token.entity,.prism-synthwave84 .token.operator,.prism-synthwave84 .token.url{color:#67cdcc}.prism-synthwave84 .token.bold,.prism-synthwave84 .token.important{font-weight:700}.prism-synthwave84 .token.italic{font-style:italic}.prism-synthwave84 .token.entity{cursor:help}.prism-synthwave84 .token.inserted{color:green}";
styleInject(css_248z$9);

var css_248z$8 = ".prism-vs code[class*=language-],.prism-vs pre[class*=language-]{color:#393a34;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-vs pre>code[class*=language-]{font-size:1em}.prism-vs code[class*=language-] ::-moz-selection,.prism-vs code[class*=language-]::-moz-selection,.prism-vs pre[class*=language-] ::-moz-selection,.prism-vs pre[class*=language-]::-moz-selection{background:#c1def1}.prism-vs code[class*=language-] ::selection,.prism-vs code[class*=language-]::selection,.prism-vs pre[class*=language-] ::selection,.prism-vs pre[class*=language-]::selection{background:#c1def1}.prism-vs pre[class*=language-]{background-color:#fff;border:1px solid #ddd}.prism-vs :not(pre)>code[class*=language-]{background:#f8f8f8;border:1px solid #ddd;padding:1px .2em}.prism-vs .token.cdata,.prism-vs .token.comment,.prism-vs .token.doctype,.prism-vs .token.prolog{color:green;font-style:italic}.prism-vs .token.namespace{opacity:.7}.prism-vs .token.string{color:#a31515}.prism-vs .token.operator,.prism-vs .token.punctuation{color:#393a34}.prism-vs .token.boolean,.prism-vs .token.constant,.prism-vs .token.inserted,.prism-vs .token.number,.prism-vs .token.symbol,.prism-vs .token.url,.prism-vs .token.variable{color:#36acaa}.prism-vs .language-autohotkey .token.selector,.prism-vs .language-json .token.boolean,.prism-vs .language-json .token.number,.prism-vs .token.atrule,.prism-vs .token.attr-value,.prism-vs .token.keyword,.prism-vs code[class*=language-css]{color:#00f}.prism-vs .token.function{color:#393a34}.prism-vs .language-autohotkey .token.tag,.prism-vs .token.deleted{color:#9a050f}.prism-vs .language-autohotkey .token.keyword,.prism-vs .token.selector{color:#00009f}.prism-vs .token.important{color:#e90}.prism-vs .token.bold,.prism-vs .token.important{font-weight:700}.prism-vs .token.italic{font-style:italic}.prism-vs .language-json .token.property,.prism-vs .token.class-name{color:#2b91af}.prism-vs .token.selector,.prism-vs .token.tag{color:maroon}.prism-vs .token.attr-name,.prism-vs .token.entity,.prism-vs .token.property,.prism-vs .token.regex{color:red}.prism-vs .token.directive.tag .tag{background:#ff0;color:#393a34}.prism-vs .line-numbers.line-numbers .line-numbers-rows{border-right-color:#a5a5a5}.prism-vs .line-numbers .line-numbers-rows>span:before{color:#2b91af}.prism-vs .line-highlight.line-highlight{background:rgba(193,222,241,.2);background:-webkit-linear-gradient(left,rgba(193,222,241,.2) 70%,rgba(221,222,241,0));background:linear-gradient(90deg,rgba(193,222,241,.2) 70%,rgba(221,222,241,0))}";
styleInject(css_248z$8);

var css_248z$7 = ".prism-vsc-dark-plus code[class*=language-],.prism-vsc-dark-plus pre[class*=language-]{color:#d4d4d4;direction:ltr;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;text-shadow:none;white-space:pre;word-break:normal;word-spacing:normal}.prism-vsc-dark-plus code[class*=language-] ::selection,.prism-vsc-dark-plus code[class*=language-]::selection,.prism-vsc-dark-plus pre[class*=language-] ::selection,.prism-vsc-dark-plus pre[class*=language-]::selection{background:#264f78;text-shadow:none}@media print{.prism-vsc-dark-plus code[class*=language-],.prism-vsc-dark-plus pre[class*=language-]{text-shadow:none}}.prism-vsc-dark-plus pre[class*=language-]{background:#1e1e1e}.prism-vsc-dark-plus :not(pre)>code[class*=language-]{background:#1e1e1e;color:#db4c69}.prism-vsc-dark-plus .namespace{opacity:.7}.prism-vsc-dark-plus .token.doctype .token.doctype-tag{color:#569cd6}.prism-vsc-dark-plus .token.doctype .token.name{color:#9cdcfe}.prism-vsc-dark-plus .token.comment,.prism-vsc-dark-plus .token.prolog{color:#6a9955}.prism-vsc-dark-plus .language-html .language-css .token.punctuation,.prism-vsc-dark-plus .language-html .language-javascript .token.punctuation,.prism-vsc-dark-plus .token.punctuation{color:#d4d4d4}.prism-vsc-dark-plus .token.boolean,.prism-vsc-dark-plus .token.constant,.prism-vsc-dark-plus .token.inserted,.prism-vsc-dark-plus .token.number,.prism-vsc-dark-plus .token.property,.prism-vsc-dark-plus .token.symbol,.prism-vsc-dark-plus .token.tag,.prism-vsc-dark-plus .token.unit{color:#b5cea8}.prism-vsc-dark-plus .token.attr-name,.prism-vsc-dark-plus .token.builtin,.prism-vsc-dark-plus .token.char,.prism-vsc-dark-plus .token.deleted,.prism-vsc-dark-plus .token.selector,.prism-vsc-dark-plus .token.string{color:#ce9178}.prism-vsc-dark-plus .language-css .token.string.url{text-decoration:underline}.prism-vsc-dark-plus .token.entity,.prism-vsc-dark-plus .token.operator{color:#d4d4d4}.prism-vsc-dark-plus .token.operator.arrow{color:#569cd6}.prism-vsc-dark-plus .token.atrule{color:#ce9178}.prism-vsc-dark-plus .token.atrule .token.rule{color:#c586c0}.prism-vsc-dark-plus .token.atrule .token.url{color:#9cdcfe}.prism-vsc-dark-plus .token.atrule .token.url .token.function{color:#dcdcaa}.prism-vsc-dark-plus .token.atrule .token.url .token.punctuation{color:#d4d4d4}.prism-vsc-dark-plus .token.keyword{color:#569cd6}.prism-vsc-dark-plus .token.keyword.control-flow,.prism-vsc-dark-plus .token.keyword.module{color:#c586c0}.prism-vsc-dark-plus .token.function,.prism-vsc-dark-plus .token.function .token.maybe-class-name{color:#dcdcaa}.prism-vsc-dark-plus .token.regex{color:#d16969}.prism-vsc-dark-plus .token.important{color:#569cd6}.prism-vsc-dark-plus .token.italic{font-style:italic}.prism-vsc-dark-plus .token.constant{color:#9cdcfe}.prism-vsc-dark-plus .token.class-name,.prism-vsc-dark-plus .token.maybe-class-name{color:#4ec9b0}.prism-vsc-dark-plus .token.console,.prism-vsc-dark-plus .token.interpolation,.prism-vsc-dark-plus .token.parameter{color:#9cdcfe}.prism-vsc-dark-plus .token.boolean,.prism-vsc-dark-plus .token.punctuation.interpolation-punctuation{color:#569cd6}.prism-vsc-dark-plus .token.exports .token.maybe-class-name,.prism-vsc-dark-plus .token.imports .token.maybe-class-name,.prism-vsc-dark-plus .token.property,.prism-vsc-dark-plus .token.variable{color:#9cdcfe}.prism-vsc-dark-plus .token.escape,.prism-vsc-dark-plus .token.selector{color:#d7ba7d}.prism-vsc-dark-plus .token.tag{color:#569cd6}.prism-vsc-dark-plus .token.cdata,.prism-vsc-dark-plus .token.tag .token.punctuation{color:grey}.prism-vsc-dark-plus .token.attr-name{color:#9cdcfe}.prism-vsc-dark-plus .token.attr-value,.prism-vsc-dark-plus .token.attr-value .token.punctuation{color:#ce9178}.prism-vsc-dark-plus .token.attr-value .token.punctuation.attr-equals{color:#d4d4d4}.prism-vsc-dark-plus .token.entity{color:#569cd6}.prism-vsc-dark-plus .token.namespace{color:#4ec9b0}.prism-vsc-dark-plus code[class*=language-javascript],.prism-vsc-dark-plus code[class*=language-jsx],.prism-vsc-dark-plus code[class*=language-tsx],.prism-vsc-dark-plus code[class*=language-typescript],.prism-vsc-dark-plus pre[class*=language-javascript],.prism-vsc-dark-plus pre[class*=language-jsx],.prism-vsc-dark-plus pre[class*=language-tsx],.prism-vsc-dark-plus pre[class*=language-typescript]{color:#9cdcfe}.prism-vsc-dark-plus code[class*=language-css],.prism-vsc-dark-plus pre[class*=language-css]{color:#ce9178}.prism-vsc-dark-plus code[class*=language-html],.prism-vsc-dark-plus pre[class*=language-html]{color:#d4d4d4}.prism-vsc-dark-plus .language-regex .token.anchor{color:#dcdcaa}.prism-vsc-dark-plus .language-html .token.punctuation{color:grey}";
styleInject(css_248z$7);

var css_248z$6 = ".prism-xonokai code[class*=language-],.prism-xonokai pre[class*=language-]{word-wrap:normal;color:#76d9e6;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:2;-o-tab-size:2;tab-size:2;text-shadow:none;white-space:pre;white-space:pre-wrap}.prism-xonokai :not(pre)>code[class*=language-],.prism-xonokai pre[class*=language-]{background:#2a2a2a}.prism-xonokai :not(pre)>code[class*=language-]{border:.13em solid #7a6652;border-radius:.3em;padding:.15em .2em .05em}.prism-xonokai .token.namespace{opacity:.7}.prism-xonokai .token.cdata,.prism-xonokai .token.comment,.prism-xonokai .token.doctype,.prism-xonokai .token.prolog{color:#6f705e}.prism-xonokai .token.boolean,.prism-xonokai .token.number,.prism-xonokai .token.operator{color:#a77afe}.prism-xonokai .language-css .token.string,.prism-xonokai .style .token.string,.prism-xonokai .token.attr-name,.prism-xonokai .token.entity,.prism-xonokai .token.string,.prism-xonokai .token.url{color:#e6d06c}.prism-xonokai .token.inserted,.prism-xonokai .token.selector{color:#a6e22d}.prism-xonokai .token.atrule,.prism-xonokai .token.attr-value,.prism-xonokai .token.deleted,.prism-xonokai .token.important,.prism-xonokai .token.keyword{color:#ef3b7d}.prism-xonokai .token.regex,.prism-xonokai .token.statement{color:#76d9e6}.prism-xonokai .token.placeholder,.prism-xonokai .token.variable{color:#fff}.prism-xonokai .token.bold,.prism-xonokai .token.important,.prism-xonokai .token.statement{font-weight:700}.prism-xonokai .token.punctuation{color:#bebec5}.prism-xonokai .token.entity{cursor:help}.prism-xonokai .token.italic{font-style:italic}.prism-xonokai code.language-markup{color:#f9f9f9}.prism-xonokai code.language-markup .token.tag{color:#ef3b7d}.prism-xonokai code.language-markup .token.attr-name{color:#a6e22d}.prism-xonokai code.language-markup .token.attr-value{color:#e6d06c}.prism-xonokai code.language-markup .token.script,.prism-xonokai code.language-markup .token.script .token.keyword,.prism-xonokai code.language-markup .token.style{color:#76d9e6}.prism-xonokai .line-highlight.line-highlight{background:hsla(0,0%,100%,.08);padding:0}.prism-xonokai .line-highlight.line-highlight:before,.prism-xonokai .line-highlight.line-highlight[data-end]:after{background-color:hsla(0,0%,100%,.4);box-shadow:0 1px 1px hsla(0,0%,100%,.7);color:#000;height:1em;line-height:1em;padding:.2em .5em}";
styleInject(css_248z$6);

var css_248z$5 = ".prism-z-touch code[class*=language-],.prism-z-touch pre[class*=language-]{word-wrap:normal;color:#22da17;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.prism-z-touch :not(pre)>code[class*=language-],.prism-z-touch pre[class*=language-]{background:#0a143c;color:#fff}.prism-z-touch code[class*=language-] ::-moz-selection,.prism-z-touch code[class*=language-]::-moz-selection,.prism-z-touch pre[class*=language-] ::-moz-selection,.prism-z-touch pre[class*=language-]::-moz-selection{background:rgba(29,59,83,.99);text-shadow:none}.prism-z-touch code[class*=language-] ::selection,.prism-z-touch code[class*=language-]::selection,.prism-z-touch pre[class*=language-] ::selection,.prism-z-touch pre[class*=language-]::selection{background:rgba(29,59,83,.99);text-shadow:none}@media print{.prism-z-touch code[class*=language-],.prism-z-touch pre[class*=language-]{text-shadow:none}}.prism-z-touch .token.cdata,.prism-z-touch .token.comment,.prism-z-touch .token.prolog{color:#637777;font-style:italic}.prism-z-touch .token.punctuation{color:#c792ea}.prism-z-touch .namespace{color:#b2ccd6}.prism-z-touch .token.deleted{color:rgba(239,83,80,.56);font-style:italic}.prism-z-touch .token.property,.prism-z-touch .token.symbol{color:#80cbc4}.prism-z-touch .token.keyword,.prism-z-touch .token.operator,.prism-z-touch .token.tag{color:#7fdbca}.prism-z-touch .token.boolean{color:#ff5874}.prism-z-touch .token.number{color:#f78c6c}.prism-z-touch .token.builtin,.prism-z-touch .token.char,.prism-z-touch .token.constant,.prism-z-touch .token.function{color:#22b7c7}.prism-z-touch .token.doctype,.prism-z-touch .token.selector{color:#c792ea;font-style:italic}.prism-z-touch .token.attr-name,.prism-z-touch .token.inserted{color:#addb67;font-style:italic}.prism-z-touch .language-css .token.string,.prism-z-touch .style .token.string,.prism-z-touch .token.entity,.prism-z-touch .token.string,.prism-z-touch .token.url{color:#addb67}.prism-z-touch .token.atrule,.prism-z-touch .token.attr-value,.prism-z-touch .token.class-name{color:#ffcb8b}.prism-z-touch .token.important,.prism-z-touch .token.regex,.prism-z-touch .token.variable{color:#d6deeb}.prism-z-touch .token.bold,.prism-z-touch .token.important{font-weight:700}.prism-z-touch .token.italic{font-style:italic}";
styleInject(css_248z$5);

var ONE_LINE_HEIGHT = 22;
var PRE_PADDING_HEIGHT = 46;
var SCodeBlock = function SCodeBlock(props) {
  var children = props.children,
    node = props.node,
    editable = props.editable,
    editor = props.editor,
    filename = props.filename,
    language = props.language,
    tabid = props.tabid,
    updateAttributes = props.updateAttributes,
    _a = props.theme,
    theme = _a === void 0 ? "default" : _a,
    totalLineNumber = props.totalLineNumber,
    onCopiedSuccess = props.onCopiedSuccess,
    onCopiedFailed = props.onCopiedFailed;
  var _b = props.focus,
    focus = _b === void 0 ? [] : _b,
    _c = props.autoWrap,
    autoWrap = _c === void 0 ? false : _c,
    _d = props.showLineNumber,
    showLineNumber = _d === void 0 ? true : _d;
  // 站点渲染传入的属性都是 string 类型，需要转换
  if (!editor) {
    if (typeof focus === "string") {
      focus = parseRange(focus);
    }
    if (typeof autoWrap === "string") {
      autoWrap = autoWrap === "true" ? true : false;
    }
    if (typeof showLineNumber === "string") {
      showLineNumber = showLineNumber === "false" ? false : true;
    }
  }
  var codeBlockRef = React__default.useRef();
  var resizerPreRef = React__default.useRef();
  var _e = React__default.useState(1),
    line = _e[0],
    setLine = _e[1];
  var _f = React__default.useState([]),
    lineHeights = _f[0],
    setLineHeights = _f[1];
  var lineHighlight = function lineHighlight(index) {
    if (!editable) return;
    var newFocus;
    if (focus === null || focus === void 0 ? void 0 : focus.includes(index)) {
      newFocus = focus.filter(function (item) {
        return item !== index;
      });
    } else {
      // @ts-ignore
      newFocus = __spreadArray(__spreadArray([], focus, true), [index], false);
    }
    updateAttributes({
      focus: newFocus
    });
  };
  // const handleAutoWrap = () => {
  //   updateAttributes({
  //     autoWrap: !autoWrap,
  //   });
  // };
  useEffect(function () {
    if (editor) {
      var line_1 = node.textContent.split("\n").length;
      setLine(line_1);
      calcLineHeights();
    }
  }, [node, editor]);
  useEffect(function () {
    var codeBlockEl = codeBlockRef.current;
    // 站点构建 代码
    if (codeBlockEl && !editor) {
      setTimeout(function () {
        var _a;
        var code = (_a = codeBlockEl.firstElementChild) === null || _a === void 0 ? void 0 : _a.querySelector("code");
        if (!code) return;
        var line = code.textContent.split("\n").length - 1;
        setLine(line);
        prismjs.highlightElement(code);
        calcLineHeights();
      }, 10);
    }
  }, []);
  var calcLineHeights = useCallback(function () {
    var _a, _b, _c;
    if (!autoWrap) return;
    var codeBlockEl = codeBlockRef.current;
    var resizerPreEl = resizerPreRef.current;
    if (!codeBlockEl || !resizerPreEl) return;
    var lines = [];
    if (editor) {
      lines = node.textContent.split("\n");
    } else {
      var codeElement = (_a = codeBlockEl.firstElementChild) === null || _a === void 0 ? void 0 : _a.querySelector("code");
      lines = (codeElement === null || codeElement === void 0 ? void 0 : codeElement.textContent.split("\n")) || [];
    }
    var sizer = resizerPreEl.querySelector("span");
    resizerPreEl.style.display = "block";
    sizer.innerHTML = "";
    var lineHeights = [];
    // 给 lineHeights length 方便后续遍历
    lineHeights[lines.length - 1] = undefined;
    lines.forEach(function (line, index) {
      if (line && line.length > 1) {
        var e = sizer.appendChild(document.createElement("span"));
        e.style.display = "block";
        e.textContent = line;
      } else {
        lineHeights[index] = ONE_LINE_HEIGHT;
      }
    });
    // display: none 无法获取尺寸，先设置为 block 计算结束后再还原
    var codeBlockWrapper = (_b = codeBlockEl.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    var isHidden = (codeBlockWrapper === null || codeBlockWrapper === void 0 ? void 0 : codeBlockWrapper.style.display) === "none";
    if (isHidden) {
      codeBlockWrapper.style.display = "block";
    }
    var childIndex = 0;
    for (var i = 0; i < lineHeights.length; i++) {
      if (lineHeights[i] === undefined) {
        lineHeights[i] = ((_c = sizer.children[childIndex++]) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().height) || ONE_LINE_HEIGHT;
      }
    }
    setLineHeights(lineHeights);
    sizer.innerHTML = "";
    resizerPreEl.style.display = "none";
    if (isHidden) {
      codeBlockWrapper.style.display = "none";
    }
  }, [autoWrap, editor, node]);
  useEffect(function () {
    setTimeout(function () {
      return calcLineHeights();
    }, 10);
    var handleResize = throttle$2(function () {
      calcLineHeights();
    }, 20);
    var resizeObserver = new index(handleResize);
    resizeObserver.observe(codeBlockRef.current);
    return function () {
      resizeObserver.disconnect();
    };
  }, [calcLineHeights]);
  var inSite = !editor;
  return React__default.createElement("div", {
    className: styles$5.code_position_wrapper
  }, React__default.createElement("div", {
    ref: function ref(e) {
      if (e) {
        codeBlockRef.current = e;
      }
    },
    "data-code-block": true,
    className: "".concat(styles$5.code_wrapper, " ").concat(theme, " ").concat(!totalLineNumber ? styles$5.auto_height : ""),
    "data-filename": filename,
    "data-language": language,
    "data-tabid": tabid,
    "data-autowrap": autoWrap,
    "data-showlinenumber": showLineNumber,
    style: {
      // 在站点中切换 tab 隐藏代码块的元素
      display: inSite ? "none" : "block",
      height: !totalLineNumber ? "auto" : "".concat(20 * Number(totalLineNumber) + PRE_PADDING_HEIGHT, "px")
    }
  }, children, showLineNumber ? React__default.createElement("div", {
    contentEditable: false,
    className: styles$5.line_number_wrapper + " line-number-wrapper"
  }, Array.from({
    length: Math.max(line, 1)
  }).fill(0).map(function (_, index) {
    return React__default.createElement("span", {
      key: index,
      className: (focus === null || focus === void 0 ? void 0 : focus.includes(index + 1)) ? styles$5.high_light : "",
      onClick: function onClick() {
        return lineHighlight(index + 1);
      },
      style: {
        height: autoWrap ? lineHeights[index] ? "".concat(lineHeights[index], "px") : null : "".concat(ONE_LINE_HEIGHT, "px")
      }
    }, index + 1);
  })) : null, React__default.createElement("pre", {
    ref: function ref(el) {
      return resizerPreRef.current = el;
    },
    style: {
      display: "none"
    },
    className: "language-".concat(language)
  }, React__default.createElement("code", {
    className: "language-".concat(language),
    style: {
      whiteSpace: "break-spaces",
      wordBreak: "break-word"
    }
  }, React__default.createElement("span", null)))), (editor && !(node === null || node === void 0 ? void 0 : node.attrs.aiEnabled) || !editor) && React__default.createElement("div", {
    className: styles$5.copy_button,
    onClick: function onClick() {
      var _a, _b, _c;
      var success = copy((node === null || node === void 0 ? void 0 : node.textContent) || ((_c = (_b = (_a = codeBlockRef.current) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.querySelector("code")) === null || _c === void 0 ? void 0 : _c.textContent));
      if (success && onCopiedSuccess) {
        onCopiedSuccess();
      }
      if (!success && onCopiedFailed) {
        onCopiedFailed();
      }
    }
  }, React__default.createElement(SvgIconCopy, null), "Copy"));
};

var levels = [1, 2, 3, 4, 5, 6];
var SH = function SH(props) {
  var oldLevel = props.level,
    children = props.children,
    id = props.id;
  var level = levels.includes(Number(oldLevel)) ? oldLevel : levels[0];
  var Tag = "h".concat(level);
  return React__default.createElement(Tag, {
    id: id
  }, children);
};

var css_248z$4 = ".index-module_image_wrapper__Irs3Y{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;margin:28px 0;position:relative;width:100%}.index-module_image_wrapper__Irs3Y img{height:auto;margin:0;width:auto}.index-module_image_wrapper__Irs3Y .index-module_image_desc__GZqKZ{color:#666;font-size:12px;font-weight:400;line-height:18px;margin:8px 0 0;max-width:100%;min-width:400px;text-align:center}.index-module_image_tool_wrapper__fzJUV{background-color:#f1e8c2;left:0;position:absolute;top:-30px;z-index:1000}.index-module_image_tool_wrapper__fzJUV input{border:1px solid rgba(0,0,0,.3)}.index-module_imageModal__oYgHu{background:rgba(0,0,0,.7);cursor:default;height:100%;inset:0;left:0;position:fixed;top:0;width:100%;z-index:10000}.index-module_imageModal__oYgHu .index-module_imageModalClose__fDD4n{background:hsla(0,0%,9%,.9);border-radius:50%;color:#fff;cursor:pointer;padding:11px;position:absolute;right:20px;top:20px;z-index:10001}.index-module_imageModal__oYgHu .index-module_imageModalContents__Z9pZ-{align-items:center;display:flex;height:100%;justify-content:center;padding:50px;width:100%}.index-module_imageModal__oYgHu .index-module_imageModalContents__Z9pZ- img{max-height:100%;max-width:100%}.index-module_imageModal__oYgHu .index-module_imageModalContents__Z9pZ- img::selection{background-color:transparent}";
var styles$4 = {
  "image_wrapper": "index-module_image_wrapper__Irs3Y",
  "image_desc": "index-module_image_desc__GZqKZ",
  "image_tool_wrapper": "index-module_image_tool_wrapper__fzJUV",
  "imageModal": "index-module_imageModal__oYgHu",
  "imageModalClose": "index-module_imageModalClose__fDD4n",
  "imageModalContents": "index-module_imageModalContents__Z9pZ-"
};
styleInject(css_248z$4);

var IconClose = function IconClose(props) {
  return React__default.createElement("svg", __assign({
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24"
  }, props), React__default.createElement("g", {
    transform: "translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)",
    stroke: "#FFFFFF",
    strokeLinecap: "square",
    strokeLinejoin: "round",
    strokeWidth: "2"
  }, React__default.createElement("line", {
    x1: "8.03457143",
    y1: "0",
    x2: "8.01365714",
    y2: "16"
  }), React__default.createElement("line", {
    x1: "0",
    y1: "8",
    x2: "16",
    y2: "8"
  })));
};

var SImage = function SImage(props) {
  var src = props.src,
    alt = props.alt,
    title = props.title,
    width = props.width,
    height = props.height,
    inline = props.inline,
    _a = props.editable,
    editable = _a === void 0 ? false : _a,
    caption = props.caption;
  var _b = React__default.useState(false),
    open = _b[0],
    setOpen = _b[1];
  var imageStyle = React__default.useMemo(function () {
    return {
      width: width ? typeof width === "string" ? width : width + "px" : "auto",
      height: height ? height + "px" : "auto",
      display: inline ? "inline" : "block"
    };
  }, [height, inline, width]);
  var handleShowModal = function handleShowModal() {
    setOpen(function () {
      return true;
    });
  };
  var handleCloseModal = function handleCloseModal() {
    setOpen(function () {
      return false;
    });
  };
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    className: styles$4.image_wrapper,
    style: {
      margin: editable ? "0" : "28px 0"
    },
    onClick: editable ? undefined : handleShowModal
  }, React__default.createElement("img", {
    src: src,
    width: width,
    height: height,
    alt: alt,
    title: title,
    style: imageStyle
  }), !editable && !!caption && React__default.createElement("p", {
    className: styles$4.image_desc,
    style: {
      width: width
    }
  }, caption)), !editable && open && React__default.createElement("div", {
    className: styles$4.imageModal,
    onClick: handleCloseModal
  }, React__default.createElement("div", {
    className: styles$4.imageModalClose
  }, React__default.createElement(IconClose, {
    style: {
      color: "#FFF"
    }
  })), React__default.createElement("div", {
    className: styles$4.imageModalContents
  }, React__default.createElement("img", {
    src: src,
    alt: alt,
    title: title
  }))));
};

var SVideo = function SVideo(props) {
  var className = props.className;
  return React__default.createElement("div", {
    style: {
      position: "relative",
      padding: "56.25% 0 0 0"
    },
    className: className
  }, React__default.createElement("iframe", __assign({
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  }, props, {
    className: null
  })));
};

var css_248z$3 = ".index-module_title__EBJXy,.index-module_title__EBJXy p{color:#000;font-family:LexendDeca-SemiBold,LexendDeca;font-size:36px;font-weight:600;line-height:36px;margin-bottom:24px;position:relative}";
var styles$3 = {
  "title": "index-module_title__EBJXy"
};
styleInject(css_248z$3);

var STitle = function STitle(props) {
  return React__default.createElement("h1", {
    className: "".concat(styles$3.title, " s-title ").concat(props.className || "")
  }, props.children);
};

var css_248z$2 = ".index-module_header__gW-pO{background-color:#0070f3;box-sizing:border-box;color:#fff;min-height:28px;min-width:100px;padding:2px 20px;position:relative;width:100%;z-index:0}.index-module_header__gW-pO:after{border:15px solid transparent;border-left:30px solid #0070f3;bottom:-12px;content:\"\";height:0;position:absolute;right:5px;width:0;z-index:-1}.index-module_header__gW-pO.index-module_tips__XHiY6{background-color:#0070f3}.index-module_header__gW-pO.index-module_tips__XHiY6:after{border-left:30px solid #0070f3}.index-module_header__gW-pO.index-module_success__TDc-q{background-color:#1ed874}.index-module_header__gW-pO.index-module_success__TDc-q:after{border-left:30px solid #1ed874}.index-module_header__gW-pO.index-module_warning__dmFYo{background-color:#ffe021}.index-module_header__gW-pO.index-module_warning__dmFYo:after{border-left:30px solid #ffe021}.index-module_header__gW-pO.index-module_warning__dmFYo p{color:#171717!important}.index-module_header__gW-pO.index-module_failure__KOtv4{background-color:#ec4e3a}.index-module_header__gW-pO.index-module_failure__KOtv4:after{border-left:30px solid #ec4e3a}.index-module_header__gW-pO p{color:#fff!important;font-family:LexendDeca-Regular,LexendDeca;font-size:14px;font-weight:400;line-height:24px;margin:0;min-height:24px}.index-module_header__gW-pO p>div{min-height:24px}";
var styles$2 = {
  "header": "index-module_header__gW-pO",
  "tips": "index-module_tips__XHiY6",
  "success": "index-module_success__TDc-q",
  "warning": "index-module_warning__dmFYo",
  "failure": "index-module_failure__KOtv4"
};
styleInject(css_248z$2);

var SCalloutHeader = function SCalloutHeader(props) {
  var children = props.children,
    _a = props.type,
    type = _a === void 0 ? "tips" : _a,
    editable = props.editable;
  return React__default.createElement("div", {
    className: "".concat(styles$2.header, " ").concat(styles$2[type]),
    style: {
      marginTop: editable ? 0 : "28px"
    }
  }, children);
};

var css_248z$1 = ".index-module_inner_wrap__DNVRJ{background:#fff;box-shadow:0 4px 20px 0 rgba(83,22,139,.05);box-sizing:border-box;padding:12px 20px;width:100%}.index-module_inner_wrap__DNVRJ p{color:#171717;font-family:LexendDeca-Light,LexendDeca;font-size:14px;font-weight:300;line-height:24px;margin:0;min-height:24px}";
var styles$1 = {
  "inner_wrap": "index-module_inner_wrap__DNVRJ"
};
styleInject(css_248z$1);

var SCalloutContent = function SCalloutContent(props) {
  var children = props.children,
    editable = props.editable;
  return React__default.createElement("div", {
    className: styles$1.inner_wrap,
    style: {
      marginBottom: editable ? 0 : "28px"
    }
  }, children || React__default.createElement("br", null));
};

var css_248z = ".index-module_wrapper__pazHC{margin:28px 0}";
var styles = {
  "wrapper": "index-module_wrapper__pazHC"
};
styleInject(css_248z);

var SCallout = function SCallout(props) {
  var children = props.children;
  return React__default.createElement("div", {
    className: styles.wrapper
  }, children);
};

var STable = function STable(_a) {
  var children = _a.children,
    colgroup = _a.colgroup,
    width = _a.width;
  var colgroupData = colgroup.split(",");
  return React__default.createElement("div", {
    className: "tableWrapper"
  }, React__default.createElement("div", {
    className: "scrollWrapper"
  }, React__default.createElement("table", {
    style: {
      width: width ? width + "px" : ""
    }
  }, colgroup && React__default.createElement("colgroup", null, colgroupData.map(function (col, index) {
    return React__default.createElement("col", {
      key: index,
      style: {
        width: col + "px"
      }
    });
  })), React__default.createElement("tbody", null, children))));
};

var STableRow = function STableRow(_a) {
  var children = _a.children;
  return React__default.createElement("tr", null, children);
};

var STableCell = function STableCell(_a) {
  var children = _a.children,
    colspan = _a.colspan,
    rowspan = _a.rowspan;
  return React__default.createElement("td", {
    colSpan: colspan ? colspan : 1,
    rowSpan: rowspan ? rowspan : 1
  }, children || React__default.createElement("br", null));
};

var STableHeader = function STableHeader(_a) {
  var children = _a.children,
    colspan = _a.colspan,
    rowspan = _a.rowspan;
  return React__default.createElement("th", {
    colSpan: colspan ? colspan : 1,
    rowSpan: rowspan ? rowspan : 1
  }, children);
};

var SQuote = function SQuote(props) {
  return React__default.createElement("blockquote", null, props.children || React__default.createElement("br", null));
};

export { SCallout, SCalloutContent, SCalloutHeader, SCodeBlock, SCodeBlockTab, SH, SImage, SQuote, STable, STableCell, STableHeader, STableRow, STitle, SVideo };
//# sourceMappingURL=index.esm.js.map
