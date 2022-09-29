import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { endpoint } from "../../../environments/environment";
import { Observable } from "rxjs";
import { stringify } from "querystring";
import {
  Formulario,
  Formularios,
} from "../../interfaces/Formularios.interface";

@Injectable({
  providedIn: "root",
})
export class GraficasRepotesService {
  constructor(private http: HttpClient) {}

  private urlDesarrollo: string = endpoint;

  traerformularios(): Observable<Formularios> {
    let { token, usuario } = JSON.parse(localStorage.getItem("token"));

    return this.http.get<Formularios>(
      `${this.urlDesarrollo}/formulario/formularios/${usuario._id}`,
      {
        headers: { "x-token": token },
      }
    );
  }

  formulario(id_formulario: string): Observable<Formulario> {
    let { token } = JSON.parse(localStorage.getItem("token"));

    return this.http.get<Formulario>(
      `${this.urlDesarrollo}/formulario/formulario/${id_formulario}`,
      {
        headers: { "x-token": token },
      }
    );
  }
}
