import { GraphQLServer } from "graphql-yoga";

const messages = [
  {
    id: 1,
    user: "Piyush",
    content: "hey",
  },
  {
    id: 2,
    user: "Sara",
    content: "hello",
  },
];

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }
    
    type Query {
        messages: [Message!]!
    }
    
    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage(_, { user, content }) {
      const id = messages.length;
      messages.push({ id, user, content });
      return id;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(({ port }) => {
  console.log(`Service started on http://localhost:${port}`);
});
