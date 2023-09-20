//export class Product {}

//export class User {}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productname: string;

  @Column()
  productcode: string;

  @Column()
  price: string;
}
