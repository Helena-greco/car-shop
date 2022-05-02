import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarService from '../../../services/carService';

describe("Testa a camada service", () => {
  let carService = new CarService();

  before(() => {
    sinon.stub(carService, "create"). resolves({
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    });
  });

  after(() => {(carService.create as SinonStub).restore()});

  it("Se na rota '/cars' é criado um carro novo com sucesso", async () => {
    const car = {
      _id: "4edd40c86762e0fb12000003",
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    }

    const carCreated = await carService.create(car);

    expect(carCreated).to.be.an('object');
  });
});