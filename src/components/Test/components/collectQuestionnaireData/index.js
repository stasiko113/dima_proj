import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { createWordFile, downloadCsv } from '../../../../helpers/downloadCSV.helper'

const headers = ['№', 'Наименование вопроса', 'Закрепление в ЛНПА', 'Наличие практического выполнения', 'Примечание']

const reportHeaders = ['№', 'Наименование вопроса', 'Рекомендация', 'Премичание']


const initialPreferencesRows = [
  { question: 'Есть ли СКУД (класс ИС)', lnpa: '', practical: '', note: '' },
  { question: 'Есть ли документооборот (класс ИС )', lnpa: '', practical: '', note: '' },
  { question: 'Есть ли видеонаблюдение (класс ИС)', lnpa: '', practical: '', note: '' },
  { question: 'Есть ли система пожарной безопасности (класс ИС)', lnpa: '', practical: '', note: '' },
  { question: 'Есть ли система охранной сигнализации (класс ИС)', lnpa: '', practical: '', note: '' },
  { question: 'Перечень ИС (акты отнесения)', lnpa: '', practical: '', note: '' },
  { question: 'Физические границы', lnpa: '', practical: '', note: '' },
  { question: 'Каналы связи (линии сети Интернет)', lnpa: '', practical: '', note: '' },
  { question: 'Логические границы', lnpa: '', practical: '', note: '' },
  {
    question: 'Есть ли сервисы, которые работают по отдельным каналам связи (перечислить) какое шифрование используется (tls, https, криптография и тд.) ',
    lnpa: '',
    practical: '',
    note: ''
  },
  { question: 'Куда передается информация ограниченного распространения', lnpa: '', practical: '', note: '' },
  { question: 'Внешние взаимодействия (какого типа обрабатывается информация)', lnpa: '', practical: '', note: '' },
];

const initialReliabilityRequirementsRows = [
  {
    question: 'Своевременное обновление программных СрЗИ; (актуальные антивирусные базы? на рабочих станциях межсетевых экранах (если используются не лицензированные или попавшие под санкции, то «нет»)). ',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Производится ли мониторинг состояния оборудования и каналов передачи данных; (Zabbix и т.д.)',
    lnpa: false,
    practical: false,
    note: ''
  },
  { question: 'Производится ли использование средств резервного копирования', lnpa: false, practical: false, note: '' },
  {
    question: 'Предварительного обучения пользователей и обслуживающего персонала; проводятся ли повышения квалификации сотрудников (сразу после вступления на должность и в течении работы)',
    lnpa: false,
    practical: false,
    note: ''
  },
]

const initialRequirementsRows = [
  {
    question: 'Серверного и сетевое оборудования (физические сервера, СХД, ОС серверов, маршрутизаторы, коммутаторы, каналы связи); Кто администрирует и обслуживает?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Системы виртуализации (гипервизор, ОС виртуальных серверов, резервирование виртуальных серверов); Кто администрирует и обслуживает?', lnpa: false, practical: false, note: ''
  },
  {
    question: 'СрЗИ (межсетевые экраны, средства канального шифрования, антивирусные средства и т.д.); Кто администрирует и обслуживает?', lnpa: false, practical: false, note: ''
  },
  {
    question: 'Прикладного ПО (СУБД, сервера микросервисов, WEB-сервера, инсталляция ПО); Кто администрирует и обслуживает?', lnpa: false, practical: false, note: ''
  },
  {
    question: 'Системного ПО (администрирование ОС); Кто администрирует и обслуживает?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Внешнего (резервного) хранилища (аутсорс). Кто администрирует и обслуживает?', lnpa: false, practical: false, note: ''
  },
  {
    question: 'Централизованную автоматическую инсталляцию клиентского ПО на рабочих местах пользователей и администраторов; Кем производится?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Централизованное автоматическое обновление вирусных сигнатур на рабочих местах пользователей и администраторов; Кем производится?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Администрирование всех антивирусных продуктов. Кем производится?', lnpa: false, practical: false, note: '',
  },
  {
    question: 'Отчеты по проделанным работам (Антивирусное ПО, по расследованию вредоносного ПО, по событиям ИБ в журналах событий связанных с инцидентами ИБ (пароли, блокирование учетных записей и тд.)',
    lnpa: false,
    practical: false,
    note: ''
  },
];

const initialProtectionPreferencesRows = [
  {
    question: 'Ведется ли журнал, в котором регистрируются события, связанные с изменениями и ремонтом технических средств?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Проводится ли периодическая инвентаризация технических средств ЛВС и СрЗИ?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Инвентарная опись активов проводится с использованием автоматизированных средств?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Реальный состав технических средств и СрЗИ соответствует составу, приведенному в эксплуатационной документации;',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Определен ли и соблюдается порядок безопасного списания или повторного использование оборудования, предусматривающий надежное удаление защищаемой информации с использованием специальных средств и утилит без возможности ее последующего восстановления?',
    lnpa: false,
    practical: false,
    note: ''
  },
];

const initialFunctionPreferencesRows = [
  {
    question: 'Осуществляется ли Отключение или удаление не актуальных учетных записей.',
    lnpa: '',
    practical: '',
    note: ''
  },
  {
    question: 'Задокументирован ли перечень событий ИБ, подлежащих регистрации, задан ли в настройках средств сбора событий? (сертифицированные МЭ, СКЗИ, антивирусное ПО и т.д.).',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Осуществляется ли резервное копирование записей журналов, встроенных в ОС, прикладное ПО, систему управления БД, средства виртуализации, активное сетевое оборудование и СрЗИ, в том числе на носители информации или иные сетевые хранилища?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Выполняется ли оперативный аудит событий ИБ, полученных с помощью журналов, встроенных в ОС, прикладное ПО, систему управления БД, средства виртуализации, активное сетевое оборудование и СрЗИ) в рамках своих должностных обязанностей с установленной периодичностью (чем установлена?).',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Осуществляется ли синхронизации времени (NTP-сервер), который будет выполнять синхронизацию с belgim.by или средствами приемника GPS/GLONASS для всех средств автоматизации?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Имеется ли Перечень ПО, разрешенного к использованию в составе ЛВС и его СЗИ?',
    lnpa: false,
    practical: false,
    note: ''
  },
  {
    question: 'Зафиксирован ли перечень объектов, подлежащих резервному копированию, документально? ',
    lnpa: false,
    practical: false,
    note: ''
  },
];

const CollectQuestionnaireData = () => {
  const [preferencesRows, setPreferencesRows] = useState(initialPreferencesRows);
  const [requirementsRows, setRequirementsRows] = useState(initialRequirementsRows);
  const [preferencesProtectionRows, setProtectionPreferencesRows] = useState(initialProtectionPreferencesRows);
  const [preferencesFunctionsRows, setProtectionFunctionsRows] = useState(initialFunctionPreferencesRows);
  const [reliabilityRequirementsRows, setReliabilityRequirementsRows] = useState(initialReliabilityRequirementsRows);


  const handleChange = (index, column, value, state, setState) => {
    const newRows = [...state];
    newRows[index][column] = value;
    setState(newRows);
  };

  const createReport = () => {
    const data = [...preferencesRows, ...requirementsRows, ...preferencesProtectionRows, ...preferencesFunctionsRows, ...reliabilityRequirementsRows];
    const recomendationsData = data.filter(elem => (!elem.lnpa && !elem.practical) || (!elem.lnpa && elem.practical) || (elem.lnpa && !elem.practical) ).map((elem, index) => ({ number: `${index + 1}`, question: elem.question, recomendation: '', note: elem.note }))
    downloadCsv(reportHeaders, recomendationsData, 'questionnaire_data.csv').then(data => {
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
          <tr>
            <td colSpan="5" className="chapter"><b>Характеристика комплекса информационно-вычислительных систем</b></td>
          </tr>
          {preferencesRows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.question}</td>
              <td><input type="text" value={row.lnpa}
                         onChange={(e) => handleChange(index, 'lnpa', e.target.value, preferencesRows, setPreferencesRows)} />
              </td>
              <td><input type="text" value={row.practical}
                         onChange={(e) => handleChange(index, 'practical', e.target.value, preferencesRows, setPreferencesRows)} />
              </td>
              <td><input type="text" value={row.note}
                         onChange={(e) => handleChange(index, 'note', e.target.value, preferencesRows, setPreferencesRows)} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="chapter"><b>Требования к структуре и функционированию системы защиты
              информации</b></td>
          </tr>
          {initialRequirementsRows.map((row, index) => {
              const i = initialPreferencesRows.length + index + 1
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{row.question}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.lnpa}
                      onChange={(e) => handleChange(index, 'lnpa', e.target.checked, requirementsRows, setRequirementsRows)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.practical}
                      onChange={(e) => handleChange(index, 'practical', e.target.checked, requirementsRows, setRequirementsRows)}
                    />
                  </td>
                  <td><input type="text" value={row.note}
                             onChange={(e) => handleChange(index, 'note', e.target.value, requirementsRows, setRequirementsRows)} />
                  </td>
                </tr>
              )
            }
          )}
          <tr>
            <td colSpan="5" className="chapter"><b>Требования к надежности</b></td>
          </tr>
          {initialReliabilityRequirementsRows.map((row, index) => {
              const i = initialPreferencesRows.length + initialRequirementsRows.length + index + 1
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{row.question}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.lnpa}
                      onChange={(e) => handleChange(index, 'lnpa', e.target.checked, reliabilityRequirementsRows, setReliabilityRequirementsRows)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.practical}
                      onChange={(e) => handleChange(index, 'practical', e.target.checked, reliabilityRequirementsRows, setReliabilityRequirementsRows)}
                    />
                  </td>
                  <td><input type="text" value={row.note}
                             onChange={(e) => handleChange(index, 'note', e.target.value, reliabilityRequirementsRows, setReliabilityRequirementsRows)} />
                  </td>
                </tr>
              )
            }
          )}
          <tr>
            <td colSpan="5" className="chapter"><b>Требования безопасности</b></td>
          </tr>
          {initialProtectionPreferencesRows.map((row, index) => {
              const i = initialPreferencesRows.length + initialReliabilityRequirementsRows.length + initialRequirementsRows.length + index + 1
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{row.question}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.lnpa}
                      onChange={(e) => handleChange(index, 'lnpa', e.target.checked, preferencesProtectionRows, setProtectionPreferencesRows)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.practical}
                      onChange={(e) => handleChange(index, 'practical', e.target.checked, preferencesProtectionRows, setProtectionPreferencesRows)}
                    />
                  </td>
                  <td><input type="text" value={row.note}
                             onChange={(e) => handleChange(index, 'note', e.target.value, preferencesProtectionRows, setProtectionPreferencesRows)} />
                  </td>
                </tr>
              )
            }
          )}
          <tr>
            <td colSpan="5" className="chapter"><b>Требования к функциям (задачам), выполняемым системой защиты
              информации</b></td>
          </tr>
          {initialFunctionPreferencesRows.map((row, index) => {
              const i = initialPreferencesRows.length + initialReliabilityRequirementsRows.length + initialRequirementsRows.length + initialProtectionPreferencesRows.length + index + 1
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{row.question}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.lnpa}
                      onChange={(e) => handleChange(index, 'lnpa', e.target.checked, preferencesFunctionsRows, setProtectionFunctionsRows)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.practical}
                      onChange={(e) => handleChange(index, 'practical', e.target.checked, preferencesFunctionsRows, setProtectionFunctionsRows)}
                    />
                  </td>
                  <td><input type="text" value={row.note}
                             onChange={(e) => handleChange(index, 'note', e.target.value, preferencesFunctionsRows, setProtectionFunctionsRows)} />
                  </td>
                </tr>
              )
            }
          )}
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

export default CollectQuestionnaireData;
