import { Skeleton } from '@chakra-ui/react'
import MapBox, { Marker, Popup } from 'components/Leaflet'
import React, { useEffect, useState } from 'react'

import PopupContent from 'sections/Client/GrowthGroups/components/PopupContent'
import { changeIcons } from 'sections/Client/GrowthGroups/components/utils'

function MapFrame({ GCDataset, currentCoords, selectCoordsHandler }: MapFrameProps) {
  const [userPosition, setUserPosition] = useState<CoordsState & { accurate: boolean }>({
    lat: null,
    lng: null,
    accurate: false,
  })
  const [mapLoading, setMapLoading] = useState(true)

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setUserPosition({ lat: latitude, lng: longitude, accurate: true })
        selectCoordsHandler(latitude, longitude)
      },
      () => {
        setUserPosition({ lat: -34.6037, lng: -58.3816, accurate: false })
        selectCoordsHandler(-34.6037, -58.3816)
      },
      {
        timeout: 30000,
        enableHighAccuracy: true,
      },
    )
  }

  useEffect(() => {
    getUserLocation()
    changeIcons()
  }, [])

  useEffect(() => {
    setMapLoading(true)

    const delay = setTimeout(() => {
      setMapLoading(false)
      changeIcons()
      clearTimeout(delay)
    }, 250)
  }, [currentCoords])

  if (mapLoading || !GCDataset || !currentCoords.lat || !currentCoords.lng) {
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

  if (GCDataset && currentCoords.lat && currentCoords.lng) {
    return (
      <MapBox currentCoords={currentCoords}>
        {GCDataset.map((gc) => (
          <Marker key={gc.id} position={[gc.lat, gc.lng]}>
            <Popup
              /* @ts-ignore */
              className="customPopup"
            >
              <PopupContent {...gc} />
            </Popup>
          </Marker>
        ))}

        <Marker
          position={[userPosition.lat as number, userPosition.lng as number]}
          data-tip="userTip"
          /* @ts-ignore */
          title={userPosition.accurate ? 'Você está aqui' : 'Localização aproximada'}
        >
          <Popup
            /* @ts-ignore */
            className="customPopup"
          >
            {userPosition.accurate ? 'Você está aqui' : 'Localização aproximada'}
          </Popup>
        </Marker>
      </MapBox>
    )
  }
  return null
}

export default MapFrame
