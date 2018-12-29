import { Directive, Input } from '@angular/core';

/**
 * Directive permettant d'afficher une ligne de message d'erreur
 * cette directive est liée au composant  error-messages
 * error :  type de l'erreur de gerer (exemple : 'required')
 * value :  valeur du message à afficher interpreter par le translator
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'message, asi-message',
})
export class AsiMessage {

  /** Error name to be captured, based on validator */
  @Input() error: string;
  /** message to display (is translated) */
  @Input() value: string;
  /** display message only on submit */
  @Input() onSubmit: false;

  constructor() {
  }
}
