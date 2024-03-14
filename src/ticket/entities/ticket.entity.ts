import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Performance } from '../../performance/entities/performance.entity';
import { User } from '../../user/entities/user.entity';
import { Point } from '../../point/entities/point.entity';

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

  @Column({ type: 'int', name: 'performanceId' })
  performanceId: number;

  @ManyToOne(() => Performance, (performance) => performance.tickets)
  performance: Performance;

  @Column({ type: 'int', name: 'price' })
  price: number;

  @OneToMany(() => Point, (point) => point.userId)
  points: Point[];
}
