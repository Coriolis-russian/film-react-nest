import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CreateOrderError,
  CreateOrderResultDto,
} from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResultDto | CreateOrderError> {
    return this.orderService.create(createOrderDto);
  }
}
