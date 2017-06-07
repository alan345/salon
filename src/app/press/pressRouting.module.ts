import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import {PressesComponent} from './presses.component';
import {PressSingleComponent} from './pressSingle.component';




export const routes: Routes = [
  {path: '', component: PressesComponent},
  {path: 'pressSingle', component: PressSingleComponent},
  {path: 'pressSingle/:id', component: PressSingleComponent},
  {path: ':id', component: PressSingleComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressRouting {}
