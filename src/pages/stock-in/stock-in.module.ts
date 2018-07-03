import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockInPage } from './stock-in';
@NgModule({
  declarations: [
    StockInPage,
  ],
  imports: [
    IonicPageModule.forChild(StockInPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockInPage,
  ]
})
export class StockInPageModule {}
