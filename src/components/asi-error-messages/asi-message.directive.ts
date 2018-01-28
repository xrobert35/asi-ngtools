import { Directive, Input } from '@angular/core';

/**
 * Directive permettant d'afficher une ligne de message d'erreur
 * cette directive est liée au composant  error-messages
 * error :  type de l'erreur de gerer (exemple : 'required')
 * value :  valeur du message à afficher interpreter par le translator
 */
@Directive({
  selector: 'message, asi-message',
})
export class AsiMessage {

  @Input() error: string;
  @Input() value: string;
  @Input() onSubmit : false;

  constructor() {
  }
}