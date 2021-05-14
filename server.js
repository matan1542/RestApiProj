const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')


const bugService = require('./services/bug.service')
const userService = require('./services/user.service');

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


// LIST
app.get('/api/bug',(req,res) => {
    bugService.query()
        .then(bugs=>{
            res.send(bugs)
        })
})
// CREATE
app.post('/api/bug',(req,res) => {
    const bug = req.body;
    bugService.save(bug)
    .then(savedBug=>{
        res.send(savedBug);
    })
})

// UPDATE
app.put('/api/bug/:bugId',(req,res)=>{
    const bug = req.body
    bugService.save(bug,loggedinUser)
    .then(savedBug=>{
        res.send(savedBug);
    })
})

// READ
app.get('/api/bug/:bugId/read',(req,res)=>{
    const {bugId} = req.params
    bugService.getById(bugId)
    .then(bug => {
        res.send(bug)
    })
})

//DELETE
app.delete('/api/bug/:bugId',(req,res)=>{
    const {loggedinUser} = req.cookies;
    const {bugId} = req.params
    bugService.remove(bugId,loggedinUser)
    .then(()=>{
        res.send('Deleted!');
    })
})

//USER LOGOUT
app.post('/api/logout',(req,res)=>{
    res.clearCookie('loggedinUser');
    res.end()
})

//USER LOGIN
app.post('/api/login', (req, res)=>{
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                req.session.loggedinUser = user
                res.send(user)
            } else {
                res.status(403).send('Invalid username / password')
            }
        })
})

//USER SIGNUP
app.post('/api/signup', (req, res)=>{
    const userInfo = req.body
    userService.save(userInfo)
        .then(user => {
            if (user) {
                req.session.loggedinUser = user
                res.send(user)
            } else {
                res.status(403).send('couldn\'t sign you up, try again later')
            }
        })
})


app.listen(3030,()=> console.log('Server listening on port 3030'))
