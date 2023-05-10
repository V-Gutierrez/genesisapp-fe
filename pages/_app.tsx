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

function MyApp({ Component, pageProps }: AppProps) {
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
