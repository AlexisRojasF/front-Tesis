import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportesGraficasRoutingModule } from "./reportes-graficas-routing.module";
import { GraficasComponent } from "./pages/graficas/graficas.component";
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [GraficasComponent],
  imports: [
    CommonModule,
    ReportesGraficasRoutingModule,
    ChartsModule,
    HttpClientModule,
  ],
  exports: [GraficasComponent],
})
export class ReportesGraficasModule {}
