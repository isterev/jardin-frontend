"use strict";

export default class HttpService {
    constructor() {
    }

    static async get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'GET',
                headers: header
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
            } else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            } else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(err.message);
        }
    }

    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(err.message);
        }
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(e.message);
        }
    }

    static async remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'DELETE',
                headers: header
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                onSuccess(resp)
            }
        } catch(err) {
            onError(err.message);
        }
    }

    static checkIfUnauthorized(res) {
        return res.status === 401
    }

}