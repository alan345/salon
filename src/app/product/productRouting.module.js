var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductSingleComponent } from './productSingle.component';
import { ProductEditComponent } from './productEdit.component';
import { ProductsAdminComponent } from './admin/productsAdmin.component';
import { AdminGuardService } from '../admin/services/adminGuard';
export var routes = [
    { path: '', component: ProductsComponent },
    { path: 'admin', component: ProductsAdminComponent, canActivate: [AdminGuardService] },
    { path: ':id', component: ProductSingleComponent },
    //  {path: 'productEdit', component: ProductEditComponent},
    { path: 'productEdit/:id', component: ProductEditComponent, canActivate: [AdminGuardService] },
];
var ProductRouting = (function () {
    function ProductRouting() {
    }
    return ProductRouting;
}());
ProductRouting = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProductRouting);
export { ProductRouting };
//# sourceMappingURL=productRouting.module.js.map