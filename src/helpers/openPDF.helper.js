import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const PDFViewer = (pdfPath) => {
  ipcRenderer.send('request-user-data-path', pdfPath);
};

ipcRenderer.on('user-data-path', (event, userDataPath, pdfPath) => {
  ipcRenderer.send('open-pdf-file', pdfPath, userDataPath);
});
