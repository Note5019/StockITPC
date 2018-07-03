import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Service } from '../../providers/service/service';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../pages';
/**
 * Generated class for the StockIndetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-indetail',
  templateUrl: 'stock-indetail.html',
})
export class StockIndetailPage {
  tests: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private Service: Service,
    private alertCtrl: AlertController,
    public events: Events,
  ) {

  }
  number: String;
  date: String;
  site: String;
  ionViewDidLoad() {
    console.log('ionViewDidLoad StockIndetailPage');
    this.number = this.navParams.get('number');
    this.date = this.navParams.get('date');
    this.site = this.navParams.get('site');
  }


  products = [];
  selectedProduct: any;
  productFound: boolean = false;
  // this.selectedProduct = [];
  // this.selectedProduct[0] = 'AT-02';
  // this.selectedProduct[1] = 'YES';
  // this.selectedProduct[2] = '50';
  // this.selectedProduct[3] = '1';
  scanItem() {

    this.selectedProduct = String;
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = barcodeData.text;
      this.selectedProduct = this.selectedProduct.split("&", 3);//ITEM_CD&LOT&QTY => AT-01&YES&50
      this.Service.GetProduct(this.selectedProduct[0]).subscribe((data) => {
        //data = ["AT-01", "SHIM TAPE", "1"]
        if (data) {
          this.productFound = true;
          this.products.unshift({ itemCode: data[0], itemName: data[1], itemLot: this.selectedProduct[1], itemQty: this.selectedProduct[2], itemCateId: data[2] });
          console.log({ itemCode: data[0], itemName: data[1], itemLot: this.selectedProduct[1], itemQty: this.selectedProduct[2], itemCateId: data[2] });
        } else {
          this.productFound = false;
          this.toast.show(`Product not found`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            });
        }
      }, (error) => {
        let alert = this.alertCtrl.create({
          title: 'Form Error',
          subTitle: 'Can not Connect database',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  minItemQty(itemCode) {
    for (var i in this.products) {
      if (this.products[i].itemCode == itemCode) {
        this.products[i].itemQty--;
        break; //Stop this loop, we found it!
      }
    }

  }
  plusItemQty(itemCode) {
    for (var i in this.products) {
      if (this.products[i].itemCode == itemCode) {
        this.products[i].itemQty++;
        break; //Stop this loop, we found it!
      }
    }
  }

  username = localStorage.getItem('username');
  status = 'IN';

  confirmForm() {
    this.Service.PostStockOrder(this.number, this.date, this.site, this.status, this.username).subscribe((data) => {
      if (data) {
        for (let i = 0; i < this.products.length; i++) {
          //alert(this.products[i].itemCode);
          this.Service.PostStockOrderDetail(this.number, this.products[i].itemCode, this.products[i].itemName, this.products[i].itemLot, this.products[i].itemQty, this.products[i].itemCateId).subscribe((data) => {

          });
        }
        this.StockInFormSuccess();
        this.navCtrl.push(MainPage);

      } else {
        this.StockInFormFail();
      }

    });

  }

  // confirmForm(){
  //   this.Service.PostTest(this.number,this.date,this.site,this.status,this.username,this.products).subscribe((data)=>{
  //     if(data){
  //       this.StockInFormSuccess();
  //       console.log(data);
  //     }else{
  //       this.StockInFormFail();
  //       console.log(data);
  //     }

  //   });

  // }

  delete(itemCode) {
    for (var i in this.products) {
      if (this.products[i].itemCode == itemCode) {
        this.products.pop();
        break; //Stop this loop, we found it!
      }
    }
    console.log(this.products);
  }
  StockInFormFail() {
    let alert = this.alertCtrl.create({
      title: 'Form Error',
      subTitle: 'Fail',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  StockInFormSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Form Success',
      subTitle: 'Success',
      buttons: ['OK']
    });
    alert.present();
  }
}

