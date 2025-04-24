/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module PokerView
 * Contiene la clase `PokerView` con sus atributos y métodos implementados.
 * 
 */

import { Hand } from '../model/hand.js';
import { PokerHand } from '../model/pokerhand.js';
import { Card } from '../model/card.js';

/**
 * Clase que representa la vista del juego de póker.
 * 
 * Se encarga de renderizar las cartas y los resultados en un canvas HTML.
 */
export class PokerView {
  private context: CanvasRenderingContext2D;
  private cardWidth = 220;
  private cardHeight = 319;
  private backHand: PokerHand;
  private canvas: HTMLCanvasElement;

  /**
   * Crea una nueva instancia de la vista del póker.
   * 
   * @param canvas - El ID del elemento canvas donde se renderizará el juego.
   */
  constructor(canvas: string) {
    this.canvas = document.getElementById(canvas) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.backHand = PokerHand.createBackHand('Back Hand', 5);
    this.drawHand(this.backHand, 30);
    this.drawHand(this.backHand, 420);
  }

  /**
   * Limpia el canvas.
   */
  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Dibuja una mano de cartas en el canvas.
   * 
   * @param hand - La mano de cartas a dibujar.
   * @param yCoord - La coordenada Y donde se dibujará la mano.
   */
  public async drawHand(hand: Hand, yCoord: number): Promise<void> {
    const cards: Card[] = hand.getCards();
    for (let i = 0; i < cards.length; i++) {
      const card: Card = cards[i];
      const img: HTMLImageElement = new Image();
      img.src = card.getImage();
      img.onload = () => {
        const xCoord: number = 100 + i * (this.cardWidth + 90);
        this.context.drawImage(img, xCoord, yCoord, this.cardWidth, this.cardHeight);
      };
    }
  }

  /**
   * Muestra el resultado del juego en un elemento HTML.
   * 
   * @param result - El texto del resultado a mostrar.
   */
  public drawResult(result: string): void {
    const resultDiv: HTMLElement = document.getElementById('result')!;
    resultDiv.textContent = result;
  }
}
