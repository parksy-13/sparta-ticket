import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { HallDto } from './dto/hall.dto';

import { HallService } from './hall.service';

@UseGuards(RolesGuard)
@Controller('hall')
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Get()
  async findAll() {
    return await this.hallService.findAll();
  }

  @Get(':hallId')
  async findOne(@Param('hallId') hallId: number) {
    return await this.hallService.findOne(hallId);
  }

  @Roles(Role.seller)
  @Post('build')
  async create(@Body() hallDto: HallDto) {
    return await this.hallService.create(hallDto.hallName);
  }
}
