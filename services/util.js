const fs = require('fs');
function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt
}

function saveDataToFile(file,data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`data/${file}`, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log(err)
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })

}

module.exports = {
    makeId,
    saveDataToFile
}