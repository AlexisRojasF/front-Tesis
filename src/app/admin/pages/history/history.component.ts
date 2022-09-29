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
import { adminService }  from '../../services/admin.service';

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
    private AdminService: adminService
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
    console.log("Prueba: ", forms)
    
    
  }
  promedio(array):void{
    console.log("Entra: ", this.forms)
    /*var sumatoriaObjeto = array.reduce(function(acumulador, siguienteValor){
      return {
        edad: acumulador.activo + siguienteValor.activo
      };
    }, {edad: 0}); //Si no hay nada, regresamos un objeto con edad = 0. No hay necesidad de devolver el nombre, pues no es necesario
    
    var promedioEdad = sumatoriaObjeto.edad / array.length;
    console.log("promedioEdad: ", promedioEdad)*/
  }
  ngOnInit(): void {
    //this.AdminService.GetForm().subscribe(data => this.forms = JSON.parse(JSON.stringify(data))["formularios"])
    //this.AdminService.GetForm().subscribe(data => console.log(data["formularios"]))

    
    //this.AdminService.GetForm().subscribe(data =>  this.promedio(data["formulario"]))
    //this.getforms()
    this.AdminService.GetForm(0,10).subscribe(
      ( data ) => {
        this.forms = data["formularios"];
        console.log("OK 1: ",this.forms)
        console.log("OK: ",data["formularios"])
        /*let sumatoriaObjeto =  data["formularios"].reduce(function(acumulador, siguienteValor){
          return {
            edad: acumulador.activo + siguienteValor.formulario.activo
          };
        }, {edad: 0}); //Si no hay nada, regresamos un objeto con edad = 0. No hay necesidad de devolver el nombre, pues no es necesario
        console.log("sumatoriaObjeto: ", sumatoriaObjeto.edad,"data: ",  data["formularios"].length)
        let promedioEdad = sumatoriaObjeto.edad /  data["formularios"].length;
        console.log("promedioEdad: ", promedioEdad)*/
        var totalActivo = data["formularios"].reduce((sum, value) => (typeof value.formulario.activo == "number" ? sum + value.formulario.activo : sum), 0);
        console.log(totalActivo/data["formularios"].length);

        var totalpragmatico = data["formularios"].reduce((sum, value) => (typeof value.formulario.pragmatico == "number" ? sum + value.formulario.pragmatico : sum), 0);
        console.log(totalpragmatico/data["formularios"].length);

        var totalreflexivo = data["formularios"].reduce((sum, value) => (typeof value.formulario.reflexivo == "number" ? sum + value.formulario.reflexivo : sum), 0);
        console.log(totalreflexivo/data["formularios"].length);

        var totalteorico = data["formularios"].reduce((sum, value) => (typeof value.formulario.teorico == "number" ? sum + value.formulario.teorico : sum), 0);
        console.log(totalteorico/data["formularios"].length);
        
        this.charData = [
          { data: [totalActivo, totalpragmatico, totalreflexivo, totalteorico], label: 'Tendencia' },
      ];
      this.radarChartData = [
        { data: [totalActivo/data["formularios"].length, totalpragmatico/data["formularios"].length, totalreflexivo/data["formularios"].length, totalteorico/data["formularios"].length], label: 'Tendencia' },
      ];
      this.barChartData = [
        { data: [totalActivo/data["formularios"].length, totalpragmatico/data["formularios"].length, totalreflexivo/data["formularios"].length, totalteorico/data["formularios"].length], label: 'Tendencia' },
      ];
      },
      
      (err) => {
        console.log(err);
      }
    );

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

/*const decrypt = (encrypted, iv) => {
  //generate encryption key using secret
  crypto.scrypt(process.env.SECRET, 'salt', 24, (err, key) => {
    if (err) throw err;

    //create decipher object
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = '';
    decipher.on('readable', () => {
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    decipher.on('end', () => console.log(decrypted));
    decipher.on('error', (err) => console.log(err))

    decipher.write(encrypted, 'hex');
    decipher.end();
  })
}*/