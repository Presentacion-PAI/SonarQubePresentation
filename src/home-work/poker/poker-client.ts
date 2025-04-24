/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * Programa cliente
 * Permite visualizar el juego del poker de forma gráfica respetando el patron mcv
 *
 */

import { PokerView } from './view/poker-view.js';
import { PokerController } from './controller/poker-controller.js';
import { PokerModel } from './model/poker-model.js';

export function main(): void {
  const view: PokerView = new PokerView('pokerCanvas');
  const model: PokerModel = new PokerModel();
  new PokerController(view, model);
}

main();