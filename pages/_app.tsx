import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import TextSide from '../components/TextSide';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <TextSide />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
