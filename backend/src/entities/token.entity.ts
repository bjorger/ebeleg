import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  token: string;

  @Column({ type: 'datetime' }) // Change data type to 'datetime'
  creationTimestamp: Date;

  @Column({ type: 'boolean', default: false })
  consumed: boolean;
}
