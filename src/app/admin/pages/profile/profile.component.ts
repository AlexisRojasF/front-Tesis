import { Component, OnInit } from '@angular/core';
import { adminService }  from '../../services/admin.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {UserData} from "../../../auth/models/user.model"
import states from "../../../../assets/json/states.json";
import cities from "../../../../assets/json/cities.json";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: FormGroup;

  departamentosAll: any[] = states['states'];
  departamentosCol: any[] = [];

  ciudadAll: any[] = cities['cities'];
  ciudadCol: any[] = [];

  user: UserData;

  get rf() {
    return this.registerForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private profeServices: adminService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("token")).usuario;
    
    this.registerForm = this.formBuilder.group(
      {
        _id: [this.user._id],
        nombre: [this.user.nombre, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        genero: [this.user.genero, Validators.required],
        domicilio: this.formBuilder.group({
          departamento: [this.user.domicilio.departamento, Validators.required],
          cuidad: [this.user.domicilio.cuidad, Validators.required],
          direccion: [this.user.domicilio.direccion, Validators.required],
        }),
        rol: [this.user.rol, Validators.required]
      },
    );

    for (let i = 0; i < this.departamentosAll.length; i++) {
      if (
        this.departamentosAll[i].name ==
        this.user.domicilio.departamento
      ) {
        this.registerForm.get(["domicilio", "departamento"]).setValue(this.departamentosAll[i].id);
        this.cuidadFuncion(this.departamentosAll[i].id);
      }
    }
    
    for (let i = 0; i < this.ciudadCol.length; i++) {
      if (
        this.ciudadCol[i].name ==
        this.user.domicilio.cuidad
      ) {
        console.log("id",this.ciudadCol[i].id,"nombre",this.ciudadCol[i].name)
        this.registerForm.get(["domicilio", "cuidad"]).setValue(this.ciudadCol[i].id);
      }
    }

    for (let index = 0; index < this.departamentosAll.length; index++) {
      if (this.departamentosAll[index].id_country === 82) {
        this.departamentosCol.push(this.departamentosAll[index]);
      }
    }
  }

  cuidadFuncion(id:string) {
    this.ciudadCol = [];
    for (let index = 0; index < this.ciudadAll.length; index++) {
      if (this.ciudadAll[index].id_state == id) {
        this.ciudadCol.push(this.ciudadAll[index]);
      }
    }
  }

  Actualizar(){
    let nombreDeparat: string = "";
    let nombrecuidad: string = "";

    for (let i = 0; i < this.departamentosCol.length; i++) {
      if (
        this.departamentosCol[i].id ==
        this.registerForm.get(["domicilio", "departamento"]).value
      ) {
        nombreDeparat = this.departamentosCol[i].name;
      }
    }

    for (let i = 0; i < this.ciudadCol.length; i++) {
      if (
        this.ciudadCol[i].id ==
        this.registerForm.get(["domicilio", "cuidad"]).value
      ) {
        nombrecuidad = this.ciudadCol[i].name;
      }
    }

    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.get(["domicilio", "departamento"]).setValue(nombreDeparat);
    this.registerForm.get(["domicilio", "cuidad"]).setValue(nombrecuidad);

    this.profeServices.PutUsers(this.user._id,
      this.registerForm.value).subscribe(data => {
        if(true){
          console.log(data,"EDITAR");
          let cambio = JSON.parse(localStorage.getItem("token"));
          localStorage.clear();
          console.log(this.registerForm.get(["nombre"]));
          cambio["usuario"]["domicilio"]["departamento"] = nombreDeparat;
          cambio["usuario"]["domicilio"]["cuidad"] = nombrecuidad;
          cambio["usuario"]["nombre"] = this.registerForm.get(["nombre"]).value;
          cambio["usuario"]["email"] = this.registerForm.get(["email"]).value;
          cambio["usuario"]["genero"] = this.registerForm.get(["genero"]).value;
          cambio["usuario"]["domicilio"]["direccion"] = this.registerForm.get(["domicilio","direccion"]).value;
          localStorage.setItem("token", JSON.stringify(cambio));
          console.log(cambio);
         // window.location.reload();
        }
      });
  }

}