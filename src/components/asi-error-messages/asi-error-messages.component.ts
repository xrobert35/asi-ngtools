import { FormControl, FormGroupDirective } from '@angular/forms';
import { AsiMessage } from './asi-message.directive';
import { Component, Input, ElementRef, OnInit, ContentChildren, QueryList, Inject, forwardRef } from '@angular/core';

/**
 * Composant de gestion des messages d'erreur sur un champ de formulaire
 * for : valeur du champ de validation a ecouter : exemple (loginForm.get('password').errors)
 * 
 * Exemple d'utilisation :
 * 
 *  <error-messages [for]="loginForm.get('password')">
 *        <message error="required" value="ERRORS.required"></message>
 *        <message error="minlength" value="ERRORS.minLength" [onSubmit]="true"></message>
 *  </error-messages>
 */
@Component({
  selector: 'error-messages , asi-error-messages',
  templateUrl: 'asi-error-messages.component.html',
  host: { 'class': 'asi-component asi-error-messages' },
})
export class AsiErrorMessages implements OnInit {

  @Input() for: FormControl;
  @Input() forName : string;
  @Input() showOne : boolean = false;

  @ContentChildren(AsiMessage) messages: QueryList<AsiMessage>;

  errorMessages: Array<AsiMessage> = [];
  submitted: boolean = false;

  constructor(private element: ElementRef, @Inject(forwardRef(() => FormGroupDirective)) private formGroupDirective: FormGroupDirective) {
  }

  ngOnInit() {
    if(this.forName != null){
      this.for = <FormControl> this.formGroupDirective.control.controls[this.forName];
    }

    this.formGroupDirective.ngSubmit.subscribe( ()=>{
      this.submitted = true;
      this.onStatusChange();
    });
    this.for.statusChanges.subscribe(() => {
      this.submitted = false;
      this.onStatusChange();
    });
  }

  ngAfterContentInit(){
    if (this.isFieldRequired()) {
      this.element.nativeElement.parentElement.classList.add("asi-required");
    }
  }

  isFieldRequired() {
    let required = false;
    this.messages.forEach(element => {
      if (element.error == 'required') {
        required = true;
      }
    });
    return required;
  }

  /**
   * Methode appellée à chaque changement de l'entré du composant "for"
   */
  onStatusChange() {
    let messagesError: Array<AsiMessage> = [];
    if (this.for.touched || this.submitted) {
      if (this.for.errors != null && this.messages != null) {
        this.messages.forEach(message => {
          if (this.for.errors[message.error] != null && (!message.onSubmit || this.submitted) && !(this.showOne && messagesError.length > 0)) {
            messagesError.push(message);
          }
        });
      }
    }
    this.errorMessages = messagesError;
    if (this.errorMessages.length > 0) {
      this.element.nativeElement.parentElement.classList.add("asi-has-error");
      this.element.nativeElement.classList.add("active");
    } else {
      this.element.nativeElement.parentElement.classList.remove("asi-has-error");
      this.element.nativeElement.classList.remove("active");
    }
  }
}