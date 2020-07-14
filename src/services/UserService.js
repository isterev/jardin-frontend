"use strict";

import HttpService from './HttpService';

let currentUser = null

export default class UserService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/auth'; }

    static register(user, pass, email, firstName, lastName) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                username: user,
                password: pass,
                email: email,
                firstName: firstName,
                lastName: lastName
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
        currentUser = null
    }

    static getCurrentUser() {

        if(currentUser)
            return currentUser

        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');

        currentUser = {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username,
            email: JSON.parse(window.atob(base64)).email,
            firstName: JSON.parse(window.atob(base64)).firstName,
            lastName: JSON.parse(window.atob(base64)).lastName
        };

        return currentUser
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}