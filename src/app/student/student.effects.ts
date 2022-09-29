import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../auth/action-types';
import { concatMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StudentService } from './services/student.service';
import { StudentActions } from './action-types';
import { forkJoin } from 'rxjs';


@Injectable()
export class StudentEffects {

    private token!: string;

    constructor(private actions$: Actions, private store: Store, private studentService: StudentService) { }

    // Efecto para traer los formularios del estudiante
    forms$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.studentLoaded),
                concatMap(action => {
                    this.token = action.token;
                   
                   
                    
                    return this.studentService.getStudentForms(action.studentId, this.token)
                }),
                map((res) => {
                    let formIDs: any[] = res['formularios'];
                    let observables = formIDs.map(id => this.studentService.getChaeaFormById(id, this.token));
                    return forkJoin(observables);
                }),
                concatMap(res => res),
                map((forms) => forms.map(f => f['formulario'])),
                tap(forms => this.store.dispatch(StudentActions.allFormsLoaded({forms})))
            ),
        { dispatch: false }
    );

    // Efecto para guardar un nuevo formulario
    newForm$ = createEffect (() => 
        this.actions$
            .pipe(
                ofType(StudentActions.newForm),
                concatMap(action => {
                    this.token = action.token;
                    return this.studentService.saveChaeaForm(action.chaeaForm, this.token)
                }),
                map((res: any) => {
                    const form = res['formulario'];
                    return this.store.dispatch(StudentActions.newFormCreated({ form }));
                })
            ),
        { dispatch: false }
    );
}
