// template para criação dos testes de cobertura da camada de controller

import mongoose from 'mongoose';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a camada de controller', () => {
  let chaiHttpResponse;
  const car = {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  }

  before(async () => {
    sinon
      .stub(mongoose.Model, 'create')
      .resolves(car);
  });

  after(()=>{
    (mongoose.Model.create as sinon.SinonStub).restore();
  })

  it("Se na rota '/cars' o obj é criado com sucesso", async () => {
    chaiHttpResponse = await chai.request(server.app)
    .post('/cars').send(car);

    expect(chaiHttpResponse.status).to.be.equal(201);
  });

});