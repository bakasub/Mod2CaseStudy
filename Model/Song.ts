export class Song {
    private _name: string;
    private _id: number;
    private _singer: string;
    private _composer: string;


    constructor(name: string, id: number, singer: string, composer: string) {
        this._name = name;
        this._id = id;
        this._singer = singer;
        this._composer = composer;
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

    get singer(): string {
        return this._singer;
    }

    set singer(value: string) {
        this._singer = value;
    }

    get composer(): string {
        return this._composer;
    }

    set composer(value: string) {
        this._composer = value;
    }
}