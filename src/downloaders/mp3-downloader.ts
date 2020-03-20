import readline = require('readline');
import ytdl = require('ytdl-core');
import ffmpeg = require('fluent-ffmpeg');
import { Downloader } from './downloader';

export class Mp3Downloader implements Downloader {

  /**
   * Saves an mp3 version of the video to the specified directory
   * @param url 
   * @param directory 
   * @param title 
   */
  download(url:string, directory:string, title:string) {
    let stream = ytdl(url, {
      quality: 'highestaudio'
    });

     console.log("starting download...");
     ffmpeg(stream)
       .audioBitrate(128)
       .save(`${directory}/${title}.mp3`)
       .on('progress', p => {
         readline.cursorTo(process.stdout, 0);
         process.stdout.write(`${p.targetSize}kb downloaded`);
       })
       .on('end', () => {
        console.log("mp3 downloaded.");
       });
  }
}