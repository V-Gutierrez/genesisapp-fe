import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { BsEye } from 'react-icons/bs'

const Interactions: React.FC<InteractionProps> = ({
  views,
  likes,
  liked,
  onDislikeInteraction,
  onLikeInteraction,
}) => {
  const viewsIconRef = useRef(null)
  const likesIconRef = useRef(null)

  const handleLike = () => {
    if (onLikeInteraction) {
      onLikeInteraction()
    }
  }

  return (
    <Flex w="full" align="center" justify="flex-end">
      <Flex align="center" cursor="pointer">
        <BsEye />
        <Tooltip label="Visualizações" hasArrow placement="top">
          <Text ml={{ base: 2 }} userSelect="none" ref={viewsIconRef}>
            {views}
          </Text>
        </Tooltip>
      </Flex>
      <Flex align="center" ml={{ base: 2 }} cursor="pointer">
        <Box ref={likesIconRef} onClick={liked ? onDislikeInteraction : handleLike}>
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </Box>

        <Tooltip
          label={
            likes > 0
              ? likes > 1
                ? `${likes} pessoas gostaram`
                : `${likes} pessoa gostou`
              : 'Likes'
          }
          hasArrow
          placement="top"
        >
          <Text ml={{ base: 2 }} userSelect="none">
            {likes}
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default Interactions
