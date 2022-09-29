import { AfterViewInit, Component, OnDestroy, OnInit, Inject, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserData } from '../../../auth/models/user.model';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { userData } from '../../../auth/auth.selectors';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as chartsData from '../chartJS/chartjs';
import { areFormIds } from '../../admin.selectors';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  public config: any = {};
  layoutSub: Subscription;
  lista:string[]=["hola","que","tal","estas"];
  name:string[]
  email:string
  total: number;
  public swipeConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 15
  };

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  // Emite la información personal del estudiante logeado
  userData$: Observable<UserData>;

  // Emite si el estudiante ha presentado formularios o no
  areFormsIds$: Observable<boolean>;

  // barChart
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;

  // Radar
  public radarChartLabels = chartsData.radarChartLabels;
  public radarChartData = chartsData.radarChartData;
  public radarChartType = chartsData.radarChartType;
  public radarChartColors = chartsData.radarChartColors;
  public radarChartOptions = chartsData.radarChartOptions;

  constructor(private router: Router, 
    private store: Store<AppState>,
    private layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, 
    private cdr: ChangeDetectorRef,
    private configService: ConfigService,
  ) { 
    this.config = this.configService.templateConf;
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem("token")).usuario.email
    this.name = JSON.parse(localStorage.getItem("token")).usuario.nombre
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.cdr.markForCheck();

    })

    this.userData$ = this.store
      .pipe(
        // Importamos el selector desde el archivo auth.selectors.ts
        select(userData)
      );

    this.areFormsIds$ = this.store
      .pipe(
        select(areFormIds)
      );
  }

  ngAfterViewInit() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = true;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
  }

  ngOnDestroy() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = false;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
}
