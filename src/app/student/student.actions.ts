import { createAction, props } from "@ngrx/store";

export const allFormsLoaded = createAction(
    "[Load Forms Effect] All Forms Loaded",
    props<{forms: any[]}>()
);

export const newForm = createAction(
    "[CHAEA Form Page] New Form",
    props<{chaeaForm: any, token: string}>()
);

export const newFormCreated = createAction(
    "[Form Created Effect] form created",
    props<{form: any}>()
);
