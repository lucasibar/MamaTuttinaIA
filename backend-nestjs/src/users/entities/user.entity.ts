import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: true })
  activo: boolean;

  // Información personal
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

  @Column({ type: 'enum', enum: ['diario', 'semanal', 'quincenal', 'esporadico'] })
  frecuencia_compras: string;

  @Column({ default: false })
  vive_solo: boolean;

  @OneToMany(() => FamilyMember, familyMember => familyMember.user)
  familiares: FamilyMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 