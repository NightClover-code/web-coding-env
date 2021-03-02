//importing random id's
import { v4 as uuid } from 'uuid';
//importing types & immer
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell } from '../cell';
import produce from 'immer';
//cell state
interface CellsState {
  data: {
    [key: string]: Cell;
  };
  error: string | null;
  loading: boolean;
  order: string[];
}
//initialState
const initialState: CellsState = {
  data: {},
  loading: false,
  order: [],
  error: null,
};
//reducer
const cellsReducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.DELETE_CELL:
        //deleting cell & removing it from order
        delete state.data[action.payload];
        state.order = state.order.filter(id => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        //looking for cell index
        const index = state.order.findIndex(id => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        //preventing getting outside the array
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        //swapping logic
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        //generating a new cell
        const cell: Cell = {
          content: '',
          id: uuid(),
          type: action.payload.type,
        };
        //updating data
        state.data[cell.id] = cell;
        //looking for cell index
        const foundIndex = state.order.findIndex(
          id => id === action.payload.id
        );
        //inserting at the end of data
        if (foundIndex < 0) {
          state.order.unshift(cell.id);
          return state;
        }
        //updating order
        state.order.splice(foundIndex + 1, 0, cell.id);
        return state;
      case ActionType.UPDATE_CELL:
        //updating state without mutating it (immer)
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.FETCH_CELLS:
        //flipping loading to true
        state.loading = true;
        state.error = null;
        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        //fetching cells success
        state.order = action.payload.map(cell => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
        return state;
      case ActionType.FETCH_CELLS_ERROR:
        //catching errors
        state.error = action.payload;
        state.loading = false;
        return state;
      case ActionType.SAVE_CELL_ERROR:
        //catching errors
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
export default cellsReducer;
