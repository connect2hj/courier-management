import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";

import express from "express";
import http from "http";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import { makeExecutableSchema } from "graphql-tools";
import * as dotenv from "dotenv";
import { GraphQLSchema } from "graphql";
dotenv.config().parsed;
const DB_NAME = `courier-management-db`
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
// More required logic for integrating with Express
export const connectDb = async () => {
  await mongoose
    .connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, options)
    .catch((err) => console.log(err));
};
async function startApolloServer(schema: GraphQLSchema) {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema,
    cache: "bounded",
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ["https://smartbooks.ink", "http://localhost:3000"],
      credentials: true,
    },
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 8080 }, resolve)
  );
  app.get("/", (req, res) => {
    res.send("Welcome to Courier Management API");
  });
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
  await mongoose
    .connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, options)
    .catch((err) => console.log(err));
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

startApolloServer(schema);
