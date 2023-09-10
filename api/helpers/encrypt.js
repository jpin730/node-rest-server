'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.encrypt = void 0;
const bcryptjs_1 = require('bcryptjs');
const encrypt = (password) => {
  const salt = (0, bcryptjs_1.genSaltSync)();
  return (0, bcryptjs_1.hashSync)(password, salt);
};
exports.encrypt = encrypt;
//# sourceMappingURL=encrypt.js.map
