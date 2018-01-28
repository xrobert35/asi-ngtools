import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { AsiWorkflowGuard } from './asi-workflow-state.guard';
import { AsiWorkflowManager } from './asi-workflow-manager.interface';
import { AsiWorkflowStateView } from './asi-workflow-state-view.abstract';
import { AsiWorkflowState } from './asi-workflow-state';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as StateAction from './asi-workflow-state.action';
import * as lodash from 'lodash';

import { Router, ActivatedRoute } from '@angular/router';

export interface AsiWorkflowStateStore {
  state: AsiWorkflowState;
}

@Component({
  selector: 'asi-workflow',
  templateUrl: 'asi-workflow.component.html',
  host: { 'class': 'asi-component asi-workflow' }
})
export class AsiWorkflowComponent {

  @Output() onWorkflowInit = new EventEmitter<any>();

  @Input() states: Array<AsiWorkflowState>;
  @Input() context: any;

  stateSubject: Subject<AsiWorkflowState> = new BehaviorSubject(null);

  current_state: AsiWorkflowState;
  current_instance: AsiWorkflowStateView;

  init: boolean = false;

  constructor(private store: Store<AsiWorkflowStateStore>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.store.select(store => store.state).filter(state => state != null).subscribe((state: any) => {
      if (this.current_state != null) {
        this.current_instance.onExit().subscribe((canExit) => {
          if (canExit) {
            this.changeState(state);
          }
        });
      } else {
        this.changeState(state);
      }
    });
  }

  onRouteChanged(workflowView: AsiWorkflowStateView) {
    this.current_instance = workflowView;
    if (this.init) {
      this.initCurrentStep();
    }
  }

  private initCurrentStep() {
    let state = this.getStateByStep(this.current_instance.getStep());
    this.current_state = state;

    this.current_instance.init(this.manager, state);
    if (state.readOnly) {
      this.current_instance.initReadOnlyMode();
    } else {
      this.current_instance.initWriteMode();
    }
  }

  ngOnInit() {
    this.activatedRoute.routeConfig.children.forEach((child) => {
      let stateByRouteLink = this.getStateByRouterLink(child.path);
      child.data = { states: this.states, state: stateByRouteLink };
      if (child.canActivate == null) {
        child.canActivate = [];
      }
      child.canActivate.push(AsiWorkflowGuard);
    });

    if (this.current_instance != null) {
      this.initCurrentStep();
    }
    this.onWorkflowInit.emit(this.manager);
    this.init = true;
  }

  private changeState(state: AsiWorkflowState) {
    this.stateSubject.next(state);
    this.router.navigate(['./' + state.routeLink], { relativeTo: this.activatedRoute });
  }

  manager: AsiWorkflowManager = {
    context: this.context,
    states: this.states,
    setState: (state: AsiWorkflowState) => this.setState(state),
    goNextStep: () => this.goNextStep(),
    goPreviousStep: () => this.goPreviousStep(),
    onStateChange: this.stateSubject.asObservable()
  };

  goNextStep() {
    let state = this.getStateByStep(this.current_state.step + 1);
    if (state != null) {
      state.enabled = true;
      this.setState(state);
    }
  }

  goPreviousStep() {
    let state = this.getStateByStep(this.current_state.step - 1);
    if (state != null) {
      this.setState(state);
    }
  }

  setState(asiWorkflowState: AsiWorkflowState): void {
    if (asiWorkflowState.enabled) {
      this.store.dispatch(new StateAction.SetState(asiWorkflowState));
    }
  }

  isCurrentState(state: AsiWorkflowState) {
    return this.current_state != null && state.step == this.current_state.step;
  }

  private getStateByStep(step: number) {
    return lodash.find(this.states, (state) => {
      return state.step === step;
    });
  }

  private getStateByRouterLink(routeLink: string) {
    return lodash.find(this.states, (state) => {
      return state.routeLink === routeLink;
    });
  }
}
