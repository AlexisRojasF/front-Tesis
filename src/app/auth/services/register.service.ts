import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { endpoint } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private urlDesarrollo: string = endpoint;

  constructor(private http: HttpClient) {}

  Register(usuario: FormGroup): Observable<any> {
    console.log(usuario);

    return this.http.post<FormGroup>(
      `${this.urlDesarrollo}/usuario/nuevo`,
      usuario
    );
  }

  Rol(role: string): Observable<any> {
    const {
      token,
      usuario: { _id },
    } = JSON.parse(localStorage.getItem("token"));

    const body = {
      rol: role,
    };

    this.http
      .put<any>(
        `${this.urlDesarrollo}/usuario/actalizar/${_id}`,
        { rol: role },
        {
          headers: { "x-token": token },
        }
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );

    if (role === "ESTUDIANTE_ROLE") {
      return this.http.post<any>(`${this.urlDesarrollo}/estudiante/nuevo`, "", {
        headers: { "x-token": token },
      });
    } else {
      return this.http.post<any>(`${this.urlDesarrollo}/profesor/nuevo`, "", {
        headers: { "x-token": token },
      });
    }
  }
}
