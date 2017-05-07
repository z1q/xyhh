import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { App,NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { GoodsData } from '../../providers/goods';
import { ToastService } from '../../providers/toast';

import * as AV from 'leancloud-storage';

@Component({
  selector: 'page-good-submit',
  templateUrl: 'good-submit.html',
  providers:[GoodsData,ToastService]
})
export class GoodSubmitPage implements OnInit{

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
      public gdata: GoodsData,
      public toast:ToastService,
      public app:App
  ){}

  ngOnInit():void {
    let APP_ID = 'k470mnQ2IdFsV0ep6hBUYhES-gzGzoHsz';
    let APP_KEY = 'HR9AQhyPpm1GGiKv6Szp2FB0';
    AV.init({appId: APP_ID,appKey: APP_KEY});
  }

  ionViewDidLoad() {
    this.initial();
  }

  initial(){
    this.good = {};
  }

  fileClick(){
    document.getElementById('ssfile').click();
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
      this.gdata.post(this.good).then((suc)=>{
        this.toast.present(suc);
        this.navCtrl.push(TabsPage,{tabIndex:3});
      });
    }
  }

  onCancel(){
    this.navCtrl.push(TabsPage);
  }

}