import * as readline from 'readline';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';

export function download(url:string, directory:string, title:string) {
  let stream = ytdl(url, {
    quality: 'highestaudio'
  });

  console.log('starting download...');
  ffmpeg(stream)
    .audioBitrate(128)
    .save(`${directory}/${title}.mp3`)
    .on('progress', p => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
      console.log('mp3 downloaded');
    })
}