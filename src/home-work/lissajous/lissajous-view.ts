/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module LissajousView
 * Contiene la clase `LissajousView` con sus atributos y métodos implementados.
 * 
 */

import { GridDrawer } from './grid-drawer.js';
import { LissajousDrawer } from './lissajous-drawer.js';

/**
 * Clase `LissajousView` que representa la vista en el patrón MVC.
 * Se encarga de gestionar el lienzo HTML5, los sliders y la visualización de las curvas de Lissajous.
 */
export class LissajousView {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sliders: HTMLInputElement[];
  private valueDisplays: HTMLSpanElement[];
  private grid: GridDrawer;
  private lissajous: LissajousDrawer;

  /**
   * Constructor de la clase `LissajousView`.
   * 
   * @param canvasId - ID del elemento del lienzo HTML5.
   */
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.sliders = this.initializeSliders();
    this.valueDisplays = this.initializeValueDisplays();
    this.grid = new GridDrawer(this.context, this.canvas.width, this.canvas.height, 10);
    this.lissajous = new LissajousDrawer(this.context, this.canvas.width, this.canvas.height);
    this.grid.draw();
  }

  /**
   * Inicializa los sliders obteniéndolos del DOM.
   * 
   * @returns Un array de elementos `HTMLInputElement` correspondientes a los sliders.
   */
  private initializeSliders(): HTMLInputElement[] {
    const sliders: HTMLInputElement[] = [];
    for (let i: number = 1; i <= 5; i++) {
      const slider: HTMLInputElement = document.getElementById('slider' + i) as HTMLInputElement;
      sliders.push(slider);
    }
    return sliders;
  }

  /**
   * Inicializa los elementos de visualización de valores obteniéndolos del DOM.
   * 
   * @returns Un array de elementos `HTMLSpanElement` correspondientes a los valores de los sliders.
   */
  private initializeValueDisplays(): HTMLSpanElement[] {
    const valueDisplays: HTMLSpanElement[] = [];
    for (let i: number = 1; i <= 5; i++) {
      const valueDisplay: HTMLSpanElement = document.getElementById('value' + i) as HTMLSpanElement;
      valueDisplays.push(valueDisplay);
    }
    return valueDisplays;
  }

  /**
   * Obtiene un slider específico por su índice.
   * 
   * @param index - Índice del slider (1 a 5).
   * @returns El elemento `HTMLInputElement` correspondiente al slider.
   */
  public getSlider(index: number): HTMLInputElement {
    return this.sliders[index - 1];
  }

  /**
   * Obtiene el elemento de visualización de valor de un slider específico por su índice.
   * 
   * @param index - Índice del slider (1 a 5).
   * @returns El elemento `HTMLSpanElement` correspondiente al valor del slider.
   */
  public getValueDisplay(index: number): HTMLSpanElement {
    return this.valueDisplays[index - 1];
  }

  /**
   * Renderiza la vista actualizando el lienzo con la cuadrícula y la curva de Lissajous.
   * 
   * @param parameters - Objeto con los parámetros de la curva de Lissajous (`freqA`, `freqB`, `phi`, `amplitudeX`, `amplitudeY`).
   */
  public render(parameters: { freqA: number; freqB: number; phi: number; amplitudeX: number; amplitudeY: number }): void {
    const { freqA, freqB, phi, amplitudeX, amplitudeY } = parameters;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw();
    this.lissajous.draw(freqA, freqB, phi, amplitudeX, amplitudeY);
  }

  /**
   * Método que actualiza el canvas para animar la curva de Lissajous.
   * 
   * @param parameters - Objeto con los parámetros de la curva de Lissajous (`freqA`, `freqB`, `phi`, `amplitudeX`, `amplitudeY`).
   */
  public update(parameters: { freqA: number; freqB: number; phi: number; amplitudeX: number; amplitudeY: number }): void {
    parameters.phi += 0.01;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw();
    this.lissajous.draw(parameters.freqA, parameters.freqB, parameters.phi, parameters.amplitudeX, parameters.amplitudeY);
    requestAnimationFrame(() => this.update(parameters));
  };
}