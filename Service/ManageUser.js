"use strict";
exports.__esModule = true;
exports.ManageUser = void 0;
var ManageUser = /** @class */ (function () {
    function ManageUser() {
        this.listUser = [];
    }
    ManageUser.prototype.add = function (t) {
        this.listUser.push(t);
    };
    ManageUser.prototype.update = function (id, t) {
    };
    ManageUser.prototype.remove = function (id) {
    };
    ManageUser.prototype.findAll = function () {
        return this.listUser;
    };
    ManageUser.prototype.findById = function (id) {
    };
    return ManageUser;
}());
exports.ManageUser = ManageUser;
