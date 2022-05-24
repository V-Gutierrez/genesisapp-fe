import { Flex, Spinner, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';

import Axios from 'services/axios';
import Error from 'components/Error';
import Success from 'components/Success';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const mutation = async (token: string) => {
  await Axios.post(
    '/auth/activate',
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
};

const Activate: React.FC = () => {
  const { query, push } = useRouter();
  const { mutateAsync: validateToken, isSuccess, isError } = useMutation(mutation, {});
  const toast = useToast();

  const handleToken = useCallback(
    async (hashToken: string) => {
      await validateToken(hashToken);

      const toastDelay = setTimeout(() => {
        toast({
          title: 'Você será redirecionado',
          duration: 5000,
          status: 'info',
        });
        clearTimeout(toastDelay);
      }, 2500);

      const delay = setTimeout(() => {
        clearTimeout(delay);
        push('/');
      }, 5000);
    },
    [validateToken],
  );

  useEffect(() => {
    query?.token && handleToken(query.token as string);
  }, [query, handleToken]);

  return (
    <Flex h="80vh" align="center" justify="center">
      {isSuccess && (
        <Success
          title="Parabéns!"
          subtitle="Sua conta foi ativada com sucesso. Você pode fazer o seu login e utilizar a plataforma!"
        />
      )}
      {isError && (
        <Error title="Ops!" subtitle="Não foi possível ativar sua conta. Contate o suporte." />
      )}
      {!isSuccess && !isError && <Spinner />}
    </Flex>
  );
};

export default Activate;
