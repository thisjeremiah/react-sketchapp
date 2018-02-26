"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var resetLayer = exports.resetLayer = function resetLayer(container) {
  var layers = container.children();
  // Skip last child since it is the container itself
  for (var l = 0; l < layers.count() - 1; l += 1) {
    var layer = layers.objectAtIndex(l);
    layer.removeFromParent();
  }
};

// Clear out all document pages and layers
var resetDocument = exports.resetDocument = function resetDocument() {
  // Get Pages and delete them all (Except Symbols Page)
  var pages = context.document.pages();
  for (var index = pages.length - 1; index >= 0; index -= 1) {
    var page = pages[index];
    // Don't delete symbols page
    // NOTE: Must use != instead of !== due to page.name() being a MSBoxedObject
    // eslint-disable-next-line
    if (page.name() != "Symbols") {
      if (pages.length > 1) {
        context.document.documentData().removePageAtIndex(index);
      } else {
        resetLayer(pages[index]);
      }
    }
  }
};