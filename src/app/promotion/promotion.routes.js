// import {AuthGuardService} from '../auth/authguard.service';
//
// import {AppComponent} from '../app.component';
import { PromotionsComponent } from './promotions.component';
import { SinglePromotionComponent } from './singlePromotion.component';
import { PromotionsSeeInactiveComponent } from './promotionsSeeInactive.component';
export var USER_PROMOTIONS = [
    { path: '', component: PromotionsComponent },
    { path: 'seeInactive', component: PromotionsSeeInactiveComponent },
    { path: 'singlepromotion', component: SinglePromotionComponent },
    { path: 'singlepromotion/:id', component: SinglePromotionComponent },
    { path: ':id', component: SinglePromotionComponent },
];
//# sourceMappingURL=promotion.routes.js.map