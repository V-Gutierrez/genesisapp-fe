import 'styles/custom.css';

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import ReactQueryClient from 'services/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SidebarWithHeader from 'components/Drawer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Genesis Church</title>
      </Head>

      <QueryClientProvider client={ReactQueryClient}>
        <ChakraProvider>
          <SidebarWithHeader>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen position="bottom-right" />
          </SidebarWithHeader>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
