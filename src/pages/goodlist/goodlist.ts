import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, List, ModalController, NavController, LoadingController,Refresher } from 'ionic-angular';
/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';
import { GoodDetailPage } from '../good-detail/good-detail';
import { GoodSubmitPage } from '../good-submit/good-submit';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

import { GoodsData } from '../../providers/goods';
import { ToastService } from '../../providers/toast';

@Component({
  selector: 'page-goodlist',
  templateUrl: 'goodlist.html',
  providers:[GoodsData,ToastService]
})
export class GoodList {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  goods: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public gdata:GoodsData,
    public toast:ToastService,
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('物品');
    this.updateGood();
  }

  updateGood() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();
    //this.gdata.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment)
    this.gdata.get().then((data: any) => {
      console.log(data);
      this.goods = data;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateGood();
      }
    });
  }

  goToGoodDetail(goodData: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(GoodDetailPage, {
      name: goodData.goodname,
      good: goodData
    });
  }

  openSubmit() {
    this.navCtrl.push(GoodSubmitPage).then(
        ()=>{
          const index = this.navCtrl.getActive().index;
          console.log(this.navCtrl.getActive());
          this.navCtrl.remove(index+1);
        }
    ).catch(exception => {console.log('Exception ' + exception)});
  }

  doRefresh(refresher: Refresher) {
    this.gdata.get().then((data: any) => {
      this.goods = data;
      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();
        this.toast.present('已刷新')
      }, 1000);
    });
  }

  //addFavorite(slidingItem: ItemSliding, sessionData: any) {
  //
  //  if (this.user.hasFavorite(sessionData.name)) {
  //    // woops, they already favorited it! What shall we do!?
  //    // prompt them to remove it
  //    this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
  //  } else {
  //    // remember this session as a user favorite
  //    this.user.addFavorite(sessionData.name);
  //
  //    // create an alert instance
  //    let alert = this.alertCtrl.create({
  //      title: 'Favorite Added',
  //      buttons: [{
  //        text: 'OK',
  //        handler: () => {
  //          // close the sliding item
  //          slidingItem.close();
  //        }
  //      }]
  //    });
  //    // now present the alert on top of all other content
  //    alert.present();
  //  }
  //
  //}

  //removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
  //  let alert = this.alertCtrl.create({
  //    title: title,
  //    message: 'Would you like to remove this session from your favorites?',
  //    buttons: [
  //      {
  //        text: 'Cancel',
  //        handler: () => {
  //          // they clicked the cancel button, do not remove the session
  //          // close the sliding item and hide the option buttons
  //          slidingItem.close();
  //        }
  //      },
  //      {
  //        text: 'Remove',
  //        handler: () => {
  //          // they want to remove this session from their favorites
  //          this.user.removeFavorite(sessionData.name);
  //          this.updateSchedule();
  //
  //          // close the sliding item and hide the option buttons
  //          slidingItem.close();
  //        }
  //      }
  //    ]
  //  });
  //  // now present the alert on top of all other content
  //  alert.present();
  //}

}
