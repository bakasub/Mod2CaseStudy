import {ManageUser} from "../Service/ManageUser";
import {User} from "../Model/User";
import {ManageSong} from "../Service/ManageSong";
import {ManageAlbum} from "../Service/ManageAlbum";
import {Song} from "../Model/Song";

let input = require('readline-sync')
let listUser = new ManageUser()
let listSong = new ManageSong()
let listAlbum = new ManageAlbum()

function loginMenu() {
    let menu = `    Welcome to the music manager
    1.Login
    2.Register
    0.Exit`
    let choice;
    do {
        console.log(menu)
        choice = input.question()
        switch (choice) {
            case '1':
                logIn();
                choice = 0;
                break;
            case '2':
                register();
                break;
        }
    } while (choice != 0)
}

function register() {
    let username = input.question(`Input username\n`)
    let password = input.question(`Input password\n`)
    let id = (listUser.listUser.length + 1)
    let user = new User(username, password, id)
    listUser.add(user)
}

function logIn() {
    let usernameInput = input.question(`Enter your username\n`)
    let passwordInput = input.question(`Enter your password\n`)
    let loginStatus = false
    for (let i = 0; i < listUser.listUser.length; i++) {
        if (usernameInput == listUser.listUser[i].username && passwordInput == listUser.listUser[i].password) {
            loginStatus = true;
            mainMenu();
        }
    }
    if (!loginStatus) {
        console.log(`This user doesnt exist`)
        loginMenu();
    }
}

function mainMenu() {
    let menu = `Welcome to the main menu for music
    1.Manage songs
    2.Manage albums`
    console.log(menu)
    let choice;
    do {
        choice = input.question()
        switch (choice) {
            case '1' :
                manageSongMenu()
                break;
            case '2' :
                manageAlbumMenu()
                break;
        }
    } while (choice != 0)

}

function manageSongMenu() {
    let menu = `1.Display all songs
    2.Add a new song`
    console.log(menu)
    let choice;
    do {
        choice = input
        switch (choice){
            case '1':
                console.log(listSong.findAll())
                break;
            case '2':
                addNewSong();
                break;
        }
    } while (choice != 0)
}

function addNewSong() {
    let name = input.question(`Input song name\n`);
    let id = (listSong.listSong.length + 1);
    let singer = input.question(`Input singer name\n`)
    let composer = input.question(`Input composer name\n`)
    let song  = new Song(name, id, singer,composer)
    listSong.add(song)
}

function manageAlbumMenu() {

}

loginMenu()