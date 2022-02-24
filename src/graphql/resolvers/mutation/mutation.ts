import { Helpers } from "@the-devoyage/micro-auth-helpers";
import { MutationResolvers } from "types/generated";
import { Model } from "@src/models";
import { LimitRole } from "@the-devoyage/micro-auth-helpers/dist/resolver-helpers";

export const Mutation: MutationResolvers = {
  createModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const model = new Model({
        ...args.createModelInput,
        created_by: context.auth.payload.user._id,
      });
      await model.save();

      return model;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const model = await Model.findOne(
        { _id: args.updateModelInput?._id },
        args.updateModelInput
      );

      if (!model) {
        return Error("Does not exist.");
      }

      if (context.auth.payload.user._id !== model.created_by) {
        LimitRole({
          userRole: context.auth.payload.user.role,
          roleLimit: 1,
          errorMessage:
            "Only admin may edit models that are created by other users.",
        });
      }

      const updated = await Model.findOneAndUpdate(
        { _id: model._id },
        { ...args.updateModelInput },
        { new: true }
      );

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteModel: async (_, args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      const model = await Model.findOne(
        { _id: args.deleteModelInput?._id },
        args.deleteModelInput
      );

      if (!model) {
        return Error("Does not exist.");
      }

      if (context.auth.payload.user._id !== model.created_by) {
        LimitRole({
          userRole: context.auth.payload.user.role,
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
