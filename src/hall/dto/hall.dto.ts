import { IsNotEmpty, IsString } from 'class-validator';

export class HallDto {
  @IsString()
  @IsNotEmpty({ message: '공연장의 이름을 입력해주세요.' })
  hallName: string;
}
