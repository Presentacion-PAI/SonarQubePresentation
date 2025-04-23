/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module LissajousModel
 * Contiene la clase `LissajousModel` con sus atributos y métodos implementados.
 * 
 */

/**
 * Clase `LissajousModel` que representa el modelo en el patrón MVC.
 * Contiene los parámetros y métodos necesarios para calcular las curvas de Lissajous.
 */
export class LissajousModel {
  private freqA: number;
  private freqB: number;
  private phi: number;
  private amplitudeX: number;
  private amplitudeY: number;

  /**
   * Constructor de la clase `LissajousModel`.
   * Inicializa los parámetros de las curvas de Lissajous con valores por defecto.
   */
  constructor() {
    this.freqA = 3;
    this.freqB = 2;
    this.phi = Math.PI / 2;
    this.amplitudeX = 300;
    this.amplitudeY = 200;
  }

  /**
   * Actualiza uno de los parámetros del modelo.
   * 
   * @param index - Índice del parámetro a actualizar (1: freqA, 2: freqB, 3: phi, 4: amplitudeX, 5: amplitudeY).
   * @param value - Nuevo valor del parámetro.
   * @throws Error si el índice del parámetro es inválido.
   */
  public updateParameter(index: number, value: number): void {
    switch (index) {
      case 1:
        this.freqA = value;
        break;
      case 2:
        this.freqB = value;
        break;
      case 3:
        this.phi = value * Math.PI;
        break;
      case 4:
        this.amplitudeX = value;
        break;
      case 5:
        this.amplitudeY = value;
        break;
      default:
        throw new Error('Índice de parámetro inválido');
    }
  }

  /**
   * Obtiene los parámetros actuales del modelo.
   * 
   * @returns Un objeto con los valores de `freqA`, `freqB`, `phi`, `amplitudeX` y `amplitudeY`.
   */
  public getParameters(): { freqA: number; freqB: number; phi: number; amplitudeX: number; amplitudeY: number } {
    return { freqA: this.freqA, freqB: this.freqB, phi: this.phi, amplitudeX: this.amplitudeX, amplitudeY: this.amplitudeY };
  }

  /**
   * Calcula los puntos de la curva de Lissajous.
   * 
   * @param numPoints - Número de puntos a calcular para aproximar la curva.
   * @param canvasWidth - Ancho del lienzo en píxeles.
   * @param canvasHeight - Alto del lienzo en píxeles.
   * @returns Un array de objetos con las coordenadas `posX` y `posY` de cada punto.
   */
  public calculatePoints(numPoints: number, canvasWidth: number, canvasHeight: number): { posX: number; posY: number }[] {
    const { freqA, freqB, phi, amplitudeX, amplitudeY } = this.getParameters();
    const points: { posX: number; posY: number }[] = [];
    for (let angle: number = 0; angle <= 2 * Math.PI; angle += (2 * Math.PI) / numPoints) {
      const posX: number = canvasWidth / 2 + amplitudeX * Math.sin(freqA * angle + phi);
      const posY: number = canvasHeight / 2 + amplitudeY * Math.sin(freqB * angle);
      points.push({ posX: posX, posY: posY });
    }
    return points;
  }
}
