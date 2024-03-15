import { User } from 'src/user/entities/user.entity';

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TicketDto } from './dto/ticket.dto';
import { UserInfo } from '../utils/userInfo.decorator';
import { TicketService } from './ticket.service';
import { PerformanceService } from '../performance/performance.service';
import { PointService } from '../point/point.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly performanceService: PerformanceService,
    private readonly pointService: PointService,
  ) {}

  @Get(':userId')
  async getAllTickets(@Param('userId') userId: number) {
    return await this.ticketService.getTicketsByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':ticketId')
  async createTicket(@UserInfo() user: User, @Body() ticketDto: TicketDto) {
    const performanceId = ticketDto.performanceId;
    const price =
      await this.performanceService.findPriceByPerformanceId(performanceId);
    await this.ticketService.createTicket(user.userId, performanceId, price);
    await this.pointService.createPointHistory(
      user.userId,
      performanceId,
      price,
    );
  }
}
