export interface Formularios {
  msg: string;
  formularios: FormularioElement[];
}

export interface FormularioElement {
  formulario: FormularioFormulario;
  estado: boolean;
  _id: string;
  create_ad: Date;
  __v: number;
}

export interface FormularioFormulario {
  activo: number;
  reflexivo: number;
  teorico: number;
  pragmatico: number;
}

export declare enum ColumnMode {
  standard = "standard",
  flex = "flex",
  force = "force",
}

export interface Formulario {
  msg: string;
  formulario: FormularioElement;
}
