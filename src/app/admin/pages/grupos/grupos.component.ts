import { AfterViewInit, Component, OnDestroy, OnInit, Inject, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { profeService } from "../../../profe/services/profe.service";
import { adminService } from "../../services/admin.service";
import { MustMatch } from "../../../shared/directives/must-match.validator";
import states from "../../../../assets/json/states.json";
import cities from "../../../../assets/json/cities.json";
import { UserData } from "../../../auth/models/user.model";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { id } from "@swimlane/ngx-datatable";
import Swal from 'sweetalert2';
import * as chartsData from '../chartJS/chartjs';
import { Subscription } from 'rxjs';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ConfigService } from 'app/shared/services/config.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class gruposComponent3 implements OnInit {
  layoutSub: Subscription;
  registerForm: FormGroup;
  studentId: any;
  groupId: any;
  test: any;
  result: any;
  registerFormStudent:FormGroup;
  user: UserData;
  crud: string;
  cancel: boolean;
  grupos: any;
  facultades: any;
  selectF:any;
  faculId:any;
  Estudiantes: any;
  Solicitudes: any;
  ListadoEstudiantes: any = [];
  ListadoGrupo: any = [];
  ListadoGrupoS: any = [];
  public config: any = {};

  public swipeConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 15
  };

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profeServices: profeService,
    private adminService: adminService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
  ) { 
    this.config = this.configService.templateConf;
  }

  
  ngOnInit(): void { 
    this.selectF = "Seleccione"
    this.faculId = ""
    this.adminService.GetFacultad(0,100).subscribe(data => console.log("data Facultad: ", data["facultades"]))
    this.adminService.GetFacultad(0,100).subscribe(data => this.facultades = data["facultades"])
    this.result = {
      activo: 0,
      reflexivo: 0,
      pragmatico: 0,
      teorico: 0,
    }

    
    this.test = false
    this.studentId = ""
    this.groupId = ""
    this.user = JSON.parse(localStorage.getItem("token")).usuario;
    this.crud = "Crear"

    this.Grupos();

    this.adminService.GetAdmin(0,50).subscribe(( data ) => {
      this.ListadoEstudiantes = data["usuarios"];
    });
    

    this.registerForm = this.formBuilder.group({
      nombre: ["", Validators.required],
    });

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.cdr.markForCheck();

    })
  }

  habilitarTest(id): void {
    this.test = true
    console.log("id: ", id)
    this.adminService.UserForms(id).subscribe(data => this.result = data["formularios"][data["formularios"].length - 1]["formulario"])
    this.adminService.UserForms(id).subscribe(data => console.log(data["formularios"][data["formularios"].length - 1]["formulario"],"FOR POR USER"))
    this.profeServices.UserForms(id).subscribe(data => {
      this.result = data["formularios"][data["formularios"].length - 1]["formulario"];
      this.barChartData = [
        { data: [this.result.activo, this.result.reflexivo, this.result.pragmatico, this.result.teorico], label: 'Tendencia' },
      ];
    });
  }

  selectFacultad(facul, id): void {
    this.selectF = facul
    this.faculId = id
    console.log(facul,"Facultad!!")
    console.log(id,"id!!")
  }


  AddStudent(): void {
    console.log("Student: ", this.studentId)
    console.log("Grupo: ", this.groupId)
    const student = {
      "estudiante_id": this.studentId
    }
   
    Swal.fire({
      title: 'Deseas agregar este estudiante a este grupo?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profeServices.AddStudent(this.groupId,student).subscribe(data => {
          Swal.fire(
            'Exito!',
            'Estudiante Agregado.',
            'success'
          );
         // window.location.reload();
        });
      }
    })
  }

  Grupos(): void {
    this.profeServices.GetGrupo().subscribe(data => {
      this.grupos = data["grupos"] //data["grupos"].filter(repe => repe.profesor_id == this.user._id);
    });

    this.profeServices.GetGrupo().subscribe(data => console.log("data: ", data))
  }

  Cancel(): void {
    this.crud = "Crear"
    this.cancel = false
  }

  AgregarEstudiante(estu){
    console.log(estu)
    Swal.fire({
      title: 'Deseas agregar este estudiante a este grupo?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profeServices.PutAgregar(estu.estudiante, estu.grupo).subscribe( data =>  {
          Swal.fire(
            'Exito!',
            'Estudiante Agregado.',
            'success'
          );
          console.log(data)
         // window.location.reload();
        });
      }
    })
    
  }

  EnvioForm() {
    //let nombre = this.registerForm.value;
    let nombre = {
      "nombre": this.registerForm.value["nombre"],
      "facultad": this.faculId
    }
    if(this.registerForm.invalid){
      Swal.fire(
        'Faltan campos por llenar',
        '',
        'info'
      )
    } else{
      Swal.fire({
        title: 'Deseas crear este grupo?',
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.profeServices.PostGrupo(nombre,this.user).subscribe(data => {
            Swal.fire(
              'Exito!',
              'Grupo creado.',
              'success'
            )
          });
        }
      })
    }
  }

  Print(x): void {
    this.registerForm.get(["nombre"]).setValue(x["nombre"]);
    this.Estudiantes = x["estudiantes"];
    this.Solicitudes = x["solicitudes"];
    this.ListadoGrupo = [];
    this.ListadoGrupoS =[];

    for (var i = 0; i < this.ListadoEstudiantes.length; i++){
      for( var j = 0; j < this.Estudiantes.length; j++){
        if(this.Estudiantes[j] == this.ListadoEstudiantes[i]["estudiante"]){
          this.ListadoEstudiantes[i].grupo = x["_id"];
          console.log("this.ListadoEstudiantes[i]: ", this.ListadoEstudiantes[i])
          this.ListadoGrupo.push(this.ListadoEstudiantes[i]);
        }
      }
    }

    for (var i = 0; i < this.ListadoEstudiantes.length; i++){
      for( var j = 0; j < this.Solicitudes.length; j++){
        if(this.Solicitudes[j] == this.ListadoEstudiantes[i]["estudiante"]){
          this.ListadoEstudiantes[i].grupo = x["_id"];
          this.ListadoGrupoS.push(this.ListadoEstudiantes[i]);
        }
      }
    }


    this.crud = "Editar"
    this.cancel = true
  }

  Cancelar(): void {

    Swal.fire({
      title: 'Deseas limpiar los campos?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ListadoGrupo = [];
        this.ListadoGrupoS =[];
        this.registerForm.get(["nombre"]).setValue("");
        this.crud = "Crear"
        this.cancel = false

      }
    })

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