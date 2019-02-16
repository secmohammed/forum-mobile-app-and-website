import axios from 'axios'
import auth from './auth'
import topic from './forum/topic'
import section from './forum/section'
import interceptorsSetup from "@/services/interceptor.js";

class Api {
    constructor (options = {}) {
        this.$axios = axios.create(options)
        interceptorsSetup(this.$axios)

    }
    auth () {
        return new auth(this.$axios)
    }
    topic () {
        return new topic(this.$axios)
    }
    section () {
        return new section(this.$axios)
    }

}
export const $api = new Api({
    timeout: 1500,
    baseURL: 'https://85d8a037.ngrok.io/api'
})
