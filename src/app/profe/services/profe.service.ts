import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoint } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class profeService {

  private url: string = endpoint;

  constructor(private http: HttpClient) { }

  getprofeForms(profeId: string, token: string) {
    let  headers = new HttpHeaders();
    headers = headers.set('x-token', `${token}`)

    return this.http.get(
      `${this.url}/formulario/formularios/${profeId}`,
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


  CharGrupos(id) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)

    return this.http.get(
      `${this.url}/grupo/data/${id}`,
      { headers }
    );
  }

  saveChaeaForm(chaeaForm: any, token: string) {
    // let  headers = new HttpHeaders();
    // headers = headers.set('x-token', `${token}`)
      return 'hola';
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

  GetGrupos(token: any) {
    let  headers = new HttpHeaders();
    let token2='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTNlODE0MDUxYWQ5NzA1YWM4NjMzMDQiLCJpYXQiOjE2NDI3MzM5MjMsImV4cCI6MTY0MjgyMDMyM30.8cQFh5cJQMNoRS73eTde3BRSXP_Xnk5yLGB79kwlV0s'
    headers = headers.set('x-token', `${token2}`)
    console.log(token2+ " : TOKEN")
    return this.http.get(
      `${this.url}/grupo/buscar?desde=0&limite=2`,
      { headers }
    );
    
  }

  PutUsers(id:string,user:any) {
    let  headers = new HttpHeaders();
    console.log("Id ",id,"Usuario ",user)
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.put(
      `${this.url}/usuario/actalizar/${id}`,user,{ headers }
    );
  }

  GetGrupo() {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.get(
      `${this.url}/grupo/buscar?desde=0&limite=20`,
      { headers }
    );
  }

  //

  PutGrupo(id:string,grupo:any) {
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    console.log("Service ID: ",grupo["_id"])
    return this.http.put(
      `${this.url}/grupo/actalizar/${id}`,
      grupo,
      { headers }
    );
  }

  PutSolicitud(estudianteid:string,idGru:string) {
    var estudiante = {
      estudiante:"",
    };
    estudiante.estudiante = String(estudianteid);
    console.log(estudiante)

    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.put(
      `${this.url}/grupo/solicitud/${idGru}`,
      estudiante,
      { headers }
    );
  }
  //

  PutAgregar(id:string,idGru:string) {
    var estudiante_id = {
      estudiante_id:"",
    };
    estudiante_id.estudiante_id = String(id);

    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.put(
      `${this.url}/grupo/aceptar/${idGru}`,
      estudiante_id,
      { headers }
    );
  }

  PostGrupo(grupo:any,user:any) {
    console.log(grupo,"Aqui esta el usuario")
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.post<any>(
      `${this.url}/grupo/nuevo`,
      grupo,
      { headers }
    );
  }

  AddStudent(grupo:any,student:any) {
    console.log(grupo,"Aqui esta el usuario")
    let  headers = new HttpHeaders();
    let token = JSON.parse(localStorage.getItem("token"))["token"];
    headers = headers.set('x-token', token)
    return this.http.put<any>(
      `${this.url}/grupo/agrergar/${grupo}`,
      student,
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
