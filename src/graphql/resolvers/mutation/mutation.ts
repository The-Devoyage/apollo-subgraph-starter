import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { MutationResolvers, Model as IModel } from "types/generated";
import { Model } from "@src/models";
import { LimitRole } from "@the-devoyage/micro-auth-helpers/dist/resolver-helpers";
import { ApolloError } from "apollo-server";

export const Mutation: MutationResolvers = {
  createModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const newModel = new Model({
        ...args.createModelInput,
        created_by: context.auth.payload.user?._id,
      });
      await newModel.save();

      const model = await Model.findOne<IModel>({ _id: newModel._id });

      if (!model) {
        throw new ApolloError(
          "Something went wrong when finding the new document."
        );
      }

      return model;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const model = await Model.findOne<IModel>(
        { _id: args.updateModelInput?._id },
        args.updateModelInput
      );

      if (!model) {
        throw new Error("Does not exist.");
      }

      if (
        context.auth.payload.user?._id.toString() !==
        model.created_by._id.toString()
      ) {
        LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
          errorMessage:
            "Only admin may edit models that are created by other users.",
        });
      }

      const updated = await Model.findOneAndUpdate<IModel>(
        { _id: model._id },
        { ...args.updateModelInput },
        { new: true }
      );

      if (!updated) {
        throw new Error("Something went wrong when updating this document.");
      }

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const model = await Model.findOne<IModel>(
        { _id: args.deleteModelInput?._id },
        args.deleteModelInput
      );

      if (!model) {
        throw new Error("Does not exist.");
      }

      if (
        context.auth.payload.user?._id.toString() !==
        model.created_by.toString()
      ) {
        LimitRole({
          userRole: context.auth.payload.user?.role,
          roleLimit: 1,
          errorMessage:
            "Only admin may delete models that are created by other users.",
        });
      }

      await Model.deleteOne({ _id: model._id });

      return model;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
