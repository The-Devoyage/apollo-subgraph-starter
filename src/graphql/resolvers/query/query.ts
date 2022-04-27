import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { QueryResolvers, Model as IModel } from "types/generated";
import { Model } from "@src/models";

export const Query: QueryResolvers = {
  getModels: async (_model, args) => {
    try {
      const { filter, options } = GenerateMongo({
        fieldFilters: args.getModelsInput,
        config: args.getModelsInput?.config,
      });

      const models = await Model.findAndPaginate<IModel>(filter, options);

      return models;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
