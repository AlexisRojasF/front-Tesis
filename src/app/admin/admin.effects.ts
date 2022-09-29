import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../auth/action-types';
import { concatMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { adminService } from './services/admin.service';
import { adminActions } from './action-types';
import { forkJoin } from 'rxjs';


@Injectable()
export class adminEffects {

    private token!: string;

    constructor(private actions$: Actions, private store: Store, private adminService: adminService) { }

    // Efecto para traer los formularios del estudiante
    forms$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.admintLoaded),
                concatMap(action => {
                    this.token = action.token;
                    return this.adminService.getadminForms(action.admintId, this.token)
                }),
                map((res) => {
                    let formIDs: any[] = res['formularios'];
                    let observables = formIDs.map(id => this.adminService.getChaeaFormById(id, this.token));
                    return forkJoin(observables);
                }),
                concatMap(res => res),
                map((forms) => forms.map(f => f['formulario'])),
                tap(forms => this.store.dispatch(adminActions.allFormsLoaded({forms})))
            ),
        { dispatch: false }
    );

    // Efecto para guardar un nuevo formulario
    newForm$ = createEffect (() => 
        this.actions$
            .pipe(
                ofType(adminActions.newForm),
                concatMap(action => {
                    this.token = action.token;
                    return this.adminService.saveChaeaForm(action.chaeaForm, this.token)
                }),
                map((res: any) => {
                    const form = res['formulario'];
                    return this.store.dispatch(adminActions.newFormCreated({ form }));
                })
            ),
        { dispatch: false }
    );
}
