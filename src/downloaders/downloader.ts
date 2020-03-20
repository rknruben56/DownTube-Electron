export interface Downloader {

  /**
   * Downloads the stream from the URL into the specified directory and name
   * @param url 
   * @param directory 
   * @param title 
   */
  download(url: string, directory: string, title: string): void;

}