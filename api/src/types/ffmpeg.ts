import { Injectable } from '@nestjs/common';
import { MediaDTO } from './media';
import { ServerDTO } from './server';

export interface FfmpegOptions {
  resolution: string;
  videoCodec: string;
  audioCodec: string;
  subtitleCodec: string;
  streamMap: string;
}

export interface StreamDTO {
  media: MediaDTO;
  server: ServerDTO;
  output: string;
  options: FfmpegOptions;
}

@Injectable()
export class FfmpegMapper {
  toFfmpeg(options: FfmpegOptions) {
    const mapper = {
      resolution: '-s',
      videoCodec: '-c:v',
      audioCodec: '-c:a',
      subtitleCodec: '-c:s',
      streamMap: '-map'
    };
    const cmd = {};
    const keys = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
      cmd[mapper[keys[i]]] = options[keys[i]];
    }
    return cmd;
  }
}
