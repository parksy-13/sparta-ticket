import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  startDate: string;

  @Column({ type: 'varchar', nullable: false })
  endDate: string;

  @Column({ type: 'varchar', name: 'hall' })
  hall: string;

  @OneToMany(() => Ticket, (ticket) => ticket.performanceId)
  tickets: Ticket[];
}
