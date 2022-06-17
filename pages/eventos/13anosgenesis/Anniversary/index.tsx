import {
  Button,
  Flex,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react'

import EventPhoto from 'public/assets/images/13anosgenesis/inscricoes-festa.png'
import EventPhotoBG from 'public/assets/images/13anosgenesis/background13anos.png'
import Head from 'next/head'
import Link from 'next/link'
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
          maxW="1200px"
          fallback={<Skeleton w={{ base: '100%', md: '80%', '2lg': '50%' }} />}
          src={EventPhoto.src}
          alt="Foto do evento"
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
            <Link href="/">
              <Button
                mt={{ base: '50px' }}
                bg="#FF5835"
                rounded="full"
                px={6}
                color="white"
                _hover={{
                  bg: 'black.200',
                }}
              >
                Ir para o início
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </>
)

export default AnniversarySection
