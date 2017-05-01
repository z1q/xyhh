import { Injectable } from '@angular/core';

@Injectable()
export class Serv {

  public baseUrl="http://ife.leanapp.cn";

  getServ():any{
    return this.baseUrl;
  }
  setServ(url:any):void{
    this.baseUrl=url;
  }

}