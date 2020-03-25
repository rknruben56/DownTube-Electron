import * as youtubedl from 'youtube-dl';

class YoutubeControl {

  /**
   * Gets the title of the video from the URL
   * @param url 
   */
  public async getTitle(url: string): Promise<string> {
    let options = ['--dump-single-json'];
    let info = await this.getVideoInfo(url, options);
    return info ? info.filename : '';
  }

  /**
   * Downloads the YouTube video as an mp3
   * @param url 
   * @param directory 
   * @param title 
   */
  public download(url: string, directory: string, title: string) {
    //youtubedl.exec(url, this.audioOptions, )
  }

  private async getVideoInfo(url: string, options: any): Promise<youtubedl.Info> {
    return new Promise((resolve, reject) => {
      youtubedl.getInfo(url, options, (error: Error, data: youtubedl.Info) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
export const youtubeControl = new YoutubeControl();