import { Flex, Link, Text } from '@chakra-ui/react';

const PopupContent: React.FC<GrowthGroup> = ({
 name, addressInfo, leadership, whatsappLink,
}) => (
  <>
    <Text fontSize={{ base: '14px' }} fontWeight="800">
      {name}
    </Text>
    <Text fontSize={{ base: '14px' }}>{addressInfo}</Text>
    <Text fontSize={{ base: '14px' }}>
      Líderes:
{' '}
{leadership.map((leader: string) => leader).join(', ')}
    </Text>
    <Link href={whatsappLink} target="_blank">
      <Flex flexDirection="row" alignItems="center">
        <Text mr="120px" color="white" textDecoration="underline">
          Entrar no grupo
        </Text>
      </Flex>
    </Link>
  </>
);

export default PopupContent;
