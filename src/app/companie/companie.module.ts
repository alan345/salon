import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CompanieFilterPipe} from './companieFilter.pipe';
import { CompanieDetailUsersComponent} from './companieDetailUsers.component';
import { CompaniePicturesComponent} from './companiePictures.component';
import { AddUserByCompanieComponent} from './addUser/addUserByCompanie.component';
import { CompaniesComponent} from './admin/companies.component';
import { CompanieComponent} from './companie.component';
import { EditCompanieComponent} from './editCompanie.component';
import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { CompanieDetailComponent} from './companieDetail.component';
import { CompanieService} from './companie.service';
import { CompanieRouting} from './companieRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  imports:      [
//    VideoRouting,
    CompanieRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    CompanieDetailUsersComponent,
    CompaniePicturesComponent,
    CompaniesComponent,
    CompanieComponent,
    EditCompanieComponent,
    EditAddUserToCompanieComponent,
    CompanieDetailComponent,
    CompanieFilterPipe,
    AddUserByCompanieComponent,
  ],
  exports:      [ ],
  providers:    [ CompanieService ],
  entryComponents: [ ]
})
export class CompanieModule { }
