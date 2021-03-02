//importing types & axios
import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { CellTypes, Cell } from '../cell';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  Action,
} from '../actions';
//importing bundler
import bundle from '../../bundler';
import { RootState } from '../reducers';
//update cell
export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
//move cell
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
//insert cell before
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
//delete cell
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
//start bundling
export const createBundle = (id: string, rawCode: string) => async (
  dispatch: Dispatch<Action>
) => {
  //start bundling
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      id,
    },
  });
  //getting bundle result
  const result = await bundle(rawCode);
  //completed bundling
  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      bundle: result,
      id,
    },
  });
};
//fetch cells action-creator
export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  //loading
  dispatch({
    type: ActionType.FETCH_CELLS,
  });
  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    //getting results
    dispatch({
      type: ActionType.FETCH_CELLS_COMPLETE,
      payload: data,
    });
  } catch (err) {
    //catching error
    dispatch({
      type: ActionType.FETCH_CELLS_ERROR,
      payload: err.message,
    });
  }
};
//saved cells
export const saveCells = () => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  //getting data & order state
  const {
    cells: { data, order },
  } = getState();
  const cells = order.map(id => data[id]);
  try {
    //saving cells
    await axios.post('/cells', { cells });
  } catch (err) {
    //catching errors
    dispatch({
      type: ActionType.SAVE_CELL_ERROR,
      payload: err.message,
    });
  }
};
