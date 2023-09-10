'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.REFRESH_EXP_TIME =
  exports.TOKEN_EXP_TIME =
  exports.VALID_IMG_MIME_TYPES =
  exports.COLLECTIONS =
  exports.CollectionEnum =
  exports.DEFAULT_OFFSET =
  exports.DEFAULT_LIMIT =
  exports.ROLES =
  exports.RolesEnum =
    void 0;
var RolesEnum;
(function (RolesEnum) {
  RolesEnum['ADMIN'] = 'ADMIN_ROLE';
  RolesEnum['USER'] = 'USER_ROLE';
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
exports.ROLES = Object.values(RolesEnum);
exports.DEFAULT_LIMIT = 5;
exports.DEFAULT_OFFSET = 0;
var CollectionEnum;
(function (CollectionEnum) {
  CollectionEnum['USERS'] = 'users';
  CollectionEnum['CATEGORIES'] = 'categories';
  CollectionEnum['PRODUCTS'] = 'products';
})(CollectionEnum || (exports.CollectionEnum = CollectionEnum = {}));
exports.COLLECTIONS = Object.values(CollectionEnum);
exports.VALID_IMG_MIME_TYPES = ['image/jpeg', 'image/png'];
exports.TOKEN_EXP_TIME = '1h';
exports.REFRESH_EXP_TIME = '2h';
//# sourceMappingURL=constants.js.map
