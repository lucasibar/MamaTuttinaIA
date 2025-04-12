import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('family_members')
export class FamilyMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ type: 'enum', enum: ['masculino', 'femenino', 'otro'] })
  sexo: string;

  @Column()
  edad: number;

  @Column()
  peso: number;

  @Column()
  altura: number;

  @Column({ type: 'enum', enum: ['muy_activo', 'activo', 'poco_activo', 'sedentario'] })
  actividad_fisica: string;

  @Column({ type: 'jsonb', nullable: true })
  horario_laboral: {
    inicio: string;
    fin: string;
  };

  @Column()
  comidas_dia: number;

  @ManyToOne(() => User, user => user.familiares)
  user: User;
} 