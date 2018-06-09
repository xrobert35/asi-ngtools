import { Component, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  
} from '@angular/animations';
import { AsiComponentTemplateCollapseHeaderDef } from '../common/asi-component-template';

@Component({
  selector: 'asi-collapse',
  templateUrl: './asi-collapse.component.html',
  host: { 'class': 'asi-component asi-collapse' },
  animations: [
    trigger('reveal', [
      transition('void => *', [
        style({height:0}),
        animate('250ms ease-in-out', style({height:'*'}))
      ]),
      transition('* => void', [
        animate('250ms ease-in-out', style({height:0}))
      ])
    ])
  ]
})
export class AsiCollapseComponent  {

  @Input() label: string;
  @Input() collapsed = true;
  @Input() disabled = false;
  @Output() onCollapse = new EventEmitter<Boolean>();

  state = "collapsed"

  @ContentChild(AsiComponentTemplateCollapseHeaderDef) headerDef: AsiComponentTemplateCollapseHeaderDef;

  constructor() {
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.state = (this.collapsed) ? "collapsed" : "notcollapsed";
    this.onCollapse.emit(this.collapsed);
  }
}