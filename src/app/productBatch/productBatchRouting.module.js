var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductBatchsAdminComponent } from './productBatchsAdmin.component';
import { AdminGuardService } from '../admin/services/adminGuard';
export var routes = [
    { path: '', component: ProductBatchsAdminComponent, canActivate: [AdminGuardService] },
];
var ProductBatchRouting = (function () {
    function ProductBatchRouting() {
    }
    return ProductBatchRouting;
}());
ProductBatchRouting = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProductBatchRouting);
export { ProductBatchRouting };
//# sourceMappingURL=productBatchRouting.module.js.map