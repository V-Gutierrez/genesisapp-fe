import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';

export default function OptionsButton({ children }: OptionsButtonProps) {
  return (
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        {/* @ts-ignore */}
        <PopoverTrigger>
          <IconButton
            aria-label="More options"
            icon={<BsThreeDotsVertical />}
            transform="rotate(90deg)"
            variant="ghost"
            w="fit-content"
            borderRadius={{ base: 'lg' }}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>{children}</Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}