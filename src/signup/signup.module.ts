import { Module } from '@nestjs/common';
import { UsersService } from './signup.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}