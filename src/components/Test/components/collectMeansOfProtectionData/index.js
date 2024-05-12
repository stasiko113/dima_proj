import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { downloadCsv } from '../../../../helpers/downloadCSV.helper'

const headers = ['Наименование', 'Вендор, продукт', 'Срок действия', 'Количество лицензий', 'Сколько Нужно']

const initialRows = [
  { name: 'Антивирус', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Антивирус промышленный', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Защита почты', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Межсетевой экран', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Маршрутизатор, коммутатор маршрутизирующий', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'IDS/IPS', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Беспроводная IDS/IPS', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Защита виртуальных сред', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Бесплатная SIEM (syslog)', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'DLP', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Средство ЭЦП', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'СКЗИ (линейное шифрование)', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'СКЗИ (предварительное шифрование)', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Средство контроля целостности', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
  { name: 'Контроль состава ИС', vendor: '', expiration: '', licenses: '', needed: '', action: '' },
];

const CollectMeansOfProtectionData = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, column, value) => {
    const newRows = [...rows];
    newRows[index][column] = value;
    setRows(newRows);
  };

  const createReport = () => {
    const data = [...rows];
    const recomendationsData = data.filter(elem => +elem.needed <= +elem.licenses).map((elem, index) => ({ number: index + 1, question: elem.name, recomendation: '', note: '' }))
    downloadCsv([], recomendationsData, 'means_of_protection_data.csv').then(data => {
      return true;
    })
  }

  return (
    <div className="csv-table-container full-width-table">
      <div className="csv-table-wrapper">
        <table className="csv-table">
          <thead>
          <tr>
            {headers.map(header => (
              <th>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td><input type="text" value={row.vendor}
                         onChange={(e) => handleChange(index, 'vendor', e.target.value)} /></td>
              <td><input type="text" value={row.expiration}
                         onChange={(e) => handleChange(index, 'expiration', e.target.value)} /></td>
              <td><input type="text" value={row.licenses}
                         onChange={(e) => handleChange(index, 'licenses', e.target.value)} /></td>
              <td><input type="text" value={row.needed}
                         onChange={(e) => handleChange(index, 'needed', e.target.value)} /></td>
              {/*<td>{row.action}</td>*/}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button onClick={() => createReport()}>Сохранить ответ</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CollectMeansOfProtectionData
