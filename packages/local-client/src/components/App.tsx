//importing styles
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//importing components
import CellList from './CellList/CellList';
//app component
const App: React.FC = () => {
  return (
    <div>
      <CellList />
    </div>
  );
};
export default App;
