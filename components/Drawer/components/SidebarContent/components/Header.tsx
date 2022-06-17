import {
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import GenesisLogo from 'public/assets/images/genesislogo.png';
import NextImage from 'components/NextImage';
import UserInfo from './UserInfo';

const Header = ({ onOpen, ...rest }: HeaderProps) => (
  <Flex
    ml={{ base: 0, md: 0 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'flex' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<FiMenu />}
    />

    <Flex h="50%" w="100%" justifyContent="center" alignItems="center">
      <NextImage
        ImageProps={
          {
 src: GenesisLogo.src, alt: 'Genesis Logo', priority: true, objectFit: 'contain',
}
        }
        BoxProps={
          {
            h: '100%',
            w: '120px',
          }
        }
      />
    </Flex>

    <HStack spacing={{ base: '0', md: '6' }}>
      <UserInfo />
    </HStack>
  </Flex>
);

export default Header;
