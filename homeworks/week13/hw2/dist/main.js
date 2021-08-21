/* eslint-disable */

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var commentsPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"addComment\": () => (/* binding */ addComment)\n/* harmony export */ });\nfunction getComments(apiUrl, siteKey, cb, page) {\r\n  fetch(`${apiUrl}/get_comments.php?site_key=${siteKey}&page=${page}`)\r\n  .then((res) => res.json())\r\n  .then((res) => cb(res))\r\n  .catch((res) => handleError(res))\r\n}\r\n\r\n\r\nfunction addComment(apiUrl, formData, cb) {\r\n  const option = {\r\n    body: formData,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded'\r\n    },\r\n    method: 'post'\r\n  }\r\n  fetch(`${apiUrl}/add_comment.php`, option)\r\n    .then((res) => res.json())\r\n    .then((res) => cb(res))\r\n    .catch((res) => handleError(res))\r\n}\r\n\r\nfunction handleError(msg) {\r\n  console.error(msg)\r\n  alert('Oops! something wrong.')\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ \"./src/templates.js\");\n\r\n\r\n\r\n\r\nfunction init(options) {\r\n  const { siteKey, apiUrl, container } = options\r\n\r\n  const containerElement = document.querySelector(container)\r\n  containerElement.innerHTML = (0,_templates__WEBPACK_IMPORTED_MODULE_2__.getFormTemplate)(siteKey)\r\n  const formEl = document.querySelector(`.${siteKey}-board-form`)\r\n  const moreBtnEl = document.querySelector(`.${siteKey}-btn-more`)\r\n  const styleElement = document.createElement('style')\r\n  styleElement.type = 'text/css'\r\n  styleElement.appendChild(document.createTextNode(_templates__WEBPACK_IMPORTED_MODULE_2__.CSS_TEMPLATE))\r\n  document.head.appendChild(styleElement)\r\n\r\n  const COMMENTS = {\r\n    _data: [],\r\n    page: undefined,\r\n    get data() {\r\n      return this._data\r\n    },\r\n    set data(value) {\r\n      this._data = value\r\n      render()\r\n    }\r\n  }\r\n\r\n  function handleError(msg) {\r\n    console.error(msg)\r\n    alert('Oops! something wrong.')\r\n  }\r\n\r\n  function render() {\r\n    const result = COMMENTS.data.reduce((pre, cur) => {\r\n      const str = _templates__WEBPACK_IMPORTED_MODULE_2__.CARD_TEMPLATE.replace('$nickname', (0,_utils__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(cur.nickname))\r\n        .replace('$content', (0,_utils__WEBPACK_IMPORTED_MODULE_1__.escapeHtml)(cur.content))\r\n      return (pre += str)\r\n    }, '')\r\n    document.querySelector(`.${siteKey}-comments`).innerHTML = result\r\n  }\r\n\r\n  function handleMoreBtn(bool) {\r\n    bool ? moreBtnEl.classList.add('d-none') : moreBtnEl.classList.remove('d-none')\r\n  }\r\n\r\n  function getNewComments(page = 1) {\r\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getComments)(apiUrl, siteKey, (data) => {\r\n      if (!data.ok) return handleError(data.message)\r\n      COMMENTS.data = page === 1 ? data.discussions : [...COMMENTS.data, ...data.discussions]\r\n      COMMENTS.page = page\r\n      handleMoreBtn(page === data.totalPage)\r\n    }, page) \r\n  }\r\n\r\n  function addNewComments(formData) {\r\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.addComment)(apiUrl, formData, (data) => {\r\n      if (!data.ok) return handleError(data.message)\r\n      getNewComments(COMMENTS.page)\r\n    })\r\n  }\r\n\r\n  formEl.addEventListener('submit', (e) => {\r\n    e.preventDefault()\r\n    const data = new URLSearchParams()\r\n    data.append('site_key', siteKey)\r\n    for (const pair of new FormData(e.target)) {\r\n      data.append(pair[0], pair[1])\r\n    }\r\n    addNewComments(data)\r\n    formEl.reset()\r\n  })\r\n  \r\n  moreBtnEl.addEventListener('click', () => getNewComments(++COMMENTS.page))\r\n  getNewComments(COMMENTS.page)\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/index.js?");

/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CARD_TEMPLATE\": () => (/* binding */ CARD_TEMPLATE),\n/* harmony export */   \"CSS_TEMPLATE\": () => (/* binding */ CSS_TEMPLATE),\n/* harmony export */   \"getFormTemplate\": () => (/* binding */ getFormTemplate)\n/* harmony export */ });\nconst CARD_TEMPLATE = `\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <h5 class=\"card-title\">$nickname</h5>\r\n      <p class=\"card-text\">$content</p>\r\n    </div>\r\n  </div>\r\n  `\r\n\r\nconst CSS_TEMPLATE = `.container{margin: 2rem auto;} .card{margin: 1rem 0;} .card:first-of-type{margin-top: 2rem;}`\r\n\r\nfunction getFormTemplate(prefix) {\r\n  return `\r\n    <h1 class=\"text-center\">${prefix} 留言板</h1>\r\n    <form class=\"${prefix}-board-form\">\r\n      <div class=\"form-group\">\r\n        <label>暱稱</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"nickname\" aria-describedby=\"emailHelp\" required>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>留言內容</label>\r\n        <textarea class=\"form-control\" name=\"content\" rows=\"3\" required></textarea>\r\n      </div>\r\n      <button class=\"btn btn-primary\">Submit</button>\r\n    </form>\r\n    <div class=\"${prefix}-comments\">\r\n    </div>\r\n    <div class=\"row mt-5\">\r\n      <div class=\"col text-center\">\r\n        <button type=\"button\" class=\"btn btn-success btn-lg ${prefix}-btn-more d-none\">more</button>\r\n      </div>\r\n    </div>\r\n  `\r\n}\n\n//# sourceURL=webpack://commentsPlugin/./src/templates.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"escapeHtml\": () => (/* binding */ escapeHtml)\n/* harmony export */ });\nfunction escapeHtml(unsafe) {\r\n  return unsafe\r\n    .replace(/&/g, '&amp;')\r\n    .replace(/</g, '&lt;')\r\n    .replace(/>/g, '&gt;')\r\n    .replace(/\"/g, '&quot;')\r\n    .replace(/'/g, '&#039;')\r\n}\r\n\n\n//# sourceURL=webpack://commentsPlugin/./src/utils.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	commentsPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;