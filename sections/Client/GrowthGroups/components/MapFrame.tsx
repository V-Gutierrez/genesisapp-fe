import { Box, Skeleton } from '@chakra-ui/react'
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api'
import React, { useEffect, useMemo, useState } from 'react'
import GCLogo from 'public/assets/images/gc-logo.png'

/**
 * Renders a Google Map using the @react-google-maps/api library.
 * @param {Object} props - The component props.
 * @param {Array} props.GCDataset - The dataset of coordinates.
 * @param {Object} props.currentCoords - The current coordinates.
 * @param {Function} props.selectCoordsHandler - The handler function for selecting coordinates.
 * @returns {JSX.Element} - The rendered component.
 * @note Be aware of the number of API calls being made, as this can affect pricing.
 */
function MapFrame({
  GCDataset,
  currentCoords,
  selectCoordsHandler,
}: MapFrameProps) {
  const [userPosition, setUserPosition] = useState<
    CoordsState & { accurate: boolean }
  >({
    lat: null,
    lng: null,
    accurate: false,
  })

  const { isLoaded: mapIsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    language: 'pt-BR',
  })

  const isCurrentCoordSettedAsUserPosition = useMemo(
    () => userPosition?.lat === currentCoords.lat &&
      userPosition?.lng === currentCoords.lng,
    [currentCoords.lat, currentCoords.lng, userPosition.lat, userPosition.lng],
  )
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>()
  const [routeLoading, setRouteLoading] = useState<boolean>(false)

  const directionsService: google.maps.DirectionsService | undefined = useMemo(() => (mapIsLoaded && !isCurrentCoordSettedAsUserPosition ? new google.maps.DirectionsService() : undefined), [isCurrentCoordSettedAsUserPosition, mapIsLoaded])

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      scrollwheel: true,
      backgroundColor: '#edf2f7',
      zoomControl: false,
      mapTypeControl: false,
      keyboardShortcuts: false,
      gestureHandling: 'greedy',
      fullscreenControl: true,
    }),
    [],
  )

  useEffect(() => {
    // get current position from navigator
    navigator.geolocation.getCurrentPosition(
      // if position is found, set current position and select coordinates
      (position) => {
        const { latitude, longitude } = position.coords

        setUserPosition({ lat: latitude, lng: longitude, accurate: true })
        selectCoordsHandler(latitude, longitude)
      },
      // if position is not found, set default position and select coordinates
      () => {
        setUserPosition({ lat: -34.6037, lng: -58.3816, accurate: false }) // Buenos Aires - Obelisco
        selectCoordsHandler(-34.6037, -58.3816)
      },
      // options
      {
        timeout: 30000,
        enableHighAccuracy: true,
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRoutes = async () => {
    setRouteLoading(true)
    try {
      const config = {
        destination: {
          lat: currentCoords.lat as number,
          lng: currentCoords.lng as number,
        },
        origin: {
          lat: userPosition.lat as number,
          lng: userPosition.lng as number,
        },
        travelMode: google.maps.TravelMode.TRANSIT,
      }

      const route = await directionsService?.route(config)
      if (route) setDirections(route)

      // eslint-disable-next-line no-console
      console.info('Directions Found')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.info('No Directions Found')
    }
    setRouteLoading(false)
  }

  useEffect(() => {
    if (mapIsLoaded && !isCurrentCoordSettedAsUserPosition) fetchRoutes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoords.lat, currentCoords.lng, isCurrentCoordSettedAsUserPosition])

  const shouldRenderLoading =
    !mapIsLoaded || !GCDataset || !currentCoords.lat || !currentCoords.lng || routeLoading

  const shouldRenderMap =
    mapIsLoaded && GCDataset && currentCoords.lat && currentCoords.lng

  if (shouldRenderLoading) {
    return (
      <Skeleton
        h="100%"
        w={{
          lg: '80%',
          md: '100%',
          sm: '100%',
          base: '100%',
        }}
      />
    )
  }

  if (shouldRenderMap) {
    return (
      <Box
        h="100%"
        w={{
          lg: '80%',
          md: '100%',
          sm: '100%',
          base: '100%',
        }}
        borderRadius="20px"
        overflow="hidden"
      >
        <GoogleMap
          options={mapOptions}
          zoom={12}
          mapTypeId={google.maps.MapTypeId.HYBRID}
          center={{
            lat: currentCoords.lat as number,
            lng: currentCoords.lng as number,
          }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          {GCDataset.map(({ lat, lng }) => (
            <MarkerF
              key={`${lat}-${lng}`}
              position={{ lat, lng }}
              onClick={() => selectCoordsHandler(lat, lng)}
              icon={{
                url: GCLogo.src,
                scaledSize: new google.maps.Size(50, 60),
              }}
            />
          ))}

          <MarkerF
            position={{
              lat: userPosition.lat as number,
              lng: userPosition.lng as number,
            }}
            title={
              userPosition.accurate
                ? 'Você está aqui'
                : 'Localização aproximada'
            }
          />
          {directions && (
            <DirectionsRenderer
              options={{
                suppressMarkers: true,
                suppressInfoWindows: false,
              }}
              directions={directions}
            />
          )}
        </GoogleMap>
      </Box>
    )
  }
  return null
}

export default MapFrame
