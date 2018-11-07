import { VoucherPage } from './../voucher/voucher';
import { HomePage } from './../home/home';
import { HttpHeaders } from '@angular/common/http';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  oauth:any;
  email:any ="";
  password:any ="";
  token:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  getToken(){
    let data = {
      'username': this.email,
      'password': this.password,
      'client_id': this.restProvider.clientId,
      'client_secret': this.restProvider.clientSecret,
      'grant_type':'password'
    }

    this.restProvider.getToken(data).then(
      data=>{
        this.oauth = data;
        console.log(this.oauth);
        this.token = this.oauth.access_token;
        this.navCtrl.push(VoucherPage, {token:this.token, email:this.email});
      },
      err=>{
        console.log(err.message);
      }
    )
  }
}
