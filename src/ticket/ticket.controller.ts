import { User } from 'src/user/entities/user.entity';

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TicketDto } from './dto/ticket.dto';
import { UserInfo } from '../utils/userInfo.decorator';
import { TicketService } from './ticket.service';

@UseGuards(AuthGuard('jwt'))
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':userId')
  async getAllTickets(@Param('userId') userId: number) {
    return await this.ticketService.getTicketsByTicketId(userId);
  }

  @Post(':ticketId')
  async createTicket(@UserInfo() user: User, @Body() ticketDto: TicketDto) {
    const performanceId = ticketDto.performanceId;
    await this.ticketService.createTicket(user.userId, performanceId);
  }
}
