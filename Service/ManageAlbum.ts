import {Manage} from "./Manage";
import {Album} from "../Model/Album";

export class ManageAlbum implements Manage<Album> {
    public listAlbum: Album[] = []

    add(t: Album) {
        this.listAlbum.push(t)
    }

    update(id: number, t: Album) {
        let index = this.findById(id)
        this.listAlbum[index] = t
    }

    remove(id: number) {
        let index = this.findById(id)
        this.listAlbum.splice(index,1)
    }

    findAll() {
        return this.listAlbum
    }

    findById(id: number) {
        for (let i = 0; i < this.listAlbum.length; i++) {
            if (id == this.listAlbum[i].id) {
                return i
            }
        }
    }

    filterByUser(user: string) {
        let filteredList = []
        for (let i = 0; i < this.listAlbum.length; i++) {
            if (user == this.listAlbum[i].madeByUser){
                filteredList.push(this.listAlbum[i])
            }
        }
        return filteredList
    }
}