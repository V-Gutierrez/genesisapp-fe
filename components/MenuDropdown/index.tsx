import { Box, ComponentWithAs, Flex, Icon, IconProps } from '@chakra-ui/react'
import React, { useState } from 'react'

const MenuDropdown: React.FC<
  MenuDropdownProps<ComponentWithAs<'svg', IconProps>>
> = ({ icon, children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.900',
          color: 'white',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
          />
        )}
        {title}
      </Flex>
      <Box
        fontSize="12px"
        h={isOpen ? 'auto-fit' : '0'}
        overflow={isOpen ? 'visible' : 'hidden'}
        _hover={{
          bg: 'blackAlpha.900',
          color: 'white',
        }}
        __css={{
          '&:nth-child(n)': {
            borderLeft: '5px solid black',
          },
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default MenuDropdown
