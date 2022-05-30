import { AiOutlineArrowsAlt, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  Avatar, Box, Button, Flex, chakra, useColorModeValue,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

import OptionsButton from 'components/OptionsButton';
import Quotes from 'assets/icons/quotes.svg';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const DevotionalDashCard: React.FC<DevotionalDashCardProps> = ({
  title,
  content,
  authorName,
  scheduledTo,
}) => {
  const [seeAll, setSeeAll] = useState(false);

  const handleSeeAll = () => {
    setSeeAll((prev) => !prev);
  };

  const formatedScheduledDate = useMemo(() => format(new Date(scheduledTo), "'em' dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: pt,
  }), [scheduledTo, format, pt]);

  return (
    <Flex
      boxShadow="lg"
      my={{ base: 2 }}
      maxW="640px"
      direction={{ base: 'column-reverse', md: 'row' }}
      width="full"
      rounded="xl"
      p={10}
      justifyContent="space-between"
      position="relative"
      bg={useColorModeValue('white', 'gray.800')}
      _after={{
        content: '""',
        position: 'absolute',
        height: '21px',
        width: '29px',
        left: '35px',
        top: '-10px',
        color: 'black',
        backgroundSize: 'cover',
        backgroundImage: `url(${Quotes.src})`,
      }}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
      }}
    >
      <Flex direction="column" textAlign="left" justifyContent="space-between">
        <Box
          fontWeight="medium"
          fontSize="15px"
          pb={4}
          noOfLines={seeAll ? undefined : 2}
          dangerouslySetInnerHTML={{ __html: content }}
          cursor="pointer"
          onClick={handleSeeAll}
        />
        <Flex pt={{ base: '20px' }}>
          <chakra.p fontWeight="bold" fontSize={14}>
            {title}
            <chakra.span fontWeight="medium" color="gray.500">
              {' '}
              -
              {' '}
              {authorName}
              {' '}
              {formatedScheduledDate}
            </chakra.span>
          </chakra.p>
        </Flex>
      </Flex>
      <Avatar
        userSelect="none"
        name={authorName}
        height="80px"
        width="80px"
        bg="blackAlpha.900"
        alignSelf="center"
        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
      />
      <Box pos="absolute" top="0px" right="15px">
        <OptionsButton>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineArrowsAlt />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="blackAlpha.700"
            fontSize="sm"
          >
            Ver na íntegra
          </Button>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineEdit />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="blackAlpha.700"
            fontSize="sm"
          >
            Editar
          </Button>
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineDelete />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="red"
            fontSize="sm"
          >
            Excluir
          </Button>
        </OptionsButton>
      </Box>
    </Flex>
  );
};

export default DevotionalDashCard;
