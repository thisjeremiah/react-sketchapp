"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  return ctx.document || ctx.actionContext.document || NSDocumentController.sharedDocumentController().currentDocument() || MSDocument.currentDocument();
};