'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.intParser = void 0;
const intParser = (value, byDefault = 0) =>
  value && !isNaN(+value) ? +value : byDefault;
exports.intParser = intParser;
//# sourceMappingURL=intParser.js.map
