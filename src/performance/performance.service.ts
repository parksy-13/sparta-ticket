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
    private readonly performanceRepository: Repository<Performance>,
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
    const performance = await this.performanceRepository.findOneBy({
      performanceId,
    });
    return performance.price;
  }

  async create(file: Express.Multer.File) {
    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('CSV 파일만 업로드 가능합니다.');
    }

    const csvContent = file.buffer.toString();

    let parseResult;
    try {
      parseResult = parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {
      throw new BadRequestException('CSV 파싱에 실패했습니다.');
    }

    const performancesData = parseResult.data as any[];

    for (const performanceData of performancesData) {
      if (
        _.isNil(performanceData.name) ||
        _.isNil(performanceData.description) ||
        _.isNil(performanceData.price) ||
        _.isNil(performanceData.startDate) ||
        _.isNil(performanceData.endDate) ||
        _.isNil(performanceData.hallId)
      ) {
        throw new BadRequestException(
          'CSV 파일은 title과 description 컬럼을 포함해야 합니다.',
        );
      }

      const intStartDate = parseInt(performanceData.startDate);
      const intEndDate = parseInt(performanceData.endDate);
      if (intStartDate > intEndDate) {
        throw new BadRequestException(
          '공연이 시작하는 날짜는 공연이 끝나는 날짜보다 빨라야 합니다.',
        );
      }
    }

    const createPerformanceDtos = performancesData.map((performanceData) => ({
      name: performanceData.name,
      description: performanceData.description,
      price: performanceData.price,
      startDate: performanceData.startDate,
      endDate: performanceData.endDate,
      hallId: performanceData.hallId,
    }));

    await this.performanceRepository.save(createPerformanceDtos);
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
