import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRoutingModule } from './admin-routing.module';
import { adminComponent } from './admin.component';
import { adminisComponent1 } from './pages/adminis/adminis.component';
import { facultadesComponent4 } from './pages/facultades/facultades.component';
import { testComponent6 } from './pages/test/test.component';
import { usuariosComponent2 } from './pages/usuarios/usuarios.component'
import { ChaeaComponent } from './pages/chaea/chaea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HelpComponent } from './pages/help/help.component';
import { HistoryComponent } from './pages/history/history.component';
import { gruposComponent3 } from './pages/grupos/grupos.component';

import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SwiperModule } from "ngx-swiper-wrapper";
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import * as fromadmin from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { adminEffects } from './admin.effects';

import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParseToIntPipe } from './pipes/parse-to-int.pipe';
import { RadioIdPipe } from './pipes/radio-id.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GraficasComponent } from "./pages/history/graficas/graficas.component";
import { RadarComponent } from './pages/history/radar/radar.component';

@NgModule({
  declarations: [
    adminComponent,
    ChaeaComponent,
    DashboardComponent,
    ProfileComponent,
    HelpComponent,
    HistoryComponent,
    ParseToIntPipe,
    RadioIdPipe,
    GraficasComponent,
    RadarComponent,
    adminisComponent1,
    usuariosComponent2,
    testComponent6,
    facultadesComponent4,
    gruposComponent3
    
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    NgbModule,
    SwiperModule,
    NgSelectModule,
    ChartsModule,
    NgxDatatableModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromadmin.adminFeatureKey,
      fromadmin.adminReducer
    ),
    EffectsModule.forFeature([adminEffects]),
  ],
})
export class adminModule {}
