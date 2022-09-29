import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { ChaeaComponent } from './pages/chaea/chaea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HelpComponent } from './pages/help/help.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
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
export class StudentRoutingModule { }
