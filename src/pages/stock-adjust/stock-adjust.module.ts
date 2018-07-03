import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockAdjustPage } from './stock-adjust';

@NgModule({
  declarations: [
    StockAdjustPage,
    
  ],
  imports: [
    IonicPageModule.forChild(StockAdjustPage),
    TranslateModule.forChild(),
  ],
  exports: [
    StockAdjustPage,
  ]
})
export class StockAdjustPageModule {}
