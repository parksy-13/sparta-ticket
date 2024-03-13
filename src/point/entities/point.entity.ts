import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Performance } from '../../performance/entities/performance.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => Performance, (performance) => performance.tickets)
  performance: Performance;

  @Column({ type: 'int', name: 'performanceId' })
  performanceId: number;
}
