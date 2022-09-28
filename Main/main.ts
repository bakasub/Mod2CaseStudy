import {ManageUser} from "../Service/ManageUser";
import {User} from "../Model/User";
import {ManageSong} from "../Service/ManageSong";
import {ManageAlbum} from "../Service/ManageAlbum";
import {Song} from "../Model/Song";
import {config} from "../config";
import {Album} from "../Model/Album";

let input = require('readline-sync')
let listUser = new ManageUser()
let listSong = new ManageSong()
let listAlbum = new ManageAlbum()

function loginMenu() {
    let menu = `    Welcome to the music manager
    1.Login
    2.Register
    3.Exit`
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
            case '3':
                choice = 0;
        }
    } while (choice != 0)
}

function register() {
    let username = input.question(`Input username\n`);
    for (let i = 0; i < listUser.listUser.length; i++) {
        if (username == listUser.listUser[i].username) {
            console.log(`This username already existed`)
            return loginMenu()
        }
    }
    let password = input.question(`Input password\n`);
    let id = (listUser.listUser.length + 1);
    let user = new User(username, password, id);
    listUser.add(user);
}

function logIn() {
    let usernameInput = input.question(`Enter your username\n`)
    let passwordInput = input.question(`Enter your password\n`)
    let loginStatus = false
    for (let i = 0; i < listUser.listUser.length; i++) {
        if (usernameInput == listUser.listUser[i].username && passwordInput == listUser.listUser[i].password) {
            loginStatus = true;
            config.user = listUser.listUser[i];
            mainMenu();
        }
    }
    if (!loginStatus) {
        console.log(`This user doesnt exist or password is incorrect`)
        loginMenu();
    }
}

function mainMenu() {
    let menu = `Welcome to the main menu for music
    1.Manage songs
    2.Manage albums
    9.Log out`
    console.log(menu);
    let choice;
    do {
        choice = input.question();
        switch (choice) {
            case '1' :
                manageSongMenu();
                choice = 0;
                break;
            case '2' :
                manageAllAlbumMenu();
                choice = 0;
                break;
            case '9':
                loginMenu();
                choice = 0;
                break;
        }
    } while (choice != 0)


}

function manageSongMenu() {
    let menu = `\tSongs management menu\n1.Display all songs\n2.Add a new song\n3.Edit a song's information\n4.Back`
    console.log(menu)
    let choice;
    do {
        choice = input.question()
        switch (choice) {
            case '1':
                console.log(listSong.findAll());
                manageSongMenu();
                choice = 0;
                break;
            case '2':
                addNewSong();
                choice = 0;
                break;
            case '3':
                editSongInfo();
                choice = 0;
                break;
            case '4':
                mainMenu();
                choice = 0;
                break;
        }
    } while (choice != 0)

}

function addNewSong() {
    let name = input.question(`Input song name\n`);
    if (name == ``) {
        console.log(`Name cannot be empty`)
        return manageSongMenu()
    }
    let id = (listSong.listSong.length + 1);
    let singer = input.question(`Input singer name\n`)
    let composer = input.question(`Input composer name\n`)
    let song = new Song(name, id, singer, composer)
    listSong.add(song)
    manageSongMenu()
}

function editSongInfo() {
    let id = input.question(`Input the song's id to edit`)
    let idExist = false
    for (let i = 0; i < listSong.listSong.length; i++) {
        if (id == listSong.listSong[i].id) {
            idExist = true
            let name = input.question(`Input the new song's name`)
            let singer = input.question(`Input the new singer's name`)
            let composer = input.question(`Input the new composer's name`)
            let song = new Song(name, id, singer, composer)
            listSong.listSong[i] = song
            manageSongMenu()
        }
    }
    if (idExist == false) {
        console.log(`This id doesnt exist`)
        manageSongMenu()
    }

}

function manageAllAlbumMenu() {
    let menu = `\tAlbum management menu
    1.Display all album by you
    2.Create a new album
    3.Manage an album
    4.Search album(s) by name
    5.Back
    `
    console.log(menu)
    let choice;
    do {
        choice = input.question()
        switch (choice) {

            case '1':
                filterUserMadeAlbum();
                choice = 0;
                break;
            case '2':
                createNewAlbum();
                choice = 0;
                break;
            case '3':
                manageUserAlbum();
                choice = 0;
                break;
            case '4':
                filterAlbumByName();
                choice = 0;
                break;
            case '5':
                mainMenu();
                choice = 0;
                break;
        }
    } while (choice != 0)

}

function filterUserMadeAlbum() {
    let filteredList = []
    for (let i = 0; i < listAlbum.listAlbum.length; i++) {
        if (config.user.username == listAlbum.listAlbum[i].madeByUser) {
            filteredList.push(listAlbum.listAlbum[i])
        }
    }
    console.log(filteredList)
    manageAllAlbumMenu();
}

function createNewAlbum() {
    let name = input.question(`Input album name\n`);
    if (name == ``) {
        console.log(`You cannot leave this field empty`)
        return manageAllAlbumMenu()
    }

    let id = input.question(`Input album id\n`);
    for (let i = 0; i < listAlbum.listAlbum.length; i++) {
        if (id == listAlbum.listAlbum[i].id) {
            console.log(`This id already exist`)
            return manageAllAlbumMenu()
        }
    }

    let madeByUser = config.user.username;
    let albumSongList = [];
    let createAlbum = new Album(name, id, madeByUser, albumSongList);
    listAlbum.add(createAlbum);
    manageAllAlbumMenu()
}

function filterAlbumByName() {
    let name = input.question(`Input the album name\n`)
    let listOfAlbumName = []
    let filteredList = []
    for (let i = 0; i < listAlbum.listAlbum.length; i++) {
        listOfAlbumName.push(listAlbum.listAlbum[i].name)
    }
    for (let i = 0; i < listOfAlbumName.length; i++) {
        if (listOfAlbumName[i].includes(name)) {
            filteredList.push(listAlbum.listAlbum[i])
        }
    }
    console.log(filteredList)
    manageAllAlbumMenu()
}

function manageUserAlbum() {
    let menu = `\tManage your albums
    1.Remove an album
    2.Edit an album's name
    3.Add a song to your album
    4.Remove a song from your album
    5.Edit a song name in your album
    6.Display an album
    7.Find song(s) through name in an album
    8.Back`
    console.log(menu)
    let choice;
    do {
        choice = input.question()
        switch (choice) {
            case '1':
                removeAnAlbum();
                choice = 0;
                break;
            case '2':
                editAlbumName();
                choice = 0;
                break;
            case '3':
                addSongToAlbum();
                choice = 0;
                break;
            case '4':
                removeSongFromAlbum();
                choice = 0;
                break;
            case '5':
                editSongNameInAlbum();
                choice = 0;
                break;
            case '6':
                displaySongsInAlbum();
                choice = 0;
                break;
            case '7':
                filterSongByNameInAlbum();
                choice = 0;
                break;
            case '8':
                manageAllAlbumMenu();
                choice = 0;
                break;
        }
    } while (choice != 0)

}

function removeAnAlbum() {
    let id = input.question(`Input the album's id to remove\n`)
    console.log(`Do you really want to remove this album\n1.Yes\n2.No`)
    let choice = input.question()
    switch (choice) {
        case '1':
            listAlbum.remove(id);
            manageUserAlbum()
            break;
        case '2':
            manageUserAlbum();
            break;
    }


}

function editAlbumName() {
    let id = input.question(`Input the album's id to edit\n`)
    let name = input.question(`Input the new name`)
    for (let i = 0; i < listAlbum.listAlbum.length; i++) {
        if (name == listAlbum.listAlbum[i].name) {
            console.log(`This name already existed`)
            return manageUserAlbum()
        }
    }
    listAlbum.listAlbum[listAlbum.findById(id)].name = name
    manageUserAlbum()
}

function addSongToAlbum() {
    let idSong = input.question(`Input the song's id\n`)
    let idAlbum = input.question(`Input the album's id\n`)
    let song = listSong.listSong[listSong.findById(idSong)]
    listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList.push(song)
    manageUserAlbum()
}

function removeSongFromAlbum() {
    let idAlbum = input.question(`Input the album's id\n`)
    let songOrder = +input.question(`Input the song's order in the album\n`)
    let song = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList[(songOrder - 1)]
    console.log(`Do you really want to remove the song ${song.name}\n1.Yes\n2.No`)
    let choice = input.question()
    switch (choice) {
        case '1':
            listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList.splice((songOrder - 1), 1)
            manageUserAlbum()
            break;
        case '2':
            manageUserAlbum()
            break;
    }
}

function editSongNameInAlbum() {
    let idAlbum = +input.question(`Input the album id\n`);
    let songOrder = +input.question(`Input the song's order in album to be edited\n`);
    let name = input.question(`Input the new name\n`);
    let album = listAlbum.listAlbum[listAlbum.findById(idAlbum)]
    for (let i = 0; i < album.albumSongList.length; i++) {
        if (name == album.albumSongList[i].name) {
            console.log(`This name already existed`);
            return manageUserAlbum();
        }
    }
    let song = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList[(songOrder - 1)]
    song.name = name
    manageUserAlbum()
}

function displaySongsInAlbum() {
    let idAlbum = input.question(`Input album's id\n`)
    let album = listAlbum.listAlbum[listAlbum.findById(idAlbum)]
    console.log(album)
    manageUserAlbum()
}

function filterSongByNameInAlbum() {
    let filteredSongNames = []
    let filteredList = []
    let idAlbum = input.question(`Input album id\n`)
    let nameInput = input.question(`Input searching keyword\n`)
    let album = listAlbum.listAlbum[listAlbum.findById(idAlbum)]
    for (let i = 0; i < album.albumSongList.length; i++) {
        filteredSongNames.push(album.albumSongList[i].name)
    }
    for (let i = 0; i < filteredSongNames.length; i++) {
        if (filteredSongNames[i].includes(nameInput)) {
            filteredList.push(album.albumSongList[i])
        }
    }
    console.log(filteredList)
    manageUserAlbum()
}

loginMenu()