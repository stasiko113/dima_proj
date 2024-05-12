const { remote } = window.require('electron');
const fs = remote.require('fs').promises;
const path = remote.require('path');
const os = remote.require('os');


const documentsDir = path.join(os.homedir(), 'Documents');


export const checkIfFileExist = async (filename) => {
  try {
    const filePath = path.join(documentsDir, filename);
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};