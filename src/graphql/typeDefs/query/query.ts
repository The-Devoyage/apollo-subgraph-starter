import { gql } from "apollo-server-express";

export const Query = gql`
  type GetModelsResponse {
    data: [Model]
    stats: Stats
  }

  input GetModelsInput {
    _id: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    name: StringFieldFilter
  }

  extend type Query {
    getModels(getModelsInput: GetModelsInput!): GetModelsResponse!
  }
`;
