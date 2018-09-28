import { Component } from '@angular/core';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    host: { 'class': 'flex' }
})
export class NotificationComponent {

  message : string;

  constructor(){
    
  }

}