/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module LissajousController
 * Contiene la clase `LissajousController` con sus atributos y métodos implementados.
 * 
 */

import { LissajousModel } from './lissajous-model.js';
import { LissajousView } from './lissajous-view.js';

/**
 * Clase `LissajousController` que actúa como controlador en el patrón MVC.
 * Conecta el modelo y la vista, gestionando los eventos de usuario y actualizando
 * la vista en función de los cambios en el modelo.
 */
export class LissajousController {
  private model: LissajousModel;
  private view: LissajousView;

  /**
   * Constructor de la clase `LissajousController`.
   * 
   * @param model - Instancia del modelo `LissajousModel`.
   * @param view - Instancia de la vista `LissajousView`.
   */
  constructor(model: LissajousModel, view: LissajousView) {
    this.model = model;
    this.view = view;
    this.view.render(this.model.getParameters());
    this.initializeEventListeners();
    this.view.update(this.model.getParameters());
  }

  /**
   * Inicializa los listeners de eventos para los sliders de la vista.
   * 
   * Asocia un evento `input` a cada slider, que llama al método `handleEvent`.
   */
  private initializeEventListeners(): void {
    for (let i = 1; i <= 5; i++) {
      const slider = this.view.getSlider(i);
      slider.addEventListener('input', this.handleEvent.bind(this));
    }
  }
  
  /**
   * Maneja los eventos de los sliders.
   * 
   * Actualiza el modelo con el nuevo valor del slider, renderiza la vista con los
   * parámetros actualizados y actualiza la visualización del valor del slider.
   * 
   * @param event - Evento disparado por el slider.
   */
  private handleEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    const sliderId = target.id;
    const value = parseFloat(target.value);
    const sliderIndex = parseInt(sliderId.replace('slider', ''), 10);
    this.model.updateParameter(sliderIndex, value);
    const valueDisplay = this.view.getValueDisplay(sliderIndex);
    valueDisplay.textContent = value.toString();
    this.view.update(this.model.getParameters());
  }
}