/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Controlador que conecta la lógica del juego con la vista
 *              y gestiona eventos de usuario.
 * 
 */

import { PokerGame } from '../model/poker-game';
import { PokerView } from '../view/PokerView';

export class GameController {
  private game: PokerGame;
  private view: PokerView;

  /**
   * Constructor del controlador.
   * @param {string} hand1Id - ID del contenedor de la mano 1.
   * @param {string} hand2Id - ID del contenedor de la mano 2.
   * @param {string} resultId - ID del contenedor del resultado.
   * @param {string} dealButtonId - ID del botón de repartir cartas.
   */
  constructor(hand1Id: string, hand2Id: string, resultId: string, dealButtonId: string) {
    this.game = new PokerGame();
    this.view = new PokerView(hand1Id, hand2Id, resultId);

    this.view.renderBackCards(this.view.getHand1Container(), 5);
    this.view.renderBackCards(this.view.getHand2Container(), 5);

    const dealButton = document.getElementById(dealButtonId)!;
    dealButton.addEventListener('click', () => this.handleDeal());
    const dealHand1Btn = document.getElementById('dealHand1Btn')!;
    dealHand1Btn.addEventListener('click', () => this.handleDealHand1());
    const dealHand2Btn = document.getElementById('dealHand2Btn')!;
    dealHand2Btn.addEventListener('click', () => this.handleDealHand2());
  }

  private handleDealHand1(): void {
    const input = document.getElementById('cardCount') as HTMLInputElement;
    const numberOfCards = Math.max(5, parseInt(input.value));
    this.game.dealHand1(numberOfCards);
    const hand1 = this.game.getHand1();
    const winner = this.game.getWinner();
    this.view.renderHand(hand1, this.view.getHand1Container());
    this.view.showWinner(winner);
  }
  
  private handleDealHand2(): void {
    const input = document.getElementById('cardCount') as HTMLInputElement;
    const numberOfCards = Math.max(5, parseInt(input.value));
    this.game.dealHand2(numberOfCards);
    const hand2 = this.game.getHand2();
    const winner = this.game.getWinner();
    this.view.renderHand(hand2, this.view.getHand2Container());
    this.view.showWinner(winner);
  }

  /**
   * Maneja el evento de repartir cartas al pulsar el botón.
   * Reparte nuevas cartas y actualiza la vista.
   */
  private handleDeal(): void {
    const input = document.getElementById('cardCount') as HTMLInputElement;
    const numberOfCards = Math.max(5, parseInt(input.value));
    this.game.deal(numberOfCards);
    const hand1 = this.game.getHand1();
    const hand2 = this.game.getHand2();
    const winner = this.game.getWinner();
    this.view.renderHands(hand1, hand2);
    this.view.showWinner(winner);
  }
}