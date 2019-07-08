import { Component, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import {  trigger,  style,  animate,  transition } from '@angular/animations';
import { AsiComponentTemplateCollapseHeaderDef } from '../common/asi-component-template';

@Component({
  selector: 'asi-collapse',
  host: { 'class': 'asi-component asi-collapse' },
  templateUrl: './asi-collapse.component.html',
  animations: [
    trigger('reveal', [
      transition('void => *', [
        style({height: 0}),
        animate('250ms ease-in-out', style({height: '*'}))
      ]),
      transition('* => void', [
        animate('250ms ease-in-out', style({height: 0}))
      ])
    ])
  ]
})
export class AsiCollapseComponent  {

  /** Collapse label */
  @Input() label: string;
  /** Is collapsed  */
  @Input() collapsed = true;
  /** is enabled/disabled */
  @Input() disabled = false;

  /** Event emitted with the collapse status change */
  @Output() onCollapse = new EventEmitter<Boolean>();

  @ContentChild(AsiComponentTemplateCollapseHeaderDef, {static: false}) headerDef: AsiComponentTemplateCollapseHeaderDef;

  state = 'collapsed';

  constructor() {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.state = (this.collapsed) ? 'collapsed' : 'notcollapsed';
    this.onCollapse.emit(this.collapsed);
  }
}
