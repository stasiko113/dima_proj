// Documents.js
import React from 'react';
import { Link } from 'react-router-dom';
import { PDFViewer } from '../../helpers/openPDF.helper';
import './styles.css'

const Documents = () => {
  const openPDF = (pdfPath) => {
    PDFViewer(pdfPath);
  };

  return (
    <div>
      <h1>Просмотр документов</h1>
      <ul className="document-list">
        <li className="document-item" onClick={() => openPDF('documents/Приказ_Оперативно_аналитичсекого_центра_при_Президенте_Республики.pdf')}>
          <span>Приказ оперативно аналитичсекого центра при Президенте Республики</span>
        </li>
        <li className="document-item" onClick={() => openPDF('documents/Приказ_Оперативно_аналитичсекого_центра_при_Президенте_Республики (1).pdf')}>
          <span>Приказ оперативно аналитичсекого центра при Президенте Республики (1).pdf</span>
        </li>
      </ul>
    </div>
  );
};

export default Documents;
