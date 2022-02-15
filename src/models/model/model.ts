import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ModelSchema = new Schema<any, FindAndPaginateModel>();

const Model = mongoose.model<any, FindAndPaginateModel>("Model", ModelSchema);

export { Model };
