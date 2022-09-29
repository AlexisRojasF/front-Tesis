import { Routes } from '@angular/router';

import { ChaeaComponent } from '../../student/pages/chaea/chaea.component';

export const FULL_LAYOUT_ROUTES: Routes = [
  {
    path: 'student',
    loadChildren: () => import('../../student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'professor',
    loadChildren: () => import('../../profe/profe.module').then(m => m.profeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../../admin/admin.module').then(m => m.adminModule),
  }
];
