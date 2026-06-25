import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
