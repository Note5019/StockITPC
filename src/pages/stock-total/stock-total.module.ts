import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockTotalPage } from './stock-total';

@NgModule({
  declarations: [
    StockTotalPage,
  ],
  imports: [
    IonicPageModule.forChild(StockTotalPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockTotalPage,
  ]
})
export class StockTotalPageModule {}
