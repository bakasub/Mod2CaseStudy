import {Manage} from "./Manage";
import {Song} from "../Model/Song";

export class ManageSong implements Manage<Song> {
    public listSong: Song[] = []

    add(t: Song) {
        this.listSong.push(t)
    }

    update(id: number, t: Song) {
        let index = this.findById(id)
        this.listSong[index] = t
    }

    remove(id: number) {
        let index = this.findById(id)
        this.listSong.splice(index,1)
    }

    findAll() {
        return this.listSong
    }

    findById(id: number) {
        for (let i = 0; i < this.listSong.length; i++) {
            if (id == this.listSong[i].id) {
                return i
            }
        }
    }
}