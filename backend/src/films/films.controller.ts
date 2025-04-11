import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import {
  ScheduleByFilmParam,
  ReturnScheduleDto,
  ScheduleByFilmError,
} from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('')
  async getAll() {
    return this.filmsService.getAll();
  }

  @Get('/:id/schedule')
  async getSchedule(
    @Param() params: ScheduleByFilmParam,
  ): Promise<ReturnScheduleDto | ScheduleByFilmError> {
    return this.filmsService.getSchedule(params.id);
  }
}
