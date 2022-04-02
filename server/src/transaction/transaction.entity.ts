import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({
    type: 'text',
    name: 'sender_address'
  })
  senderAddress: string;

  @Column({
    type: 'text',
    name: 'recipient_address'
  })
  recipientAddress: string;

  @Column('text')
  amount: string;

  
  @Column({
    type: 'text',
    default: ''
  })
  note: string;

  @CreateDateColumn()
  createdOn: Date;

  @ManyToOne(
    type => UserEntity,
    author => author.transactions,
  )
  author: UserEntity;
}