import { useState } from 'react';
import pdfjsLib from 'pdfjs-dist';
import { PDFPageView } from 'pdfjs-dist/web/pdf_viewer';

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

var usePdf = function usePdf() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      pdfImgs = _useState2[0],
      setPdfImgs = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isError = _useState6[0],
      setError = _useState6[1]; // eslint-disable-next-line no-async-promise-executor


  var createTask = function createTask(page, pdf) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
        var _pageView$canvas;

        var scale, pdfPage, container, pageView, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scale = 2;
                _context.next = 3;
                return pdf.getPage(page);

              case 3:
                pdfPage = _context.sent;
                container = document.createElement('div'); // @ts-ignore

                pageView = new PDFPageView({
                  container: container,
                  id: page + 1,
                  scale: scale,
                  defaultViewport: pdfPage.getViewport({
                    scale: scale
                  })
                });
                pageView.setPdfPage(pdfPage);
                _context.next = 9;
                return pageView.draw();

              case 9:
                data = (_pageView$canvas = pageView.canvas) === null || _pageView$canvas === void 0 ? void 0 : _pageView$canvas.toDataURL('image/png', scale);
                pageView.destroy();
                resolve(data);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  var renderPng = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pdf) {
      var task, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              try {
                task = [];

                for (i = 1; i <= pdf.numPages; i++) {
                  task.push(createTask(i, pdf));
                }

                Promise.all(task).then(function (imgs) {
                  setPdfImgs(imgs);
                }).catch(function (error) {
                  throw error;
                });
              } catch (error) {
                setLoading(false);
                setError(true);
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function renderPng(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getPdfImg = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
      var pdf;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              setLoading(true);
              _context3.next = 4;
              return pdfjsLib.getDocument(url).promise;

            case 4:
              pdf = _context3.sent;
              _context3.next = 7;
              return renderPng(pdf);

            case 7:
              _context3.next = 14;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              setLoading(false);
              setError(true);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    return function getPdfImg(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    pdfImgs: pdfImgs,
    isLoading: isLoading,
    isError: isError,
    getPdfImg: getPdfImg
  };
};

export { usePdf };
