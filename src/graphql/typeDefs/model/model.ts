import { gql } from "apollo-server";

export const Model = gql`
  type Model {
    _id: ObjectID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
  }
`;
