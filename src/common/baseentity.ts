/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({
    type: 'datetime',
    default: /* istanbul ignore next */ () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: /* istanbul ignore next */ () => 'CURRENT_TIMESTAMP(6)',
  })
  modifiedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  createdby: string;

  @ApiProperty()
  @Column({ type: 'bool', default: true })
  isactive: boolean;
}
