import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the StockInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-out',
  templateUrl: 'stock-out.html',
})
export class StockOutPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockOutPage');
  }
  stockOut = {number:null,date:null,site:localStorage.getItem('site')};
  
  confirmStockOut(){
    if(this.stockOut.number!=null&&this.stockOut.date!=null&&this.stockOut.site!=null){
      this.navCtrl.push('StockOutdetailPage',{number:this.stockOut.number, date:this.stockOut.date, site:localStorage.getItem('site')});
      console.log(this.stockOut);
    }else{
      this.stockOutFormAlert();
      console.log(this.stockOut);
    }
  }

  stockOutFormAlert() {
    let alert = this.alertCtrl.create({
      title: 'Form Error',
      subTitle: 'Please input data',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
