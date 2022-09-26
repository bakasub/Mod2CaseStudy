export interface Manage<T> {
    add(t: T);
    update(id: number, t: T);
    remove(id: number);
    findAll();
    findById(id: number);
}