import { IsEmail, IsString, MinLength } from 'class-validator';

export class TransactionDTO {
  @IsString()
  id: string;

  @IsString()
  @MinLength(40)
  senderAddress: string;

  @IsString()
  @MinLength(40)
  recipientAddress: string;

  amount: string;

  @IsString()
  note: string;
}

export type TransactionSO = {
  id: string;
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  note: string;
};
