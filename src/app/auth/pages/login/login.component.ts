import { Router } from "@angular/router";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "app/auth/services/login.service";
import { Store } from "@ngrx/store";
import { AppState } from "app/reducers";
import { finalize, tap } from "rxjs/operators";
import { BehaviorSubject, noop } from "rxjs";
import { loginAction } from "app/auth/auth.actions";
import { User } from "../../models/user.model";
import { userRolesDashboardPaths } from "../../user-roles";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginFailed$;
  loginFormSubmitted = false;
  user!: gapi.auth2.GoogleUser;
  rememberMe = false;

  error: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(this.rememberMe),
  });

  get lf() {
    return this.loginForm.controls;
  }

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginFailed$ = new BehaviorSubject(false);
    localStorage.clear();
  }

  // On submit button click
  onSubmit() {
    this.loginService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
    });

    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Mostrar el indicador de carga
    this.spinner.show(undefined, {
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    this.loginService
      .login(this.loginForm.value)
      .pipe(
        tap((res) => {
          this.loginFailed$.next(false);
          const rememberMe = this.lf.rememberMe.value;
          let token = JSON.stringify(res);
          localStorage.setItem("token", token);
          // Convertir la respuesta del servidor en un objeto del tipo User
          const user: User = {
            data: res["usuario"],
            token: res["token"],
          };

          // Guardar la información del usuario en el Store
          this.store.dispatch(loginAction({ user, rememberMe }));

          // Navegar hacia el dashboard
          this.router.navigateByUrl(userRolesDashboardPaths[user.data.rol]);
          //this.router.navigateByUrl(userRolesDashboardPaths['/professor']);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe(noop, (resp) => {

        this.loginFailed$.next(true);
        this.toastr.error(
          "Verifique e intente nuevamente.",
          "¡Error! Usuario o contraseña incorrectos."
        );
      });
  }

  onRemembermeChange() {
    this.rememberMe = !this.rememberMe;
    this.lf.rememberMe.setValue(this.rememberMe);
  }

  signIn() {
    this.loginService.signIn();
  }

  signOut() {
    this.loginService.signOut();
  }
}
