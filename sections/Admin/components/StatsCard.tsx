import {
  Stat, StatLabel, StatNumber, useColorModeValue,
} from '@chakra-ui/react';

export default function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      p={{ base: '16px' }}
      w="100%"
      bg="white"
      scrollSnapAlign="center"
      shadow="xl"
      h={{ base: '100px' }}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <StatLabel fontWeight="medium" isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize="2xl" fontWeight="medium">
        {stat}
      </StatNumber>
    </Stat>
  );
}
