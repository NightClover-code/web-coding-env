//importing styles
import './add-cell.css';
//importing hooks
import { useActions } from '../../hooks/useActions';
//props interface
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
//add cell component
const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  //redux actions
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          onClick={() => insertCellAfter(previousCellId, 'code')}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          onClick={() => insertCellAfter(previousCellId, 'text')}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
