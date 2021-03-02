//importing types & immer
import { Action } from '../actions';
import { ActionType } from '../action-types';
import produce from 'immer';
import { Bundle } from '../bundle';
//bundle state interface
interface BundleState {
  [key: string]: Bundle | undefined;
}
//reducer
const bundlesReducer = produce(
  (state: BundleState = {}, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.id] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);
export default bundlesReducer;
