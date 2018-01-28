import { Observable } from 'rxjs/Rx';
import { AsiWorkflowState } from './asi-workflow-state';

export interface AsiWorkflowManager {
  context : any;
  states : Array<AsiWorkflowState>;
  setState: Function;
  goNextStep : Function;
  goPreviousStep : Function;
  onStateChange : Observable<AsiWorkflowState>;
}