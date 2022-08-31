import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SectionOnScreenProvider from '../providers/SectionOnScreenProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SectionOnScreenProvider>
      <Component {...pageProps} />
    </SectionOnScreenProvider>
  );
}

export default MyApp;
