import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActions } from './action-types';
import { map, tap } from 'rxjs/operators';
import { userData, userToken } from './auth.selectors';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router) { }

    login$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(AuthActions.loginAction),
            tap(action => {
                if (action.rememberMe) {
                    localStorage.setItem('user', JSON.stringify(action.user));
                }
            }),
            map((action) => {
                const studentId = action.user.data._id;
                const token = action.user.token;

                // TODO: Despachar la acción según el tipo de usuario
                if (action.user.data.rol === 'ESTUDIANTE_ROLE') {
                    return AuthActions.studentLoaded( { studentId, token } );
                }
            })
        )
    );

    // Side Effect Observable que SOLO emite acciones de logout
    logout$ = createEffect(() =>
    this.actions$
        .pipe(
        // ofType: operador propio de NgRx que nos permite filtrar acciones dado su tipo,
        // en este caso, la acción de logout
        ofType(AuthActions.logoutAction),
        tap(() => {
            // Se elimina la información del usuario en el Local Storage
            localStorage.removeItem('user');

            // Se navega a la pantalla de login
            this.router.navigateByUrl('/auth');
        })
        )
    , {dispatch: false});
}
