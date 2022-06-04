import GCLogo from 'assets/images/gc-logo.png';
import dynamic from 'next/dynamic';

export const MapContainer = dynamic(
  async () => {
    const { MapContainer } = await import('react-leaflet');
    return MapContainer;
  },
  { ssr: false },
);
export const TileLayer = dynamic(
  async () => {
    const { TileLayer } = await import('react-leaflet');
    return TileLayer;
  },
  { ssr: false },
);
export const Marker = dynamic(
  async () => {
    const { Marker } = await import('react-leaflet');
    return Marker;
  },
  { ssr: false },
);
export const Popup = dynamic(
  async () => {
    const { Popup } = await import('react-leaflet');
    return Popup;
  },
  { ssr: false },
);

export const changeIcons = () => {
  const Observer = new MutationObserver(() => {
    document
      .querySelector('.leaflet-marker-pane')
      ?.querySelectorAll('img')
      .forEach((element: HTMLImageElement, index, array) => {
        if (element.getAttribute('title') === null) {
          element.src = GCLogo.src;
          element.style.width = '40px';
          element.style.height = '45px';
        }

        if (index === array.length - 1) {
          Observer.disconnect();
        }
      });
  });

  Observer.observe(document, { childList: true, subtree: true });
};
