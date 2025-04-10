// Добавил модель для самопроверки

export interface ISchedule {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
  schedule: ISchedule[];
}

export interface ITicket {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export interface IOrder {
  email: string;
  phone: string;
  tickets: ITicket[];
}
