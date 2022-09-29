"use strict";
exports.__esModule = true;
exports.ManageAlbum = void 0;
var ManageAlbum = /** @class */ (function () {
    function ManageAlbum() {
        this.listAlbum = [];
    }
    ManageAlbum.prototype.add = function (t) {
        this.listAlbum.push(t);
    };
    ManageAlbum.prototype.update = function (id, t) {
        var index = this.findById(id);
        this.listAlbum[index] = t;
    };
    ManageAlbum.prototype.remove = function (id) {
        var index = this.findById(id);
        this.listAlbum.splice(index, 1);
    };
    ManageAlbum.prototype.findAll = function () {
        return this.listAlbum;
    };
    ManageAlbum.prototype.findById = function (id) {
        for (var i = 0; i < this.listAlbum.length; i++) {
            if (id == this.listAlbum[i].id) {
                return i;
            }
        }
    };
    ManageAlbum.prototype.availabilityCheck = function (id) {
        var avail = false;
        for (var i = 0; i < this.listAlbum.length; i++) {
            if (id == this.listAlbum[i].id) {
                avail = true;
            }
        }
        return avail;
    };
    return ManageAlbum;
}());
exports.ManageAlbum = ManageAlbum;
