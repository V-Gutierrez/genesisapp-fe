import 'styles/custom.css';

import { ChakraProvider, ScaleFade } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import ReactQueryClient from 'services/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SidebarWithHeader from 'components/Drawer';
import { UserContextProvider } from 'context/UserContext';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Genesis Church</title>
      </Head>

      <QueryClientProvider client={ReactQueryClient}>
        <UserContextProvider>
          <ChakraProvider>
            <SidebarWithHeader>
              <ScaleFade key={router.route} initialScale={0.2} in>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen position="bottom-right" />
              </ScaleFade>
            </SidebarWithHeader>
          </ChakraProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
