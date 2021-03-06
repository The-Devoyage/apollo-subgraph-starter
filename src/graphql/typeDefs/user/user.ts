import { gql } from "apollo-server";

export const User = gql`
  extend type User @key(fields: "_id") {
    _id: ObjectID!
  }
`;
