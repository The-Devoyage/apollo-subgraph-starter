import { gql } from "apollo-server";

export const Query = gql`
  type GetModelsResponse {
    data: [Model!]!
    stats: Stats!
  }

  input GetModelsInput {
    _id: StringFieldFilter
    createdAt: StringFieldFilter
    updatedAt: StringFieldFilter
    name: StringFieldFilter
    config: FilterConfig
  }

  extend type Query {
    getModels(getModelsInput: GetModelsInput!): GetModelsResponse!
  }
`;
