import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminState } from './reducers/index';


export const selectadminState = createFeatureSelector<adminState>("admin");

export const areFormIds = createSelector(
    selectadminState,
    admin => {
        if (!!admin.forms) {
            return admin.forms.length > 0 ? true : false
        }
    }
);

export const adminFormsSelector = createSelector(
    selectadminState,
    admin => admin.forms
);
