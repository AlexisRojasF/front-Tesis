
export interface User {
    data: UserData,
    token: string;
}

export interface UserData {
    domicilio: {
        ciudad: string;
        cuidad: string;
        departamento: string;
        direccion: string;
    };
    rol: string;
    genero: string;
    estado: boolean;
    google: boolean;
    _id: string;
    email: string;
    nombre: string;
}