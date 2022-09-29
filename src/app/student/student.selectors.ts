import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './reducers/index';


export const selectStudentState = createFeatureSelector<StudentState>("student");

export const areFormIds = createSelector(
    selectStudentState,
    student => {
        if (!!student.forms) {
            return student.forms.length > 0 ? true : false
        }
    }
);

export const studentFormsSelector = createSelector(
    selectStudentState,
    student => student.forms
);
