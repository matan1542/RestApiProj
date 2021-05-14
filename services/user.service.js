const utilService = require('./util.js');
const fs = require('fs')
const gUsers = require('../data/user.json')

function query() {
    return Promise.resolve(gUsers)
}

function checkLogin(credentials) {
    var user = gUsers.find(user => user.username === credentials.username &&
        user.password === credentials.password)
    if (user) {
        user = { ...user }
        delete user.password
    }
    return Promise.resolve(user)
}

function save(user, loggedinUserId = null) {
    //CREATE
    const { fullname, username, password } = user
    let savedUser = {
        _id: utilService.makeId(),
        fullname,
        username,
        password,
        isAdmin: false
    }
    savedUser.createdAt = savedUser.updatedAt = Date.now()
    gUsers.unshift(savedUser)
    const file = 'user.json'
    return utilService.saveDataToFile(file,gUsers)
        .then(() => {
            savedUser = { ...savedUser }
            delete savedUser.password
            return savedUser
        })
}
function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    if (idx === -1) {
        return Promise.reject('No Such user')
    }
    gUsers.splice(idx, 1)
    const file = 'user.json'
    return utilService.saveDataToFile(file,gUsers)
}
module.exports = {
    checkLogin,
    save,
    query,
    remove
}