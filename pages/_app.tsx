import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DefaultLayout from '../components/DefaultLayout';
import SectionOnScreenProvider from '../providers/SectionOnScreenProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SectionOnScreenProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SectionOnScreenProvider>
  );
}

export default MyApp;
