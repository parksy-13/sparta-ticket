import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Performance } from '../../performance/entities/performance.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @Column({ type: 'int', name: 'userId' })
  userId: number;

  @ManyToOne(() => Performance, (performance) => performance.tickets)
  performance: Performance;

  @Column({ type: 'int', name: 'performanceId' })
  performanceId: number;
}
