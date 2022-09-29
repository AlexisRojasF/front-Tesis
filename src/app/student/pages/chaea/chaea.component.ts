import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { newForm } from 'app/student/student.actions';
import { userToken } from 'app/auth/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chaea',
  templateUrl: './chaea.component.html',
  styleUrls: ['./chaea.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ChaeaComponent implements OnInit {

  chaeaQuestions!: chaeaQuestion[];
  singleQuestionResults!: number[];
  modalref: NgbModalRef
  yes: boolean;
  no: boolean;
  tokenObs$: Observable<string>;
  token: string;

  generalResult = {
    activo: 0,
    reflexivo: 0,
    teorico: 0,
    pragmatico: 0
  };

  constructor(private studentService: StudentService, 
              private fb: FormBuilder,
              private store: Store<AppState>,
              private modal: NgbModal) { }

  ngOnInit(): void {
    // Traer el contenido de las preguntas del cuestionario CHAEA
    this.studentService.getChaeaQuestions()
      .subscribe((questions: chaeaQuestion[]) => this.chaeaQuestions = questions);
    
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

  sendForm(content) {
    // Calcular el resultado del formulario CHAEA
    this.modalref = this.modal.open(content);
    this.computeGeneralResult();
    
    // Despachar la acción para guardar el nuevo formulario
    this.store.dispatch( newForm( { chaeaForm: this.generalResult, token: this.token } ) );
  }

}

interface chaeaQuestion {
  id: string;
  style: string;
  statement: string;
}
