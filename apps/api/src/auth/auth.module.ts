import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthPrisma } from './auth.prisma';
import { PrismaProvider } from 'src/db/prisma.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthPrisma, PrismaProvider],
})
export class AuthModule {}
