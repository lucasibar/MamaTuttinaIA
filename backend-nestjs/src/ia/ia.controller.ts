//import { Controller, Post, Body } from '@nestjs/common';
//import { IaService } from './ia.service';

//@Controller('dieta')
//export class IaController {
//  constructor(private readonly iaService: IaService) {}

//  @Post()
//  async generarDieta(@Body() body: any) {
//    const { sexo, edad, peso, estatura, actividad } = body;

//    const prompt = `Sexo: ${sexo}, Edad: ${edad}, Peso: ${peso}kg, Estatura: ${estatura}cm, Actividad: ${actividad}.
//    Generá un JSON con desayuno, almuerzo, merienda y cena, con hora, título, ingredientes, gramos y calorías por 100g.`;

//    const dieta = await this.iaService.generarDieta(prompt);
//    return dieta;
//  }
//} 