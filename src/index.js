import ReactDOM from 'react-dom';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
