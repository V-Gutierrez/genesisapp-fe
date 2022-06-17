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
  <>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
      crossOrigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
      integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
      crossOrigin=""
    />
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
  </>
)

export default MapBox
