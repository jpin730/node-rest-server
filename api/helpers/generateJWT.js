'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = require('jsonwebtoken');
const generateJWT = (uid, expiresIn) =>
  new Promise((resolve, reject) => {
    const payload = { uid };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn };
    const callback = (err, token) =>
      err ? reject('Failed to generate token') : resolve(token);
    (0, jsonwebtoken_1.sign)(payload, secret, options, callback);
  });
exports.generateJWT = generateJWT;
//# sourceMappingURL=generateJWT.js.map
