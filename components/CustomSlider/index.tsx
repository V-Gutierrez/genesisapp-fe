import Slider, { Settings } from 'react-slick'

import { Box } from '@chakra-ui/react'

const DefaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  centerMode: false,
  adaptiveHeight: true,
}

const CustomSlider: React.FC<CustomSliderProps<Settings>> = ({
  children,
  customSettings,
  customRef,
}) => {
  const settings = { ...DefaultSettings, ...customSettings }

  return (
    <Box w="100%">
      <Slider {...settings} ref={customRef}>
        {children}
      </Slider>
    </Box>
  )
}

export default CustomSlider
