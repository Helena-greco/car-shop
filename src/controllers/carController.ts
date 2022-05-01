import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/carService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car || 'error' in car) {
        return res.status(400).json({ error: this.errors.internal });
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(400).json(
        { error: 'Id must have 24 hexadecimal characters' },
      );
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const car = await this.service.update(id, body);
      if (!car) {
        return res.status(404)
          .json({ error: this.errors.notFound });
      }
      
      return res.status(200).json(car);
    } catch (err) {
      return res.status(400)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);
      return car
        ? res.status(204).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(400).json(
        { error: this.errors.internal },
      );
    }
  };
}
