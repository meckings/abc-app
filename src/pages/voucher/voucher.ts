import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the VoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
})
export class VoucherPage {

  email:any;
  token:any;
  public vouchers:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rest: RestProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
                this.email = navParams.get('email');
                this.token = navParams.get('token');
                this.getVouchers(this.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoucherPage');
  }

  getVouchers(email){
    let path = '/voucher/'+email;
    this.rest.get(path, this.token).then(
      data=>{
        this.vouchers = data;
        console.log(this.vouchers);
      });
  }

  newRequest(){
    let loader = this.presentLoading('loading...');
    let path = '/voucher/create/'+this.email;
    this.rest.post(path, this.token).then(
      data=>{
        console.log(data);
        this.presentToast('New voucher request created');
        this.getVouchers(this.email);
      }
    )
    loader.dismiss();
  }

  presentToast(message) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentLoading(msg) {
      const loader = this.loadingCtrl.create({
        content: msg,
        //duration: 3000
      });
       loader.present();
      return loader;
    }
}
