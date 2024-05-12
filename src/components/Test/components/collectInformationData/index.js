import React, { useState } from 'react';
import './styles.css';
import { downloadCsv } from '../../../../helpers/downloadCSV.helper'
import { ToastContainer } from 'react-toastify'

const CollectInformationData = () => {
  const [rows, setRows] = useState([
    { name: '', class: '', servers: '', arm: '', decree: '', security: '', documents: '' }
  ]);

  const handleChange = (index, column, value) => {
    const newRows = [...rows];
    newRows[index][column] = value;
    setRows(newRows);
  };

  const saveRecords = () => {
    downloadCsv([], rows, 'information_data.csv').then(data => {
      return true;
    })
  }

  const addRow = () => {
    setRows([...rows, { name: '', class: '', servers: '', arm: '', decree: '', security: '', documents: '' }]);
  };

  return (
    <div className="csv-table-container full-width-table">
      <div className="csv-table-wrapper">
        <table className="csv-table">
          <thead>
          <tr>
            <th>Наименование ИС</th>
            <th>Класс информационной системы</th>
            <th>Кол-во серверов (физ/вирт)</th>
            <th>Кол-во АРМ</th>
            <th>Реквизиты приказа о назначении ответственного за обеспечение ЗИ</th>
            <th>Средства защиты информации</th>
            <th>Наличие документов</th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleChange(index, 'name', e.target.value)} /></td>
              <td><input type="text" value={row.class} onChange={(e) => handleChange(index, 'class', e.target.value)} /></td>
              <td><input type="text" value={row.servers} onChange={(e) => handleChange(index, 'servers', e.target.value)} /></td>
              <td><input type="text" value={row.arm} onChange={(e) => handleChange(index, 'arm', e.target.value)} /></td>
              <td><input type="text" value={row.decree} onChange={(e) => handleChange(index, 'decree', e.target.value)} /></td>
              <td><input type="text" value={row.security} onChange={(e) => handleChange(index, 'security', e.target.value)} /></td>
              <td><input type="text" value={row.documents} onChange={(e) => handleChange(index, 'documents', e.target.value)} /></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={addRow}>Добавить новую строку</button>
        <button onClick={() => saveRecords()}>Сохранить ответ</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CollectInformationData;
