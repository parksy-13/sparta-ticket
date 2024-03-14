import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity({
  name: 'points',
})
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @ManyToOne(() => User, (user) => user.points)
  user: User;

  @Column({ type: 'int', name: 'userId' })
  userId: number;

  @Column({ type: 'int', name: 'point', default: 1000000 })
  point: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.points)
  ticket?: Ticket;

  @Column({ type: 'varchar', name: 'paymentHistory' })
  paymentHistory?: string;

  @Column({ type: 'timestamp', name: 'payAt' })
  payAt?: Timestamp;
}
