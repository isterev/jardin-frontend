"use strict";

import HttpService from './HttpService';
import UserService from './UserService';

export default class BlogService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/blogs' }

    static getBlogs(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getBlog(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${BlogService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving blog');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }


    static getMyBlogs(authorId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${BlogService.baseURL()}/my-blogs?authorId=` + authorId , function(data) {
                if(data !== undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving blogs');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteBlog(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${BlogService.baseURL()}/${id}`, function(data) {

                if(data.message !== undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateBlog(blog) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${blog._id}`, blog, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static postBlog(blog) {
        if(!UserService.isAuthenticated())
            return;
        blog.authorId = UserService.getCurrentUser().id;
        blog.authorFirstName = UserService.getCurrentUser().firstName;
        blog.authorLastName = UserService.getCurrentUser().lastName;

        return new Promise((resolve, reject) => {
            HttpService.post(BlogService.baseURL(), blog, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}