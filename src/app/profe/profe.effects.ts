import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../auth/action-types';
import { concatMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { profeService } from './services/profe.service';
import { profeActions } from './action-types';
import { forkJoin } from 'rxjs';


@Injectable()
export class profeEffects {

    private token!: string;

    constructor(private actions$: Actions, private store: Store, private profeService: profeService) { }

    // Efecto para traer los formularios del estudiante
    forms$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.profetLoaded),
                concatMap(action => {
                    this.token = action.token;
                    return this.profeService.getprofeForms(action.profetId, this.token)
                }),
                map((res) => {
                    let formIDs: any[] = res['formularios'];
                    let observables = formIDs.map(id => this.profeService.getChaeaFormById(id, this.token));
                    return forkJoin(observables);
                }),
                concatMap(res => res),
                map((forms) => forms.map(f => f['formulario'])),
                tap(forms => this.store.dispatch(profeActions.allFormsLoaded({forms})))
            ),
        { dispatch: false }
    );

    // Efecto para guardar un nuevo formulario
    newForm$ = createEffect (() => 
        this.actions$
            .pipe(
                ofType(profeActions.newForm),
                concatMap(action => {
                    this.token = action.token;
                    return this.profeService.saveChaeaForm(action.chaeaForm, this.token)
                }),
                map((res: any) => {
                    const form = res['formulario'];
                    return this.store.dispatch(profeActions.newFormCreated({ form }));
                })
            ),
        { dispatch: false }
    );
}
