/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from './productBatch.component.css.ngstyle';
import * as import1 from '@angular/core';
import * as import2 from '@angular/common';
import * as import3 from '../../../../src/app/productBatch/productBatchsAdmin.component';
import * as import4 from 'ng2-pagination/dist/paginate.pipe';
import * as import5 from 'ng2-pagination/dist/pagination.service';
import * as import6 from '@angular/platform-browser';
import * as import7 from '../../../../src/app/productBatch/productBatch.service';
import * as import8 from 'ng2-toastr/src/toast-manager';
import * as import9 from '@angular/material';
import * as import10 from '@angular/router';
import * as import11 from '../../../../src/app/auth/auth.service';
const styles_ProductBatchsAdminComponent:any[] = [import0.styles];
export const RenderType_ProductBatchsAdminComponent:import1.RendererType2 = import1.ɵcrt({
  encapsulation: 2,
  styles: styles_ProductBatchsAdminComponent,
  data: {}
}
);
function View_ProductBatchsAdminComponent_1(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),30,'tr',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),2,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    import1.ɵppd(2),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),2,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    import1.ɵppd(2),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'td',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      '',
      ''
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n      ']))
  ]
  ,(null as any),(ck,v) => {
    const currVal_0:any = v.context.$implicit.status;
    ck(v,3,0,currVal_0);
    const currVal_1:any = import1.ɵunv(v,6,0,ck(v,7,0,import1.ɵnov((<any>v.parent),0),v.context.$implicit.dateBegin,'medium'));
    ck(v,6,0,currVal_1);
    const currVal_2:any = import1.ɵunv(v,10,0,ck(v,11,0,import1.ɵnov((<any>v.parent),0),v.context.$implicit.dateEnd,'medium'));
    ck(v,10,0,currVal_2);
    const currVal_3:any = v.context.$implicit.nbProductsNotUpdated;
    ck(v,14,0,currVal_3);
    const currVal_4:any = v.context.$implicit.nbProductsNotCreated;
    ck(v,17,0,currVal_4);
    const currVal_5:any = v.context.$implicit.nbProductsUpdated;
    ck(v,20,0,currVal_5);
    const currVal_6:any = v.context.$implicit.nbProductsCreated;
    ck(v,23,0,currVal_6);
    const currVal_7:any = v.context.$implicit.total_item_treated;
    ck(v,26,0,currVal_7);
    const currVal_8:any = v.context.$implicit.total_count;
    ck(v,29,0,currVal_8);
  });
}
function View_ProductBatchsAdminComponent_2(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'button',[
      [
        'class',
        'ldmre'
      ]
      ,
      [
        'type',
        'button'
      ]

    ]
      ,(null as any),[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:any = v.component;
      if (('click' === en)) {
        const pd_0:any = ((<any>co.loadMore()) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n      Load More\n    ']))
  ]
  ,(null as any),(null as any));
}
export function View_ProductBatchsAdminComponent_0(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    import1.ɵpid(0,import2.DatePipe,[import1.LOCALE_ID]),
      (l()(),import1.ɵeld(0,(null as any),(null as any),81,'div',[[
        'class',
        'container'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n  '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),14,'div',[[
        'class',
        'goldgradient beigeborder subnav'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n    '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),1,'button',[[
        'class',
        'subnav-btnleft'
      ]
      ],(null as any),[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:import3.ProductBatchsAdminComponent = v.component;
      if (('click' === en)) {
        const pd_0:any = ((<any>co.goBack()) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },(null as any),(null as any))),
      (l()(),import1.ɵeld(0,(null as any),(null as any),0,'i',[[
        'class',
        'fa fa-chevron-left'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n    '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),1,'h3',[[
        'style',
        'text-align: center;'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),[
      'Products Batch (',
      '/',
      ')'
    ]
    )),
    (l()(),import1.ɵted((null as any),['\n    '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),1,'button',[[
        'class',
        'subnav'
      ]
      ],(null as any),[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:import3.ProductBatchsAdminComponent = v.component;
      if (('click' === en)) {
        const pd_0:any = ((<any>co.refresh()) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },(null as any),(null as any))),
      (l()(),import1.ɵeld(0,(null as any),(null as any),0,'i',[[
        'class',
        'fa fa-refresh'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),2,'button',[
      [
        'class',
        'subnav-btnright'
      ]
      ,
      [
        'onclick',
        'window.open(\'/productBatch/refreshbdd\', \'_blank\')'
      ]

    ]
    ,(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['New Pull Batch '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),0,'i',[[
        'class',
        'fa fa-refresh'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),7,'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n\n    '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),4,'div',[[
        'class',
        'subsubnav-productBatch beigeback'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n      '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),1,'div',[[
        'class',
        'productBatch-srchrow'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n\n      '])),
    (l()(),import1.ɵted((null as any),['\n\n    '])),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n\n  '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),42,'table',[[
        'class',
        'table table-hover table-responsive table-condensed pdt-tbl'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n\n    '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),31,'thead',[[
        'class',
        'head-clts'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n      '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),28,'tr',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['Status'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['Begin'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['End'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['# Not Updated'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['# Not Created'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['# Updated'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['# Created'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['# treated'])),
    (l()(),import1.ɵted((null as any),['\n        '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'th',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['total'])),
    (l()(),import1.ɵted((null as any),['\n      '])),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),6,'tbody',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n      '])),
    (l()(),import1.ɵand(8388608,(null as any),(null as any),3,(null as any),View_ProductBatchsAdminComponent_1)),
    import1.ɵdid(401408,(null as any),0,import2.NgForOf,[
      import1.ViewContainerRef,
      import1.TemplateRef,
      import1.IterableDiffers
    ]
      ,{ngForOf: [
        0,
        'ngForOf'
      ]
    },(null as any)),
    import1.ɵpod([
      'id',
      'itemsPerPage',
      'currentPage',
      'totalItems'
    ]
    ),
    import1.ɵpid(0,import4.PaginatePipe,[import5.PaginationService]),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n  '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),9,'div',[[
        'class',
        'has-text-centered'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),3,'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    import1.ɵdid(139264,(null as any),0,import2.NgClass,[
      import1.IterableDiffers,
      import1.KeyValueDiffers,
      import1.ElementRef,
      import1.Renderer
    ]
      ,{ngClass: [
        0,
        'ngClass'
      ]
    },(null as any)),
    import1.ɵpod(['hidden']),
    (l()(),import1.ɵted((null as any),['Loading...'])),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵand(8388608,(null as any),(null as any),1,(null as any),View_ProductBatchsAdminComponent_2)),
    import1.ɵdid(8192,(null as any),0,import2.NgIf,[
      import1.ViewContainerRef,
      import1.TemplateRef
    ]
      ,{ngIf: [
        0,
        'ngIf'
      ]
    },(null as any)),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n'])),
    (l()(),import1.ɵted((null as any),['\n']))
  ]
  ,(ck,v) => {
    var co:import3.ProductBatchsAdminComponent = v.component;
    const currVal_2:any = import1.ɵunv(v,66,0,import1.ɵnov(v,68).transform(co.fetchedProductBatchs,ck(v,67,0,'server',co.paginationData.itemsPerPage,co.paginationData.currentPage,co.paginationData.totalItems)));
    ck(v,66,0,currVal_2);
    const currVal_3:any = ck(v,76,0,!co.loading);
    ck(v,75,0,currVal_3);
    const currVal_4:any = ((co.paginationData.currentPage * co.paginationData.itemsPerPage) < co.paginationData.totalItems);
    ck(v,80,0,currVal_4);
  },(ck,v) => {
    var co:import3.ProductBatchsAdminComponent = v.component;
    const currVal_0:any = (co.paginationData.currentPage * co.paginationData.itemsPerPage);
    const currVal_1:any = co.paginationData.totalItems;
    ck(v,9,0,currVal_0,currVal_1);
  });
}
function View_ProductBatchsAdminComponent_Host_0(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'app-productBatchs',([] as any[]),(null as any),(null as any),(null as any),View_ProductBatchsAdminComponent_0,RenderType_ProductBatchsAdminComponent)),
    import1.ɵdid(57344,(null as any),0,import3.ProductBatchsAdminComponent,[
      import6.DomSanitizer,
      import7.ProductBatchService,
      import8.ToastsManager,
      import9.MdDialog,
      import10.Router,
      import2.Location,
      import11.AuthService
    ]
    ,(null as any),(null as any))
  ]
  ,(ck,v) => {
    ck(v,1,0);
  },(null as any));
}
export const ProductBatchsAdminComponentNgFactory:import1.ComponentFactory<import3.ProductBatchsAdminComponent> = import1.ɵccf('app-productBatchs',import3.ProductBatchsAdminComponent,View_ProductBatchsAdminComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2FsYW4vYXBwL2FsZXMvc2Fsb24vc3JjL2FwcC9wcm9kdWN0QmF0Y2gvcHJvZHVjdEJhdGNoc0FkbWluLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9hbGFuL2FwcC9hbGVzL3NhbG9uL3NyYy9hcHAvcHJvZHVjdEJhdGNoL3Byb2R1Y3RCYXRjaHNBZG1pbi5jb21wb25lbnQudHMiLCJuZzovLy9Vc2Vycy9hbGFuL2FwcC9hbGVzL3NhbG9uL3NyYy9hcHAvcHJvZHVjdEJhdGNoL3Byb2R1Y3RCYXRjaHNBZG1pbi5jb21wb25lbnQuaHRtbCIsIm5nOi8vL1VzZXJzL2FsYW4vYXBwL2FsZXMvc2Fsb24vc3JjL2FwcC9wcm9kdWN0QmF0Y2gvcHJvZHVjdEJhdGNoc0FkbWluLmNvbXBvbmVudC50cy5Qcm9kdWN0QmF0Y2hzQWRtaW5Db21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJnb2xkZ3JhZGllbnQgYmVpZ2Vib3JkZXIgc3VibmF2XCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym5hdi1idG5sZWZ0XCIgKGNsaWNrKT1cImdvQmFjaygpXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+PC9idXR0b24+XG4gICAgPGgzIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlByb2R1Y3RzIEJhdGNoICh7eyBwYWdpbmF0aW9uRGF0YS5jdXJyZW50UGFnZSAqIHBhZ2luYXRpb25EYXRhLml0ZW1zUGVyUGFnZX19L3t7cGFnaW5hdGlvbkRhdGEudG90YWxJdGVtc319KTwvaDM+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym5hdlwiIChjbGljayk9XCJyZWZyZXNoKClcIj48aSBjbGFzcz1cImZhIGZhLXJlZnJlc2hcIj48L2k+PC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym5hdi1idG5yaWdodFwiIG9uY2xpY2s9XCJ3aW5kb3cub3BlbignL3Byb2R1Y3RCYXRjaC9yZWZyZXNoYmRkJywgJ19ibGFuaycpXCI+TmV3IFB1bGwgQmF0Y2ggPGkgY2xhc3M9XCJmYSBmYS1yZWZyZXNoXCI+PC9pPjwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJzdWJzdWJuYXYtcHJvZHVjdEJhdGNoIGJlaWdlYmFja1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RCYXRjaC1zcmNocm93XCI+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyIHRhYmxlLXJlc3BvbnNpdmUgdGFibGUtY29uZGVuc2VkIHBkdC10YmxcIj5cblxuICAgIDx0aGVhZCBjbGFzcz1cImhlYWQtY2x0c1wiPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgICAgPHRoPkJlZ2luPC90aD5cbiAgICAgICAgPHRoPkVuZDwvdGg+XG4gICAgICAgIDx0aD4jIE5vdCBVcGRhdGVkPC90aD5cbiAgICAgICAgPHRoPiMgTm90IENyZWF0ZWQ8L3RoPlxuICAgICAgICA8dGg+IyBVcGRhdGVkPC90aD5cbiAgICAgICAgPHRoPiMgQ3JlYXRlZDwvdGg+XG4gICAgICAgIDx0aD4jIHRyZWF0ZWQ8L3RoPlxuICAgICAgICA8dGg+dG90YWw8L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcHJvZHVjdEJhdGNoIG9mIGZldGNoZWRQcm9kdWN0QmF0Y2hzIHwgcGFnaW5hdGU6IHsgaWQ6ICdzZXJ2ZXInLCBpdGVtc1BlclBhZ2U6IHBhZ2luYXRpb25EYXRhLml0ZW1zUGVyUGFnZSwgY3VycmVudFBhZ2U6IHBhZ2luYXRpb25EYXRhLmN1cnJlbnRQYWdlLCB0b3RhbEl0ZW1zOiBwYWdpbmF0aW9uRGF0YS50b3RhbEl0ZW1zIH1cIj5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLnN0YXR1c319PC90ZD5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLmRhdGVCZWdpbnwgZGF0ZTonbWVkaXVtJ319PC90ZD5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLmRhdGVFbmR8IGRhdGU6J21lZGl1bSd9fTwvdGQ+XG4gICAgICAgIDx0ZD57e3Byb2R1Y3RCYXRjaC5uYlByb2R1Y3RzTm90VXBkYXRlZH19PC90ZD5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLm5iUHJvZHVjdHNOb3RDcmVhdGVkfX08L3RkPlxuICAgICAgICA8dGQ+e3twcm9kdWN0QmF0Y2gubmJQcm9kdWN0c1VwZGF0ZWR9fTwvdGQ+XG4gICAgICAgIDx0ZD57e3Byb2R1Y3RCYXRjaC5uYlByb2R1Y3RzQ3JlYXRlZH19PC90ZD5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLnRvdGFsX2l0ZW1fdHJlYXRlZH19PC90ZD5cbiAgICAgICAgPHRkPnt7cHJvZHVjdEJhdGNoLnRvdGFsX2NvdW50fX08L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuICA8ZGl2IGNsYXNzPVwiaGFzLXRleHQtY2VudGVyZWRcIj5cbiAgICA8ZGl2IFtuZ0NsYXNzXT1cInsgJ2hpZGRlbic6ICFsb2FkaW5nIH1cIj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJwYWdpbmF0aW9uRGF0YS5jdXJyZW50UGFnZSAqIHBhZ2luYXRpb25EYXRhLml0ZW1zUGVyUGFnZSA8IHBhZ2luYXRpb25EYXRhLnRvdGFsSXRlbXNcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJsb2FkTW9yZSgpXCIgY2xhc3M9XCJsZG1yZVwiPlxuICAgICAgTG9hZCBNb3JlXG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iLCI8YXBwLXByb2R1Y3RC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
