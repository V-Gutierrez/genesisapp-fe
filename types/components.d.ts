interface LinkItemProps {
  name: string;
  icon: IconType;
  goTo: string;
}

interface HeaderProps {
  onOpen: () => void;
}

interface NavItemProps {
  icon: IconType;
  goTo: string;
  children: string;
}

interface SidebarProps {
  onClose: () => void;
}

interface CoordsState {
  lat: number | null;
  lng: number | null;
}

interface GroupListProps {
  GCDataset: GrowthGroup[];
  selectCoordsHandler: (lat: number, lng: number) => void;
  currentCoords: CoordsState;
}

interface GroupCardProps {
  Group: GrowthGroup;
  selectCoordsHandler: (lat: number, lng: number) => void;
  active: boolean;
}

interface MapFrameProps {
  GCDataset: GrowthGroup[];
  currentCoords: CoordsState;
  selectCoordsHandler: (lat: number, lng: number) => void;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
