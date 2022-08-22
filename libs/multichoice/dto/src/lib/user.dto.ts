import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validation } from '@monorepo/multichoice/validation';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(validation().username.minLength)
  @MaxLength(validation().username.maxLength)
  username: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(validation().email.maxLength)
  email: string;

  @ApiProperty()
  @MinLength(validation().password.minLength)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @MinLength(validation().username.minLength)
  @MaxLength(validation().username.maxLength)
  username: string;
}

export class UpdateUserPasswordDto {
  @ApiProperty()
  @MinLength(validation().password.minLength)
  password: string;

  @ApiProperty()
  @MinLength(validation().password.minLength)
  newPassword: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(validation().email.maxLength)
  email: string;

  @ApiProperty()
  @MinLength(validation().password.minLength)
  password: string;
}

export class ResultUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  topicID: number;

  @ApiProperty()
  time: number;

  @ApiProperty()
  AnswersUserDto: AnswersUserDto[];
}

export class AnswersUserDto {
  @ApiProperty()
  questionID: number;

  @ApiProperty()
  answer: string;
}
