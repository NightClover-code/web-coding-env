//importing hooks
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListItem/CellListItem';
//importing fragment & styles
import { Fragment, useEffect } from 'react';
import './cell-list.css';
//cell list component
const CellList: React.FC = () => {
  //redux actions
  const { fetchCells } = useActions();
  //getting cells
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  //fetching cells
  useEffect(() => {
    fetchCells();
  }, [fetchCells]);
  //returning cells
  const returnedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell
        previousCellId={null}
        forceVisible={cells.length === 0 ? true : false}
      />
      {returnedCells}
    </div>
  );
};

export default CellList;
