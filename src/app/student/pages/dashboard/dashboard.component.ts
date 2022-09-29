import { AfterViewInit, Component, OnDestroy, OnInit, Inject, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
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
import { areFormIds } from '../../student.selectors';
import { profeService }  from '../../../profe/services/profe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  registerForm: FormGroup;
  name:string[]
  email:string
  user: UserData;
  total: number;
  public config: any = {};
  layoutSub: Subscription;

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

  // Emite un grupo
  Grupos: any = [];
  GruposEstudiante: any = [];
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
    private ProfeService : profeService,
    private formBuilder: FormBuilder,
  ) { 
    this.config = this.configService.templateConf;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("token")).usuario;

    this.Grupos = this.ProfeService.GetGrupo().subscribe(data => {
      console.log(data["grupos"])
      this.Grupos = data["grupos"];
      for( var i = 0; i < this.Grupos.length;i++ ){
        for(var j = 0; j < this.Grupos[i]["estudiantes"].length;j++){
          if(this.Grupos[i]["estudiantes"][j] == this.user["estudiante"]){
            this.GruposEstudiante.push(this.Grupos[i]);
          }
        }
      }

    })

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.cdr.markForCheck();

    })
    
    this.userData$ = this.store
      .pipe(
        // Importamos el selector desde el archivo auth.selectors.ts token
        select(userData)
      );
    
    this.email = JSON.parse(localStorage.getItem("token")).usuario.email
    this.name = JSON.parse(localStorage.getItem("token")).usuario.nombre
    console.log(this.email)
    this.areFormsIds$ = this.store
      .pipe(
        select(areFormIds)
      );

    this.registerForm = this.formBuilder.group({
      nombre: ["", Validators.required],
    });
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

  EnvioForm(){
    
    let Grupo = this.registerForm.value["nombre"];
    console.log(this.user["estudiante"]);
    if(this.registerForm.invalid){
      Swal.fire(
        'Faltan campos por llenar',
        '',
        'info'
      )
    } else{
      Swal.fire({
        title: 'Deseas aplicar a este grupo?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ProfeService.PutSolicitud(this.user["estudiante"],Grupo).subscribe( data => {
            Swal.fire(
              'Exito!',
              'Solicitud Enviada.',
              'success'
            )
          });
        }
      })
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
