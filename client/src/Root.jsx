import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
