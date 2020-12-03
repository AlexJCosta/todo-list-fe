import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "../guards/config";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = config.baseUrl;
    }

    async getById(entity: string, id: string) {        
        let response = await this.http.get<any[]>(
            this.url + entity + '/' + id, { headers: { id: '', token: '' } 
        }).toPromise().then((res) => {            
            return res['result'];
        }, (er) => {
            return Promise.reject(er);
        });
        return response;        
    }

    async getAll(entity: string) {        
        let response = await this.http.get<any[]>(
            this.url + entity, { headers: { id: '', token: '' } 
        }).toPromise().then((res) => {            
            return res['result'];
        }, (er) => {
            return Promise.reject(er);
        });
        return response;        
    }

    async getByName(entity: string, name: string) {        
        let response = await this.http.get<any[]>(
            this.url + entity + `/name/` + name, { headers: { id: '', token: '' } 
        }).toPromise().then((res) => {            
            return res['result'];
        }, (er) => {
            return Promise.reject(er);
        });
        return response;        
    }

    async getAllByUserId(entity: string, id: string) {        
        let response = await this.http.get<any[]>(
            this.url + entity + `/user/` + id, { headers: { id: '', token: '' } 
        }).toPromise().then((res) => {            
            return res['result'];
        }, (er) => {
            return Promise.reject(er);
        });
        return response;        
    }

    async save(entity: string, obj: any) {        
        console.log(obj);
        let response = await this.http.post(
            this.url + entity, obj, { headers: { id: '', token: '' }
        }).toPromise().then((res) => {            
            return res;
        }, (er) => {
            return Promise.reject(er);
        });
        return response;
    }

    async update(entity: string, obj: any) {        
        let response = await this.http.patch(
            this.url + entity + '/' + obj.id , obj, { headers: { id: '', token: '' }
        }).toPromise().then((res) => {            
            return res;
        }, (er) => {
            return Promise.reject(er);
        });
        return response;
    }

    async delete(entity: string, id: string) {        
        console.log(this.url + entity + `/` + id);
        let response = await this.http.delete(
            this.url + entity + `/` + id, { headers: { id: '', token: '' } 
        }).toPromise().then((res) => {        
            return res;
        }, (er) => {
            return Promise.reject(er);
        });
        return response;
    }

    async sendEmails(entity: string, emails: any[]) {                
        let response = await this.http.post(
            this.url + entity + '/send', emails, { headers: { id: '', token: '' }
        }).toPromise().then((res) => {            
            return res;
        }, (er) => {
            return Promise.reject(er);
        });
        return response;
    }

}