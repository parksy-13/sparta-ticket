import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { CreatePerformanceDto } from './dto/create-performance.dto';

import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PerformanceService } from './performance.service';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  async findAll() {
    return await this.performanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.performanceService.findOne(id);
  }

  @Get('search')
  async search(@Body('title') title: string) {
    return await this.performanceService.search(title);
  }

  @Roles(Role.seller)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() creaetPerformanceDTO: CreatePerformanceDto) {
    await this.performanceService.create(
      creaetPerformanceDTO.title,
      creaetPerformanceDTO.description,
      creaetPerformanceDTO.price,
      creaetPerformanceDTO.startDate,
      creaetPerformanceDTO.endDate,
      creaetPerformanceDTO.hall,
    );
  }
}
