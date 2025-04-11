import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IOrder, ITicket } from '../../model';

class CreateTicketDto implements Omit<ITicket, 'id'> {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  film: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  session: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  daytime: string;

  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsNumber()
  seat: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

class CreateTicketResultDto extends CreateTicketDto implements ITicket {
  id: string;
}

export class CreateOrderDto implements Omit<IOrder, 'tickets'> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}

export class CreateOrderResultDto {
  total: number;
  items: CreateTicketResultDto[];
}

export class CreateOrderError {
  error: string;
}
