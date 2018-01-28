import { Action } from '@ngrx/store';
import { AsiWorkflowState } from './asi-workflow-state';

import { SetState } from './asi-workflow-state.action';
import * as StateAction from './asi-workflow-state.action';

export function asiWorkflowStateReducer(state: AsiWorkflowState, action: Action) {
	switch (action.type) {
		case StateAction.INCREMENT:
			return null;
		case StateAction.DECREMENT:
			return null;
		case StateAction.SET_STATE:
			return (<SetState>action).state;
		default:
			return state;
	}
}