"use strict";
exports.__esModule = true;
exports.ManageSong = void 0;
var ManageSong = /** @class */ (function () {
    function ManageSong() {
        this.listSong = [];
    }
    ManageSong.prototype.add = function (t) {
        this.listSong.push(t);
    };
    ManageSong.prototype.update = function (id, t) {
        var index = this.findById(id);
        this.listSong[index] = t;
    };
    ManageSong.prototype.remove = function (id) {
        var index = this.findById(id);
        this.listSong.splice(index, 1);
    };
    ManageSong.prototype.findAll = function () {
        return this.listSong;
    };
    ManageSong.prototype.findById = function (id) {
        for (var i = 0; i < this.listSong.length; i++) {
            if (id == this.listSong[i].id) {
                return i;
            }
        }
        return -1;
    };
    return ManageSong;
}());
exports.ManageSong = ManageSong;
