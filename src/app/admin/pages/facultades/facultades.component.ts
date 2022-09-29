import { AfterViewInit, Component, OnDestroy, OnInit, Inject, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import { adminService }  from '../../services/admin.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from "../../../auth/models/user.model";
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
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
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class facultadesComponent4 implements OnInit {
  Itera: number
  page:number
  PrevItera: number
  Facultad: any
  FacultadName: any
  name: any
  lista: Array<number>
  admins: object
  user: usuario
  token: User
  buscar: string
  typeUser: string
  crud: string
  cancel: boolean
  id:string
  modalref: NgbModalRef
  facultad: Facultad
  layoutSub: Subscription;
  registerForm: FormGroup;
  studentId: any;
  groupId: any;
  test: any;
  result: any;
  registerFormStudent:FormGroup;
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


  constructor(
    private router: Router, 
    private AdminService: adminService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private adminService: adminService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    
  ) { 
    this.config = this.configService.templateConf;
  }

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



  open(content,id) {
    this.modalref = this.modal.open(content);
    this.id = id
    //this.modal.open(content);
  }
  eliminarUsr(){
    //this.AdminService.DeleteUser(this.id).subscribe(data => console.log(data,"Delete*********"))
    this.AdminService.DeleteFacultad(this.id).subscribe(data => console.log(data,"Delete*********"))
    console.log("usuario eliminado")
    //window.location.reload();
    this.modalref.close()
  }
  getadmins():void{
    this.AdminService.GetAdmin(0,10).subscribe(data => this.name = data["usuarios"])
  }

  nextPage():void{
    if(this.Facultad.length >= this.Itera){
    this.page = this.page + 1
    this.Itera = this.Itera + 10
    this.PrevItera = this.Itera - 10
    
    console.log("itera: ", this.Itera )
    console.log("itera: ", this.PrevItera )

    this.AdminService.GetFacultad(this.PrevItera,this.Itera).subscribe(( data ) => {
      this.Facultad = data["usuarios"];
      //this.page = data["usuarios"].length;
      //console.log(this.page,"PAGINAS")
    
    },
      
      (err) => {
        console.log(err);
      }
  );
    }
    
  }

  prevPage():void{
    
    if( this.Itera > 10 && this.page > 0){
      this.page = this.page - 1
      this.Itera = this.Itera - 10
      this.PrevItera = this.Itera - 10
      console.log("itera: ", this.Itera )
      console.log("itera: ", this.PrevItera )

      this.AdminService.GetFacultad(this.PrevItera,this.Itera).subscribe(( data ) => {
        this.Facultad = data["usuarios"];
        //this.page = data["usuarios"].length;
        //console.log(this.page,"PAGINAS")
      
      },
        
        (err) => {
          console.log(err);
        }
    );
    }
    
    console.log("itera: ", this.Itera )
  }

  Print(x):void{
    /*this.user = {
      email: x["email"],
      name:x["nombre"],
      rol:x["rol"],
      genero: x["genero"],
      departamento: x["domicilio"]["departamento"],
      ciudad: x["domicilio"]["cuidad"],
      direccion: x["domicilio"]["direccion"],
      facultad:x["facultad"],
      _id:x["_id"]
    }*/

    this.facultad = {
      estado: x["estado"],
      name: x["nombre"],
      programas:x["programa_id"][0],
      _id: x["_id"]
    }

    this.crud = "Editar"
    this.cancel = true
    
  }

  SumarGrupos(data): any{

        var totalActivo = data["formularios"].reduce((sum, value) => (typeof value.formulario.activo == "number" ? sum + value.formulario.activo : sum), 0);

        var totalpragmatico = data["formularios"].reduce((sum, value) => (typeof value.formulario.pragmatico == "number" ? sum + value.formulario.pragmatico : sum), 0);

        var totalreflexivo = data["formularios"].reduce((sum, value) => (typeof value.formulario.reflexivo == "number" ? sum + value.formulario.reflexivo : sum), 0);

        var totalteorico = data["formularios"].reduce((sum, value) => (typeof value.formulario.teorico == "number" ? sum + value.formulario.teorico : sum), 0);
        var result ={
          "activo": totalActivo/data["formularios"].length,
          "pragmatico": totalpragmatico/data["formularios"].length,
          "reflexivo": totalreflexivo/data["formularios"].length,
          "teorico": totalteorico/data["formularios"].length
        }
        return result
  }
  viewEstadistic(id, nombre): void{
    this.test = true
    this.FacultadName = nombre
    this.AdminService.GetEstadistica(id).subscribe(data => {
      var gruopsTotal = 0
      var activo = 0
      var pragmatico = 0
      var reflexivo = 0
      var teorico = 0
      for (let value of data["grupos"] ) {
        if(value["estudiantes"].length > 0){
          gruopsTotal = gruopsTotal + 1
          var result = this.SumarGrupos(value["estudiantes"][0])
          activo = result.activo + activo
          pragmatico = result.pragmatico + pragmatico
          reflexivo = result.reflexivo + reflexivo
          teorico = result.activo + teorico
        }

          
      }

      //this.result = data["formularios"][data["formularios"].length - 1]["formulario"];
      this.barChartData = [
        { data: [activo/gruopsTotal, reflexivo/gruopsTotal, pragmatico/gruopsTotal, teorico/gruopsTotal], label: 'Tendencia' },
      ];
    });
  }

  getBuscar():void{
    this.AdminService.GetBuscar().subscribe(data => console.log(data,"BUSQUEDA*********"))//this.name = data["usuarios"])

  }

  CrudUser():void{
    let putUser = {
      nombre:this.user.name,
      email:this.user.email,
      rol:this.user.rol,
      genero:this.user.genero,
      domicilio:{
          departamento:this.user.departamento,
          cuidad:this.user.ciudad,
          direccion:this.user.direccion
      },
    }

    let putFacutad = {
      nombre:this.facultad.name,
      estado:this.facultad.estado,
      programas: [],
    }
    let postUser = {
      nombre:this.user.name,
      email:this.user.email,
      password: "123456",
      rol:this.user.rol,
      genero:this.user.genero,
      domicilio:{
          departamento:this.user.departamento,
          cuidad:this.user.ciudad,
          direccion:this.user.direccion
      },
      avatar:""
  }
  let postFacultad = {
    nombre:this.facultad.name,
    estado:this.facultad.estado,
    programas: this.facultad.programas[0],
}
    if(this.crud == "Editar"){
      this.AdminService.PutFacultad(this.facultad._id,putFacutad).subscribe(data => console.log(data,"EDITAR*********"))
    }else if(this.crud == "Crear"){
      //console.log("CREAR: ", postFacultad)
      this.AdminService.PostFacultad(postFacultad).subscribe(data => console.log(data,"CREAR*********"))
    }else{
      console.log("Datos invalidos")
    }
  }

  CancelForm():void{
    this.user = {
      email: "",
      name:"",
      rol:"",
      genero: "",
      departamento:"",
      ciudad:"",
      direccion:"",
      facultad:"",
      _id:""
    }
    this.facultad = {
      estado: "",
      name: "",
      programas:[],
      _id:""
    }
    this.crud = "Crear"
    this.cancel = false
  }

  ngOnInit(): void {
    this.Itera = 10;
    this.PrevItera = 0;
    this.page = 1;
    this.AdminService.GetFacultad(0,10).subscribe(data => this.Facultad = data["facultades"])//console.log(data))
    this.AdminService.GetFacultad(0,10).subscribe(data => console.log(data))
    this.cancel = false
    this.user = {
      email: "",
      name:"",
      rol:"",
      genero: "",
      departamento:"",
      ciudad:"",
      direccion:"",
      facultad:"",
      _id:""
    }
    this.facultad = {
      estado: "",
      name: "",
      programas:[],
      _id:""
    }
    this.typeUser = "Admin"
    this.crud = "Crear"
    this.lista = [5,5,3]
    console.log("Entra")
    // Traer el contenido de las preguntas del cuestionario CHAEA
    
    this.AdminService.GetAdmin(0,10)
      .subscribe(data => console.log(data));

    this.getadmins()
    
    //console.log(this.name, "hOLAAA")
    //this.name["admin"].push('cows');
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



interface usuario {
  email: string;
  name: string;
  rol: string;
  genero: string,
  departamento: string,
  ciudad: string,
  direccion: string,
  facultad: string,
  _id:string
}
interface Facultad {
  estado: string;
  name: string;
  programas: any;
  _id: string
}