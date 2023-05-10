import { useBreakpointValue } from '@chakra-ui/react'

export default function useResponsiveFeedback() {
  const currentScreen = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  })

  return currentScreen
}
