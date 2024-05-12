import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { downloadCsv } from '../../../../helpers/downloadCSV.helper';

const headers = ['№', 'Вопросы, подлежащие проверке', 'Основание (норма)', 'Закрепление в ЛНПА', 'Вид, дата, регистрационный номер документа', 'Наличие практического выполнения']

const initialOrderOneRows = [
  {
    number: '1.1',
    question: 'Наличие подразделения защиты информации или иного подразделения (должностного лица), ответственным за обеспечение защиты информации',
    grounds: 'п. 4',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.2',
    question: 'Работники такого подразделения (должностное лицо) должны иметь высшее образование в области защиты информации либо высшее или профессионально-техническое образование и пройти переподготовку или повышение квалификации по вопросам технической и криптографической защиты информации в порядке, установленном законодательством',
    grounds: 'п. 4',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.3',
    question: 'Наличие технического задания (далее – ТЗ) на создание информационной системы (далее – ИС), включающего перечень работ по проектированию и созданию системы защиты информации (далее – СЗИ), или ТЗ на создание СЗИ.',
    grounds: 'п. 6',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.3.1',
    question: 'Определено ли в ТЗ наименование ИС с указанием присвоенного ей класса типовых ИС',
    grounds: 'п. 10',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.3.2',
    question: 'Определены ли в ТЗ требования к системе защиты информации (далее - СЗИ)',
    grounds: 'п. 10',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.3.3',
    question: 'Имеются ли в ТЗ сведения об организации взаимодействия (при его наличии) с иными ИС ',
    grounds: 'п. 10',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.3.4',
    question: 'Определены ли в ТЗ требования к средствам криптографической защиты информации (далее – СКЗИ)',
    grounds: 'п. 10',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.4',
    question: 'Проведено ли категорирование информации, которая будет обрабатываться в ИС',
    grounds: 'п. 7',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.5',
    question: 'Наличие акта отнесения ИС к классу типовых ИС',
    grounds: 'п. 7',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.6',
    question: 'Наличие политики информационной безопасности (далее – ИБ) организации',
    grounds: 'п. 8',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.6.1',
    question: 'Определены ли в политике ИБ цели и принципы защиты информации',
    grounds: 'п. 9',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.6.2',
    question: 'Определены ли в политике ИБ перечень ИС, с указанием  их классов и подразделения защиты информации.',
    grounds: 'п. 9',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.6.3',
    question: 'Определены ли в политике ИБ обязанности пользователей ИС',
    grounds: 'п. 9',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.6.4',
    question: 'Определен ли в политике ИБ порядок взаимодействия с иными ИС',
    grounds: 'п. 9',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7',
    question: 'Наличие общей схемы СЗИ',
    grounds: 'п. 8',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7.1',
    question: 'Наличие на общей схеме СЗИ наименования ИС',
    grounds: 'п. 11',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7.2',
    question: 'Наличие на общей схеме СЗИ класс типовых ИС',
    grounds: 'п. 11',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7.3',
    question: 'Определение на общей схеме СЗИ физических границ ИС',
    grounds: 'п. 11',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7.4',
    question: 'Отражение на общей схеме СЗИ внешних и внутренних информационных потоков ',
    grounds: 'п. 11',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.7.5',
    question: 'Отражение на общей  схеме СЗИ протоколов обмена защищаемой информацией',
    grounds: 'п. 11',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8',
    question: 'Наличие документации на СЗИ',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.1',
    question: 'Способ разграничения доступа пользователей к объектам ИС',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.2',
    question: 'Порядок резервирования и уничтожения информации',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.3',
    question: 'Порядок защиты от вредоносного программного обеспечения',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.4',
    question: 'Порядок использования съемных носителей информации',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.5',
    question: 'Порядок использования электронной почты',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.6',
    question: 'Порядок обновления средств защиты информации',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.7',
    question: 'Порядок осуществления контроля (мониторинга) за функционированием ИС и СЗИ',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.8',
    question: 'Порядок реагирования на события ИБ и ликвидации их последствий',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.8.9',
    question: 'Порядок Порядок управления криптографическими ключами, в том числе требования по их генерации, распределению, хранению, доступу к ним и их уничтожению',
    grounds: 'п. 17',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.9',
    question: 'Доведены ли организационные меры по защите информации до сведения пользователей ИС под роспись',
    grounds: 'п. 1.19',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.10',
    question: 'Осуществляется ли контроль за соблюдением требований, установленных в нормативных правовых актах, документации на СЗИ',
    grounds: 'п. 20',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.11',
    grounds: 'п. 20',
    question: 'Осуществляется ли контроль за порядком использования объектов ИС',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.12',
    grounds: 'п. 20',
    question: 'Осуществляется ли мониторинг функционирования СЗИ',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.13',
    grounds: 'п. 20',
    question: 'Осуществляется ли выявление угроз (анализ журналов аудита), которые могут привести к сбоям, нарушению функционирования ИС',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.14',
    question: 'Осуществляется ли резервное копирование информации, содержащейся в ИС',
    grounds: 'п. 20',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '1.15',
    question: 'Проводится ли обучение (повышение квалификации) пользователей ИС',
    grounds: 'п. 20',
    pinning: false,
    regNumber: '',
    execution: false
  },
]

const initialOrderSecondRows = [
  {
    number: '2.1',
    question: 'Наличие копий сертификатов соответствия либо экспертных заключений на средства защиты информации',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.2',
    question: 'Наличие программы и методики аттестации ИС',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.3',
    question: 'Правильность отнесения ИС к классу типовых ИС, выбора и применения средств защиты информации',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.4',
    question: 'Наличие протокола испытаний СЗИ на предмет выполнения установленных законодательством требований по защите информации',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.5',
    question: 'Документальное подтверждение проведения внешней и внутренней проверки отсутствия либо невозможности использования нарушителем свойств программных, программно-аппаратных и аппаратных средств',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.6',
    question: 'Наличие технического отчета ',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.7',
    question: 'Наличие аттестата соответствия СЗИ',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '2.8',
    question: 'Введение ИС с аттестованной СЗИ в эксплуатацию ',
    grounds: '',
    pinning: false,
    regNumber: '',
    execution: false
  },
]

const initialOrderThirdRows = [
  {
    number: '3.1',
    question: 'Представлены ли сведения в ОАЦ',
    grounds: 'п. 4',
    pinning: false,
    regNumber: '',
    execution: false
  },
]

const initialOrderForthRows = [
  {
    number: '4.1',
    question: 'Выполнены ли требования к СЗИ, определенные  в ТЗ, а также с учетом ограничений, указанных в сертификатах соответствия.',
    grounds: 'п. 10, п. 16',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '4.2',
    question: 'Применение средств криптографической защиты информации в порядке определенном в ТЗ',
    grounds: 'п. 10',
    pinning: false,
    regNumber: '',
    execution: false
  },
  {
    number: '4.3',
    question: 'Осуществлена ли смена реквизитов доступа к функциям управления и настройкам, установленным по умолчанию, либо блокировка учетных записей, не предусматривающих смену указанных реквизитов',
    grounds: 'п. 16',
    pinning: false,
    regNumber: '',
    execution: false
  },
]

const CollectComplianceOrdersData = () => {
  const [orderOneRows, setOrderOneRows] = useState(initialOrderOneRows);
  const [orderSecondRows, setOrderSecondRows] = useState(initialOrderSecondRows);
  const [orderThirdRows, setOrderThirdRows] = useState(initialOrderThirdRows);
  const [orderForthRows, setOrderForthRows] = useState(initialOrderForthRows);


  const handleChange = (index, column, value, state, setState) => {
    const newRows = [...state];
    newRows[index][column] = value;
    setState(newRows);
  };

  const createReport = () => {
    const data = [...orderOneRows, ...orderSecondRows, ...orderThirdRows, ...orderForthRows];
    const recomendationsData = data.filter(elem => (!elem.pinning && !elem.execution) || (!elem.pinning && elem.execution) || (elem.pinning && !elem.execution) ).map((elem, index) => ({ number: elem.number, question: elem.question, recomendation: '', note: elem.grounds }))
    downloadCsv([], recomendationsData, 'compliance_data.csv').then(data => {
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
            <td colSpan="1" className="chapter"><b>I</b></td>
            <td colSpan="5" className="chapter"><b>Организационные мероприятия</b></td>
          </tr>
          <tr>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Приказ № 66 от 20 февраля 2020
              г.</b></h5></td>
          </tr>
          <tr>
            <td colSpan="1" className="chapter"><b>1</b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Положение о порядке технической и
              криптографической защиты информации
              в информационных системах, предназначенных для обработки информации, распространение и (или)
              предоставление которой ограничено
            </b></h5></td>
          </tr>
          {orderOneRows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>{row.question}</td>
              <td>{row.grounds}</td>
              <td><input type="checkbox" value={row.pinning}
                         onChange={(e) => handleChange(index, 'practical', e.target.value, orderOneRows, setOrderOneRows)} />
              </td>
              <td><input type="text" value={row.regNumber}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderOneRows, setOrderOneRows)} />
              </td>
              <td><input type="checkbox" value={row.execution}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderOneRows, setOrderOneRows)} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="1" className="chapter"><b>2</b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Положение о порядке аттестации
              систем защиты информации информационных систем, предназначенных для обработки информации, распространение
              и (или) предоставление которой ограничено</b></h5></td>
          </tr>
          {orderSecondRows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>{row.question}</td>
              <td>{row.grounds}</td>
              <td><input type="checkbox" value={row.pinning}
                         onChange={(e) => handleChange(index, 'practical', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="text" value={row.regNumber}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="checkbox" value={row.execution}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="1" className="chapter"><b>3</b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Положение о порядке представления
              в Оперативно-аналитический центр при Президенте Республики Беларусь сведений о событиях информационной
              безопасности, состоянии технической и криптографической защиты информации</b></h5></td>
          </tr>
          {orderThirdRows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>{row.question}</td>
              <td>{row.grounds}</td>
              <td><input type="checkbox" value={row.pinning}
                         onChange={(e) => handleChange(index, 'practical', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="text" value={row.regNumber}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="checkbox" value={row.execution}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="1" className="chapter"><b>II</b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Технические мероприяти</b></h5>
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="chapter"><b></b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Приказ № 66 от 20 февраля 2020
              г.</b></h5></td>
          </tr>
          <tr>
            <td colSpan="1" className="chapter"><b>4</b></td>
            <td colSpan="6" className="chapter"><h5 style={{ textAlign: 'center' }}><b>Положение о порядке технической и
              криптографической защиты информации в информационных системах, предназначенных для обработки информации,
              распространение и (или) предоставление которой ограничено</b></h5></td>
          </tr>
          {orderForthRows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>{row.question}</td>
              <td>{row.grounds}</td>
              <td><input type="checkbox" value={row.pinning}
                         onChange={(e) => handleChange(index, 'practical', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="text" value={row.regNumber}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
              <td><input type="checkbox" value={row.execution}
                         onChange={(e) => handleChange(index, 'note', e.target.value, orderSecondRows, setOrderSecondRows)} />
              </td>
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

export default CollectComplianceOrdersData;
