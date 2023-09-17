export default function MyApp({ Component, pageProps }) {
  console.log("desde_app.js");
  return <Component {...pageProps} />;
}
