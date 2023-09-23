import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const HttpLink = createHttpLink({
  uri: "http://localhost:4000/",
  fetch,
});
const authLink = setContext((_, { headers }) => {
  // Get token from local storage
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(HttpLink),
});

export default client;
