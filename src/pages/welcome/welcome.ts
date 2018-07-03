import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';
import { MainPage } from '../pages';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Service } from '../../providers/service/service';
import { AlertController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  providers: [Service]
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private alertCtrl: AlertController,
    private loginService: Service,
    private menu: MenuController,

  ) {

  }

  //Disable side menu for login page
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  //Enable side menu for another page
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  login = { username: null, password: null, site: null };
  logins: any;
  loginForm() {
    this.navCtrl.push(MainPage);
    if (this.login.username != null && this.login.password != null && this.login.site != null) {

      this.login.password = (<string>Md5.hashStr(this.login.password)).toUpperCase();
      this.loginService.login(this.login.username, this.login.password).subscribe((data) => {
        if (data == true) {
          this.navCtrl.push(MainPage);
          localStorage.setItem('username', this.login.username);
          localStorage.setItem('site', this.login.site);
        } else {
          this.LoginFormAlert("ไม่พบข้อมูล ด้วย login ปกติ");
        }
      }, (error) => {
        // let alert = this.alertCtrl.create({                   //ยุบเป็น fn ได้ไหม?
        //   title: 'Form Error',
        //   subTitle: 'Can not Connect database',
        //   buttons: ['Dismiss']
        // });
        this.LoginFormAlert("ไม่สามารถเชื่อมต่อดาต้าเบสได้จ้าาาาา ด้วย login ปกติ");
        // alert.present();
      });
    } else {
      this.LoginFormAlert("กรอกไม่ครบ ด้วย login ปกติ");
    }
  }

  Logins: any;
  username: string;
  password: string;
  site: string;
  LoginFound: boolean = false;
  scanQrcodeLogin() {

    this.barcodeScanner.scan().then((barcodeData) => {
      this.Logins = barcodeData.text;
      this.Logins = this.Logins.split("&", 3);//username&password&site
      //Cann't use Logins in this function So I create variable
      this.username = this.Logins[0];
      this.password = this.Logins[1];
      this.site = this.Logins[2];

      this.password = (<string>Md5.hashStr(this.password)).toUpperCase();

      this.loginService.login(this.username, this.password).subscribe((data) => {
        if (data) {
          this.LoginFound = true;
          localStorage.setItem('username', this.username);
          localStorage.setItem('site', this.site);
          this.navCtrl.push(MainPage);

        } else {
          this.LoginFound = false;
          this.LoginFormAlert("ไม่พบข้อมูล ด้วย QRCode");
        }
      }, (error) => {
        // let alert = this.alertCtrl.create({                   //ยุบเป็น fn ได้ไหม?
        //   title: 'Form Error',
        //   subTitle: 'Can not Connect database',
        //   buttons: ['Dismiss']
        // });
        this.LoginFormAlert("ไม่สามารถเชื่อมต่อดาต้าเบสได้จ้าาาาา ด้วย QRCode");
        // alert.present();
      });
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  LoginFormAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Form Error',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
