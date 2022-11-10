import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store';
import {
    clearFiles as clearPlayerFiles,
    togglePlayer,
} from 'components/MusicPlayer/store/musicPlayerSlice';
import useIsMobile from 'hooks/useIsMobile';
import { MenuItem } from 'types';
import NavbarMobile from './Navbar.mobile';
import NavbarView from './Navbar.view';

interface Props {
    menuItems: MenuItem[];
}

const NavbarContainer = ({ menuItems }: Props) => {
    const dispatch = useAppDispatch();
    const { showPlayer, current, playing } = useAppSelector(
        ({ musicPlayer }) => musicPlayer
    );
    const [activePage, setActivePage] = useState<string>(menuItems[0].name);
    const mobile = useIsMobile();
    const { pathname } = useLocation();

    useEffect(() => {
        const currentItem = menuItems.find(
            (i) =>
                (i.link === '/' && pathname === '/') ||
                (i.link !== '/' && pathname.startsWith(i.link))
        );
        if (currentItem) {
            setActivePage(currentItem.name);
        }
    }, []);

    const handlePageSelect = (name: string) => {
        setActivePage(name);
    };

    const handleToggleMusicPlayer = () => {
        dispatch(togglePlayer());
    };

    const handleClosePlayer = () => {
        dispatch(clearPlayerFiles());
    };

    const NavbarComponent = mobile ? NavbarMobile : NavbarView;

    return (
        <NavbarComponent
            activePage={activePage}
            onPageSelect={handlePageSelect}
            menuItems={menuItems}
            onToggleMusicPlayer={handleToggleMusicPlayer}
            playerOpened={showPlayer}
            hasFile={!!current}
            isPlaying={playing}
            onPlayerClose={handleClosePlayer}
        />
    );
};

export default NavbarContainer;
