import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { profeComponent } from './profe.component';
import { ChaeaComponent } from './pages/chaea/chaea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HelpComponent } from './pages/help/help.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { gruposComponent } from './pages/grupos/grupos.component';

const routes: Routes = [
  {
    path: '',
    component: profeComponent,
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
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'estadisticas',
        component: HistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'grupos',
        component: gruposComponent
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
export class profeRoutingModule { }
