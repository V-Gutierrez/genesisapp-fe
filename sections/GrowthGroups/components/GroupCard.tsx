import { Flex, Link, Text } from '@chakra-ui/react';

import { IoLogoWhatsapp } from 'react-icons/io';

const GroupCard: React.FC<GroupCardProps> = ({ Group, selectCoordsHandler, active }) => {
  const {
 addressInfo, name, leadership, scheduledTime, weekDay, lat, lng, whatsappLink,
} = Group;

  return (
    <Flex
      scrollSnapAlign="start"
      marginBottom="10px"
      bg={active ? 'gray.900' : 'gray.200'}
      color={active ? 'white' : 'black'}
      w="100%"
      flexDirection="column"
      borderRadius="10px"
      padding="10px"
      cursor="pointer"
      _hover={{
        bg: 'gray.900',
        color: 'white',
      }}
      onClick={() => selectCoordsHandler(lat, lng)}
    >
      <Text fontSize={{ base: '14px' }} fontWeight="800">
        {name}
      </Text>

      <Text fontSize={{ base: '14px' }}>{addressInfo}</Text>
      <Text fontSize={{ base: '14px' }}>{leadership.map((leader) => leader).join(', ')}</Text>
      <Flex align="center" justify="space-between" w="100%">
        <Text fontSize={{ base: '14px' }} mr="12px">
          {' '}
          Ás
{' '}
{scheduledTime}
{' '}
-
{' '}
{weekDay}
        </Text>
        <Link href={whatsappLink} target="_blank">
          <IoLogoWhatsapp size="20px" color={active ? 'white' : 'green'} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default GroupCard;
