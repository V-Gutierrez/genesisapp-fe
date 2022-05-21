import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import { useUser } from 'context/UserContext';
import LoginModal from './LoginModal';

const UserInfo: React.FC = () => {
  const { userData, isAdmin } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!userData) {
    return (
      <>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="sm" color="white" bg="blackAlpha.900" name="Genesis">
              <AvatarBadge boxSize="1.25em" bg="gray.600" />
            </Avatar>
          </MenuButton>
          <MenuList alignItems="center" justifyContent="center" d="flex">
            <Center as={Button} w="90%" onClick={onOpen}>
              <p>Faça seu login</p>
            </Center>
          </MenuList>
        </Menu>
        <LoginModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
  return (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
        <Avatar size="sm" name={userData.name} bg="blackAlpha.900">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar size="2xl" name={userData.name} bg="blackAlpha.900" />
        </Center>
        <br />
        <Center background={isAdmin ? 'yellow.800' : 'inherit'}>
          <p>{userData.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Servers</MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserInfo;
