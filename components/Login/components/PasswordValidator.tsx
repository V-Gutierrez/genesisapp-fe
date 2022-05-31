import {
 Flex, Icon, Stack, Text,
} from '@chakra-ui/react';
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';

const ValidationItem: React.FC<ValidationItemProps> = ({ label, valid }: ValidationItemProps) => (
  <Flex alignItems="center">
    <Icon
      as={valid ? IoCheckmarkCircle : IoCheckmarkCircleOutline}
      color={valid ? 'primaryColor' : 'gray.400'}
      fontSize={{ base: '12px' }}
    />
    <Text marginLeft="10px" fontSize={{ base: '12px' }}>
      {label}
    </Text>
  </Flex>
);

const PasswordValidator: React.FC<ValidatePasswordProps> = ({
  password,
}: ValidatePasswordProps) => {
  const Validation = {
    min: password.length >= 8,
    upperAndLowerCaseLetters: password.match(/[a-z]/) && password.match(/[A-Z]/),
    numbersAndSpecialCharacteres:
      password.match(/[0-9]/) && password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/),
  };

  return (
    <Stack spacing={1}>
      <ValidationItem label="Sua senha deve ter no mínimo 8 caractéres" valid={Validation.min} />
      <ValidationItem
        label="Sua senha deve ter letras mínusculas e maiúsculas"
        valid={!!Validation.upperAndLowerCaseLetters}
      />
      <ValidationItem
        label="Sua senha precisa ter números e caracteres especiais"
        valid={!!Validation.numbersAndSpecialCharacteres}
      />
    </Stack>
  );
};

export default PasswordValidator;
