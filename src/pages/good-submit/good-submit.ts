import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { GoodsData } from '../../providers/goods';
import { TabsPage } from '../tabs/tabs';
declare var AV:any;
@Component({
  selector: 'page-good-submit',
  templateUrl: 'good-submit.html',
  providers:[GoodsData]
})
export class GoodSubmitPage {

  good: {
    goodname?: string,
    avatar?:Object,
    price?:string,
    content?: string
  } = {};
  submitted = false;
  imgs:any=[];

  constructor(
      public navCtrl: NavController,
      public gdata: GoodsData
  ){
    let APP_ID = 'k470mnQ2IdFsV0ep6hBUYhES-gzGzoHsz';
    let APP_KEY = 'HR9AQhyPpm1GGiKv6Szp2FB0';
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
  }

  fileClick():void {
    document.getElementById('file').click();
  }

  removeImg(i:any):void {
    this.imgs.splice(i, 1);
  }

  fileUp(localFile:any):void {
    // var localFile=file;
    let name = localFile.name;
    console.log(name);
    this.sendFile(name,localFile);
  }

  sendFile(name:any,file:any):void{
    var File = new AV.File(name, file);
    File.save().then((file:any) => {
      console.log(file.attributes.url);
      this.imgs.push({
        turl: file.url(),
        url: file.attributes.url
      });
      console.log(this.imgs[0].url);
      this.good.avatar = file.attributes.url;
    }, (error:any)=> {console.log(error)});
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.gdata.post(this.good);
      this.navCtrl.push(TabsPage);
    }
  }

  onCancel(){
    this.navCtrl.push(TabsPage);
  }

}