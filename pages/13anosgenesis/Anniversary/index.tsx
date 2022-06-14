import {
 Flex, Image, Skeleton, Text,
} from '@chakra-ui/react'

import EventPhoto from 'assets/images/inscricoes-festa.png'
import EventPhotoBG from 'assets/images/background13anos.png'
import Head from 'next/head'
import React from 'react'
import Success from 'components/Success'

const AnniversarySection: React.FC = () => (
    <>
      <Head>
        <title>Gênesis Church - Aniversário 13 anos</title>
      </Head>
      <Flex
        minH="99vh"
        w="full"
        bgImage={EventPhotoBG.src}
        bgSize="cover"
        align="center"
        justify="center"
        flexDir="column"
        bgPos="center"
        scrollSnapType="y mandatory"
      >
        <Flex w="full" align="center" justify="flex-start" flexDir="column">
          <Image
            scrollSnapAlign="center"
            w={{
              base: '100%',
            }}
            id="scrolltop"
            maxW="1200px"
            fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
            src={EventPhoto.src}
          />
          <Flex
            justifyContent="center"
            alignContent="center"
            flexDir={{ base: 'column' }}
            w={{
              base: '100%',
            }}
            maxWidth="1200px"
          />
          <Flex
            justifyContent="center"
            alignContent="center"
            flexDir={{ base: 'column' }}
            textAlign="center"
            mt={{ base: '50px' }}
            color="#FF5835"
          >
            <Flex w="full" mt="50px" justify="center" align="center" pb="200px" flexDir="column">
              <Success
                title="Evento finalizado!"
                subtitle="Obrigado a todos os participantes e envolvidos!  #13anosgenesis"
              />
              <Text color="gray.500">Em breve novidades!</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )

export default AnniversarySection
