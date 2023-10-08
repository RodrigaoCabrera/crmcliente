import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import OrderState from "@/context/orders/OrdersState";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  );
}
