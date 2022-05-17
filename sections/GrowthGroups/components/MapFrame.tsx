import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  changeIcons,
} from 'sections/GrowthGroups/components/Leaflet';
import React, { useEffect, useState } from 'react';

function MapFrame({ GCDataset, currentCoords, selectCoordsHandler }: MapFrameProps) {
  const [userPosition, setUserPosition] = useState<CoordsState>({ lat: null, lng: null });
  const [mapLoading, setMapLoading] = useState(true);

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserPosition({ lat: latitude, lng: longitude });
        selectCoordsHandler(latitude, longitude);
      },
      () => {
        setUserPosition({ lat: -34.6037, lng: -58.3816 });
        selectCoordsHandler(-34.6037, -58.3816);
      },
      {
        timeout: 30000,
        enableHighAccuracy: true,
      },
    );
  }

  useEffect(() => {
    getUserLocation();
    changeIcons();
  }, []);

  useEffect(() => {
    setMapLoading(true);

    const delay = setTimeout(() => {
      setMapLoading(false);
      changeIcons();
      clearTimeout(delay);
    }, 250);
  }, [currentCoords]);

  if (mapLoading || !GCDataset || !currentCoords.lat || !currentCoords.lng) {
    return (
      <Skeleton
        h="100%" w={{
          lg: '80%',
          md: '100%',
          sm: '100%',
          base: '100%',
        }} />
    )
  }

  if (GCDataset && currentCoords.lat && currentCoords.lng) {
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
        overflow="clip"
      >
        <MapContainer
          /* @ts-ignore */
          center={[currentCoords.lat as number, currentCoords.lng as number]}
          zoomAnimation
          zoom={15}
          fadeAnimation
          scrollWheelZoom
        >
          <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
          {GCDataset.map((gc) => (
            <Marker key={gc.id} position={[gc.lat, gc.lng]}>
              <Popup
                /* @ts-ignore */
                className="customPopup"
              >
                <Text fontSize={{ base: '14px' }} fontWeight="800">
                  {gc.name}
                </Text>
                <Text fontSize={{ base: '14px' }}>{gc.addressInfo}</Text>
                <Text fontSize={{ base: '14px' }}>
                  Líderes:
                  {' '}
                  {gc.leadership.map((leader) => leader).join(', ')}
                </Text>
                <Link href={gc.whatsappLink} target="_blank">
                  <Flex flexDirection="row" alignItems="center">
                    <Text mr="120px" color="white" textDecoration="underline">
                      Entrar no grupo
                    </Text>
                  </Flex>
                </Link>
              </Popup>
            </Marker>
          ))}

          <Marker
            position={[userPosition.lat as number, userPosition.lng as number]}
            data-tip="userTip"
            /* @ts-ignore */
            title="Você"
          >
            <Popup
              /* @ts-ignore */
              className="customPopup"
            >
              Você está aqui
            </Popup>
          </Marker>
        </MapContainer>
        )}
      </Box>
    );
  }
  return null;
}

export default MapFrame;
