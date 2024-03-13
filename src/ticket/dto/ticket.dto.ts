import { IsNotEmpty, IsInt } from 'class-validator';

export class TicketDto {
  @IsInt()
  @IsNotEmpty({ message: '예매하려는 공연의 아이디를 작성하세요.' })
  performanceId: number;

  @IsInt()
  @IsNotEmpty({ message: '구매자의 아이디를 작성하세요.' })
  userId: number;
}
