import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Service } from '../../providers/service/service';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../pages';
/**
 * Generated class for the StockAdjdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-adjdetail',
  templateUrl: 'stock-adjdetail.html',
})
export class StockAdjdetailPage {
  
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
    console.log('ionViewDidLoad StockAdjdetailPage');
  }

  products = [];
  site = localStorage.getItem('site');
  selectedProduct: any;
  productFound:boolean = false;

  scanItem(){

    this.selectedProduct = String;
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct =  barcodeData.text;
      this.selectedProduct = this.selectedProduct.split("&",3);//ITEM_CD&LOT&QTY => AT-01&YES&50
      this.Service.GetAdjustProduct(this.selectedProduct[0],this.site).subscribe((data)=>{ 
        var count = Object.keys(data).length;
        if(data){ 
          this.productFound = true;
          for(let i=0;i<count;i++){
            this.products.unshift({site:this.site,itemCateId:data[i].itemCate,itemCode:data[i].itemCode,itemName:data[i].itemName,stock:data[i].stock,count:0,diff:0});
          }
          console.log(this.products);
        }else{
          this.productFound = false;
          this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          });
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

  onInput(itemCode){
    for (var i in this.products) {
      if (this.products[i].itemCode == itemCode) {
          this.products[i].diff = this.products[i].stock - this.products[i].count;
         break; //Stop this loop, we found it!
      }
    }
  
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }

  confirmForm(){
    for(let i=0;i<this.products.length;i++){
      this.Service.PostStockAdjust(this.site,this.products[i].itemCateId,this.products[i].itemCode,this.products[i].stock,this.products[i].count,this.products[i].diff).subscribe((data)=>{
        if(data){

        }else{
          this.StockAdjFormFail();
        }
      }); 
    }
    this.StockAdjFormSuccess();
    this.navCtrl.push(MainPage);   
  }

  StockAdjFormFail() {
    let alert = this.alertCtrl.create({
      title: 'Form Error',
      subTitle: 'Fail',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  StockAdjFormSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Form Success',
      subTitle: 'Success',
      buttons: ['OK']
    });
    alert.present();
  }

  // getItems(searchbar) {
  //   alert("bfvfvf");
  
  // }


}
