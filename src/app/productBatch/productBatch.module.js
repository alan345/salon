var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {ProductBatchDeleteDialog} from './productBatchDeleteDialog.component';
//import {ProductBatchWhereDialogComponent} from './productBatchWhereDialog.component';
//import {ProductBatchComponent} from './productBatch.component';
// import {ProductBatchsComponent} from './productBatchs.component';
// import {ProductBatchSingleComponent} from './productBatchSingle.component';
// import {ProductBatchEditComponent} from './productBatchEdit.component';
import { ProductBatchService } from './productBatch.service';
import { ProductBatchRouting } from './productBatchRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
//import {SmallDescriptionPipe} from './productBatch.pipe';
import { ProductBatchsAdminComponent } from './productBatchsAdmin.component';
var ProductBatchModule = (function () {
    function ProductBatchModule() {
    }
    return ProductBatchModule;
}());
ProductBatchModule = __decorate([
    NgModule({
        imports: [
            ProductBatchRouting,
            CommonModule,
            FormsModule,
            MaterialModule,
            Ng2PaginationModule,
            ReactiveFormsModule,
        ],
        declarations: [
            //  ProductBatchDeleteDialog,
            //  ProductBatchWhereDialogComponent,
            //  SmallDescriptionPipe,
            //  ProductBatchComponent,
            // ProductBatchsComponent,
            // ProductBatchSingleComponent,
            // ProductBatchEditComponent,
            ProductBatchsAdminComponent,
        ],
        exports: [],
        providers: [ProductBatchService],
        entryComponents: []
    })
], ProductBatchModule);
export { ProductBatchModule };
//# sourceMappingURL=productBatch.module.js.map