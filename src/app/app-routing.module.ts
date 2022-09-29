import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { FULL_LAYOUT_ROUTES } from './layouts/full/full-layout-routes';


const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("../app/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "report",
    loadChildren: () =>
      import("../app/reportes-graficas/reportes-graficas.module").then(
        (m) => m.ReportesGraficasModule
      ),
  },
  {
    path: "",
    component: FullLayoutComponent,
    children: FULL_LAYOUT_ROUTES,
    // loadChildren: () => import('../app/layouts/full/full-layout.module').then(m => m.FullLayoutModule)
  },
  {
    path: "**",
    component: ErrorComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, 
      { 
        preloadingStrategy: PreloadAllModules, 
        relativeLinkResolution: 'legacy' 
      }
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
