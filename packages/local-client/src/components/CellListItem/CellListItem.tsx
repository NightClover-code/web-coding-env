//importing styles
import './cell-list-item.css';
//importing types & components
import { Cell } from '../../state';
import CodeCell from '../CodeCell/CodeCell';
import TextEditor from '../TextEditor/TextEditor';
import ActionBar from '../ActionBar/ActionBar';
//props interface
interface CellListItemProps {
  cell: Cell;
}
//item component
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  //returning a cell or a text editor
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
