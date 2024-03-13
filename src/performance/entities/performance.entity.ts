import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Hall } from 'src/hall/entities/hall.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  performanceId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'number', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  startDate: string;

  @Column({ type: 'varchar', nullable: false })
  endDate: string;

  @ManyToOne(() => Hall, (hall) => hall.performances)
  hall: Hall;

  @Column({ type: 'int', name: 'hallId' })
  hallId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.performanceId)
  tickets: Ticket[];
}
