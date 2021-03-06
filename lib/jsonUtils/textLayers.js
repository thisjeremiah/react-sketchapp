'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hacksForJSONImpl = require('./hacksForJSONImpl');

var _models = require('./models');

var makeTextLayer = function makeTextLayer(frame, name, textNodes, resizingConstraint) {
  return {
    _class: 'text',
    do_objectID: (0, _models.generateID)(),
    frame: frame,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: name,
    nameIsFixed: false,
    resizingConstraint: (0, _hacksForJSONImpl.makeResizeConstraint)(resizingConstraint),
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    attributedString: (0, _hacksForJSONImpl.makeEncodedAttributedString)(textNodes),
    automaticallyDrawOnUnderlyingPath: false,
    dontSynchroniseWithSymbol: false,
    // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
    glyphBounds: '',
    // glyphBounds: '{{0, 0}, {116, 17}}',
    heightIsClipped: false,
    lineSpacingBehaviour: 2,
    textBehaviour: 1
  };
};
exports.default = makeTextLayer;