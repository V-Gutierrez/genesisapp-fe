import { AiOutlineArrowsAlt, AiOutlineDelete } from 'react-icons/ai';
import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  chakra,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';

import { DELETE_DEVOTIONAL } from 'services/mutations';
import OptionsButton from 'components/OptionsButton';
import Quotes from 'assets/icons/quotes.svg';
import { formatToTimezone } from 'helpers/time';
import { isFuture } from 'date-fns';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const DevotionalDashCard: React.FC<DevotionalDashCardProps> = ({
  author,
  body,
  title,
  id,
  coverThumbnail,
  scheduledTo,
  slug,
  refetch,
}) => {
  const [seeAll, setSeeAll] = useState(false);
  const { mutateAsync: deleteDevotional } = useMutation(DELETE_DEVOTIONAL);
  const toast = useToast();
  const { push } = useRouter();

  const handleSeeAll = () => {
    setSeeAll((prev) => !prev);
  };

  const handlerSeeDevotional = () => {
    push(`/devocionais/${slug}`);
  };

  const formatedScheduledDate = useMemo(() => formatToTimezone(scheduledTo), [scheduledTo]);

  const handleDevotionalDelete = async () => {
    try {
      await deleteDevotional(id);
      await refetch();

      toast({
        title: 'Devocional deletado com sucesso',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Houve um erro ao deletar o devocional',
        status: 'error',
      });
    }
  };

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
          mr={3}
          maxHeight={seeAll ? 'auto' : '70px'}
          textOverflow="ellipsis"
          wordBreak="break-word"
          overflow="hidden"
          dangerouslySetInnerHTML={{ __html: body }}
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
{author}
{' '}
{formatedScheduledDate}
            </chakra.span>
          </chakra.p>
        </Flex>
      </Flex>
      <Box pos="absolute" top="0px" right="15px">
        <OptionsButton>
          {!isFuture(new Date(scheduledTo)) && (
            <Button
              w="194px"
              variant="ghost"
              rightIcon={<AiOutlineArrowsAlt />}
              justifyContent="space-between"
              fontWeight="normal"
              colorScheme="blackAlpha.700"
              fontSize="sm"
              onClick={handlerSeeDevotional}
            >
              Ver na íntegra
            </Button>
          )}
          <Button
            w="194px"
            variant="ghost"
            rightIcon={<AiOutlineDelete />}
            justifyContent="space-between"
            fontWeight="normal"
            colorScheme="red"
            fontSize="sm"
            onClick={handleDevotionalDelete}
          >
            Excluir
          </Button>
        </OptionsButton>
      </Box>
    </Flex>
  );
};

export default DevotionalDashCard;
