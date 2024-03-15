import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연의 제목을 작성하세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연의 설명을 작성하세요.' })
  description: string;

  @IsInt()
  @IsNotEmpty({ message: '공연의 가격을 작성하세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연의 시작일을 작성하세요.' })
  startDate: string;

  @IsString()
  @IsNotEmpty({ message: '공연의 종료일을 작성하세요.' })
  endDate: string;

  @IsString()
  @IsNotEmpty({ message: '공연장을 작성하세요.' })
  hall: string;
}
