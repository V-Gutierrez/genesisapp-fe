import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { FiMenu } from 'react-icons/fi';
import GenesisLogo from 'assets/images/genesislogo.png';

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
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
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex h="50%" w="100%" justifyContent="center" alignItems="center">
        <Image src={GenesisLogo.src} h="100%" alt="Genesis Logo" />
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }} opacity="0">
        <Button onClick={() => null}>
        </Button>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
