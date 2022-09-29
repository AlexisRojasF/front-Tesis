import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { adminComponent } from './admin.component';
import { ChaeaComponent } from './pages/chaea/chaea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HelpComponent } from './pages/help/help.component';
import { adminisComponent1 } from './pages/adminis/adminis.component';
import { usuariosComponent2 } from './pages/usuarios/usuarios.component';
import { gruposComponent3 } from './pages/grupos/grupos.component';
import { facultadesComponent4 } from './pages/facultades/facultades.component';
import { reportesComponent5 } from './pages/reportes/reportes.component';
import { testComponent6 } from './pages/test/test.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: adminComponent,
    children: [
      {
        path: 'chaea',
        component: ChaeaComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'adminis',
        component: adminisComponent1
      },
      {
        path: 'usuarios',
        component: usuariosComponent2
      },
      {
        path: 'grupos',
        component: gruposComponent3
      },
      {
        path: 'facultades',
        component: facultadesComponent4
      },
      {
        path: 'test',
        component: testComponent6
      },
      {
        path: 'reportes',
        component: reportesComponent5
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        // pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule { }
