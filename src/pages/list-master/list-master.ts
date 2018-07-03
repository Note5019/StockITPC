import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  constructor(public navCtrl: NavController) {
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  clickStockIn(){
    this.navCtrl.push('StockInPage');
  }
  clickStockOut(){
    this.navCtrl.push('StockOutPage');
  }
  clickStockAdjust(){
    this.navCtrl.push('StockAdjdetailPage');
  }
  clickStockTotal(){
    this.navCtrl.push('StockTotalPage');
  }
  clickTransaction(){
    this.navCtrl.push('TransactionPage');
  }
  clickSetting(){
    this.navCtrl.push('SettingPage');
  }
  clickTestPage(){
    this.navCtrl.push('TestPage');
  }

}
