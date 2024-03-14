import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { PointService } from 'src/point/point.service';
import { PerformanceService } from 'src/performance/performance.service';
import { Performance } from '../performance/entities/performance.entity';
import { Point } from '../point/entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Performance, Point])],
  providers: [TicketService, PerformanceService, PointService],
  controllers: [TicketController],
})
export class TicketModule {}
