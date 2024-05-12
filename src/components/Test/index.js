import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { checkIfFileExist } from '../../helpers/checkFileExist.helper'

const Test = () => {
  const [informationExist, setInformationExist] = useState(false)
  const [meansOfProtectionExist, setMeansOfProtectionExist] = useState(false)
  const [questionnaireExist, setMeansQuestionnaireExist] = useState(false)
  const [complianceOrdersExist, setComplianceOrdersExist] = useState(false)
  checkIfFileExist('information_data.csv').then((exists) => {
    if (exists) {
      setInformationExist(true)
    }
  })
  checkIfFileExist('means_of_protection_data.csv').then((exists) => {
    if (exists) {
      setMeansOfProtectionExist(true)
    }
  })
  checkIfFileExist('questionnaire_data.csv').then((exists) => {
    if (exists) {
      setMeansQuestionnaireExist(true)
    }
  })
  checkIfFileExist('compliance_data.csv').then((exists) => {
    if (exists) {
      setComplianceOrdersExist(true)
    }
  })
  return (
    <div>
      <h1>Прохождение тестирования</h1>
      <ul className="test-menu">
        <Link to="/test/collect-information-data">
          <li className="test-menu-item">
            <span>Сбор данных по ИС</span>
            {informationExist && <span className="checkmark">&#10004;</span>}
          </li>
        </Link>
        <Link to="/test/collect-means-of-protection-data">
          <li className="test-menu-item">
            <span>Сбор данных о СЗИ</span>
            {meansOfProtectionExist && <span className="checkmark">&#10004;</span>}
          </li>
        </Link>
        <Link to="/test/collect-questionnaire-data">
          <li className="test-menu-item">
            <span>Опросник</span>
            {questionnaireExist && <span className="checkmark">&#10004;</span>}
          </li>
        </Link>
        <Link to="/test/collect-compliance-orders-data">
          <li className="test-menu-item">
            <span>Чек лист аудита соответствия приказам</span>
            {complianceOrdersExist && <span className="checkmark">&#10004;</span>}
          </li>
        </Link>
        {/*<Link to="/test/collect-requirements-data">*/}
        {/*  <li className="test-menu-item">*/}
        {/*    <span>Перечень требований к системе защиты информации, подлежащих включению в техническое задание</span>*/}
        {/*  </li>*/}
        {/*</Link>*/}
    </ul>
    </div>
  );
};

export default Test;