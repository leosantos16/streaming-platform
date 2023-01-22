import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { FfmpegService } from 'src/services/ffmpeg.service';
import { StreamDTO } from 'src/types/ffmpeg';

@Controller()
export class StreamController {
  constructor(private readonly ffmpegService: FfmpegService) {}

  @Post()
  async createStream(@Body() stream: StreamDTO): Promise<StreamDTO> {
    return await this.ffmpegService.createStream(stream);
  }
}
