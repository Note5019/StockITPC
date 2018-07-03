import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockOutPage } from './stock-out';

@NgModule({
  declarations: [
    StockOutPage,
  ],
  imports: [
    IonicPageModule.forChild(StockOutPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockOutPage,
  ]
})
export class StockOutPageModule {}
