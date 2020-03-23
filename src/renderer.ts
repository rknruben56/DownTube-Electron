import { homedir } from 'os';
import { App } from './app';

const defaultDirectory = `${homedir}/Youtube`;
const defaultTitle = 'Download';

// URL input
var urlInput = document.getElementById('url') as HTMLInputElement;

// Title input
var titleInput = document.getElementById('title') as HTMLInputElement;

// Directory input
var directoryInput = document.getElementById('directory') as HTMLInputElement;

// Download button
var downloadButton = document.getElementById('download') as HTMLButtonElement;


downloadButton.onclick = function() {
  let titleValue = titleInput.value || defaultTitle;
  let directoryValue = directoryInput.value || defaultDirectory;

  console.log("starting download");
  const app = new App(urlInput.value, titleValue, directoryValue);
};

