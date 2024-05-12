import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { checkIfFileExist } from '../../helpers/checkFileExist.helper'
import { readFile } from '../../helpers/readFile.helper'
import { createWordFile } from '../../helpers/downloadCSV.helper'

const Report = () => {

  const [informationExist, setInformationExist] = useState(false)
  const [meansOfProtectionExist, setMeansOfProtectionExist] = useState(false)
  const [questionnaireExist, setMeansQuestionnaireExist] = useState(false)
  const [complianceOrdersExist, setComplianceOrdersExist] = useState(false)
  const [allExists, setAllExists] = useState(false)
  const [problemsReport, setProblemsReport] = useState('')


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


  useEffect(() => {
    if (informationExist && meansOfProtectionExist && questionnaireExist && complianceOrdersExist) {
      setAllExists(true)
    }
  }, [informationExist, meansOfProtectionExist, questionnaireExist, complianceOrdersExist])


  const generateReport = async () => {
    if (!allExists) {
      toast.error('Вы прошли не все тесты')
      return;
    }

    let report = '';

    try {
      const questionnaireData = await readFile('questionnaire_data.csv');
      report += `${questionnaireData}\n`;

      const meansOfProtectionData = await readFile('means_of_protection_data.csv');
      report += `${meansOfProtectionData}\n`;

      const complianceData = await readFile('compliance_data.csv');
      report += `${complianceData}\n`;

      // const informationData = await readFile('information_data.csv');
      // report += `${informationData}\n`;

      setProblemsReport(report);
      createWordFile(['№', 'Наименование вопроса', 'Рекомендация', 'Примечание'], report.split('\n'), 'report.docx').then(result => {
        console.log(result); // You might want to handle the result accordingly
      });
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }


  return (
    <div>
      <h1>Формирование отчета</h1>
      <ul className="test-menu">
        <li className="test-menu-item" onClick={() => generateReport()}>
          <span>Сформировать отчет</span>
        </li>
      </ul>
      <ToastContainer/>
    </div>
  );
}

export default Report;