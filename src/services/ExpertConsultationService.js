import HttpService from "./HttpService";

export default class ExpertConsultationService {
    static createConsultationRequest(consultationRequest) {
        return new Promise((resolve, reject) => {
            HttpService.post(ExpertConsultationService.baseURL() + "/consultation-requests", consultationRequest, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getConsultationRequestsFor(userId){
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/consultation-requests?creator=" + userId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateConsultationRequest(consultationRequest) {
        return new Promise((resolve, reject) => {
            HttpService.put(ExpertConsultationService.baseURL() + "/consultation-requests", consultationRequest, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getConsultationRequestsById(id, userId){
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/consultation-requests/" + id + "?creator=" + userId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getConsultationSessionsFor(userId) {
        console.log(userId)
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/consultation-sessions?creator=" + userId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getConsultationSessionsById(id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/consultation-sessions/" + id, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getExperts() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + "/experts/", function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static baseURL() {return 'http://localhost:3000/expert-consultation' }
}