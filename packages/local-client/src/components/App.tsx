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
      <div
        className="attribution"
        style={{
          textAlign: 'center',
          opacity: '85%',
          marginBottom: '20px',
          letterSpacing: '2px',
          fontStyle: 'light',
        }}
      >
        <p>
          Coded with 💖 by{' '}
          <a href="https://github.com/NightClover-code">Achraf Elmouhib</a>
        </p>
      </div>
    </div>
  );
};
export default App;
