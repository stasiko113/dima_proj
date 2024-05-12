import { toast } from 'react-toastify'

const { remote } = window.require('electron');
const fs = remote.require('fs').promises;
const path = remote.require('path');
require('react-toastify/dist/ReactToastify.css');
const os = remote.require('os');


const documentsDir = path.join(os.homedir(), 'Documents');

export const readFile = async (filename) => {
  try {
    const filePath = path.join(documentsDir, filename);
    return await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
    toast.error('Ошибка при чтении файла');
    throw err; // перенаправляем ошибку дальше для обработки
  }
};
