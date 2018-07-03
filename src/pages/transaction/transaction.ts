import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service/service';
/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  //transaction = [];
  products : any;
  site =  localStorage.getItem("site");
  constructor(public navCtrl: NavController, public navParams: NavParams,public Service:Service) {
    this.Service.GetTransactionProduct(this.site).subscribe((data)=>{ 
      //var count = Object.keys(data).length;
      if(data){
        this.products = data;

      }else{
        
      }
      console.log(this.products);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

}
