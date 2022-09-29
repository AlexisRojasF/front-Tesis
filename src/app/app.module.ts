import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";

import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { ErrorComponent } from './error/error.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
 import { ChartsModule } from "ng2-charts";

 const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
   suppressScrollX: true,
   wheelPropagation: false,
 };

 const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
   direction: "horizontal",
   slidesPerView: "auto",
 };

 @NgModule({
   declarations: [AppComponent, ErrorComponent, FullLayoutComponent],
   imports: [
     NgbModule,
     SwiperModule,
     SharedModule,
     ChartsModule,
     RouterModule,
     NgxSpinnerModule,
     AppRoutingModule,
     HttpClientModule,
     PerfectScrollbarModule,
     BrowserAnimationsModule,
     ReactiveFormsModule,
     ToastrModule.forRoot(),
     StoreModule.forRoot(reducers, {
       metaReducers,
       runtimeChecks: {
         strictStateImmutability: true,
         strictActionImmutability: true,
         strictStateSerializability: true,
         strictActionSerializability: true,
       },
     }),
     StoreDevtoolsModule.instrument({
       maxAge: 25,
       logOnly: environment.production,
     }),
     EffectsModule.forRoot([]),
     StoreRouterConnectingModule.forRoot({
       stateKey: "router",
       routerState: RouterState.Minimal,
     }),
   ],
   providers: [
     {
       provide: PERFECT_SCROLLBAR_CONFIG,
       useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
     },
     WINDOW_PROVIDERS,
     {
       provide: SWIPER_CONFIG,
       useValue: DEFAULT_SWIPER_CONFIG,
     },
   ],
   bootstrap: [AppComponent],
 })
 export class AppModule {}
