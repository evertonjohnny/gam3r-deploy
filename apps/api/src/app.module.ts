import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DbModule, 
    ProdutoModule, 
    AuthModule, 
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        global:true,
        useFactory: (config:ConfigService)=>({
          secret:config.get("JWT_SECRET"),
          signOptions: {expiresIn:'1d'}
        })
    }), UsuarioModule,  PedidoModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
