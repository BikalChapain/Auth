import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly emailid: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
