import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import Axios from 'services/axios';
import Error from 'components/Error';
import Success from 'components/Success';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const mutation = async (token: string) => {
  await Axios.post('/auth/activate', {
    headers: {
      Authorization: `${token}`,
    },
  });
};

const Activate: React.FC = () => {
  const { query, push } = useRouter();
  const { mutateAsync: validateToken, isSuccess, isError } = useMutation(mutation, {});

  useEffect(() => {
    handleToken();
  }, []);

  const handleToken = async () => {
    console.log(query.token);
    if (query.token) {
      await validateToken(query.token as string);
    }
  };

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
