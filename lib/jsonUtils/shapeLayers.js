'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeShapeGroup = exports.makeRectShapeLayer = exports.makeShapePath = exports.makeRectPath = exports.makeVerticalPath = exports.makeHorizontalPath = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _hacksForJSONImpl = require('./hacksForJSONImpl');

var _models = require('./models');

var makeHorizontalPath = exports.makeHorizontalPath = function makeHorizontalPath() {
  return {
    _class: 'path',
    isClosed: false,
    points: [{
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0.5}'
    }, {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0.5}'
    }]
  };
};

var makeVerticalPath = exports.makeVerticalPath = function makeVerticalPath() {
  return {
    _class: 'path',
    isClosed: false,
    points: [{
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 1}'
    }]
  };
};

var makeRectPath = exports.makeRectPath = function makeRectPath() {
  var radii = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0];

  var _radii = _slicedToArray(radii, 4),
      r0 = _radii[0],
      r1 = _radii[1],
      r2 = _radii[2],
      r3 = _radii[3];

  return {
    _class: 'path',
    isClosed: true,
    points: [{
      _class: 'curvePoint',
      cornerRadius: r0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r1,
      curveFrom: '{1, 0}',
      curveMode: 1,
      curveTo: '{1, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r2,
      curveFrom: '{1, 1}',
      curveMode: 1,
      curveTo: '{1, 1}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 1}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r3,
      curveFrom: '{0, 1}',
      curveMode: 1,
      curveTo: '{0, 1}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 1}'
    }]
  };
};

var makeShapePath = exports.makeShapePath = function makeShapePath(frame, path, resizingConstraint) {
  return {
    _class: 'shapePath',
    frame: frame,
    do_objectID: (0, _models.generateID)(),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: 'Path',
    nameIsFixed: false,
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: -1,
    edited: false,
    path: path
  };
};

var makeRectShapeLayer = exports.makeRectShapeLayer = function makeRectShapeLayer(x, y, width, height) {
  var radii = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0, 0, 0, 0];
  var resizingConstraint = arguments[5];

  var fixedRadius = radii[0] || 0;
  return {
    _class: 'rectangle',
    do_objectID: (0, _models.generateID)(),
    frame: (0, _models.makeRect)(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: 'Path',
    nameIsFixed: false,
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: -1,
    edited: false,
    path: makeRectPath(radii),
    fixedRadius: fixedRadius,
    hasConvertedToNewRoundCorners: true
  };
};

var makeShapeGroup = exports.makeShapeGroup = function makeShapeGroup(frame) {
  var layers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fills = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var resizingConstraint = arguments[3];
  return {
    _class: 'shapeGroup',
    do_objectID: (0, _models.generateID)(),
    frame: frame,
    isLocked: false,
    isVisible: true,
    name: 'ShapeGroup',
    nameIsFixed: false,
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    style: {
      _class: 'style',
      endDecorationType: 0,
      fills: fills,
      miterLimit: 10,
      startDecorationType: 0
    },
    hasClickThrough: false,
    layers: layers,
    clippingMaskMode: 0,
    hasClippingMask: false,
    windingRule: 1
  };
};