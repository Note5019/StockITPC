import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockAdjdetailPage } from './stock-adjdetail';

@NgModule({
  declarations: [
    StockAdjdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StockAdjdetailPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockAdjdetailPage
  ],
})
export class StockAdjdetailPageModule {}
