"use strict";

import HttpService from './HttpService';
import UserService from './UserService';

export default class MarketOfferService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/offers' }

    static getMarketOffers(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getMarketOffer(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${MarketOfferService.baseURL()}/${id}`, function(data) {
                if(data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving market offer');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getMyMarketOffers() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${MarketOfferService.baseURL()}/myOffers/`, function(data) {
                if(data !== undefined) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving market offers');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteMarketOffer(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${MarketOfferService.baseURL()}/${id}`, function(data) {
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

    static updateMarketOffer(marketOffer) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${marketOffer._id}`, marketOffer, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createMarketOffer(marketOffer) {

        if(!UserService.isAuthenticated())
            return;
        marketOffer.creator = UserService.getCurrentUser().id;
        marketOffer.creatorFirstName = UserService.getCurrentUser().firstName;
        marketOffer.creatorLastName = UserService.getCurrentUser().lastName;
        marketOffer.contact = UserService.getCurrentUser().email; // maybe extend also to other data

        return new Promise((resolve, reject) => {
            HttpService.post(MarketOfferService.baseURL(), marketOffer, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}