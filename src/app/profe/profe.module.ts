import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { profeRoutingModule } from './profe-routing.module';
import { profeComponent } from './profe.component';
import { ChaeaComponent } from './pages/chaea/chaea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HelpComponent } from './pages/help/help.component';
import { HistoryComponent } from './pages/history/history.component';
import { gruposComponent } from './pages/grupos/grupos.component';

import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SwiperModule } from "ngx-swiper-wrapper";
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import * as fromprofe from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { profeEffects } from './profe.effects';

import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParseToIntPipe } from './pipes/parse-to-int.pipe';
import { RadioIdPipe } from './pipes/radio-id.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GraficasComponent } from "./pages/history/graficas/graficas.component";
import { RadarComponent } from './pages/history/radar/radar.component';

@NgModule({
  declarations: [
    profeComponent,
    ChaeaComponent,
    DashboardComponent,
    ProfileComponent,
    HelpComponent,
    HistoryComponent,
    ParseToIntPipe,
    RadioIdPipe,
    GraficasComponent,
    RadarComponent,
    gruposComponent
  ],
  imports: [
    CommonModule,
    profeRoutingModule,
    NgbModule,
    SwiperModule,
    NgSelectModule,
    ChartsModule,
    NgxDatatableModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromprofe.profeFeatureKey,
      fromprofe.profeReducer
    ),
    EffectsModule.forFeature([profeEffects]),
  ],
})
export class profeModule {}
