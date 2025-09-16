import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioPrisma } from './usuario.prisma';
import { PrismaProvider } from 'src/db/prisma.provider';
@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioPrisma, PrismaProvider],
})
export class UsuarioModule {}
