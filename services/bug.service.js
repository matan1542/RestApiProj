const utilService = require('./util.js');
const fs = require('fs');
const gBugs = require('../data/bugs.json');



function query() {
    return Promise.resolve(gBugs);
}

function save(bug, _id) {
    if (bug._id) {
        const idx = gBugs.findIndex(currBug => (currBug.creator._id === bug._id) && (bug.creator._id === _id))
        if (idx >= 0) {
            gBugs[idx] = bug
            console.log('gBugs[idx]',gBugs[idx])
        } else return Promise.reject('Cannot update bug');

    } else {
        //CREATE
        bug._id = utilService.makeId()
        gBugs.unshift(bug)
    }
    const file = 'bugs.json';
    return utilService.saveDataToFile(file,gBugs).then(() => {
        // console.log('bug after update',bug)
        return bug;
    })
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId, nickname) {
    const bugIdx = gBugs.findIndex(bug => bug._id === bugId && bug.creator.nickname === nickname);
    if (bugIdx >= 0) {
        gBugs.splice(bugIdx, 1);
        const file = 'bugs.json';
        return utilService.saveDataToFile(file,gBugs)
    } else return Promise.reject('Cannot remove bug');

}

module.exports = {
    query,
    save,
    getById,
    remove
}

