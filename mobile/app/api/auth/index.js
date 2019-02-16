export default class {
    constructor (axios) {
        this.$axios = axios
    }
    register (payload) {
        return this.$axios.post('auth/register', payload)
    }
    login(payload) {
        return this.$axios.post('auth/login', payload)
    }
    logout() {
        return this.$axios.post('auth/logout')
    }
    me() {
        return this.$axios.get('/me')
    }
    getUserThroughUsername(username) {
        return this.$axios.get(`/user/${username}`)
    }
    forgotPassword(payload) {
        return this.$axios.post('auth/forgot-password',payload)
    }
    // create a 6 digits number, send them to mail, redirect user after the forgot-password reuest to the reset-password form
    // form should contain the digits then password, confirmation ( Multi step form .)
    resetPassword(payload){
        return this.$axios.post('auth/reset-password' + payload.token)
    }

}
