"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
class GenericService {
    constructor(model) {
        this.model = model;
    }
    async GetAll() {
        const entities = await this.model.find().exec();
        return entities;
    }
    async Get(id) {
        const entity = await this.model.findById(id).exec();
        return entity !== null && entity !== void 0 ? entity : null;
    }
    async Create(entity) {
        const created = await this.model.create(entity);
        return created;
    }
    async Update(id, entity) {
        const updatedEntity = await this.model.findByIdAndUpdate(id, entity).exec();
        if (updatedEntity) {
            const newEntity = await this.model.findById(id).exec();
            return newEntity !== null && newEntity !== void 0 ? newEntity : updatedEntity;
        }
        throw new Error(`BR: ${this.model.modelName} not found`);
    }
    async Delete(id) {
        try {
            const deletedEntity = await this.model.findByIdAndDelete(id).exec();
            if (!deletedEntity) {
                throw new Error(`${this.model.modelName} not found`);
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Internal server error');
        }
    }
    GetSchema() {
        const schemaPaths = this.model.schema.paths;
        const schema = Object.keys(schemaPaths).map((field) => {
            const schemaPath = schemaPaths[field];
            return {
                field,
                allowNull: !schemaPath.isRequired
            };
        });
        return schema.filter((f) => f.allowNull === false &&
            f.field !== 'createdAt' &&
            f.field !== 'updatedAt' &&
            f.field !== '_id');
    }
}
exports.GenericService = GenericService;
