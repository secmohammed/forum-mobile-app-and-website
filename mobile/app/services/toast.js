let Toast = require('nativescript-toast');

export const toast = {
    notify(message, type = 'long') {
        return Toast.makeText(message, type).show() 
    }
}
