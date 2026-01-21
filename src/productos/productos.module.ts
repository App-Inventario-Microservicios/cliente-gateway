import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTOS_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: PRODUCTOS_SERVICE,
      transport: Transport.TCP,
      options: {
        host: envs.productsMicroserviceHost,
        port: envs.productsMicroservicePort,
      },
    }
  ])
],
  controllers: [ProductosController],
  providers: [],
})
export class ProductosModule {}
