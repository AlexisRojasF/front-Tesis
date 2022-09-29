import { Component, OnInit } from '@angular/core';
import { adminService }  from '../../services/admin.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class testComponent6 implements OnInit {
  Itera: number
  page:number
  PrevItera: number
  Test: any
  aux: any
  users: any
  modalref: NgbModalRef
  id:string
  nameUser:string
  constructor(private router: Router, 
    private AdminService: adminService,
    private modal: NgbModal
  ) { 
  }
  open(content,id,name) {
    this.nameUser = name
    this.id = id
    this.GetTestUser()
    setTimeout(() => {
      this.modalref = this.modal.open(content);
      
      console.log("1 Segundo esperado")
    }, 2000);
    
    //this.modal.open(content);
  }
  //console.log(data["formularios"][0].formulario.activo)) //
  GetTest(){
    this.AdminService.GetForm(0,10).subscribe(data => this.Test = data["formularios"])
  }

  nextPage():void{
    if(this.users.length >= this.Itera){
    this.page = this.page + 1
    this.Itera = this.Itera + 10
    this.PrevItera = this.Itera - 10
    
    console.log("itera: ", this.Itera )
    console.log("itera: ", this.PrevItera )

    this.AdminService.GetAdmin(this.PrevItera,this.Itera).subscribe(( data ) => {
      this.users = data["usuarios"];
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
        this.users = data["usuarios"];
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

  GetTestUser():any{
    this.AdminService.UserForms(this.id).subscribe(data => this.Test = data["formularios"])
    this.AdminService.UserForms(this.id).subscribe(data => console.log(data,"FOR POR USER"))
    
  }

  getusers():void{
    this.AdminService.GetAdmin(0,10).subscribe(data => this.users = data["usuarios"].filter(usr => usr.rol == 'ESTUDIANTE_ROLE'))

    
  }
  Buscar(id){
    console.log("ID: ", id)
    this.AdminService.BuscarUser("613be044dca99530607c729f").subscribe(data => console.log(data["formularios"]))
  }
  ngOnInit(): void {
    this.Itera = 10;
    this.PrevItera = 0;
    this.page = 1;
    //this.Test = [{id: {activo: 1, inactivo:2}},{id: {activo: 2, inactivo:2}},{id: {activo: 3, inactivo:2}}]
    //this.GetTest()
    this.getusers()
    this.AdminService.GetAdmin(0,10).subscribe(data => console.log(data["usuarios"].filter(usr => usr.rol == 'ESTUDIANTE_ROLE')))
    this.AdminService.GetForm(0,10).subscribe(data => console.log(data))
    this.AdminService.GetForm(0,100).subscribe(data => this.aux = data["formularios"].length)
  }

}
