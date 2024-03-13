import { Performance } from 'src/performance/entities/performance.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'halls',
})
export class Hall {
  @PrimaryGeneratedColumn()
  hallId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  hallName: string;

  @OneToMany(() => Performance, (performance) => performance.performanceId)
  performances: Performance[];
}
