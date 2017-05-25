var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {ProductDeleteDialog} from './productDeleteDialog.component';
//import {ProductWhereDialogComponent} from './productWhereDialog.component';
import { ProductComponent } from './product.component';
import { ProductsComponent } from './products.component';
import { ProductSingleComponent } from './productSingle.component';
import { ProductEditComponent } from './productEdit.component';
import { ProductService } from './product.service';
import { ProductRouting } from './productRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SmallDescriptionPipe } from './product.pipe';
import { ProductsAdminComponent } from './admin/productsAdmin.component';
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    NgModule({
        imports: [
            ProductRouting,
            CommonModule,
            FormsModule,
            MaterialModule,
            Ng2PaginationModule,
            ReactiveFormsModule,
        ],
        declarations: [
            //  ProductDeleteDialog,
            //  ProductWhereDialogComponent,
            SmallDescriptionPipe,
            ProductComponent,
            ProductsComponent,
            ProductSingleComponent,
            ProductEditComponent,
            ProductsAdminComponent,
        ],
        exports: [ProductsComponent],
        providers: [ProductService],
        entryComponents: []
    })
], ProductModule);
export { ProductModule };
//# sourceMappingURL=product.module.js.map