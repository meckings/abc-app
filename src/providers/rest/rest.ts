import { NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://127.0.0.1:8000/api';
  tokenUrl = 'http://127.0.0.1:8000/oauth/token';
  clientId = '2';
  clientSecret = '0AvTf8Ecslkkg3N7S1x2od4Dvvk84cteQNU5hGAK';
  // apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getUsers() {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json' );
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user', {headers:header}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user', JSON.stringify(data), {
        headers: new HttpHeaders().set(
          'content-type', 'application/json')
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getToken(data){
    // let header = new HttpHeaders().set(
    //   'Content-Type', 'application/x-www-form-urlencoded'
    // );

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded' );

    return new Promise((resolve, reject)=>{
      this.http.post(this.tokenUrl, data, {headers:header}).subscribe(
        data=>{
          resolve(data);
          console.log(data);
        },
        err=>{
          reject(err);
          console.log(err.message);
        });
    });
  }

  get(path, token){
    // return this.http.get(this.apiUrl+path).subscribe(
    //   data=>{
    //     console.log(data)
    //   },
    //   err=>{
    //     console.log(err.message);
    //   }
    // );

    console.log(token);
    let header = new HttpHeaders();
    header.append('Accept', 'application/json' );
    header.append('Authorisation', 'Bearer '+token);
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl+path, {headers:header})
      .subscribe(
        data=>{
          resolve(data);
          console.log(data);
        }, err=>{
          console.log(err.message);
        });
    });
  }

  post(path, token, data?){
    let header = new HttpHeaders();
    header.append('Accept', 'application/json' );
    header.append('Authorisation', 'Bearer '+token);
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl+path, JSON.stringify(data), {headers: header})
      .subscribe(
        data=>{
          resolve(data);
          console.log(data);
        },
        err=>{
          console.log(err);
        });
    });
  }
}
