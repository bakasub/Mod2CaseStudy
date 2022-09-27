"use strict";
exports.__esModule = true;
exports.Album = void 0;
var Album = /** @class */ (function () {
    function Album(name, id, madeByUser, albumSongList) {
        this.albumSongList = [];
        this._name = name;
        this._id = id;
        this._madeByUser = madeByUser;
        this.albumSongList = albumSongList;
    }
    Object.defineProperty(Album.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "madeByUser", {
        get: function () {
            return this._madeByUser;
        },
        set: function (value) {
            this._madeByUser = value;
        },
        enumerable: false,
        configurable: true
    });
    return Album;
}());
exports.Album = Album;
