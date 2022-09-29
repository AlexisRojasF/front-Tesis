import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { adminActions } from '../action-types';
import { Form } from '../models/form.model';

export const adminFeatureKey = 'admin';

export interface adminState {
  forms: Form[]
};

export const initialadminState: adminState = {
  forms: undefined
};

export const adminReducer = createReducer(
  initialadminState,
  on(adminActions.allFormsLoaded, (state, action) => {
    return {
      forms: action.forms
    }
  }),
  on(adminActions.newFormCreated, (state, action) => {
    return {
      forms: [...state.forms, action.form]
    }
  })
);
