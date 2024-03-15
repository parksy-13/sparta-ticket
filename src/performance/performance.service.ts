import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Performance } from './entities/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
  ) {}

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['performanceId', 'title'],
    });
  }

  async findOne(performanceId: number) {
    return await this.verifyPerformanceById(performanceId);
  }

  async findPriceByPerformanceId(performanceId: number) {
    const performance = await this.verifyPerformanceById(performanceId);

    return performance.price;
  }

  async search(title: string) {
    const performanceTitles = await this.performanceRepository.find({
      select: { title: true },
    });

    const performances = [];
    performanceTitles.map((performanceTitle) => {
      if (performanceTitle.title.includes(title)) {
        performances.push(performanceTitle);
      }
    });

    return performances;
  }

  async create(
    title: string,
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    hall: string,
  ) {
    if (price > 50000) {
      throw new BadRequestException(
        '1석의 가격을 5만 포인트를 이하로 설정하세요.',
      );
    }

    const intStartDate = parseInt(startDate);
    const intEndDate = parseInt(endDate);
    if (intStartDate > intEndDate) {
      throw new BadRequestException(
        '공연이 시작하는 날짜는 공연이 끝나는 날짜보다 빨라야 합니다.',
      );
    }
    await this.performanceRepository.save({
      title,
      description,
      price,
      startDate,
      endDate,
      hall,
    });
  }

  private async verifyPerformanceById(performanceId: number) {
    const performance = await this.performanceRepository.findOneBy({
      performanceId,
    });
    if (_.isNil(performance)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }
}
