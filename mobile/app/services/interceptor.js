import store from '@/store'
import { toast } from "./toast";
let _ = require('lodash');
const connectivityModule = require("tns-core-modules/connectivity");
const myConnectionType = connectivityModule.getConnectionType();

export default function setup(axios) {
    axios.interceptors.request.use(
        config => {
            const token = store.getters["user/getToken"];
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        err => console.log(err, "error request")
    );
    axios.interceptors.response.use(
        response => {
            let hasSuccess = _.some(response, res => _.has(res, "success"));
            let hasMessage = _.some(response, res => _.has(res, "message"));
            if (hasSuccess && hasMessage) {
                toast.notify(response.data.message);
            }
            if (!hasSuccess && hasMessage) {
                toast.notify(response.data.message);
            }
            return response;
        },
        err => {
            if (
                err.config.hasOwnProperty("errorHandle") &&
                err.config.errorHandle === false
            ) {
                return Promise.reject(err);
            }
            switch (err.response.status) {
                case 401:
                    if (err.response.data.message) {
                        toast.notify(err.response.data.message);
                    } else {
                        toast.notify("Unauthorized Action");
                    }
                    break;
                case 404:
                    let hasSuccess = _.some(err.response, error =>
                        _.has(error, "success")

                    );
                    let hasMessage = _.some(err.response, error =>
                        _.has(error, "message")
                    );
                    if (hasSuccess && hasMessage) {
                        toast.notify(err.response.data.message);
                    }
                    // if (!hasSuccess && hasMessage) {
                    //     toast.notify(err.response.data.message);
                    // }
                    if (!hasSuccess) {
                        toast.notify("Ehh, It is not available right now.");
                    }
                    break;
                case 405:
                    toast.notify("Method Not Allowed");
                    break;
                case 406:
                    toast.notify("Media Type not acceptable");
                    break;
                case 422:
                    _.forEach(err.response.data.errors, err =>{
                        console.log(err)
                        toast.notify(err[0])
                    }
                    );
                    break;
                case 429:
                    toast.notify("Too Many Attempts");
                    break;
                case 500:
                    toast.notify(
                        "Oh Snap ! , We are experiencing an error currently :("
                    );
                    break;
                default:
                    toast.notify("Uhmm, We could not handle this request");
                    break;
            }
            return Promise.reject(err);
        }
    );
    
}
