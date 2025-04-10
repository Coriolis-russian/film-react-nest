import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnFilmDto } from '../films/dto/films.dto';
import { Film, Schedule } from './films.schema';
import { IFilm } from '../model';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private store: Model<Film>) {}

  async findAll(): Promise<ReturnFilmDto[]> {
    return this.store.find();
  }

  async findOne(id: string): Promise<IFilm | null> {
    return this.store.findOne({ id });
  }

  async updateSchedule(filmId: string, schedule: Schedule[]) {
    return this.store.updateOne(
      { id: filmId },
      { $set: { schedule: schedule } },
    );
  }
}
