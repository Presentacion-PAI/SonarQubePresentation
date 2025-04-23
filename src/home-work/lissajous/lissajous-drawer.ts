/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module LissajousDrawer
 * Contiene la clase `LissajousDrawer` con sus atributos y métodos implementados.
 * 
 */

import { LineDrawer } from './line-drawer.js';

/**
 * Clase `LissajousDrawer` que se encarga de dibujar curvas de Lissajous en un contexto de lienzo HTML5.
 */
export class LissajousDrawer {
  private width: number;
  private height: number;
  private lineDrawer: LineDrawer;

  /**
   * Constructor de la clase `LissajousDrawer`.
   * 
   * @param context - Contexto de renderizado 2D del lienzo donde se dibujarán las curvas.
   * @param width - Ancho del lienzo en píxeles.
   * @param height - Alto del lienzo en píxeles.
   */
  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.lineDrawer = new LineDrawer(context);
  }
  
  /**
   * Dibuja una curva de Lissajous en el lienzo.
   * 
   * @param freqA - Frecuencia en el eje X.
   * @param freqB - Frecuencia en el eje Y.
   * @param phi - Desfase entre las dos frecuencias en radianes.
   * @param amplitudeX - Amplitud de la curva en el eje X.
   * @param amplitudeY - Amplitud de la curva en el eje Y.
   */
  public draw(freqA: number, freqB: number, phi: number, amplitudeX: number, amplitudeY: number): void {
    const numPoints: number = 1000;
    let prevX: number = this.width / 2 + amplitudeX * Math.sin(phi);
    let prevY: number = this.height / 2;
    for (let i: number = 1; i <= numPoints; i++) {
      const angle: number = (i / numPoints) * 2 * Math.PI;
      const currentX: number = this.width / 2 + amplitudeX * Math.sin(freqA * angle + phi);
      const currentY: number = this.height / 2 + amplitudeY * Math.sin(freqB * angle);
      this.lineDrawer.drawLine(prevX, prevY, currentX, currentY, 'black', 1);
      prevX = currentX;
      prevY = currentY;
    }
  }
}