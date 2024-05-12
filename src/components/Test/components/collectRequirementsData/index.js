import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { downloadCsv } from '../../../../helpers/downloadCSV.helper'

const initialRows = [
  { question: '', fourIn: '', fourSpec: '', fourBg: '', fourDsp: '', threeIn: '', threeSpec: false, threeBg: false, threeUl: false, threeDsp: false, chapter: false },
];

const CollectRequirementsData = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, column, value) => {
    const newRows = [...rows];
    newRows[index][column] = value;
    setRows(newRows);
  };

  return (
    <div className="csv-table-container full-width-table">
      <div className="csv-table-wrapper">
        <table className="csv-table">
          <thead>
          <tr>
            <th>№</th>
            <th>Наименование требований</th>
            <th>4-ин</th>
            <th>4-спец</th>
            <th>4-бг</th>
            <th>4-юл</th>
            <th>4-дсп</th>
            <th>3-ин</th>
            <th>3-спец</th>
            <th>3-бг</th>
            <th>3-юл</th>
            <th>3-дсп</th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row, index) => {
            return row.chapter
                ? (
                  <tr key={index}>
                    <td>{row.question}</td>
                    <td><input type="text" value={row.vendor}
                               onChange={(e) => handleChange(index, 'vendor', e.target.value)} /></td>
                    <td><input type="text" value={row.expiration}
                               onChange={(e) => handleChange(index, 'expiration', e.target.value)} /></td>
                    <td><input type="text" value={row.licenses}
                               onChange={(e) => handleChange(index, 'licenses', e.target.value)} /></td>
                    <td><input type="text" value={row.needed}
                               onChange={(e) => handleChange(index, 'needed', e.target.value)} /></td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td colSpan={12}>{row.name}</td>
                  </tr>
                )
            }
          )}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={() => downloadCsv(rows, 'means_of_protection_data.csv')}>Сохранить ответ</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CollectRequirementsData
