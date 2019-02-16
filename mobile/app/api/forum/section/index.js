export default class {
    constructor (axios) {
        this.$axios = axios
    }
    index () {
        return this.$axios.get('/section')
    }
    show(payload) {
        return this.$axios.get('/section/' + payload)
    }
    store (payload) {
        return this.$axios.post('/section', payload)
    }
    update(payload) {
        return this.$axios.post('/section/' + payload.id + '/update', payload.data)
    }
    delete(payload) {
        return this.$axios.delete('/section/' + payload)
    }
}
