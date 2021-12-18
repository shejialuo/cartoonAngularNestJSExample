import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(
     m => m.HomeModule
    )
  },
  {
    path: 'user-register',
    loadChildren: () => import('./user/user.module').then(
      m => m.UserModule
    )
  },
  {
    path: 'user-remark',
    loadChildren: () => import('./remark/remark.module').then(
      m => m.RemarkModule
    )
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule { }
