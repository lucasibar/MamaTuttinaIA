import { User } from './user.entity';
export declare class FamilyMember {
    id: string;
    nombre: string;
    apellido: string;
    sexo: string;
    edad: number;
    peso: number;
    altura: number;
    actividad_fisica: string;
    horario_laboral: {
        inicio: string;
        fin: string;
    };
    comidas_dia: number;
    user: User;
}
