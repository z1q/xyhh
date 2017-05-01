import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-good-detail',
  templateUrl: 'good-detail.html'
})
export class GoodDetailPage {
  good: any;

  constructor(public navParams: NavParams) {
    this.good = navParams.data.good;
  }
}
