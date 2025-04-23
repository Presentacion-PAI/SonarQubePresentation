/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Este archivo contiene la definición de la clase PokerView, que representa la vista del juego de poker.
 */

import { PokerHand } from "../model/poker-hand.js";

export class PokerView {
  private hand1Container: HTMLElement;
  private hand2Container: HTMLElement;
  private resultContainer: HTMLElement;

  constructor(hand1Id: string, hand2Id: string, resultId: string) {
    this.hand1Container = document.getElementById(hand1Id)!;
    this.hand2Container = document.getElementById(hand2Id)!;
    this.resultContainer = document.getElementById(resultId)!;
  }

  /**
   * Muestra visualmente una mano en el contenedor correspondiente.
   * @param {PokerHand} hand - La mano a mostrar.
   * @param {HTMLElement} container - El contenedor donde se mostrará la mano.
   */
  public renderHand(hand: PokerHand, container: HTMLElement): void {
    container.innerHTML = '';
    for (const card of hand.getCards()) {
      const img = document.createElement('img');
      img.src = `${card.getImage()}`;
      img.alt = card.toString();
      img.className = 'card-image';
      container.appendChild(img);
    }
    const rankContainerId = hand.getLabel().includes("1") ? 'hand1-rank' : 'hand2-rank';
    const rankElement = document.getElementById(rankContainerId);
    if (rankElement) {
      rankElement.textContent = hand.getHandRank();
    }
  }

  /**
   * Muestra un número de cartas ocultas en la mano.
   * @param container Contenedor HTML de la mano.
   * @param count Número de cartas a mostrar boca abajo.
   */
  public renderBackCards(container: HTMLElement, count: number): void {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.src = 'img/gray_back.png';
      img.alt = 'Carta boca abajo';
      img.className = 'card-image';
      container.appendChild(img);
    }
  }

  /**
   * Muestra ambas manos en sus contenedores correspondientes.
   * @param {PokerHand} hand1 - La mano del jugador 1.
   * @param {PokerHand} hand2 - La mano del jugador 2.
   */
  public renderHands(hand1: PokerHand, hand2: PokerHand): void {
    this.renderHand(hand1, this.hand1Container);
    this.renderHand(hand2, this.hand2Container);
  }

  /**
   * Muestra el mensaje con el resultado del juego.
   * @param {number} winner - El número del jugador ganador (1 o 2) o 0 si hay empate.
   */
  public showWinner(winner: number): void {
    if (winner === 0) {
      this.resultContainer.textContent = '¡Empate!';
    } else {
      this.resultContainer.textContent = `¡Gana el jugador ${winner}!`;
    }
  }

  public getHand1Container(): HTMLElement {
    return this.hand1Container;
  }
  
  public getHand2Container(): HTMLElement {
    return this.hand2Container;
  }

  /**
   * Limpia las manos y el mensaje del resultado.
   */
  public clear(): void {
    this.hand1Container.innerHTML = '';
    this.hand2Container.innerHTML = '';
    this.resultContainer.textContent = '';
  }
}