'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hacksForJSONImpl = require('./hacksForJSONImpl');

var _models = require('./models');

var layerGroup = function layerGroup(x, y, width, height, opacity, resizingConstraint) {
  return {
    _class: 'group',
    do_objectID: (0, _models.generateID)(),
    exportOptions: {
      _class: 'exportOptions',
      exportFormats: [],
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false
    },
    frame: (0, _models.makeRect)(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 2,
    name: 'Group',
    nameIsFixed: false,
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    style: {
      _class: 'style',
      endDecorationType: 0,
      miterLimit: 10,
      startDecorationType: 0,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: opacity
      }
    },
    hasClickThrough: false,
    layers: []
  };
};

exports.default = layerGroup;