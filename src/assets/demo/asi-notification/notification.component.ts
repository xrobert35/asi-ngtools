import { Component } from '@angular/core';

@Component({
  selector: 'my-notification',
  template: '<span [innerHTML]="message"></span>',
})
export class NotificationComponent {

  public message : string = "";

  constructor(){}
}