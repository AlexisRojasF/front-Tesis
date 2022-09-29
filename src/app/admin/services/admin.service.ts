import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoint } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class adminService {

  private url: string = endpoint;

  constructor(private http: HttpClient) { }

  getadminForms(adminId: string, token: string) {
    let  headers = new HttpHeaders();
    headers = headers.set('x-token', `${token}`)

    return this.http.get(
      `${this.url}/formulario/formularios/${adminId}`,
      { headers }
    );
  }

  saveChaeaForm(chaeaForm: any, token: string) {
    // let  headers = new HttpHeaders();
    // headers = headers.set('x-token', `${token}`)
      return 'hola'
    // return this.http.post(
    //   `${this.url}/formulario/nuevo`,
    //   chaeaForm,
    //   { headers }
    // );
  }

  getChaeaFormById(formId: string, token: string) {
    let  headers = new HttpHeaders();
    headers = headers.set('x-token', `${token}`)

    return this.http.get(
      `${this.url}/formulario/formulario/${formId}`,
      { headers }
    );
  }

  getChaeaQuestions() {
    return this.http.get('/assets/data/chaea-form.json');
  }

  GetAdmin(prev, next) {
    let  headers = new HttpHeaders();
    var user = JSON.parse(localStorage.getItem("token"));
    headers = headers.set('x-token', user['token'])

    return this.http.get(
      `${this.url}/usuario/usuarios?desde=${prev}&limite=${next}`,
      { headers }
    );
  }

  GetAdmini(prev, next) {
    let  headers = new HttpHeaders();
    var user = JSON.parse(localStorage.getItem("token"));
    headers = headers.set('x-token', user['token'])
    headers = headers.set('x-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjBkNzAxNDkxYWQwYzAwMTY3ZGExNmMiLCJpYXQiOjE2NDk2OTY1ODEsImV4cCI6MTY0OTc4Mjk4MX0.d4Lwc6-U55VLeczFizg8R2KwjGyPrtGm11MhwZqduTM")
    
    return this.http.get(
      `${this.url}/estudiante/buscar?desde=${prev}&limite=${next}`,
      { headers }
    );
  }

  GetBuscar() {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/buscar/Usuario/61ea29f52d160f9532575d76`,
      { headers }
    );
  }

  //

  PutUsers(id:string,user:any) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    console.log("Service ID: ",user["_id"])
    return this.http.put(
      `${this.url}/usuario/actalizar/${id}`,
      user,
      { headers }
    );
  }

  PostUsers(user:any) {
    console.log(user,"Aqui esta el usuario")
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.post<any>(
      `${this.url}/usuario/nuevo`,
      user,
      { headers }
    );
  }

  DeleteUser(id: string) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.delete(
      `${this.url}/usuario/borrar/${id}`,
      { headers }
    );
  }

  ////api/profesor/buscar?desde=0&limite=2
  GetForm(prev,next) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/formulario/buscar?desde${prev}&limite=${next}`,
      { headers }
    );
  }

  GetEstadistica(id) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/facultad/data/${id}`,
      { headers }
    );
  }

  GetFacultad(prev, next) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/facultad/buscar?desde=${prev}&limite=${next}`,
      { headers }
    );
  }

  PostFacultad(facul:any) {
    console.log(facul,"Aqui esta el usuario")
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.post<any>(
      `${this.url}/facultad/nuevo`,
      facul,
      { headers }
    );
  }

  PutFacultad(id:string,facul:any) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    console.log("Service ID: ",facul["_id"])
    return this.http.put(
      `${this.url}/facultad/actalizar/${id}`,
      facul,
      { headers }
    );
  }

  DeleteFacultad(id: string) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.delete(
      `${this.url}/facultad/borrar/${id}`,
      { headers }
    );


  }

  BuscarUser(id:string) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/api/buscar/Usuario/${id}`,
      { headers }
    );
  }

  UserForms(id:string) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/formulario/formularios/${id}`,
      { headers }
    );
  }

  
}
