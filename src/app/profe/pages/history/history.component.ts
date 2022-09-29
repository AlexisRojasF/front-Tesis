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
import { areFormIds } from '../../profe.selectors';
import { profeService }  from '../../services/profe.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: [
    "./history.component.scss",
    "../../../../assets/sass/libs/datatables.scss",
  ],
})
export class HistoryComponent implements OnInit {
  public config: any = {};
  layoutSub: Subscription;
  lista:string[]=["hola","que","tal","estas"];
  name:string[]
  email:string
  total: number;
  forms: any
  charData: any
  grupos:any
  estilos: any
  disable:boolean
  nameGrupo: string
  ActivoT : string
  ReflexivoT : string
  TeoricoT: string
  PragmaticoT: string
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
  //public radarChartData = chartsData.radarChartData;
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
    private AdminService: profeService
  ) { 
    this.config = this.configService.templateConf;
  }

  getforms():void{
    //this.AdminService.GetForm().subscribe(data => console.log("FORMULARIOS: ", data))
    this.AdminService.GetForm(0,10).subscribe(data => {this.forms = data["formulario"]; const x = data["formulario"].length;
    this.actualizar(x);})
    //this.AdminService.GetForm().subscribe(data =>  this.actualizar(data["formulario"]))
  }
  actualizar(forms){
    
    
    
  }
  promedio(array):void{
    
    /*var sumatoriaObjeto = array.reduce(function(acumulador, siguienteValor){
      return {
        edad: acumulador.activo + siguienteValor.activo
      };
    }, {edad: 0}); //Si no hay nada, regresamos un objeto con edad = 0. No hay necesidad de devolver el nombre, pues no es necesario
    
    var promedioEdad = sumatoriaObjeto.edad / array.length;
    console.log("promedioEdad: ", promedioEdad)*/
  }

  Grupos():void{
    const id = JSON.parse(localStorage.getItem("token")).usuario._id
    this.AdminService.GetGrupo().subscribe(data => this.grupos = data["grupos"].filter(usr => usr.profesor_id == id));
    
  }


  CharGrupos(id, name):void{
    this.estilos = []
    this.disable = true
    this.nameGrupo = name
    //this.AdminService.CharGrupos(id).subscribe(data => console.log("ENTRA: *** ",data["estudiantes"]));//["estudiantes"][0]["formularios"]
    this.AdminService.CharGrupos(id).subscribe(
      ( data ) => {

        for (var i = 0; i < data["estudiantes"].length; i++) {
          
          this.estilos.push(data["estudiantes"][i]["formularios"][0]["formulario"])

          
      }
      var totalActivo = this.estilos.reduce((sum, value) => (typeof value.activo == "number" ? sum + value.activo : sum), 0);
        //console.log(totalActivo/this.estilos.length);

      var totalpragmatico = this.estilos.reduce((sum, value) => (typeof value.pragmatico == "number" ? sum + value.pragmatico : sum), 0);
        //console.log(totalpragmatico/this.estilos.length);

        var totalreflexivo = this.estilos.reduce((sum, value) => (typeof value.reflexivo == "number" ? sum + value.reflexivo : sum), 0);
        //console.log(totalreflexivo/this.estilos.length);

        var totalteorico = this.estilos.reduce((sum, value) => (typeof value.teorico == "number" ? sum + value.teorico : sum), 0);
       //console.log(totalteorico/this.estilos.length);

       
       if(totalActivo <= 6 ){
        this.ActivoT = 'Muy baja'
      }
      if(totalActivo <= 8 && totalActivo > 6 ){
        this.ActivoT = 'Baja'
      }
      if(totalActivo > 8  && totalActivo <=12){
        this.ActivoT = 'Moderada'
      }
      if(totalActivo <= 14 && totalActivo > 12 ){
        this.ActivoT = 'Alta'
      }
      if(totalActivo > 14){
        this.ActivoT = 'Muy alta'
      }
      //REFLEXIVO
      if(totalreflexivo <= 10 ){
        this.ReflexivoT = 'Muy baja'
      }
      if(totalreflexivo <= 13 && totalreflexivo > 10 ){
        this.ReflexivoT = 'Baja'
      }
      if(totalreflexivo > 13  && totalreflexivo <=17){
        this.ReflexivoT = 'Moderada'
      }
      if(totalreflexivo <= 19 && totalreflexivo > 17 ){
        this.ReflexivoT = 'Alta'
      }
      if(totalreflexivo >= 20){
        this.ReflexivoT = 'Muy alta'
      }
      //TEORICO
      if(totalteorico <= 6 ){
        this.TeoricoT = 'Muy baja'
      }
      if(totalteorico <= 9 && totalteorico > 6 ){
        this.TeoricoT = 'Baja'
      }
      if(totalteorico > 9  && totalteorico<=13){
        this.TeoricoT = 'Moderada'
      }
      if(totalteorico <= 15 && totalteorico > 13 ){
        this.TeoricoT = 'Alta'
      }
      if(totalteorico> 15 ){
        this.TeoricoT = 'Muy alta'
      }
      //const mayor =  Object.keys(estilos).reduce(function(a, b){ return estilos[a] > estilos[b] ? a : b });
      //PRAGMATICO
      if(totalpragmatico <= 8){
        this.PragmaticoT = 'Muy baja'
      }
      if(totalpragmatico <= 10 && totalpragmatico > 8 ){
        this.PragmaticoT = 'Baja'
      }
      if(totalpragmatico > 10  && totalpragmatico <=13){
        this.PragmaticoT = 'Moderada'
      }
      if(totalpragmatico <= 15 && totalpragmatico > 13 ){
        this.PragmaticoT = 'Alta'
      }
      if(totalpragmatico >= 16){
        this.PragmaticoT = 'Muy alta'
      }
        this.charData = [
          { data: [totalActivo, totalpragmatico, totalreflexivo, totalteorico], label: 'Tendencia' },
      ];
      this.radarChartData = [
        { data: [totalActivo/this.estilos.length, totalpragmatico/this.estilos.length, totalreflexivo/this.estilos.length, totalteorico/this.estilos.length], label: 'Tendencia' },
      ];
      this.barChartData = [
        { data: [totalActivo/this.estilos.length, totalpragmatico/this.estilos.length, totalreflexivo/this.estilos.length, totalteorico/this.estilos.length], label: 'Tendencia' },
      ];
      },

      (err) => {
        console.log(err);
      }

    )
  
  }

  ngOnInit(): void {
    this.disable = false
    //this.CharGrupos("62460f3619e241001685dd9f")
    this.Grupos();
    this.estilos = []
    
    

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
