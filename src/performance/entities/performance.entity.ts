import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @JoinColumn({ name: 'performanceId' })
  hallId: HallId;

  @OneToMany(() => Ticket, (ticket) => tickets.performanceId)
  tickets: Ticket[];
}
