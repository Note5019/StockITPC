import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service} from '../../providers/service/service';
/**
 * Generated class for the StockAdjustPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-adjust',
  templateUrl: 'stock-adjust.html',
})
export class StockAdjustPage {
  Adjust : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public Service : Service) {
    this.Service.GetProductCate().subscribe((data)=>{ 
      if(data){
        this.Adjust = data;
        console.log(this.Adjust);
      }else{
        
      }
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockAdjustPage');
  }
  stoctAdj = {site:null,category:null};
  confirmStockAdj(){
    console.log(this.stoctAdj);
    this.navCtrl.push('StockAdjdetailPage',this.stoctAdj);
  }

}
