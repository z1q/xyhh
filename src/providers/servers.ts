import { Injectable } from '@angular/core';

@Injectable()
export class Serv {

  public baseUrl="http://localhost:3000";

  getServ():any{
    return this.baseUrl;
  }
  setServ(url:any):void{
    this.baseUrl=url;
  }

}