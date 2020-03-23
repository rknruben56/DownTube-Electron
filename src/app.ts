import { Mp3Downloader } from "./downloaders/mp3-downloader";

export class App {
  isYtRegEx = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  url: string;
  title: string;
  directory: string;

  constructor(url: string, title: string, directory: string) {
    this.url = url;
    this.title = title;
    this.directory = directory;
  }

  startDownload() {
    let downLoader = new Mp3Downloader();
    let isYtUrl = this.isYtRegEx.test(this.url);

    if (isYtUrl) {
      downLoader.download(this.url, this.directory, this.title);
    } else {
      console.log("invalid YouTube URL");
    }
  }
}