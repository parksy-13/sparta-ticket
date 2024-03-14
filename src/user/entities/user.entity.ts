import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Point } from 'src/point/entities/point.entity';

import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.customer })
  role: Role;

  @OneToMany(() => Ticket, (ticket) => ticket.userId)
  tickets: Ticket[];

  @OneToMany(() => Point, (point) => point.userId)
  points: Point[];
}
