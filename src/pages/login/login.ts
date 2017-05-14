import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserProfile } from '../../providers/user'
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public navCtrl: NavController,
      public userData: UserData,
      public userf: UserProfile
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userf.login({username:this.login.username,password:this.login.password}).then(
          (data:any)=>{
            console.log(data);
              this.navCtrl.push(TabsPage);
          }
      )
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
