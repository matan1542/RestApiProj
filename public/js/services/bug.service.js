export const bugService = {
    query,
    remove,
    save,
    getBugById
}
function query() {
    return axios.get('/api/bug').then(res => res.data)
}
function save(bug){
    console.log('bug',bug)
    if (bug._id) {
        return axios.put(`/api/bug/${bug._id}`, bug).then(res => res.data)
    } else {
        return axios.post('/api/bug', bug).then(res => res.data)
    }
}

function getBugById(id){
    return axios.get(`/api/bug/${id}/read`)
    .then(res => {
        return res.data
    })
}

function remove(bugId) {
    return axios.delete(`/api/bug/${bugId}`).then(res => res.data)
}