import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {
    constructor(public http: HttpClient) { }
    getHeader(): HttpHeaders {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
         Authorization : `Bearer ${sessionStorage.getItem('token')}`
      });
      return headers;
    }

sendMessage(message: string): Promise<any> {
    const body = `message=${message}`;
    return new Promise((resolve, reject) => {
        this.http.post(environment.baseUrl + '/messages', body, { headers: this.getHeader() })
        .subscribe((res: any) => {
        console.log('res addMessages', res);
        if (res.success){
            resolve(res);
        } else {
            reject(res);
        }
        }, (err) => {
        reject(err);
        })
    });
}
getMessages(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.get(environment.baseUrl + '/messages',
            {headers: this.getHeader()})
            .subscribe((res: any) => {
            console.log('res getMessages', res);
            if (res.success) {
                resolve(res);
            } else {
                reject(res);
            }
            }, (err => {
            reject(err);
            }));
        });
    }
}



