import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './transaction.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('create')
  @UseGuards(new AuthGuard())
  register(
    @Req() req,
    @Body() data: TransactionDTO
  ) {
    const userId = req.user.id;
    return this.transactionService.create(data, userId);
  }

  @Get('all')
  @UseGuards(new AuthGuard())
  getProfile(@Req() req) {
    const userId = req.user.id;
    return this.transactionService.getMany(userId);
  }
}
