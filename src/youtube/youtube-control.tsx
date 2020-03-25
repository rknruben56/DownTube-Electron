import * as youtubedl from 'youtube-dl';

class YoutubeControl {
  
  public async getTitle(url: string): Promise<string> {
    let options = ['--dump-single-json'];
    let info = await this.getVideoInfo(url, options);
    return info.filename;
  }

  public download(url: string, directory: string, title: string) {

  }

  private async getVideoInfo(url: string, options: any): Promise<youtubedl.Info> {
    return new Promise((resolve, reject) => {
      youtubedl.getInfo(url, options, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
export const youtubeControl = new YoutubeControl();