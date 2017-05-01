import { Component } from '@angular/core';
import { ActionSheetController,PopoverController,Config } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

import { GoodsData } from '../../providers/goods';
import { ToastService } from '../../providers/toast';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[GoodsData,ToastService]
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  goods:any;

  constructor(
      public popoverCtrl: PopoverController,
      public config:Config,
      public actionSheetCtrl: ActionSheetController,
      public gdata:GoodsData,
      public toast:ToastService,
  ) { }

  ionViewDidLoad() {
    this.updateGood();
  }

  updateGood(){
    this.gdata.get().then((data: any) => {
      console.log(data);
      this.goods = data;
    });
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  openContact(good: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: good.goodname,
      buttons: [
        {
          text: `删除`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            this.gdata.del(good.id).then(
              ()=>{
                this.updateGood();
                this.toast.present('删除成功');
              },
              (err)=>{}
            ).catch((error)=>{console.log(error)});
          }
        },
        {
          text: `取消`,
          icon: mode !== 'ios' ? 'call' : null,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
