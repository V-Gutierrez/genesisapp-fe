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
  SkeletonCircle,
  useDisclosure,
} from '@chakra-ui/react';
import { useIsFetching, useMutation } from 'react-query';

import Axios from 'services/axios';
import React from 'react';
import { useUser } from 'context/UserContext';
import LoginModal from '../../../../Login/LoginModal';

const mutation = async () => {
  await Axios.delete('/auth');
};

const UserInfo: React.FC = () => {
  const { mutateAsync: logout } = useMutation(mutation, {});
  const isFetching = useIsFetching();
  const {
    userData, isAdmin, removeUserData, refetchUser, openLoginModal,
  } = useUser();

  const handleLogout = async () => {
    await logout();
    removeUserData();
    await refetchUser();
  };

  if (!userData && isFetching) return <SkeletonCircle />;
  if (!userData) {
    return (
      <Menu>
        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
          <Avatar userSelect="none" size="sm" color="white" bg="blackAlpha.900" name="Genesis">
            <AvatarBadge boxSize="1.25em" bg="gray.600" />
          </Avatar>
        </MenuButton>
        <MenuList alignItems="center" justifyContent="center" d="flex" zIndex="overlay">
          <Center
            as={Button}
            w="90%"
            onClick={openLoginModal}
            _hover={{
              bg: 'blackAlpha.900',
              color: 'white',
            }}
          >
            <p>Faça seu login</p>
          </Center>
        </MenuList>
      </Menu>
    );
  }
  return (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
        <Avatar userSelect="none" size="sm" name={userData.name} bg="blackAlpha.900" color="white">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList alignItems="center" zIndex="overlay">
        <br />
        <Center>
          <Avatar
            size="2xl"
            userSelect="none"
            name={userData.name}
            bg="blackAlpha.900"
            color="white"
          />
        </Center>
        <br />
        <Center>
          <p>{userData.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem
          as={Button}
          _hover={{
            bg: 'blackAlpha.900',
            color: 'white',
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserInfo;
