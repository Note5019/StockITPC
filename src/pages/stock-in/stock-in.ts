import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the StockInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-in',
  templateUrl: 'stock-in.html',
})
export class StockInPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public events: Events,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockInPage');
  }
  stockIn = { number: null, date: null, site: localStorage.getItem('site') };

  confirmStockIn() {
    if (this.stockIn.number != null && this.stockIn.date != null && this.stockIn.site != null) {
      this.navCtrl.push('StockIndetailPage', { number: this.stockIn.number, date: this.stockIn.date, site: localStorage.getItem('site') });
      console.log(this.stockIn);
    } else {
      this.StockInFormAlert();
      console.log(this.stockIn);
    }
  }

  StockInFormAlert() {
    let alert = this.alertCtrl.create({
      title: 'Form Error',
      subTitle: 'Please provide the information in the space given',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
