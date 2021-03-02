//importing types
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';
//save middleware
export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  //decounce timer
  let timer: any;
  return (next: (action: Action) => void) => (action: Action) => {
    //dispatching actions
    next(action);
    if (
      [
        ActionType.INSERT_CELL_AFTER,
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.DELETE_CELL,
      ].includes(action.type)
    ) {
      if (timer) {
        clearTimeout(timer);
      }
      // saving cells (debounced)
      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 250);
    }
  };
};
