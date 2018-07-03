import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StockOutdetailPage } from './stock-outdetail';

@NgModule({
  declarations: [
    StockOutdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StockOutdetailPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockOutdetailPage,
  ]
})
export class StockOutdetailPageModule {}
