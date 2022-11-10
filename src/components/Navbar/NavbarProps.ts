import { MenuItem } from 'types';

interface NavbarProps {
    activePage: string;
    onPageSelect: (name: string) => void;
    menuItems: MenuItem[];
    className?: string;
    onToggleMusicPlayer: () => void;
    playerOpened: boolean;
    hasFile: boolean;
    isPlaying: boolean;
    onPlayerClose: () => void;
}

export default NavbarProps;
