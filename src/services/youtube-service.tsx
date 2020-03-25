import * as youtubedl from 'youtube-dl';
import { YtInfo } from './youtubedl-info';
import { DownloadParams } from './download-params';

const ffmpegPath = require('ffmpeg-static');
const spawn = require('child_process').spawn;

/**
 * Handles any calls to Youtube via youtube-dl
 */
class YoutubeService {

  /**
   * Gets the title of the video from the URL
   * @param url 
   */
  public async getTitle(url: string): Promise<string> {
    let options = ['-j', '--flat-playlist', '--dump-single-json'];
    let info = await this.getVideoInfo(url, options);
    return info ? info[0].fulltitle : '';
  }

  /**
   * Downloads the YouTube video as an mp3
   * @param url 
   * @param directory 
   * @param title 
   */
  public download(downloadParams: DownloadParams) {
    let binaryPath = youtubedl.getYtdlBinary();
    let options = this.getOptions(downloadParams.url, downloadParams.directory, downloadParams.title);
    let ls = spawn(binaryPath, options);

    ls.stderr.on('data', data => {
      downloadParams.onError(data);
    });
    ls.on('close', code => {
      if (code == 0) {
        downloadParams.onComplete();
      }
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