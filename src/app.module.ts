import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Ticket } from './support-message/entities/support-message.entity';
import { TicketModule } from './support-message/support-message.module';
import { Performance } from './team/entities/team.entity';
import { PerformanceModule } from './team/team.module';
import { Hall } from './team/entities/team.entity';
import { HallModule } from './team/team.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { HallModule } from './hall/hall.module';
import { TicketModule } from './ticket/ticket.module';
import { PointModule } from './point/point.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Performance, Hall, Ticket],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    TicketModule,
    PerformanceModule,
    HallModule,
    PointModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
