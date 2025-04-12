//import { Injectable } from '@nestjs/common';
//import { ChatOllama } from '@langchain/community/chat_models/ollama';
//import { HumanMessage, SystemMessage } from '@langchain/core/messages';

//@Injectable()
//export class IaService {
  //private model = new ChatOllama({
  //  baseUrl: 'http://localhost:11434',
  //  model: 'mistral'
  //});

  //  async generarDieta(promptUsuario: string) {
  //  const messages = [
  //    new SystemMessage(
  //      'Sos un nutricionista. Generá una dieta diaria con desayuno, almuerzo, merienda y cena. Devolvé solo un JSON válido con los campos: "hora", "titulo", "ingredientes".'
  //    ),
  //    new HumanMessage(promptUsuario)
  //  ];

  //  const response = await this.model.call(messages);
  //  return JSON.parse(response.content);
  //  }
//} 