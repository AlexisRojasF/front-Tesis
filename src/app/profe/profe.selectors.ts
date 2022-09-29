import { createFeatureSelector, createSelector } from '@ngrx/store';
import { profeState } from './reducers/index';


export const selectprofeState = createFeatureSelector<profeState>("profe");

export const areFormIds = createSelector(
    selectprofeState,
    profe => {
        if (!!profe.forms) {
            return profe.forms.length > 0 ? true : false
        }
    }
);

export const profeFormsSelector = createSelector(
    selectprofeState,
    profe => profe.forms
);
