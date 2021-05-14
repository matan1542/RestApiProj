import {storageService} from './storage.service.js'
export const userService = {
    login,
    getLoggedinUser,
    logout,
    signup,
    remove
}

const KEY = 'loggedinUser'
var gUser = null

function login(credentials) {
    return axios.post('/api/login', credentials).then(res => res.data)
    .then((user)=>{
        storageService.saveToStorage(KEY, user);
        gUser = user;
        return user;
    })
    .catch(err =>{
        res.send('Wrong password/email ')
    })
}

function logout(){
    return axios.post('/api/logout')
    .then(()=>{
        storageService.saveToStorage(KEY, null);
        gUser = null
    })
}
function signup(userInfo) {
    return axios.post('/api/signup', userInfo).then(res => res.data)
        .then(user => {
            storageService.saveToStorage(KEY, user)
            return user
        })
}
function remove(userId) {
    return axios.delete(`/api/user/${userId}`).then(res => res.data)
}
function getLoggedinUser() {
    if (gUser) storageService.saveToStorage(KEY, gUser);
    else if (storageService.loadFromStorage(KEY)) {
        gUser = storageService.loadFromStorage(KEY)
    }
    return gUser;
}