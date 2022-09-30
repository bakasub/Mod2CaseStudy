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
    for (var i = 0; i < listUser.listUser.length; i++) {
        if (username == listUser.listUser[i].username) {
            console.log("This username already existed");
            return loginMenu();
        }
    }
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
                choice = 0;
                break;
            case '2':
                manageAllAlbumMenu();
                choice = 0;
                break;
            case '9':
                loginMenu();
                choice = 0;
                break;
        }
    } while (choice != 0);
}
function manageSongMenu() {
    var menu = "\tSongs management menu\n1.Display all songs\n2.Add a new song\n3.Edit a song's information\n4.Back";
    console.log(menu);
    var choice;
    do {
        choice = input.question();
        switch (choice) {
            case '1':
                displayAllSong();
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
    } while (choice != 0);
}
function displayAllSong() {
    if (listSong.listSong.length == 0) {
        console.log("The song library is empty");
    }
    else {
        console.log(listSong.findAll());
    }
    manageSongMenu();
}
function addNewSong() {
    var name = input.question("Input song name\n");
    if (name == "") {
        console.log("Name cannot be empty");
        return manageSongMenu();
    }
    var id = (listSong.listSong.length + 1);
    var singer = input.question("Input singer name\n");
    var composer = input.question("Input composer name\n");
    var song = new Song_1.Song(name, id, singer, composer);
    listSong.add(song);
    manageSongMenu();
}
function editSongInfo() {
    var id = input.question("Input the song's id to edit");
    var idExist = false;
    for (var i = 0; i < listSong.listSong.length; i++) {
        if (id == listSong.listSong[i].id) {
            idExist = true;
            var name_1 = input.question("Input the new song's name");
            var singer = input.question("Input the new singer's name");
            var composer = input.question("Input the new composer's name");
            var song = new Song_1.Song(name_1, id, singer, composer);
            listSong.listSong[i] = song;
            manageSongMenu();
        }
    }
    if (idExist == false) {
        console.log("This id doesnt exist");
        manageSongMenu();
    }
}
function manageAllAlbumMenu() {
    var menu = "\tAlbum management menu\n    1.Display all album by you\n    2.Create a new album\n    3.Manage an album\n    4.Search album(s) by name\n    5.Back\n    ";
    console.log(menu);
    var choice;
    do {
        choice = input.question();
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
    } while (choice != 0);
}
function filterUserMadeAlbum() {
    var filteredList = [];
    for (var i = 0; i < listAlbum.listAlbum.length; i++) {
        if (config_1.config.user.username == listAlbum.listAlbum[i].madeByUser) {
            filteredList.push(listAlbum.listAlbum[i]);
        }
    }
    if (filteredList.length == 0) {
        console.log("You did not make any album yet");
    }
    else {
        console.log(filteredList);
    }
    manageAllAlbumMenu();
}
function createNewAlbum() {
    var name = input.question("Input album name\n");
    if (name == "") {
        console.log("You cannot leave this field empty");
        return manageAllAlbumMenu();
    }
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
function filterAlbumByName() {
    var name = input.question("Input the album name\n");
    var listOfAlbumName = [];
    var filteredList = [];
    for (var i = 0; i < listAlbum.listAlbum.length; i++) {
        listOfAlbumName.push(listAlbum.listAlbum[i].name);
    }
    for (var i = 0; i < listOfAlbumName.length; i++) {
        if (listOfAlbumName[i].includes(name)) {
            filteredList.push(listAlbum.listAlbum[i]);
        }
    }
    if (filteredList.length == 0) {
        console.log("There are no result matches your input");
        return manageAllAlbumMenu();
    }
    console.log(filteredList);
    manageAllAlbumMenu();
}
function manageUserAlbum() {
    var menu = "\tManage your albums\n    1.Remove an album\n    2.Edit an album's name\n    3.Add a song to your album\n    4.Remove a song from your album\n    5.Edit a song name in your album\n    6.Display an album\n    7.Find song(s) through name in an album\n    8.Back";
    console.log(menu);
    var choice;
    do {
        choice = input.question();
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
    } while (choice != 0);
}
function removeAnAlbum() {
    var id = input.question("Input the album's id to remove\n");
    if (listAlbum.availabilityCheck(id) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    console.log("Do you really want to remove this album\n1.Yes\n2.No");
    var choice = input.question();
    switch (choice) {
        case '1':
            listAlbum.remove(id);
            manageUserAlbum();
            break;
        case '2':
            manageUserAlbum();
            break;
    }
}
function editAlbumName() {
    var id = input.question("Input the album's id to edit\n");
    if (listAlbum.availabilityCheck(id) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var name = input.question("Input the new name");
    for (var i = 0; i < listAlbum.listAlbum.length; i++) {
        if (name == listAlbum.listAlbum[i].name) {
            console.log("This name already existed");
            return manageUserAlbum();
        }
    }
    listAlbum.listAlbum[listAlbum.findById(id)].name = name;
    manageUserAlbum();
}
function addSongToAlbum() {
    var idSong = input.question("Input the song's id\n");
    if (idSong > listSong.listSong.length || idSong < 1) {
        console.log("This id is invalid");
        manageUserAlbum();
    }
    var idAlbum = +input.question("Input the album's id\n");
    if (listAlbum.availabilityCheck(idAlbum) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var songList = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList;
    for (var i = 0; i < songList.length; i++) {
        if (idSong == songList[i].id) {
            console.log("This song is already in the album");
            manageUserAlbum();
        }
    }
    var song = listSong.listSong[listSong.findById(idSong)];
    songList.push(song);
    manageUserAlbum();
}
function removeSongFromAlbum() {
    var idAlbum = +input.question("Input the album's id\n");
    if (listAlbum.availabilityCheck(idAlbum) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var songIndex = +input.question("Input the song's order in the album\n");
    var song = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList[(songIndex - 1)];
    console.log("Do you really want to remove the song ".concat(song.name, "\n1.Yes\n2.No"));
    var choice = input.question();
    switch (choice) {
        case '1':
            listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList.splice((songIndex - 1), 1);
            manageUserAlbum();
            break;
        case '2':
            manageUserAlbum();
            break;
    }
}
function editSongNameInAlbum() {
    var idAlbum = +input.question("Input the album id\n");
    if (listAlbum.availabilityCheck(idAlbum) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var songIndex = +input.question("Input the song's order in album to be edited\n");
    var name = input.question("Input the new name\n");
    var album = listAlbum.listAlbum[listAlbum.findById(idAlbum)];
    for (var i = 0; i < album.albumSongList.length; i++) {
        if (name == album.albumSongList[i].name) {
            console.log("This name already existed");
            return manageUserAlbum();
        }
    }
    var song = listAlbum.listAlbum[listAlbum.findById(idAlbum)].albumSongList[(songIndex - 1)];
    song.name = name;
    manageUserAlbum();
}
function displaySongsInAlbum() {
    var idAlbum = input.question("Input album's id\n");
    if (listAlbum.availabilityCheck(idAlbum) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var album = listAlbum.listAlbum[listAlbum.findById(idAlbum)];
    console.log(album);
    manageUserAlbum();
}
function filterSongByNameInAlbum() {
    var filteredSongNames = [];
    var filteredList = [];
    var idAlbum = input.question("Input album id\n");
    if (listAlbum.availabilityCheck(idAlbum) == false) {
        console.log("This album doesnt exist");
        manageUserAlbum();
    }
    var nameInput = input.question("Input searching keyword\n");
    var album = listAlbum.listAlbum[listAlbum.findById(idAlbum)];
    for (var i = 0; i < album.albumSongList.length; i++) {
        filteredSongNames.push(album.albumSongList[i].name);
    }
    for (var i = 0; i < filteredSongNames.length; i++) {
        if (filteredSongNames[i].includes(nameInput)) {
            filteredList.push(album.albumSongList[i]);
        }
    }
    if (filteredList.length == 0) {
        console.log("There are no song matches the input");
    }
    console.log(filteredList);
    manageUserAlbum();
}
loginMenu();
