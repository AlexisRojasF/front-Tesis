import { User } from '../models/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.logoutAction, (state, action) => {
    return {
        user: undefined
    }
  })
);
