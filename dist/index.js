'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var pdfjsLib = require('pdfjs-dist');
var pdfjsViewer = require('pdfjs-dist/web/pdf_viewer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pdfjsLib__default = /*#__PURE__*/_interopDefaultLegacy(pdfjsLib);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

const usePdf = () => {
  const _useState = react.useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        pdfImgs = _useState2[0],
        setPdfImgs = _useState2[1];

  const _useState3 = react.useState(true),
        _useState4 = _slicedToArray(_useState3, 2),
        isLoading = _useState4[0],
        setLoading = _useState4[1];

  const _useState5 = react.useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        isError = _useState6[0],
        setError = _useState6[1]; // eslint-disable-next-line no-async-promise-executor


  const createTask = (page, pdf) => new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve) {
      var _pageView$canvas;

      const scale = 2;
      const pdfPage = yield pdf.getPage(page);
      const container = document.createElement('div'); // @ts-ignore

      const pageView = new pdfjsViewer.PDFPageView({
        container,
        id: page + 1,
        scale,
        defaultViewport: pdfPage.getViewport({
          scale
        })
      });
      pageView.setPdfPage(pdfPage);
      yield pageView.draw();
      const data = (_pageView$canvas = pageView.canvas) === null || _pageView$canvas === void 0 ? void 0 : _pageView$canvas.toDataURL('image/png', scale);
      pageView.destroy();
      resolve(data);
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  const renderPng = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (pdf) {
      try {
        const task = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          task.push(createTask(i, pdf));
        }

        Promise.all(task).then(imgs => {
          setPdfImgs(imgs);
        }).catch(error => {
          throw error;
        });
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    });

    return function renderPng(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  const getPdfImg = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (url) {
      try {
        setLoading(true);
        const pdf = yield pdfjsLib__default['default'].getDocument(url).promise;
        yield renderPng(pdf);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    });

    return function getPdfImg(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    pdfImgs,
    isLoading,
    isError,
    getPdfImg
  };
};

exports.usePdf = usePdf;
