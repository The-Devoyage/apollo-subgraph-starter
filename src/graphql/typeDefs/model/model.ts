import { gql } from "apollo-server-express";

export const Model = gql`
  type Model {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
  }
`;
