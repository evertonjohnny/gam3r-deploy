import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoPrisma } from './pedido.prisma';
import { PrismaProvider } from 'src/db/prisma.provider';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, PedidoPrisma, PrismaProvider],
})
export class PedidoModule {}
