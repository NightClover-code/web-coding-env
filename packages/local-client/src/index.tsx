import App from './components/App';
import ReactDOM from 'react-dom';
//importing react redux
import { Provider } from 'react-redux';
import { store } from './state';
//rendering
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
