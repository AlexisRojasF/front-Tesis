import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { adminService } from '../../services/admin.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { newForm } from 'app/admin/admin.actions';
import { userToken } from 'app/auth/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentService } from '../../../student/services/student.service';

@Component({
  selector: 'app-chaea',
  templateUrl: './chaea.component.html',
  styleUrls: ['./chaea.component.scss']
})
export class ChaeaComponent implements OnInit {

  chaeaQuestions!: chaeaQuestion[];
  singleQuestionResults!: number[];
  yes: boolean;
  no: boolean;
  tokenObs$: Observable<string>;
  token: string;
  lista: Array<number>
  generalResult = {
    activo: 0,
    reflexivo: 0,
    teorico: 0,
    pragmatico: 0
  };

  constructor(private adminService: adminService, private fb: FormBuilder, private store: Store<AppState>, private StudentService: StudentService) { }

  ngOnInit(): void {
    this.lista = [1,2,3]
    // Traer el contenido de las preguntas del cuestionario CHAEA
    this.adminService.getChaeaQuestions()
      .subscribe((questions: chaeaQuestion[]) => this.chaeaQuestions = questions);
      this.adminService.getChaeaQuestions()
      .subscribe((questions: chaeaQuestion[]) => console.log(questions));
    console.log(this.chaeaQuestions)
    // Inicializar el array que calcula el resultado de cada pregunta individualmente
    this.initSingleQuestionArray();

    // Usar el selector para traer el token del usuario
    this.tokenObs$ = this.store.select(userToken);

    // Guardar el token en una propiedad de clase
    this.tokenObs$.subscribe(token => this.token = token);
  }
    
  initSingleQuestionArray() {
    this.singleQuestionResults = new Array(80).fill(0);
  }

  computeSingleQuestionResult(mode: string, id: string) {
    let intId = Number(id);

    if (mode === 'add') {
      this.singleQuestionResults[intId] += 1;
    }

    if (mode === 'remove' && this.singleQuestionResults[intId] > 0) {
      this.singleQuestionResults[intId] -= 1;
    }
  }

  computeGeneralResult() {
    this.singleQuestionResults.map((value, i) => {
      let style = this.chaeaQuestions[i].style;
      this.generalResult[style] += value;
    });
  }

  sendForm() {
    // Calcular el resultado del formulario CHAEA
    this.computeGeneralResult();
    
    //this.StudentService.saveChaeaForm( this.generalResult, this.token)
    // Despachar la acción para guardar el nuevo formulario
   this.store.dispatch( newForm( { chaeaForm: this.generalResult, token: this.token } ) );
  }

}

interface chaeaQuestion {
  id: string;
  style: string;
  statement: string;
}
