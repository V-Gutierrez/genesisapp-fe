import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { BsEye, BsShare } from 'react-icons/bs'

const Interactions: React.FC<InteractionProps> = ({
  views,
  likes,
  liked,
  onDislikeInteraction,
  onLikeInteraction,
  shareContent,
  showOnlyShare = false,
}) => {
  const viewsIconRef = useRef(null)
  const likesIconRef = useRef(null)
  const shareIconRef = useRef(null)

  const handleLike = () => {
    if (onLikeInteraction) {
      onLikeInteraction()
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        url: window.location.href,
        title: shareContent || document?.title || 'Gênesis Church App',
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (showOnlyShare) {
    return (
      <Flex w="full" align="center" justify="flex-end">
        <Flex align="center" cursor="pointer">
          <Box onClick={handleShare}>
            <BsShare />
          </Box>
        </Flex>
      </Flex>
    )
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
        <Box
          ref={likesIconRef}
          onClick={liked ? onDislikeInteraction : handleLike}
        >
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
      <Flex align="center" ml={{ base: 2 }} cursor="pointer">
        <Box ml={{ base: 2 }} onClick={handleShare} ref={shareIconRef}>
          <BsShare />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Interactions
