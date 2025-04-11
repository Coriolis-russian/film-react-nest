import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateOrderDto,
  CreateOrderError,
  CreateOrderResultDto,
} from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';
import { IFilm } from '../model';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(
    order: CreateOrderDto,
  ): Promise<CreateOrderResultDto | CreateOrderError> {
    /*
      1. Берём все заказанные фильмы из репы фильмов
      2. Перебираем его сеансы в поисках нужного
      3. Обходим taken фильма с целью поиска пересечений заказа
      4. Если пересечений нет - обновляем фильм через репу, генерим id
      5. Если есть - пишем "места на этот сеанс уже куплены" в error

      Для соблюдения логической целостности - сперва полностью проверить
      весь заказ на пересечения, и только потом после успешной проверки
      запись в БД.
    */

    try {
      const films: Map<string, IFilm> = new Map();
      for (const ticket of order.tickets) {
        const filmId = ticket.film;
        if (films.has(filmId)) continue;
        const film = await this.filmsRepository.findOne(filmId);
        if (!film) return { error: `Film width id ${filmId} not found` };
        films.set(filmId, film);
      }

      const updatedFilms: Set<IFilm> = new Set();
      const result: CreateOrderResultDto = { total: 0, items: [] };

      for (const ticket of order.tickets) {
        const filmId = ticket.film;
        const film = films.get(filmId)!;

        const session = film.schedule.find((s) => s.id === ticket.session);
        if (!session) {
          return { error: `Session with id ${ticket.session} not found` };
        }

        const taken = session.taken;
        const place = `${ticket.row}:${ticket.seat}`;
        const occupied = taken ? taken.includes(place) : false;
        if (occupied) {
          return { error: `Место ${ticket.row}:${ticket.seat} уже занято` };
        }

        if (!session.taken) {
          session.taken = [place];
        } else {
          session.taken.push(place);
        }
        updatedFilms.add(film);

        result.items.push({
          id: uuidv4(),
          daytime: session.daytime,
          film: filmId,
          price: session.price,
          row: ticket.row,
          seat: ticket.seat,
          session: session.id,
        });
      }

      updatedFilms.forEach((film) => {
        this.filmsRepository.updateSchedule(film.id, film.schedule);
      });

      result.total = result.items.length;
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
