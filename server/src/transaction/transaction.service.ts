import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionDTO, TransactionSO } from './transaction.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  create = async (data: TransactionDTO, userId: string): Promise<TransactionSO> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const transaction: TransactionEntity = await this.transactionRepository.create({...data, author: user});
    
    await this.transactionRepository.save({...transaction, author: user });

    return {
      id: transaction.id,
      senderAddress: transaction.senderAddress,
      recipientAddress: transaction.recipientAddress,
      amount: transaction.amount,
      note: transaction.note
    };
    
  };

  getMany = async (userId: string): Promise<TransactionSO[]> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const transactions = await this.transactionRepository.find({ where: { author: user } });
    console.log({transactions});
    return transactions;
  };
}
