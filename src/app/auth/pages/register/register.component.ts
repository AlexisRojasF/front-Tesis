import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import states from "../../../../assets/json/states.json";
import cities from "../../../../assets/json/cities.json";

import { RegisterService } from "../../services/register.service";
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [NgbModalConfig, NgbModal]
})
export class RegisterComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: FormGroup;
  modalref: NgbModalRef
  departamentosAll: any[] = states['states'];
  departamentosCol: any[] = [];

  ciudadAll: any[] = cities['cities'];
  ciudadCol: any[] = [];

  get rf() {
    return this.registerForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _regisService: RegisterService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        nombre: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        genero: ["", Validators.required],
        // pais: ["", Validators.required],
        domicilio: this.formBuilder.group({
          departamento: ["", Validators.required],
          ciudad: ["", Validators.required],
          direccion: ["", Validators.required],
        }),
        rol: ["", Validators.required],

        acceptTerms: [false, Validators.requiredTrue],
      },

      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );

    for (let index = 0; index < this.departamentosAll.length; index++) {
      if (this.departamentosAll[index].id_country === 82) {
        this.departamentosCol.push(this.departamentosAll[index]);
      }
    }
  }

  //  On submit click, reset field value
  onSubmit(content) {
    this.modalref = this.modal.open(content);
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
        this.registerForm.get(["domicilio", "ciudad"]).value
      ) {
        nombrecuidad = this.ciudadCol[i].name;
      }
    }

    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm
      .get(["domicilio", "departamento"])
      .setValue(nombreDeparat);
    this.registerForm.get(["domicilio", "ciudad"]).setValue(nombrecuidad);

    console.log(this.registerForm.value);

    this._regisService.Register(this.registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        localStorage.setItem('token', JSON.stringify(resp));
       
      },
      (err) => {
        console.log(err);
      }
    );

    //this.router.navigate(["/pages/login"]);
  }

  cuidadFuncion(data: string) {
    this.ciudadCol = [];
    console.log(data);

    for (let index = 0; index < this.ciudadAll.length; index++) {
      if (this.ciudadAll[index].id_state == data) {
        this.ciudadCol.push(this.ciudadAll[index]);
      }
    }

   
  }
}
