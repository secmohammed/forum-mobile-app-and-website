export default class {
    constructor (axios) {
        this.$axios = axios
    }
    index (payload) {
        return this.$axios.get('/topic?section_id=' + payload)
    }
    indexForUser () {
        return this.$axios.get('/user/topic')
    }
    show(payload) {
        return this.$axios.get('/topic/' + payload)
    }
    store (payload) {
        return this.$axios.post('/topic', payload)
    }

    update(payload) {
        return this.$axios.post('/topic/' + payload.id + '/update', payload.data)
    }
    delete(payload) {
        return this.$axios.delete('/topic/' + payload)
    }
}
