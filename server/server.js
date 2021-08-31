// const express = require('express');
// // import Apollo server
// const { ApolloServer } = require('apollo-server-express');

// // import typeDefs and resolvers
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();

// let server;

// async function startServer() {
//   // create Apollo Server and pass in our schema
//   server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     introspection: true,
//     playground: true,
//   });
//   await server.start();
//   // Integrate our Appollo server with the express application as middleware
//   server.applyMiddleware({ app });
// }

// // start the server
// startServer();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

let server;

async function startServer() {
  // create Apollo Server and pass in our schema
  server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  await server.start();
  // Integrate our Appollo server with the express application as middleware
  server.applyMiddleware({ app });
}

// start the server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
