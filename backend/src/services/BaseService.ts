import { Model, Document } from 'mongoose';
import { NotFoundError } from '../utils/errorHandler'

export default abstract class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findAll(filter = {}, select = '', populate = ''): Promise<T[]> {
    return this.model.find(filter).select(select).populate(populate);
  }

  async findById(id: string, select = '', populate = ''): Promise<T> {
    const item = await this.model.findById(id).select(select).populate(populate);
    if (!item) throw new NotFoundError(this.model.modelName);
    return item;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const item = await this.model.findByIdAndUpdate(id, data, { 
      new: true,
      runValidators: true 
    });
    if (!item) throw new NotFoundError(this.model.modelName);
    return item;
  }

  async delete(id: string): Promise<void> {
    const item = await this.model.findByIdAndDelete(id);
    if (!item) throw new NotFoundError(this.model.modelName);
  }
}
