import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Service } from '../../providers/service/service';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
//import { MainPage } from '../pages';

/**
 * Generated class for the StockTotalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-total',
  templateUrl: 'stock-total.html',
})
export class StockTotalPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner,
              private toast: Toast,
              private  Service : Service,
              private alertCtrl: AlertController,
              public events: Events,
            ) {
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockIndetailPage');
  }

  products = [];
  site = localStorage.getItem('site');
  selectedProduct: any;
  productFound:boolean = false;
  scanItem(){
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = barcodeData.text;
      this.selectedProduct = this.selectedProduct.split("&",3);//ITEM_CD&LOT&QTY => AT-01&YES&50
      this.Service.GetTotalProduct(this.selectedProduct[0]).subscribe((data)=>{ //ITEM_CD
        var count = Object.keys(data).length;
        if(data){ 
          this.productFound = true;
          for(let i=0;i<count;i++){
            this.products.unshift({site:data[i].site,itemCateId:data[i].itemCate,itemCode:data[i].itemCode,itemName:data[i].itemName,stock:data[i].stock});
          }
          console.log(this.products);
        }else{
          this.productFound = false;
        this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        }
      },(error)=>{
        let alert = this.alertCtrl.create({
          title: 'Form Error',
          subTitle: 'Can not Connect database',
          buttons: ['Dismiss']
        });
        alert.present();
      }) ;
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
