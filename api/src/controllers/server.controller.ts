import { Controller, Get } from '@nestjs/common';
import { Body, Post, Query, Param } from '@nestjs/common/decorators';
import { ServerService } from 'src/services/server.service';
import { ServerDTO, ServerMapper } from 'src/types/server';

@Controller()
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly serverMapper: ServerMapper
  ) {}

  @Post()
  async createServer(@Body() server: ServerDTO): Promise<ServerDTO> {
    return await this.serverService.postServer(
      this.serverMapper.toDomain(server)
    );
  }

  @Get()
  async getServerList(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('order') order: 'asc' | 'desc'
  ): Promise<ServerDTO[]> {
    return await this.serverService.getServerList(take, skip, search, order);
  }

  @Get('/:id')
  async getServer(@Param('id') id: number): Promise<ServerDTO> {
    return await this.serverService.getServer(id);
  }
}
