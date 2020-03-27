import { chunksToLinesAsync } from '@rauschma/stringio';
const ffmpegPath = require('ffmpeg-static');
const childProcess = require('child_process');

const ytdlBinary = require('../youtube-dl/lib/get-binary')();

/**
 * Handles any calls to Youtube via youtube-dl
 */
class YoutubeService {

  /**
   * Gets the title of the video from the URL
   * @param url 
   */
  public getTitle(url: string): Promise<string> {
    const process = childProcess.spawn(ytdlBinary, [url, '--get-title']);
    return this.getTitleFromProcess(process.stdout);
  }

  /**
   * Downloads the YouTube video as an mp3
   * @param url 
   * @param directory 
   * @param title 
   */
  public download(url: string, directory: string, title: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = this.getDownloadOptions(url, directory, title);
  
      const process = childProcess.spawn(ytdlBinary, options);
      process.on('close', code => {
        resolve(code);
      });
      process.on('error', err => {
        reject(err);
      });
    });
  }

  private getDownloadOptions(url: string, directory: string, title: string): Array<string> {
    let options: Array<string> = [];

    // add url
    options.push(url);

    // set ffmpeg path
    options.push('--ffmpeg-location', ffmpegPath);

    // set to download audio
    options.push('-f', 'bestaudio');

    // set download location
    let downloadLocation = `${directory}/${title}.mp3`;
    options.push('-o', downloadLocation);

    return options;
  }

  private async getTitleFromProcess(processOutput): Promise<string> {
    for await (const line of chunksToLinesAsync(processOutput)) {
      if (line) {
        return line;
      }
    }
    return '';
  }
}
export const youtubeService = new YoutubeService();