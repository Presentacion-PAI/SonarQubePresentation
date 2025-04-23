/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * Programa cliente
 * Permite visualizar la curvas de Lissajous de forma gráfica respetando el patron mcv
 *
 */

import { LissajousModel } from './lissajous-model.js';
import { LissajousView } from './lissajous-view.js';
import { LissajousController } from './lissajous-controller.js';

export function main(): void {
  const model: LissajousModel = new LissajousModel();
  const view: LissajousView = new LissajousView('lissajous');
  new LissajousController(model, view);
}

main();