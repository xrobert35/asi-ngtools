import { FormControl, FormGroupDirective, FormGroupName, FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { AsiMessage } from './asi-message.directive';
import {
  Component, Input, ElementRef, OnInit, ContentChildren,
  AfterContentInit, QueryList, Inject, forwardRef,
} from '@angular/core';

@Component({
  selector: 'error-messages , asi-error-messages',
  host: { 'class': 'asi-component asi-error-messages' },
  templateUrl: 'asi-error-messages.component.html'
})
export class AsiErrorMessages implements OnInit, AfterContentInit {

  @Input() for: FormControl;
  @Input() forName: string;
  @Input() showOne = false;

  @ContentChildren(AsiMessage) messages: QueryList<AsiMessage>;

  errorMessages: Array<AsiMessage> = [];
  submitted = false;

  constructor(private element: ElementRef,
    @Inject(forwardRef(() => FormGroupDirective)) private formGroupDirective: FormGroupDirective,
    private injector: Injector) {
  }

  ngOnInit() {
    const formGroupName = this.injector.get(FormGroupName, null);
    if (this.forName) {
      if (!formGroupName) {
        this.for = <FormControl>this.formGroupDirective.control.controls[this.forName];
      } else {
        const groupFormName: FormGroup = <FormGroup>this.formGroupDirective.control.controls[formGroupName.name];
        this.for = <FormControl>groupFormName.controls[this.forName];
      }
    }

    this.formGroupDirective.ngSubmit.subscribe(() => {
      this.submitted = true;
      this.onStatusChange();
    });
    this.for.statusChanges.subscribe(() => {
      this.submitted = false;
      this.onStatusChange();
    });
  }

  ngAfterContentInit() {
    if (this.isFieldRequired()) {
      this.element.nativeElement.parentElement.classList.add('asi-required');
    }
  }

  isFieldRequired() {
    let required = false;
    this.messages.forEach(element => {
      if (element.error === 'required') {
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
          if (this.for.errors[message.error] && (!message.onSubmit || this.submitted) && !(this.showOne && messagesError.length > 0)) {
            messagesError.push(message);
          }
        });
      }
    }
    this.errorMessages = messagesError;
    if (this.errorMessages.length > 0) {
      this.element.nativeElement.parentElement.classList.add('asi-has-error');
      this.element.nativeElement.classList.add('active');
    } else {
      this.element.nativeElement.parentElement.classList.remove('asi-has-error');
      this.element.nativeElement.classList.remove('active');
    }
  }
}
