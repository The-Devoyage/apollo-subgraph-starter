import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { ApolloServer } from "apollo-server";
import { schema } from "@src/graphql";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

dotenv.config();

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => Helpers.Subgraph.GenerateContext({ req }),
});

const DB = process.env.MONGO_URI;

if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("Mongo DB Connected..."))
    .catch((err) => console.log(err));
} else {
  console.log("DB Not Connected - Mongo URI Missing");
}

const port = process.env.PORT || 5999;

apolloServer
  .listen({ port })
  .then(({ url }) => console.log(`Service ready at ${url}`));
