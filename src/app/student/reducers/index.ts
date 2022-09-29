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
import { StudentActions } from '../action-types';
import { Form } from '../models/form.model';

export const studentFeatureKey = 'student';

export interface StudentState {
  forms: Form[]
};

export const initialStudentState: StudentState = {
  forms: undefined
};

export const StudentReducer = createReducer(
  initialStudentState,
  on(StudentActions.allFormsLoaded, (state, action) => {
    return {
      forms: action.forms
    }
  }),
  on(StudentActions.newFormCreated, (state, action) => {
    return {
      forms: [...state.forms, action.form]
    }
  })
);
