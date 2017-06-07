import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

// import { PromotionDeleteDialog} from './promotionDeleteDialog.component';
// import { PromotionWhereDialogComponent} from './promotionWhereDialog.component';
// import { PromotionComponent} from './promotion.component';
// import { PromotionsComponent} from './promotions.component';
// import { PromotionSingleComponent} from './promotionSingle.component';
// import { PromotionService} from './promotion.service';
 import { PromotionRouting} from './promotionRouting.module';




import { PromotionsSeeInactiveComponent} from './promotionsSeeInactive.component';
import { PromotionDeleteDialog} from './promotionDeleteDialog.component';
import { PromotionComponent} from './promotion.component';
import { PromotionsComponent} from './promotions.component';
import { SinglePromotionComponent} from './singlePromotion.component';
import { PromotionService} from './promotion.service';




@NgModule({
  imports:      [
    PromotionRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
  ],
  declarations: [

    PromotionDeleteDialog,
    PromotionsSeeInactiveComponent,
    PromotionComponent,
    PromotionsComponent,
    SinglePromotionComponent,


//    PromotionDeleteDialog,
//    PromotionWhereDialogComponent,
//    PromotionComponent,
//    PromotionsComponent,
//    PromotionSingleComponent,
  ],
  exports:      [ PromotionsComponent ],
  providers:    [ PromotionService ],
  entryComponents: [
    PromotionDeleteDialog,
  //  PromotionWhereDialogComponent,
  ]
})
export class PromotionModule { }
