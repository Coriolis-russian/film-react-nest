import { IsString, IsNotEmpty } from 'class-validator';
import { IFilm, ISchedule } from '../../model';

export class ReturnFilmDto implements Omit<IFilm, 'schedule'> {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class ReturnScheduleDto {
  total: number;
  items: ISchedule[];
}

export class ReturnFilmsDto {
  total: number;
  items: ReturnFilmDto[];
}

export class ScheduleByFilmParam {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class ScheduleByFilmError {
  error: string;
}
