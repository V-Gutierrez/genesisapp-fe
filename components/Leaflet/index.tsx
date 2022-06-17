import { Box } from '@chakra-ui/react'
import React from 'react'
import dynamic from 'next/dynamic'

export const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet')
    return MapContainer
  },
  { ssr: false },
)
export const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet')
    return TileLayer
  },
  { ssr: false },
)
export const Marker = dynamic(
  async () => {
    const { Marker } = await import('react-leaflet')
    return Marker
  },
  { ssr: false },
)
export const Popup = dynamic(
  async () => {
    const { Popup } = await import('react-leaflet')
    return Popup
  },
  { ssr: false },
)

const MapBox: React.FC<WrapperProps & {
  currentCoords: CoordsState
}> = ({ children, currentCoords }) => (
  <Box
    h="100%"
    w={{
      lg: '80%',
      md: '100%',
      sm: '100%',
      base: '100%',
    }}
    borderRadius="20px"
    overflow="clip"
    css={{
      '.leaflet-tile': {
        filter: 'hue-rotate(180deg) invert(100%)',
      },
    }}
  >
    <MapContainer
      /* @ts-ignore */
      center={[currentCoords.lat as number, currentCoords.lng as number]}
      zoomAnimation
      zoom={15}
      fadeAnimation
      scrollWheelZoom
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  </Box>
)

export default MapBox
