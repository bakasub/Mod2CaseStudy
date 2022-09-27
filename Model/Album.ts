import {Song} from "./Song";

export class Album {
    private _name: string;
    private _id: number;
    private _madeByUser: string;
    public albumSongList: Song[] = [];


    constructor(name: string, id: number, madeByUser: string, albumSongList: Song[]) {
        this._name = name;
        this._id = id;
        this._madeByUser = madeByUser;
        this.albumSongList = albumSongList;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get madeByUser(): string {
        return this._madeByUser;
    }

    set madeByUser(value: string) {
        this._madeByUser = value;
    }
}