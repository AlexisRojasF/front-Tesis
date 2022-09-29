import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endpoint } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url: string = endpoint;

  constructor(private http: HttpClient) { }

  getStudentForms(studentId: string, token: string) {
    let  headers = new HttpHeaders();
    headers = headers.set('x-token', `${token}`)

    return this.http.get(
      `${this.url}/formulario/formularios/${studentId}`,
      { headers }
    );
  }

  saveChaeaForm(chaeaForm: any, token: string) {
     console.log("-------------------TOKEN1--------------: "+ token);
     let token2 = JSON.parse(localStorage.getItem('token'));
      console.log("-------------------TOKEN--------------: ");
      console.log(token2);
      
    let  headers = new HttpHeaders();
    headers = headers.set('x-token', `${token2.token}`)
    console.log("chaeaForm: ", chaeaForm, "token: ", token)
    return this.http.post(
      `${this.url}/formulario/nuevo`,
      chaeaForm,
      { headers }
    );
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
}
