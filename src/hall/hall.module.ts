import { Module } from '@nestjs/common';
import { HallService } from './hall.service';
import { HallController } from './hall.controller';

@Module({
  providers: [HallService],
  controllers: [HallController],
})
export class HallModule {}
