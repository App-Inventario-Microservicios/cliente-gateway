import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTOS_SERVICE } from 'src/config';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(PRODUCTOS_SERVICE) private readonly productosCliente: ClientProxy,
  ) {}

  @Post()
  crearProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.productosCliente.send(
      { cmd: 'createProducto' },
      createProductoDto,
    );
  }

  @Get()
  obtenerProductos(@Query() PaginationDto: PaginationDto) {
    return this.productosCliente.send(
      { cmd: 'findAllProductos' },
      PaginationDto,
    );
  }

  @Get(':id')
  async obtenerProducto(@Param('id') id: string) {
    return this.productosCliente.send({ cmd: 'findOneProducto' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException({ error });
      }),
    );
  }

  @Delete(':id')
  eliminarProducto(@Param('id') id: string) {
    return this.productosCliente.send({ cmd: 'removeProducto' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException({ error });
      }),
    );
  }

  @Patch(':id')
  actualizarProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateProductoDto: UpdateProductoDto,
  ) {
    return this.productosCliente
      .send({ cmd: 'updateProducto' }, { id, ...UpdateProductoDto })
      .pipe(
        catchError((error) => {
          throw new RpcException({ error });
        }),
      );
  }
}
