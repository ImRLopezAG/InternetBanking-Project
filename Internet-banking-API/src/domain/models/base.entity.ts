/* eslint-disable @typescript-eslint/naming-convention */
import {modelOptions, pre, prop} from '@typegoose/typegoose'
import { Document } from 'mongoose'

@pre<BaseEntity>('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate()
  update.updatedAt = new Date().toISOString()
  next()
})
@modelOptions({ schemaOptions: { versionKey: false } })
export abstract class BaseEntity extends Document {
  @prop({ default: () => new Date().toISOString() })
  declare createdAt: Date

  @prop({ default: () => new Date().toISOString() })
  declare updatedAt: Date
  
  toJSON (): object {
    const obj = this.toObject()
    const { updatedAt, password, __v, ...rest } = obj
    return rest
  }
}
