import { IsString, IsEmail, MinLength, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  apellido?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  // Campos para la dieta
  @IsString()
  @IsOptional()
  sexo?: string;

  @IsNumber()
  @IsOptional()
  edad?: number;

  @IsNumber()
  @IsOptional()
  peso?: number;

  @IsNumber()
  @IsOptional()
  estatura?: number;

  @IsString()
  @IsOptional()
  actividad?: string;

  @IsOptional()
  dieta?: any;
} 