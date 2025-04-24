/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module PokerController
 * Contiene la clase `PokerController` con sus atributos y métodos implementados.
 * 
 */

import { PokerHand } from '../model/pokerhand.js';
import { PokerView } from '../view/poker-view.js';
import { PokerModel } from '../model/poker-model.js';

/**
 * Clase que representa el controlador del juego de póker.
 * 
 * Actúa como intermediario entre el modelo y la vista, manejando los eventos
 * y actualizando la vista en función del estado del modelo.
 */
export class PokerController {
  private showed: boolean[] = [false, false];

  /**
   * Crea una nueva instancia del controlador.
   * 
   * @param view - La vista del juego.
   * @param model - El modelo del juego.
   */
  constructor(private view: PokerView, private model: PokerModel) {
    this.initializeEvents();
  }

  /**
   * Muestra una mano específica en la vista.
   * 
   * @param index - El índice de la mano a mostrar (0 o 1).
   */
  public async showHand(index: number): Promise<void> {
    let hands: PokerHand[] = this.model.getHands();
    if (index < 0 || index >= hands.length) {
      console.error('Invalid hand index');
      return;
    }
    this.view.clear();
    if (index === 0) {
      this.view.drawHand(hands[0], 30);
      if (this.showed[1]) {
        this.view.drawHand(hands[1], 420);
      } else {
        this.view.drawHand(PokerHand.createBackHand('Back Hand', 5), 420);
      }
      this.showed[0] = true;
    } else {
      this.view.drawHand(hands[1], 420);
      if (this.showed[0]) {
        this.view.drawHand(hands[0], 30);
      } else {
        this.view.drawHand(PokerHand.createBackHand('Back Hand', 5), 30);
      }
      this.showed[1] = true;
    }
  }

  /**
   * Compara las manos y muestra el resultado en la vista.
   */
  public compareHands(): void {
    if (this.showed[0] && this.showed[1]) {
      const result = this.model.compareHands();
      this.view.drawResult(result);
    }
  }

  /**
   * Inicializa los listeners de eventos para los botones de la vista.
   */
  private initializeEvents(): void {
    const buttons = ['deal1', 'deal2'];
    for (let i = 0; i < buttons.length; i++) {
      const button: HTMLElement | null = document.getElementById(buttons[i]);
      if (button) {
        button.addEventListener('click', (event) => this.handleEvent(event));
      }
    }
  }

  /**
   * Maneja los eventos de los botones.
   * 
   * @param event - El evento disparado por un botón.
   */
  private handleEvent(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    switch (target.id) {
      case 'deal1':
        this.showHand(0);
        this.compareHands();
        break;
      case 'deal2':
        this.showHand(1);
        this.compareHands();
        break;
      default:
        console.error('Unhandled event for target id:' + target.id);
    }
  }
}
