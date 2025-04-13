import { FamilyMember } from './family-member.entity';
export declare class User {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    activo: boolean;
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
    frecuencia_compras: string;
    vive_solo: boolean;
    familiares: FamilyMember[];
    createdAt: Date;
    updatedAt: Date;
}
