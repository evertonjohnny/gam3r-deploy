import { Module } from '@nestjs/common';
import { ProdutoPrisma } from './produto.prisma';
import { ProdutoController } from './produto.controller';
import { PrismaProvider } from 'src/db/prisma.provider';
import { ProdutoService } from './produto.service';

@Module({
  providers: [ProdutoPrisma, PrismaProvider, ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
