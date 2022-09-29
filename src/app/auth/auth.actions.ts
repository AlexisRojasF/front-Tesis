import { createAction, props } from "@ngrx/store";
import { User } from './models/user.model';

export const loginAction = createAction(
    '[Login Page] User Login',
    props<{user: User, rememberMe: boolean}>()
);

export const logoutAction = createAction(
    '[Top Menu] User Logout'
);

export const studentLoaded = createAction(
    '[Auth Module] Student Loaded',
    props<{studentId: string, token: string}>()
);

export const profetLoaded = createAction(
    '[Auth Module] Student Loaded',
    props<{profetId: string, token: string}>()
);

export const admintLoaded = createAction(
    '[Auth Module] Student Loaded',
    props<{admintId: string, token: string}>()
);