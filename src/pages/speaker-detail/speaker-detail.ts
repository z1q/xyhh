import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GoodDetailPage } from '../good-detail/good-detail';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data.speaker;
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(GoodDetailPage, {
      name: session.name,
      session: session
    });
  }
}
