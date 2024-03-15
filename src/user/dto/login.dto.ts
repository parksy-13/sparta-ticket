import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 4,
    },
    { message: '비밀번호는 4글자 이상이어야 합니다.' },
  )
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
