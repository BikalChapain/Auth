//export class User {}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BaseEntity } from 'src/common/baseentity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  role: string;
}
