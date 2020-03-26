import * as youtubedl from 'youtube-dl';
import { YtInfo } from './youtubedl-info';

const ffmpegPath = require('ffmpeg-static');
const childProcess = require('child_process');

/**
 * Handles any calls to Youtube via youtube-dl
 */
class YoutubeService {

  /**
   * Gets the title of the video from the URL
   * @param url 
   */
  public async getTitle(url: string): Promise<string> {
    const options = ['-j', '--flat-playlist', '--dump-single-json'];
    const info = await this.getVideoInfo(url, options);
    return info ? info[0].fulltitle : '';
  }

  /**
   * Downloads the YouTube video as an mp3
   * @param url 
   * @param directory 
   * @param title 
   */
  public download(url: string, directory: string, title: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const binaryPath = youtubedl.getYtdlBinary();
      const options = this.getOptions(url, directory, title);
  
      const process = childProcess.spawn(binaryPath, options);
      process.on('close', code => {
        resolve(code);
      });
      process.on('error', err => {
        reject(err);
      });
    });
  }

  private async getVideoInfo(url: string, options: any): Promise<Array<YtInfo>> {
    return new Promise((resolve, reject) => {
      youtubedl.getInfo(url, options, (error: Error, data: Array<YtInfo>) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  private getOptions(url: string, directory: string, title: string): Array<string> {
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
}
export const youtubeService = new YoutubeService();