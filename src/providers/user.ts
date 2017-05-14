import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Serv} from './servers';

@Injectable()
export class UserProfile {

  data:any;
  link:any;

  constructor(
      public http: Http,
      private serv:Serv
  ) {
    this.link = this.serv.getServ() + '/api/user';
  }

  login(data:any){
    return this.http.post(this.link,data).map(res=>res.json()).toPromise().then().catch((error:any)=>{console.log(error)});
  }

  handleError(error:any):Promise<any> {
    console.log("错误：" + error);
    return Promise.reject(error.message || error)
  }

}