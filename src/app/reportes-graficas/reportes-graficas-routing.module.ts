import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GraficasComponent } from "./pages/graficas/graficas.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: GraficasComponent },
      { path: "graficas", component: GraficasComponent },
      { path: "**", redirectTo: "graficas" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesGraficasRoutingModule {}
