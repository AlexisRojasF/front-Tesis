import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "app/auth/services/register.service";


@Component({
  selector: "app-rol",
  templateUrl: "./rol.component.html",
  styleUrls: ["./rol.component.scss"],
})
export class RolComponent implements OnInit {
  rolForm: FormGroup = this.fb.group({
    rol: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private ServiceRegister: RegisterService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const rol = this.rolForm.get("rol").value;
    this.ServiceRegister.Rol(rol).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
