import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  // Campos opcionales para la dieta
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
} 