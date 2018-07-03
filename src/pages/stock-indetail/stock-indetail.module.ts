import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockIndetailPage } from './stock-indetail';

@NgModule({
  declarations: [
    StockIndetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StockIndetailPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockIndetailPage,
  ]
})
export class StockIndetailPageModule {}
