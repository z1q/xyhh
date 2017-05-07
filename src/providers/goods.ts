import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Serv} from './servers';

@Injectable()
export class GoodsData {

  data:any;
  link:any;

  constructor(
      public http: Http,
      private serv:Serv
  ) {
    this.link = this.serv.getServ() + '/api/goods';
  }

  get():Promise<any>{
    return this.http.get(this.link).map(response=>response.json()).toPromise()
      .then().catch((error)=>{console.log(error)});
  }

  post(data:any){
    return this.http.post(this.link,data).toPromise()
        .then().catch((error)=>{console.log(error)});
  }

  put(data:any){
    return this.http.put(this.link,data).toPromise()
        .then().catch((error)=>{console.log(error)});
  }

  del(data:any){
    return this.http.delete(this.link+'/'+data).toPromise()
        .then().catch((error)=>{console.log(error)});
  }

  handleError(error:any):Promise<any> {
    console.log("错误：" + error);
    return Promise.reject(error.message || error)
  }

}