/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module GridDrawer
 * Contiene la clase `GridDrawer` con sus atributos y métodos implementados.
 * 
 */

/**
 * Clase `GridDrawer` que se encarga de dibujar una cuadrícula en un contexto de lienzo HTML5.
 * Utiliza la clase `LineDrawer` para dibujar las líneas de la cuadrícula.
 */
import { LineDrawer } from './line-drawer.js';

export class GridDrawer {
  private readonly width: number;
  private readonly height: number;
  private readonly cellSize: number;
  private readonly lineDrawer: LineDrawer;

  /**
   * Constructor de la clase `GridDrawer`.
   * 
   * @param context - Contexto de renderizado 2D del lienzo donde se dibujará la cuadrícula.
   * @param width - Ancho del lienzo en píxeles.
   * @param height - Alto del lienzo en píxeles.
   * @param cellSize - Tamaño de cada celda de la cuadrícula en píxeles (por defecto 10).
   */
  constructor(context: CanvasRenderingContext2D, width: number, height: number, cellSize: number = 10) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.lineDrawer = new LineDrawer(context);
  }

  /**
   * Dibuja la cuadrícula en el lienzo.
   * 
   * Recorre el ancho y el alto del lienzo, dibujando líneas verticales y horizontales
   * con un color gris claro y un grosor de línea de 1 píxel.
   */
  public draw(): void {
    for (let x: number = 0; x <= this.width; x += this.cellSize) {
      this.lineDrawer.drawLine(x, 0, x, this.height, '#e0e0e0', 1);
    }
    for (let y: number = 0; y <= this.height; y += this.cellSize) {
      this.lineDrawer.drawLine(0, y, this.width, y, '#e0e0e0', 1);
    }
  }
}