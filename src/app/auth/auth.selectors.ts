import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';


// 1. Seleccionar el módulo del Store que necesitamos para nuestros selectores
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2. Una vez seleccionado el módulo, obtendremos las propiedades necesarias
//    para calcular una salida, en este caso, retornar true si el usuario
//    está logeado. 
export const isLoggedIn = createSelector(
    selectAuthState,
		/**
     * Retornar el equivalente en booleano de una propiedad:
     * podemos anteponerle a la misma un ! para preguntar si NO existe, o, podemos
     * anteponer !! para preguntar si existe.
     */
    (auth) => !!auth.user
);

// 3. Un selector puede tomar el resultado de otro selector para generar la salida;
//    esto es útil para evitar consultas repetidas a nuestro Store. En este caso,
//    simplemente se retorna la negación del selector isLoggedIn.
export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);

export const userLoaded = createSelector(
    selectAuthState,
    auth => auth.user
);

export const userData = createSelector(
    selectAuthState,
    auth => auth.user.data
);

export const userToken = createSelector(
    selectAuthState,
    auth => auth.user.token
);
