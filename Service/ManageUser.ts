import {User} from "../Model/User";
import {Manage} from "./Manage";

export class ManageUser implements Manage<User> {
    listUser: User[] = [];

    add(t: User) {
        this.listUser.push(t)
    }

    update(id: number, t: User) {
    }

    remove(id: number) {
    }

    findAll() {
        return this.listUser
    }

    findById(id: number) {
    }
}