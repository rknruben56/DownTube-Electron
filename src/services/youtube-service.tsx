import * as youtubedl from 'youtube-dl';
import { YtInfo } from './youtubedl-info';

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
  public download(url: string, directory: string, title: string) {
    let binaryPath = youtubedl.getYtdlBinary();
    let ls = spawn(binaryPath, this.getOptions(url, directory, title));

    ls.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });
    ls.stderr.on('data', data => {
      console.log(`error ${data}`);
    });
    ls.on('close', code => {
      if (code == 0) {
        console.log('download complete');
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