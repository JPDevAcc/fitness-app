import React from 'react'
import axios from 'axios';

const url = 'http://localhost:3005';

export default class APIClientFitness {
    constructor(url) {
        constructor(tokenProvider, logoutHandler, errHandler = null) {
            this.tokenProvider = tokenProvider;
            this.logoutHandler = logoutHandler;
            this.errHandler = errHandler;
        }
    }

    errorhandlerInternal(err) {
        if (this.errHandler) this.errHandler(err.response.data.message)
        else console.log(err);
        throw err;
    }

    authenticatedCall(method, url, data) {
        return axios({
            method, url, data,
            headers: {
                token: this.tokenProvider(),
            }
        })
            .then((response) => {
                this.errHandler(null);
                return response;
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) {
                    this.logoutHandler();
                }
                else this.errorHandlerInternal(err);
            });
    }

}

