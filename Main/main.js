"use strict";
exports.__esModule = true;
var ManageUser_1 = require("../Service/ManageUser");
var User_1 = require("../Model/User");
var ManageSong_1 = require("../Service/ManageSong");
var ManageAlbum_1 = require("../Service/ManageAlbum");
var Song_1 = require("../Model/Song");
var config_1 = require("../config");
var Album_1 = require("../Model/Album");
var input = require('readline-sync');
var listUser = new ManageUser_1.ManageUser();
var listSong = new ManageSong_1.ManageSong();
var listAlbum = new ManageAlbum_1.ManageAlbum();
function loginMenu() {
    var menu = "    Welcome to the music manager\n    1.Login\n    2.Register\n    3.Exit";
    var choice;
    do {
        console.log(menu);
        choice = input.question();
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
    } while (choice != 0);
}
function register() {
    var username = input.question("Input username\n");
    var password = input.question("Input password\n");
    var id = (listUser.listUser.length + 1);
    var user = new User_1.User(username, password, id);
    listUser.add(user);
}
function logIn() {
    var usernameInput = input.question("Enter your username\n");
    var passwordInput = input.question("Enter your password\n");
    var loginStatus = false;
    for (var i = 0; i < listUser.listUser.length; i++) {
        if (usernameInput == listUser.listUser[i].username && passwordInput == listUser.listUser[i].password) {
            loginStatus = true;
            config_1.config.user = listUser.listUser[i];
            mainMenu();
        }
    }
    if (!loginStatus) {
        console.log("This user doesnt exist or password is incorrect");
        loginMenu();
    }
}
function mainMenu() {
    var menu = "Welcome to the main menu for music\n    1.Manage songs\n    2.Manage albums\n    9.Log out";
    console.log(menu);
    var choice;
    do {
        choice = input.question();
        switch (choice) {
            case '1':
                manageSongMenu();
                break;
            case '2':
                manageAllAlbumMenu();
                break;
            case '3':
                console.log(config_1.config.user);
                break;
            case '9':
                loginMenu();
                break;
        }
    } while (choice != 0);
}
function manageSongMenu() {
    var menu = "\tSongs management menu\n1.Display all songs\n2.Add a new song\n3.Back";
    console.log(menu);
    var choice;
    do {
        choice = input.question();
        switch (choice) {
            case '1':
                console.log(listSong.findAll());
                manageSongMenu();
                break;
            case '2':
                addNewSong();
                break;
            case '3':
                mainMenu();
        }
    } while (choice != 0);
}
function addNewSong() {
    var name = input.question("Input song name\n");
    var id = (listSong.listSong.length + 1);
    var singer = input.question("Input singer name\n");
    var composer = input.question("Input composer name\n");
    var song = new Song_1.Song(name, id, singer, composer);
    listSong.add(song);
    manageSongMenu();
}
function manageAllAlbumMenu() {
    var menu = "\tAlbum management menu\n    1.Display all album by you\n    2.Create a new album\n    3.Manage an album\n    4.Back\n    ";
    console.log(menu);
    var choice = input.question();
    switch (choice) {
        case '1':
            filterUserMadeAlbum();
            break;
        case '2':
            createNewAlbum();
            break;
        case '3':
            manageUserAlbum();
            break;
        case '4':
            mainMenu();
            break;
    }
}
function filterUserMadeAlbum() {
    var filteredList = [];
    for (var i = 0; i < listAlbum.listAlbum.length; i++) {
        if (config_1.config.user.username == listAlbum.listAlbum[i].madeByUser) {
            filteredList.push(listAlbum.listAlbum[i]);
        }
    }
    console.log(filteredList);
    manageAllAlbumMenu();
}
function createNewAlbum() {
    var name = input.question("Input album name\n");
    var id = input.question("Input album id\n");
    for (var i = 0; i < listAlbum.listAlbum.length; i++) {
        if (id == listAlbum.listAlbum[i].id) {
            console.log("This id already exist");
            return manageAllAlbumMenu();
        }
    }
    var madeByUser = config_1.config.user.username;
    var albumSongList = [];
    var createAlbum = new Album_1.Album(name, id, madeByUser, albumSongList);
    listAlbum.add(createAlbum);
    manageAllAlbumMenu();
}
function manageUserAlbum() {
    var menu = "\tManage your albums\n    1.Remove an album\n    2.Edit an album's name\n    3.Add a song to your album\n    4.Remove a song from your album\n    5.Edit a song name in your album\n    6.Display an album\n    7.Back";
    console.log(menu);
    var choice = input.question();
    switch (choice) {
        case '1':
            removeAnAlbum();
            break;
        case '2':
            editAlbumName();
            break;
        case '3':
            addSongToAlbum();
            break;
        case '4':
            removeSongFromAlbum();
            break;
        case '5':
            editSongNameInAlbum();
            break;
        case '6':
            displaySongsInAlbum();
            break;
        case '7':
            manageAllAlbumMenu();
            break;
    }
}
function removeAnAlbum() {
    var id = input.question("Input the album's id to remove\n");
    listAlbum.remove(id);
    manageUserAlbum();
}
function editAlbumName() {
    var id = input.question("Input the album's id to edit\n");
    var name = input.question("Input the new name");
    listAlbum.listAlbum[listAlbum.findById(id)].name = name;
    manageUserAlbum();
}
function addSongToAlbum() {
    var idSong = input.question("Input the song's id\n");
    var idAlbum = input.question("Input the album's id\n");
    var song = listSong.listSong[listSong.findById(idSong)];
    listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList.push(song);
    manageUserAlbum();
}
function removeSongFromAlbum() {
    var songOrder = input.question("Input the song's order in the album\n");
    if (isNaN(songOrder)) {
        var idAlbum = input.question("Input the album's id\n");
        listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList.splice((songOrder - 1), 1);
        manageUserAlbum();
    }
    else {
        console.log("Invalid input");
        manageUserAlbum();
    }
}
function editSongNameInAlbum() {
    var idAlbum = input.question("Input the album id\n");
    var songOrder = input.question("Input the song's order in album to be edited\n");
    if (isNaN(idAlbum) || isNaN(songOrder)) {
        console.log("Invalid input");
        manageUserAlbum();
    }
    else {
        var name_1 = input.question("Input the new name\n");
        var song = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList[(songOrder - 1)];
        song.name = name_1;
        manageUserAlbum();
    }
}
function displaySongsInAlbum() {
    var idAlbum = input.question("Input album's id\n");
    var album = listAlbum.listAlbum[listAlbum.findById(idAlbum)];
    console.log(album);
    manageUserAlbum();
}
loginMenu();
