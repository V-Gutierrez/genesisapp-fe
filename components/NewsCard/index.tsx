import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const NewsCard: React.FC<NewsCardProps> = ({ goTo, imageSrc, mobileImageSrc }) => (
    <Link href={goTo}>
      <Box
        h={{
 base: '300px', sm: '500px', md: '400px', lg: '550px', xl: '600px',
}}
        w="100%"
        bgImage={{ base: mobileImageSrc, md: imageSrc }}
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize={{ base: 'contain', lg: 'cover' }}
        cursor="pointer"
        borderRadius="xl"
      />
    </Link>
  );

export default NewsCard;
