import {
 Flex, FlexProps, Icon, Link as StyledLink,
} from '@chakra-ui/react';

import Link from 'next/link';

const NavItem = ({
 icon, children, goTo, ...rest
}: NavItemProps & FlexProps) => (
  <Link href={goTo}>
    <StyledLink style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </StyledLink>
  </Link>
);

export default NavItem;
