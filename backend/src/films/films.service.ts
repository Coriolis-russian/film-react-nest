import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import {
  ReturnFilmsDto,
  ScheduleByFilmError,
  ReturnScheduleDto,
} from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAll(): Promise<ReturnFilmsDto> {
    const schedule = await this.filmsRepository.findAll();
    return { total: schedule.length, items: schedule };
  }

  async getSchedule(
    filmId: string,
  ): Promise<ReturnScheduleDto | ScheduleByFilmError> {
    try {
      const film = await this.filmsRepository.findOne(filmId);
      if (!film) return { error: 'Film not found by id' };

      const schedule = film.schedule;
      return { total: schedule.length, items: schedule };
    } catch (error) {
      return { error: error.message };
    }
  }
}
