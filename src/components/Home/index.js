import React from 'react';

const Home = ({ onSelect }) => {
  return (
    <div>
      <h1>Выберите действие:</h1>
      <button onClick={() => onSelect('test')}>Прохождение тестирования</button>
      <button onClick={() => onSelect('report')}>Формирование отчёта</button>
      <button onClick={() => onSelect('documents')}>Просмотр документов</button>
    </div>
  );
}

export default Home;