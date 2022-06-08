import Slider, { Settings } from 'react-slick';

import { Box } from '@chakra-ui/react';
import React from 'react';

const DefaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  centerMode: false,
  adaptiveHeight: true,
};

const CustomSlider: React.FC<CustomSliderProps<Settings>> = ({ children, customSettings }) => {
  const settings = { ...DefaultSettings, ...customSettings };

  return (
    <Box w="100%">
      <Slider {...settings}>
{' '}
{children}
</Slider>
    </Box>
  );
};

export default CustomSlider;
