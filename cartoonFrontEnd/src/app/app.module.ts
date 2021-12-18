import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './home/home.module';
import { RoutingModule } from './routing.module';
import { NavModule } from './nav/nav.module';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './http-interceptors';
import { RemarkModule } from './remark/remark.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    HomeModule,
    RemarkModule,
    NavModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
