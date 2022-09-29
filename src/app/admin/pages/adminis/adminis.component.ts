import { Component, OnInit } from '@angular/core';
import { adminService }  from '../../services/admin.service';
import { Router } from '@angular/router';
import { User } from "../../../auth/models/user.model";
//import { threadId } from 'worker_threads';
import states from "../../../../assets/json/states.json";
import cities from "../../../../assets/json/cities.json";
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-adminis',
  templateUrl: './adminis.component.html',
  styleUrls: ['./adminis.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class adminisComponent1 implements OnInit {
  name: any
  Itera: number
  page:number
  PrevItera: number
  lista: Array<number>
  admins: object
  user: usuario
  token: User
  buscar: string
  typeUser: string
  crud: string
  cancel: boolean
  modalref: NgbModalRef
  id:string

  departamentosAll: any[] = states['states'];
  departamentosCol: any[] = [];

  ciudadAll: any[] = cities['cities'];
  ciudadCol: any[] = [];
  constructor(private router: Router, 
    private AdminService: adminService,
    private modal: NgbModal
  ) { 
  }
  open(content,id) {
    this.modalref = this.modal.open(content);
    this.id = id
    //this.modal.open(content);
  }

  getadmins():void{
    this.AdminService.GetAdmin(0,10).subscribe(data => this.name = data["usuarios"].filter(usr => usr.rol == 'ADMIN_ROLE'))

    
  }

  nextPage():void{
    if(this.name.length >= this.Itera){
    this.page = this.page + 1
    this.Itera = this.Itera + 10
    this.PrevItera = this.Itera - 10
    
    console.log("itera: ", this.Itera )
    console.log("itera: ", this.PrevItera )

    this.AdminService.GetAdmin(this.PrevItera,this.Itera).subscribe(( data ) => {
      this.name = data["usuarios"];
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

      this.AdminService.GetAdmin(this.PrevItera,this.Itera).subscribe(( data ) => {
        this.name = data["usuarios"];
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
    console.log("item number ", x, x["email"],x["nombre"],x["rol"])
    this.user = {
      email: x["email"],
      name:x["nombre"],
      rol:x["rol"],
      genero: x["genero"],
      departamento: x["domicilio"]["departamento"],
      ciudad: x["domicilio"]["cuidad"],
      direccion: x["domicilio"]["direccion"],
      facultad:x["facultad"],
      _id:x["_id"]
    }

    console.log("User Input: ", this.user)
    this.crud = "Editar"
    this.cancel = true
    
  }
  deleteUser():void{
    this.AdminService.DeleteUser(this.id).subscribe(data => console.log(data,"Delete*********"))
    this.modalref.close()
  }
  getBuscar():void{
    this.AdminService.GetBuscar().subscribe(data => console.log(data,"BUSQUEDA*********"))//this.name = data["usuarios"])
    console.log("BSCAR YA", this.buscar)
    console.log("typeUser: ", this.typeUser)
  }

  CrudUser():void{
    console.log("User Input CRUD: ", this.user)
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
    if(this.crud == "Editar"){
      console.log(putUser," PUT USER")
      this.AdminService.PutUsers(this.user._id,putUser).subscribe(data => console.log(data,"EDITAR*********"))
    }else if(this.crud == "Crear"){
      this.AdminService.PostUsers(postUser).subscribe(data => console.log(data,"CREAR*********"))
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
    this.crud = "Crear"
    this.cancel = false
  }
  ngOnInit(): void {
    this.Itera = 10;
    this.PrevItera = 0;
    this.page = 1;
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