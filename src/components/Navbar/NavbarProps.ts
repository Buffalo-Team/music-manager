import { MenuItem } from 'types';

interface NavbarProps {
    activePage: string;
    onPageSelect: (name: string) => void;
    menuItems: MenuItem[];
    logout: () => void;
    className?: string;
}

export default NavbarProps;
