/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".hidden {\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  font-family: \"Roboto Slab\", serif;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n  line-height: 1.6rem;\n  color: rgba(255, 255, 255, 0.9);\n  text-transform: capitalize;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nbutton {\n  text-transform: none;\n  font-family: \"Roboto Slab\", serif;\n  font-weight: bolder;\n  font-size: 1.6rem;\n  border: none;\n  background: none;\n  color: #f3d17c;\n  cursor: pointer;\n  position: relative;\n  transition: 1s;\n}\nbutton:hover, button:focus {\n  color: #fdf1af;\n}\nbutton:before {\n  content: \"\";\n  border-bottom: 4px solid #fdf1af;\n  border-spacing: 0.2rem;\n  transition: 0.5s;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 0;\n}\nbutton:hover:before {\n  width: 100%;\n  border-bottom: 4px solid #fdf1af;\n  opacity: 1;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: normal;\n  font-style: normal;\n  font-size: 1rem;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: space-between;\n  justify-content: center;\n  flex-wrap: nowrap;\n}\n\nh1 {\n  align-self: center;\n  font-size: 5rem;\n}\n\nh2 {\n  align-self: flex-end;\n  margin-left: auto;\n  font-size: 2rem;\n}\n\nh3,\nh4,\nh5,\nh6,\nh7 {\n  font-size: 1.6rem;\n  font-weight: bold;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n  justify-content: center;\n  flex-wrap: nowrap;\n  padding: 0.5rem 1rem;\n  background: #959d7a;\n  height: 10%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  height: 85%;\n  width: 100%;\n  background: #d9e0a3;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  width: 40%;\n  padding: 1rem;\n  border-radius: 10px;\n  background: #5e3917;\n  font-size: 1.5rem;\n  width: auto;\n}\n\narticle {\n  padding: 2rem;\n}\n\nfooter {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: nowrap;\n  height: 5%;\n  background: #959d7a;\n}\n\nli {\n  line-height: 3rem;\n}\n\n.room-view {\n  display: flex;\n  flex-direction: row;\n  align-items: space-around;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  height: 100%;\n  overflow: scroll;\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  align-items: space-between;\n  justify-content: center;\n  flex-wrap: nowrap;\n  margin: 0.4rem 0.4rem;\n  border-radius: 5px;\n  padding: 0.2rem 0.2rem;\n  background: #959d7a;\n}", "",{"version":3,"sources":["webpack://./src/css/scss/02-tools/_tools.scss","webpack://./src/css/styles.scss","webpack://./src/css/scss/03-generics/_generic.scss","webpack://./src/css/scss/01-settings/_settings.scss","webpack://./src/css/scss/04-elements/_elements.scss","webpack://./src/css/scss/05-objects/_objects.scss"],"names":[],"mappings":"AACA;EACE,mBAAA;EACA,qBAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,UAAA;ACCF;;ACTA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;ADYF;;ACTA;EACE,iCCIY;AFQd;;ACTA;EACE,aAAA;EACA,YAAA;EACA,mBAAA;EACA,+BCLwB;EDMxB,0BAAA;ADYF;;ACTA;;EAEE,gBAAA;ADYF;;ACTA;EACE,oBAAA;EACA,iCCdY;EDeZ,mBAAA;EACA,iBAAA;EACA,YAAA;EACA,gBAAA;EACA,cCxBiB;EDyBjB,eAAA;EACA,kBAAA;EACA,cAAA;ADYF;ACXE;EAEE,cC/Ba;AF2CjB;ACVE;EACE,WAAA;EACA,gCAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;ADYJ;ACVE;EACE,WAAA;EACA,gCAAA;EACA,UAAA;ADYJ;;ACRA;;;;;;EAME,mBAAA;EACA,kBAAA;EACA,eCnDa;AF8Df;;AG1EA;EJaE,aAAA;EACA,sBIbiB;EJiBjB,0BIhBc;EJiBd,uBIjB6B;EJkB7B,iBAHmC;ACiErC;;AG7EA;EACE,kBAAA;EACA,eAAA;AHgFF;;AG7EA;EACE,oBAAA;EACA,iBAAA;EACA,eAAA;AHgFF;;AG7EA;;;;;EAKE,iBAAA;EACA,iBAAA;AHgFF;;AG7EA;EJZE,aAAA;EACA,mBIYiB;EJRjB,qBISc;EJRd,uBIQwB;EJPxB,iBAHmC;EIWnC,oBAAA;EACA,mBD1Bc;EC2Bd,WAAA;AHmFF;;AGhFA;EJpBE,aAAA;EACA,sBIoBiB;EJhBjB,mBIiBc;EJhBd,uBIgBsB;EJftB,iBAHmC;EImBnC,WAAA;EACA,WAAA;EACA,mBDlCgB;AFwHlB;;AGnFA;EJ5BE,aAAA;EACA,sBI4BiB;EJxBjB,mBIyBc;EJxBd,uBIwBsB;EJvBtB,iBAHmC;EI2BnC,UAAA;EACA,aAAA;EACA,mBAAA;EACA,mBDxCc;ECyCd,iBAAA;EACA,WAAA;AHyFF;;AGtFA;EACE,aAAA;AHyFF;;AGtFA;EJ3CE,aAAA;EACA,mBI2CiB;EJvCjB,mBIwCc;EJvCd,6BIuCsB;EJtCtB,iBAHmC;EI0CnC,UAAA;EACA,mBDzDc;AFqJhB;;AGzFA;EACE,iBAAA;AH4FF;;AI5JA;ELaE,aAAA;EACA,mBKbiB;ELiBjB,yBKhBc;ELiBd,6BKjB4B;ELkB5B,eKlB0C;EAC1C,YAAA;EACA,gBAAA;AJkKF;;AI/JA;ELME,aAAA;EACA,sBKNiB;ELUjB,0BKTc;ELUd,uBKV6B;ELW7B,iBAHmC;EKPnC,qBAAA;EACA,kBAAA;EACA,sBAAA;EACA,mBFVc;AF+KhB","sourcesContent":["// class tools\n.hidden {\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n// mixins\n@mixin flexbox($direction) {\n  display: flex;\n  flex-direction: $direction;\n}\n\n@mixin flex($align, $justify, $wrap: nowrap) {\n  align-items: $align;\n  justify-content: $justify;\n  flex-wrap: $wrap;\n}\n","@import url(\"https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600&display=swap\");\n.hidden {\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  font-family: \"Roboto Slab\", serif;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n  line-height: 1.6rem;\n  color: rgba(255, 255, 255, 0.9);\n  text-transform: capitalize;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nbutton {\n  text-transform: none;\n  font-family: \"Roboto Slab\", serif;\n  font-weight: bolder;\n  font-size: 1.6rem;\n  border: none;\n  background: none;\n  color: #f3d17c;\n  cursor: pointer;\n  position: relative;\n  transition: 1s;\n}\nbutton:hover, button:focus {\n  color: #fdf1af;\n}\nbutton:before {\n  content: \"\";\n  border-bottom: 4px solid #fdf1af;\n  border-spacing: 0.2rem;\n  transition: 0.5s;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 0;\n}\nbutton:hover:before {\n  width: 100%;\n  border-bottom: 4px solid #fdf1af;\n  opacity: 1;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: normal;\n  font-style: normal;\n  font-size: 1rem;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: space-between;\n  justify-content: center;\n  flex-wrap: nowrap;\n}\n\nh1 {\n  align-self: center;\n  font-size: 5rem;\n}\n\nh2 {\n  align-self: flex-end;\n  margin-left: auto;\n  font-size: 2rem;\n}\n\nh3,\nh4,\nh5,\nh6,\nh7 {\n  font-size: 1.6rem;\n  font-weight: bold;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n  justify-content: center;\n  flex-wrap: nowrap;\n  padding: 0.5rem 1rem;\n  background: #959d7a;\n  height: 10%;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  height: 85%;\n  width: 100%;\n  background: #d9e0a3;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  width: 40%;\n  padding: 1rem;\n  border-radius: 10px;\n  background: #5e3917;\n  font-size: 1.5rem;\n  width: auto;\n}\n\narticle {\n  padding: 2rem;\n}\n\nfooter {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: nowrap;\n  height: 5%;\n  background: #959d7a;\n}\n\nli {\n  line-height: 3rem;\n}\n\n.room-view {\n  display: flex;\n  flex-direction: row;\n  align-items: space-around;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  height: 100%;\n  overflow: scroll;\n}\n\n.room-card {\n  display: flex;\n  flex-direction: column;\n  align-items: space-between;\n  justify-content: center;\n  flex-wrap: nowrap;\n  margin: 0.4rem 0.4rem;\n  border-radius: 5px;\n  padding: 0.2rem 0.2rem;\n  background: #959d7a;\n}","* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  font-family: $font-family;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n  line-height: 1.6rem;\n  color: $color-transparent-light;\n  text-transform: capitalize;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nbutton {\n  text-transform: none;\n  font-family: $font-family;\n  font-weight: bolder;\n  font-size: 1.6rem;\n  border: none;\n  background: none;\n  color: $color-quaternary;\n  cursor: pointer;\n  position: relative;\n  transition: 1s;\n  &:hover,\n  &:focus {\n    color: $color-tertiary;\n  }\n  &:before {\n    content: \"\";\n    border-bottom: 4px solid $color-tertiary;\n    border-spacing: 0.2rem;\n    transition: 0.5s;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 0;\n  }\n  &:hover:before {\n    width: 100%;\n    border-bottom: 4px solid $color-tertiary;\n    opacity: 1;\n  }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: normal;\n  font-style: normal;\n  font-size: $default-size;\n}\n","@import url(\"https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600&display=swap\");\n\n// Colors\n$color-primary: rgb(149, 157, 122);\n$color-secondary: hsla(67, 50%, 76%, 1);\n$color-tertiary: hsla(51, 95%, 84%, 1);\n$color-quaternary: hsla(43, 83%, 72%, 1);\n$color-quinary: rgb(94, 57, 23);\n$color-transparent-dark: hsla(2, 0, 0, 0.9);\n$color-transparent-light: hsl(0, 0%, 100%, 0.9);\n// Font\n$font-family: \"Roboto Slab\", serif;\n$default-size: 1rem;\n","body {\n  @include flexbox(column);\n  @include flex(space-between, center);\n}\n\nh1 {\n  align-self: center;\n  font-size: 5rem;\n}\n\nh2 {\n  align-self: flex-end;\n  margin-left: auto;\n  font-size: 2rem;\n}\n\nh3,\nh4,\nh5,\nh6,\nh7 {\n  font-size: 1.6rem;\n  font-weight: bold;\n}\n\nheader {\n  @include flexbox(row);\n  @include flex(flex-end, center);\n  padding: 0.5rem 1rem;\n  background: $color-primary;\n  height: 10%;\n}\n\nmain {\n  @include flexbox(column);\n  @include flex(center, center);\n  height: 85%;\n  width: 100%;\n  background: $color-secondary;\n}\n\nsection {\n  @include flexbox(column);\n  @include flex(center, center);\n  width: 40%;\n  padding: 1rem;\n  border-radius: 10px;\n  background: $color-quinary;\n  font-size: 1.5rem;\n  width: auto;\n}\n\narticle {\n  padding: 2rem;\n}\n\nfooter {\n  @include flexbox(row);\n  @include flex(center, space-around);\n  height: 5%;\n  background: $color-primary;\n}\n\nli {\n  line-height: 3rem;\n}\n",".room-view {\n  @include flexbox(row);\n  @include flex(space-around, space-around, wrap);\n  height: 100%;\n  overflow: scroll;\n}\n\n.room-card {\n  @include flexbox(column);\n  @include flex(space-between, center);\n  margin: 0.4rem 0.4rem;\n  border-radius: 5px;\n  padding: 0.2rem 0.2rem;\n  background: $color-primary;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchHotelData": () => (/* binding */ fetchHotelData),
/* harmony export */   "postHotelData": () => (/* binding */ postHotelData)
/* harmony export */ });
const fetchData = (query) => fetch(`http://localhost:3001/api/v1/${query}`)
  .then(response => response.json())
  .catch(err => console.log('error'))

const fetchHotelData = () => {
  return Promise.all([
    fetchData('customers'), 
    fetchData('rooms'), 
    fetchData('bookings')
  ])
}

const postHotelData = (data) => {
  let body = {
    'userID': data.userID,
    'date': data.date,
    'roomNumber': data.roomNumber
  }
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Guest": () => (/* binding */ Guest)
/* harmony export */ });
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Hotel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



class Guest extends _User__WEBPACK_IMPORTED_MODULE_0__.User {
  constructor(user) {
    super(user) 
    this.guestBookings = []
    this.valuation = 0
    this.overlook;
  }
  generateHotel(rooms, bookings) {
    this.overlook = new _Hotel__WEBPACK_IMPORTED_MODULE_1__.Hotel()
    this.overlook.generate(rooms, bookings)
  }
  filterRoomsByDate(date) {
    this.overlook.selectDate(date)
    this.overlook.findAvailableRooms()
  }
  filterRoomsByType(type) {
    this.overlook.filterRooms(type)
  }
  addBookings(bookedRoom) {
    this.guestBookings.push(bookedRoom)
    this.valuation += bookedRoom.costPerNight
  }
  bookRoom(number) {
    this.guestBookings = this.overlook.availableRooms.filter(room => {
      if (room.number === number) {
        return room
      }
    })
  }
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor(user) {
    this.id = user.id
    this.name = user.name
    this.username = this.name.split(' ')[1].toLowerCase() + this.id
    this.password = 'overlook2021'
  }
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hotel": () => (/* binding */ Hotel)
/* harmony export */ });
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);



class Hotel {
  constructor() {
    this.date = '2000/12/25',
    this.rooms = [],
    this.bookings = [],
    this.availableRooms = [],
    this.filteredByTypeRooms = []
    this.pendingBookings = [],
    this.availability = 0
  }
  generate(hotelRooms, hotelBookings) {
    this.generateRooms(hotelRooms)
    this.generateBookings(hotelBookings)
  }
  generateRooms(hotelRooms) {
    hotelRooms.forEach(room => {
      this.rooms.push(new _Room__WEBPACK_IMPORTED_MODULE_1__.Room(room))
    }) 
  }
  generateBookings(hotelBookings) {
    hotelBookings.forEach(booking => {
      this.bookings.push(new _Booking__WEBPACK_IMPORTED_MODULE_0__.Booking(booking))
    })
  }
  parseDate(date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    dd < 10 ? dd = `0${dd}` : null
    mm < 10 ? mm = `0${mm}` : null     
    this.date = `${yyyy}/${mm}/${dd}`
  }
  selectDate(date) {
    if (new Date(date).valueOf() < new Date().valueOf()) {
      const today = new Date()
      this.parseDate(today)
    } else {
      const futureDate = new Date(date)
      this.parseDate(futureDate)
    }
  }
  findAvailableRooms() {
    return this.rooms.forEach(room => { 
      this.bookings.forEach(booking => {
        if (booking.date !== this.date && booking.roomNumber === room.number) {
          room.isBooked = true
        }
      })
      if (!room.isBooked) {
        this.availableRooms.push(room)
      } else if (!this.availableRooms) {
        this.availableRooms.push(room)
      }
    })
  }
  filterRooms(type) {
    return this.availableRooms.forEach(room => {
      if (room.roomType === type) {
        this.filteredByTypeRooms.push(room)
      }
    })
  }
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Booking": () => (/* binding */ Booking)
/* harmony export */ });
class Booking {
  constructor(booking) {
    this.id = booking.id
    this.userID = booking.userID
    this.date = booking.date
    this.roomNumber = booking.roomNumber
    this.roomServiceCharges = booking.roomServiceCharges || []
  }
}



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Room": () => (/* binding */ Room)
/* harmony export */ });
class Room {
  constructor(room) {
    this.number = room.number
    this.roomType = room.roomType
    this.bidet = room.bidet
    this.bedSize = room.bedSize
    this.numBeds = room.numBeds
    this.costPerNight = room.costPerNight
    this.isBooked = false
  }
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetHome": () => (/* binding */ resetHome),
/* harmony export */   "retrieveBook": () => (/* binding */ retrieveBook),
/* harmony export */   "showCalendar": () => (/* binding */ showCalendar),
/* harmony export */   "bookedMessage": () => (/* binding */ bookedMessage),
/* harmony export */   "removeRoom": () => (/* binding */ removeRoom)
/* harmony export */ });
/* harmony import */ var _components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* eslint-disable max-len */


// query selectors
const home = document.querySelector('#home')
const portal = document.querySelector('#portal')
const availableRoomsView = document.querySelector('#availableRoomsView')
const guestMenu = document.querySelector('#guestMenu')
const viewCalendar = document.querySelector('#viewCalendar')
const menuHeader = document.querySelector('#menuHeader')
const dynamicMsg = document.querySelector('#dynamicMsg')
const bookingMsg = document.querySelector('#bookingMsg')
const loginPortal = document.querySelector('#loginPortal')

home.addEventListener('click', (event) => {
  event.preventDefault();  
  resetHome()
})

const resetHome = () => {
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.hide)([availableRoomsView, viewCalendar, loginPortal])
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.show)([portal, guestMenu])
}

const retrieveBook = (guestBook, selectedDate, allBookings) => {
  let filter = ''
  selectedDate === 'myBookings' ? filter = 'myBookings' : filter = 'Date'
  fetchGuestBookings(guestBook, allBookings)
  prerenderRoom(guestBook, filter, selectedDate)
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.hide)(portal)
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.show)(availableRoomsView)
}

const fetchGuestBookings = (guestBook, bookings) => {
  let guest = guestBook[0]  
  let hotelRooms = guest.overlook.rooms
  return bookings.forEach(booking => {
    return hotelRooms.forEach(room => {
      if (booking.userID === guest.id && booking.roomNumber === room.number) {
        guest.addBookings(room)
      }
    })
  })
}

const prerenderRoom = (guestBook, filter, query) => {
  availableRoomsView.innerHTML = ''        
  let guest = guestBook[0]
  let availableRooms = guest.overlook.availableRooms
  let filteredRooms = guest.overlook.filteredByTypeRooms
  let guestBookings = guest.guestBookings
  filter === 'Date' ? guest.filterRoomsByDate(query) : guest.filterRoomsByType(query) 
  if (filteredRooms.length >= 1)  {
    availableRooms = filteredRooms
  } else if (filter === 'myBookings') {
    availableRooms = guestBookings
  }
  renderRooms(availableRooms)
  renderMsg(filter, guest) 
}

const renderRooms = (availableRooms) => {
  availableRooms.forEach(room => {
    availableRoomsView.innerHTML += `     
    <article id="${room.number}" tabindex="0" aria-label="A ${room.roomType} with ${room.numBed} bed(s) that is $${room.costPerNight.toFixed(2)} per night" class="room-card">
    <p>Room number: <span>${room.number}</span></p>
    <p>Room type: <span>${room.roomType}</span></p>
    <p>Bidet: <span>${room.bidet}</span></p>
    <p>Bed Size: <span>${room.bedSize}</span></p>
    <p>Number of beds: <span>${room.numBeds}</span></p>
    <p>Cost per night: $<span>${room.costPerNight.toFixed(2)}</span></p>
  </article>`
  }) 
}

const renderMsg = (filter, guest) => {
  if (filter === 'myBookings') {
    dynamicMsg.innerHTML = `${guest.name.split(' ')[0]}'s expenditures: $${guest.valuation.toFixed(2)}`
  }
}
 
const showCalendar = () => {
  menuHeader.innerHTML = `Find Available Rooms`
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.hide)(guestMenu)
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.show)(viewCalendar)
}

const bookedMessage = () => {
  return setTimeout(() => {
    removeRoom();
    dynamicMsg.innerHTML = 'Booked!'
    ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.show)([portal, guestMenu])
    ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.hide)([bookingMsg])
  }, 5000)
}

const removeRoom = () => {
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.hide)([availableRoomsView, viewCalendar])
  ;(0,_components_utility_hideShow__WEBPACK_IMPORTED_MODULE_0__.show)([bookingMsg])
} 



/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show)
/* harmony export */ });
const hide = (e) =>{
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.add('hidden')
    })
  } else {
    e.classList.add('hidden')
  }
}

const show = (e) => {
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.remove('hidden')
    })
  } else {
    e.classList.remove('hidden')
  }
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "today": () => (/* binding */ today)
/* harmony export */ });
const getToday = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  const yyyy = today.getFullYear()
  if (dd < 10) {
    dd = `0${dd}` 
  } else if (mm < 10) {
    (
      mm = `0${mm}`
    )
  }  
  return `${yyyy}/${mm}/${dd}`
}    

const today = getToday()

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "guestBook": () => (/* binding */ guestBook),
/* harmony export */   "allBookings": () => (/* binding */ allBookings),
/* harmony export */   "currentGuest": () => (/* binding */ currentGuest)
/* harmony export */ });
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _components_classes_Guest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _domMani__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _components_utility_getToday__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* eslint-disable max-len */






// global varibles and exports
let guestBook, allBookings, currentGuest

// querySelectors
const btnLogin = document.querySelector('#btnLogin')
const btnViewTodayRooms = document.querySelector('#btnViewTodayRooms')
const btnViewDateRooms = document.querySelector('#btnViewDateRooms')
const btnViewMyBookings = document.querySelector('#btnViewMyBookings')
const btnChooseDate = document.querySelector('#btnChooseDate')
const dateSelector = document.querySelector('#dateSelector')
const availableRooms = document.querySelector('#availableRoomsView')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

// event listeners
window.addEventListener('load', instaniateGuestbook)

btnViewTodayRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel(_components_utility_getToday__WEBPACK_IMPORTED_MODULE_4__.today)
})

btnViewDateRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  (0,_domMani__WEBPACK_IMPORTED_MODULE_3__.showCalendar)()
})

btnChooseDate.addEventListener('click', (event) => {
  event.preventDefault();  
  const calDate = dateSelector.value.split('-').join('/')
  instantiateHotel(calDate)
})

btnViewMyBookings.addEventListener('click', (event) => {
  event.preventDefault();  
  instantiateHotel('myBookings')
})

availableRooms.addEventListener('click', (event) => {
  event.preventDefault();  
  fetchBookingData(event)
})

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();  
  verifyLogin()
})


/// login functions 

const verifyLogin = () => {
  instaniateGuestbook()
  let isUsernameValid = false
  let isPasswordValid = false
  guestBook.forEach(guest => {
    if (guest.username === username.value && password.value === 'overlook2021') {
      isPasswordValid = true
      isUsernameValid = true
    }
    if (isUsernameValid && isPasswordValid) {
      (0,_domMani__WEBPACK_IMPORTED_MODULE_3__.resetHome)()
    } else {
      console.log('failed to login')
    }
  })
}

// instantiation functions
function instantiateHotel(selectedDate) {
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchHotelData)(selectedDate)
    .then(promise => {
      guestBook = promise[0].customers.map(user => new _components_classes_Guest__WEBPACK_IMPORTED_MODULE_2__.Guest(user)) 
      allBookings = promise[2].bookings
      const filteredBookings = filterBookingsByDate(allBookings, selectedDate)
      guestBook.map(guest => {
        return guest.generateHotel(promise[1].rooms, filteredBookings)
      })
      ;(0,_domMani__WEBPACK_IMPORTED_MODULE_3__.retrieveBook)(guestBook, selectedDate, allBookings)
    }) 
    .catch(error => {
      console.log('Sorry, servers are down')
    })
} 

function instaniateGuestbook() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchHotelData)()
    .then(promise => {
      guestBook = promise[0].customers.map(user => new _components_classes_Guest__WEBPACK_IMPORTED_MODULE_2__.Guest(user)) 
    })
  return guestBook
}

const filterBookingsByDate = (bookings, date)  => {
  return bookings.filter(booking => {
    if (booking.date.includes(date)) {
      return booking
    }
  })
}

// booking functions
function fetchBookingData(event) {
  if (event.target.closest('article')) {
    let userID = guestBook[0].id
    let date = guestBook[0].overlook.date
    let roomNumber = parseInt(event.target.closest('article').id)
    const postData = {
      userID,
      date,
      roomNumber
    }
    postBookingData(postData)
  }
} 

const postBookingData = (postData) => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postHotelData)(postData)
    .then(response => {
      if (!response.ok) {
        return new Error()
      } else {
        return response.json()
      }
    })
    .then(success => {
      console.log('Success!')
      guestBook[0].addBooking
      ;(0,_domMani__WEBPACK_IMPORTED_MODULE_3__.bookedMessage)()
      return setTimeout(() => {
        ;(0,_domMani__WEBPACK_IMPORTED_MODULE_3__.removeRoom)();
      }, 1000)
    })
} 


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map