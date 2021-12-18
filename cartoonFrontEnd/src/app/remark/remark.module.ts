import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRemarkComponent } from './user-remark/user-remark.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {path: 'user-remark', component: UserRemarkComponent},
];

@NgModule({
  declarations: [
    UserRemarkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class RemarkModule { }
