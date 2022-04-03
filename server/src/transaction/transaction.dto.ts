import { IsEthereumAddress, IsNumberString, IsString, MinLength } from 'class-validator';

export class TransactionDTO {
  @IsString()
  id: string;

  @IsEthereumAddress()
  @MinLength(40)
  senderAddress: string;

  @IsEthereumAddress()
  @MinLength(40)
  recipientAddress: string;

  @IsNumberString()
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
