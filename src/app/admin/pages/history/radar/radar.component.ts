import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-radar",
  templateUrl: "./radar.component.html",
  styleUrls: ["./radar.component.scss"],
})
export class RadarComponent implements OnInit {
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  @Input() public radarChartLabels: Label[] = [
    // "Eating",
    // "Drinking",
    // "Sleeping",
    // "Designing",
    // "Coding",
    // "Cycling",
    // "Running",
  ];

  @Input() public radarChartData: ChartDataSets[] = [
    // { data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
    // { data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" },
  ];
  public radarChartType: ChartType = "radar";

  constructor() {}

  ngOnInit(): void {}
}
