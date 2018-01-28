import { AsiWorkflowState } from './asi-workflow-state';
import { Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_STATE = 'SET_STATE';

export class IncrementState implements Action {
  readonly type = INCREMENT;
}

export class DecrementState implements Action {
  readonly type = DECREMENT;
}

export class SetState implements Action {
  readonly type = SET_STATE;
  constructor(public state: AsiWorkflowState) { }
}