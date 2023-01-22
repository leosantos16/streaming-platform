import { Injectable } from '@nestjs/common';
import { FfmpegMapper, StreamDTO } from '../types/ffmpeg';
import { NodeSSH } from 'node-ssh';

@Injectable()
export class FfmpegService {
  private ssh = new NodeSSH();
  private ffmpegMapper = new FfmpegMapper();

  async createStream(stream: StreamDTO): Promise<StreamDTO> {
    const server = stream.server;

    if (!this.ssh.isConnected) {
      this.ssh.connect({
        host: server.address,
        username: server.user,
        password: server.pass
      });
    }

    const input = stream.media;
    const output = stream.output;
    const config = Object.entries(
      this.ffmpegMapper.toFfmpeg(stream.options)
    ).reduce((prev, curr) => `${prev} ${curr[0]} ${curr[1]}`, '');

    const command = `nohup ${server.path} -i ${input} ${config} ${output} >/dev/null 2>&1`;

    await this.ssh.execCommand(command);

    return stream;
  }
}
