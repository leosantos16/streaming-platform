import { Controller, Get } from '@nestjs/common';
import { Body, Post, Query, Param } from '@nestjs/common/decorators';
import { MediaDTO, MediaMapper } from '../types/media';
import { MediaService } from 'src/services/media.service';

@Controller()
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly mediaMapper: MediaMapper
  ) {}

  @Post()
  async createMedia(@Body() media: MediaDTO): Promise<MediaDTO> {
    return await this.mediaService.postMedia(this.mediaMapper.toDomain(media));
  }

  @Get()
  async getMediaList(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('order') order: 'asc' | 'desc'
  ): Promise<MediaDTO[]> {
    return await this.mediaService.getMediaList(take, skip, search, order);
  }

  @Get('/:id')
  async getMedia(@Param('id') id: number): Promise<MediaDTO> {
    return await this.mediaService.getMedia(id);
  }
}
