import { AlignmentType, TextRun, WidthType } from 'docx'

const { remote } = window.require('electron');
const fs = remote.require('fs').promises;
const path = remote.require('path');
const { toast } = require('react-toastify');
require('react-toastify/dist/ReactToastify.css');
const docx = require('docx');

const os = remote.require('os');


const documentsDir = path.join(os.homedir(), 'Documents');

export const downloadCsv = async (headers, rows, filename) => {
  try {
    const csvContent = rows.map(row => Object.values(row).join("|").replace('\n', '')).join("\n");
    const filePath = path.join(documentsDir, filename);
    await fs.writeFile(filePath, `${csvContent}`, 'utf-8');
    toast.success('Ответ успешно сохранен');
  } catch (err) {
    console.error('Ошибка сохранения ответа:', err);
    toast.error('Ошибка при сохранении ответа');
  }
};

export const createWordFile = async (headers, rows, filename) => {

  const { Document, Packer, Paragraph, Table, TableRow, TableCell } = docx;

  try {
    const document = new Document({creator: 'report', sections: []});

    const recommendationText = new Paragraph({
      children: [
        new TextRun("Вот список рекомендаций исходя из ваших ответов"),
      ],
      alignment: AlignmentType.CENTER, // выравнивание по центру
    });

    recommendationText.width = {
      size: 500, // ширина в тысячных долях дюйма (1/1440 дюйма)
      type: WidthType.DXA, // единицы измерения: DXA (доля дюйма)
    };

    document.addSection({
      properties: {newline: true},
      children: [recommendationText],
    });

    const tableRows = rows.map((row) => {
      const cells = row.split('|').map(value => new TableCell({ children: [new Paragraph(value)] }));
      return new TableRow({ children: cells });
    });

    const table = new Table({
      rows: [
        new TableRow({
          children: headers.map(header => new TableCell({ children: [new Paragraph(header)] }))
        }),
        ...tableRows
      ]
    });

    document.addSection({
      properties: {newline: true},
      children: [table]
    });

    const filePath = path.join(documentsDir, filename);
    const buffer = await Packer.toBuffer(document);
    const uint8Array = new Uint8Array(buffer);
    await fs.writeFile(filePath, uint8Array);
    toast.success('Ответ успешно сохранен в директорию Документы');
  } catch (err) {
    console.error('Ошибка сохранения ответа:', err);
    toast.error('Ошибка при сохранении ответа');
  }

}