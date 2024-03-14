import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
  ) {}

  async getPointByUserId(userId: number) {
    return await this.pointRepository.findBy({
      userId,
    });
  }

  async createPointHistory(
    userId: number,
    performanceId: number,
    price: number,
  ) {
    const point = await this.pointRepository.find({
      where: {
        userId,
      },
      select: {
        point: true,
      },
      order: { payAt: 'desc' },
      take: 1,
    });

    const resultPoint = +point - price;
    await this.pointRepository.save({
      userId,
      point: resultPoint,
      payAt: +new Date(),
      paymentHistory: `${performanceId} 공연 결제`,
    });
  }

  async registerPoint(userId: number) {
    await this.pointRepository.save({
      userId,
    });
  }
}
