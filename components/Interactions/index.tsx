import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Box, Flex, Text, Tooltip, useToast } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { BsEye } from 'react-icons/bs'

const Interactions: React.FC<InteractionProps> = ({
  views,
  likes,
  liked,
  onDislikeInteraction,
  onLikeInteraction,
  likeMessage,
}) => {
  const viewsIconRef = useRef(null)
  const likesIconRef = useRef(null)
  const toast = useToast()

  const handleLike = () => {
    toast({
      description: likeMessage || 'Você curtiu este item',
    })
    onLikeInteraction && onLikeInteraction()
  }

  return (
    <Flex w="full" align="center" justify="flex-end">
      <Flex align="center" cursor="pointer">
        <Tooltip label="Visualizações" hasArrow placement="top">
          <Box ref={viewsIconRef}>
            <BsEye />
          </Box>
        </Tooltip>
        <Text ml={{ base: 2 }} userSelect="none">
          {views}
        </Text>
      </Flex>
      <Flex align="center" ml={{ base: 2 }} cursor="pointer">
        <Tooltip label={likes > 0 ? `${likes} pessoas gostaram` : 'Likes'} hasArrow placement="top">
          <Box ref={likesIconRef} onClick={liked ? onDislikeInteraction : handleLike}>
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </Box>
        </Tooltip>
        <Text ml={{ base: 2 }} userSelect="none">
          {likes}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Interactions
