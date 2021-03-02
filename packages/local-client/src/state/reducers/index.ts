import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';
//reducers
const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});
export default reducers;
//ensuring typescript knows the type of our state
export type RootState = ReturnType<typeof reducers>;
