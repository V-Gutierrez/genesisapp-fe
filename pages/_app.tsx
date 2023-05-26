import 'styles/custom.css'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { QueryClientProvider } from 'react-query'
import ReactQueryClient from 'services/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import SidebarWithHeader from 'components/Drawer'
import { UserContextProvider } from 'context/UserContext'
import { chakraTheme } from 'styles/chakraTheme'
import { useEffect } from 'react'

declare global {
  interface Window {
    OneSignal: any;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(() => {
        window.OneSignal.init({
          appId: 'e7d95f30-19e0-4c48-a201-6861e3eaf9a8',
          notifyButton: {
            enable: true,
          },
          // allowLocalhostAsSecureOrigin: true,
        });
      });

    return () => {
      window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount

  return (
    <>
      <Head>
        <title>Gênesis Church</title>
      </Head>
      <QueryClientProvider client={ReactQueryClient}>
        <ChakraProvider theme={chakraTheme}>
          <UserContextProvider>
            <SidebarWithHeader>
              <Component {...pageProps} />
            </SidebarWithHeader>
            <ReactQueryDevtools initialIsOpen position="bottom-left" />
          </UserContextProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
