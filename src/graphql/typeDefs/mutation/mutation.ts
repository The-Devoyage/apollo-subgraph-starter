import { gql } from "apollo-server-express";

export const Mutation = gql`
  input CreateModelInput {
    name: String!
  }

  input UpdateModelInput {
    _id: ObjectID!
    name: String
  }

  input DeleteModelInput {
    _id: ObjectID!
  }

  extend type Mutation {
    createModel(createModelInput: CreateModelInput!): Model!
    updateModel(updateModelInput: UpdateModelInput!): Model!
    deleteModel(deleteModelInput: DeleteModelInput!): Model!
  }
`;
