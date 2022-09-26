export class User {
    private _username: string;
    private _password: string;
    private _id: number;

    constructor(username: string, password: string, id: number) {
        this._username = username;
        this._password = password;
        this._id = id;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}