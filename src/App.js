import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import AppRoutes from './routes/routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/test">Прохождение тестирования</Link></li>
            <li><Link to="/report">Формирование отчёта</Link></li>
            <li><Link to="/documents">Просмотр документов</Link></li>
          </ul>
        </nav>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
