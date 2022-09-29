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
import { profeActions } from '../action-types';
import { Form } from '../models/form.model';

export const profeFeatureKey = 'profe';

export interface profeState {
  forms: Form[]
};

export const initialprofeState: profeState = {
  forms: undefined
};

export const profeReducer = createReducer(
  initialprofeState,
  on(profeActions.allFormsLoaded, (state, action) => {
    return {
      forms: action.forms
    }
  }),
  on(profeActions.newFormCreated, (state, action) => {
    return {
      forms: [...state.forms, action.form]
    }
  })
);
