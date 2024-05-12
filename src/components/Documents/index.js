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
        <li className="document-item" onClick={() => openPDF('documents/66 Приказ.pdf')}>
          <span>66 приказ</span>
        </li>
        <li className="document-item" onClick={() => openPDF('documents/2023 - 130 Приказ ОАЦ 10 страничка.pdf')}>
          <span>2023 - 130 Приказ ОАЦ 10 страничка</span>
        </li>
      </ul>
    </div>
  );
};

export default Documents;
