import { User } from 'src/user/entities/user.entity';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TicketDto } from './dto/ticket.dto';
import { UserInfo } from '../utils/userInfo.decorator';
import { TicketService } from './ticket.service';
import { PerformanceService } from '../performance/performance.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly performanceService: PerformanceService,
  ) {}

  @Get(':userId')
  async getAllTickets(@Param('userId') userId: number) {
    return await this.ticketService.getTicketsByUserId(userId);
  }

  @Post(':ticketId')
  async createTicket(@UserInfo() user: User, @Body() ticketDto: TicketDto) {
    const performanceId = ticketDto.performanceId;
    const price =
      await this.performanceService.findPriceByPerformanceId(performanceId);
    await this.ticketService.createTicket(user.userId, performanceId, price);
  }
}
