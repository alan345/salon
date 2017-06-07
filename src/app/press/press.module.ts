import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import { PressRouting} from './pressRouting.module';





// import { PresssSeeInactiveComponent} from './presssSeeInactive.component';
// import { PressDeleteDialog} from './pressDeleteDialog.component';
// import { PressComponent} from './press.component';
// import { PresssComponent} from './presss.component';
// import { SinglePressComponent} from './singlePress.component';
// import { PressService} from './press.service';


import { PressComponent} from './press.component';
import { PressesComponent} from './presses.component';
import { PressSingleComponent} from './pressSingle.component';
import { PressService} from './press.service';





@NgModule({
  imports:      [
    PressRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
  ],
  declarations: [

    PressComponent,
    PressesComponent,
    PressSingleComponent,

    // PressDeleteDialog,
    // PresssSeeInactiveComponent,
    // PressComponent,
    // PresssComponent,
    // SinglePressComponent,


//    PressDeleteDialog,
//    PressWhereDialogComponent,
//    PressComponent,
//    PresssComponent,
//    PressSingleComponent,
  ],
  exports:      [ PressesComponent ],
  providers:    [ PressService ],
  entryComponents: [

  //  PressWhereDialogComponent,
  ]
})
export class PressModule { }
