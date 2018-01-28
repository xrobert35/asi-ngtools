import { AsiWorkflowState } from './asi-workflow-state';
import { AsiWorkflowManager } from './asi-workflow-manager.interface';
import { Observable, Subscriber } from 'rxjs/Rx'

export abstract class AsiWorkflowStateView {

  manager : AsiWorkflowManager;
  state : AsiWorkflowState;

  init(manager : AsiWorkflowManager, state : AsiWorkflowState){
    this.manager = manager;
    this.state = state;
  }

  goPreviousStep() {
    this.manager.goPreviousStep();
  }

  goNextStep() {
    this.manager.goNextStep();
  }

  abstract initWriteMode() : void;
  abstract initReadOnlyMode() : void;

  abstract getStep() : number;
  
  onExit(): Observable<boolean>{
    return Observable.create((observer: Subscriber<boolean>) => {
      observer.next(true);
      observer.complete();
    });
  }
}