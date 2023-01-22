import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MediaController } from './controllers/media.controller';
import { StreamController } from './controllers/stream.controller';
import { ServerController } from './controllers/server.controller';
import { MediaService } from './services/media.service';
import { FfmpegService } from './services/ffmpeg.service';
import { ServerService } from './services/server.service';
import { FfmpegMapper } from './types/ffmpeg';
import { MediaMapper } from './types/media';
import { ServerMapper } from './types/server';
import { UserMapper } from './types/user';

@Module({
  imports: [],
  controllers: [
    UserController,
    MediaController,
    StreamController,
    ServerController
  ],
  providers: [
    UserService,
    MediaService,
    FfmpegService,
    ServerService,
    FfmpegMapper,
    MediaMapper,
    ServerMapper,
    UserMapper
  ]
})
export class AppModule {}
