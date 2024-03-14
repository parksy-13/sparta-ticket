import { Controller, Get, Param, Post } from '@nestjs/common';

import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get(':userId')
  async getPoint(@Param('userId') userId: number) {
    return await this.pointService.getPointByUserId(userId);
  }

  @Post(':userId')
  async register(@Param('userId') userId: number) {
    return await this.pointService.registerPoint(userId);
  }
}
