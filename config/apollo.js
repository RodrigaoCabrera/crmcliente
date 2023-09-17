import { ApolloClient, HttpLink, InmemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
  cache: new InmemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
    fetch,
  }),
});

export default client;
