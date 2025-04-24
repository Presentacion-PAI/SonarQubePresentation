/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 06 2025
 * @module LineDrawer
 * Contiene la clase `LineDrawer` con sus atributos y métodos implementados.
 * 
 */

/**
 * Clase `LineDrawer` que se encarga de dibujar líneas en un contexto de lienzo HTML5.
 */
export class LineDrawer {
  private readonly context: CanvasRenderingContext2D;

  /**
   * Constructor de la clase `LineDrawer`.
   * 
   * @param context - Contexto de renderizado 2D del lienzo donde se dibujarán las líneas.
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * Dibuja una línea en el lienzo.
   * 
   * @param startX - Coordenada X inicial de la línea.
   * @param startY - Coordenada Y inicial de la línea.
   * @param endX - Coordenada X final de la línea.
   * @param endY - Coordenada Y final de la línea.
   * @param color - Color de la línea (por defecto 'black').
   * @param lineWidth - Grosor de la línea en píxeles (por defecto 1).
   */
  public drawLine(startX: number, startY: number, endX: number, endY: number, color: string = 'black', lineWidth: number = 1): void {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.stroke();
  }
}