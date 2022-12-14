import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

/** modelo tirado do course, bloco 30 sobre models */

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  update = async (id: string, obj: T): Promise<T | null> =>
    this.model.findByIdAndUpdate(id, { ...obj });

  delete = async (id:string): Promise<T | null> =>
    this.model.remove({ _id: id });
}

export default MongoModel;