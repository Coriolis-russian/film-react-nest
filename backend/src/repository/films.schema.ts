import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFilm, ISchedule } from '../model';

@Schema()
export class Schedule implements ISchedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  taken: string[];
}

@Schema()
export class Film implements IFilm {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
