import CustomRouter from './route/CustomRouter';
import App from './app';

import CarController from './controllers/carController';

import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
