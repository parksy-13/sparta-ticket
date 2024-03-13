import _ from 'lodash';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketsByUserId(userId: number) {
    return await this.ticketRepository.findBy({
      userId,
    });
  }

  async createTicket(userId: number, performanceId: number) {
    await this.ticketRepository.save({
      userId,
      performanceId,
    });
  }
}
