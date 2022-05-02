import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/carModel';

describe("Testa a camada model", () => {
  let carModel = new CarModel();

  before(() => {
    sinon.stub(carModel, "create"). resolves({
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    });
  });

  after(() => {(carModel.create as SinonStub).restore()});

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

    const carCreated = await carModel.create(car);

    expect(car).to.be.an('object');
  });
});