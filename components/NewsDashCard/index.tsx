import { AiOutlineArrowsAlt, AiOutlineDelete } from 'react-icons/ai'
import { Box, Button, Flex, chakra, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'

import { DELETE_NEWS } from 'services/mutations'
import OptionsButton from 'components/OptionsButton'
import { formatToTimezone } from 'helpers/time'
import { isFuture } from 'date-fns'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

const NewsDashCard: React.FC<NewsDashCardProps> = ({
  body,
  title,
  id,
  scheduledTo,
  slug,
  refetch,
}) => {
  const [seeAll, setSeeAll] = useState(false)
  const { mutateAsync: deleteNews } = useMutation(DELETE_NEWS)
  const toast = useToast()
  const { push } = useRouter()

  const handleSeeAll = () => {
    setSeeAll((prev) => !prev)
  }

  const handleSeeNews = () => {
    push(`/noticias/${slug}`)
  }

  const formatedScheduledDate = useMemo(() => formatToTimezone(scheduledTo), [scheduledTo])

  const handleNewsDelete = async () => {
    try {
      await deleteNews(id)
      await refetch()

      toast({
        title: 'Notícia deletada com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao deletar a notícia',
        status: 'error',
      })
    }
  }

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
              onClick={handleSeeNews}
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
            onClick={handleNewsDelete}
          >
            Excluir
          </Button>
        </OptionsButton>
      </Box>
    </Flex>
  )
}

export default NewsDashCard
