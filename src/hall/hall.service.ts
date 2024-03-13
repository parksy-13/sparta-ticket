import _ from 'lodash';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Hall } from './entities/hall.entity';

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(Hall)
    private readonly HallRepository: Repository<Hall>,
  ) {}

  async findAll(): Promise<Hall[]> {
    return await this.HallRepository.find({
      select: ['hallId', 'hallName'],
    });
  }

  async findOne(hallId: number) {
    return await this.verifyTeamById(hallId);
  }

  async create(hallName: string) {
    await this.HallRepository.save({
      hallName,
    });

    return `${hallName} 공연장 생성이 완료되었습니다.`;
  }

  private async verifyTeamById(hallId: number) {
    const hall = await this.HallRepository.findOneBy({ hallId });
    if (_.isNil(hall)) {
      throw new NotFoundException('존재하지 않는 공연장입니다.');
    }

    return hall;
  }
}
