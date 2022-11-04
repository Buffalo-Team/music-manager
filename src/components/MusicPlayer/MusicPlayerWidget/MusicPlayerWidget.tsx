import { RefObject, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import Controls from 'components/MusicPlayer/MusicPlayerWidget/Controls';
import Header from 'components/MusicPlayer/MusicPlayerWidget/Header';
import MuteButton from 'components/MusicPlayer/MusicPlayerWidget/MuteButton';
import PlaylistButton from 'components/MusicPlayer/MusicPlayerWidget/PlaylistButton';
import Progress from 'components/MusicPlayer/MusicPlayerWidget/Progress';
import {
    play,
    pause,
    closePlayer,
    togglePlaylist,
    playPrevious,
    playNext,
    toggleMuted,
    setFileDetails,
} from 'components/MusicPlayer/store/musicPlayerSlice';
import Styled from './MusicPlayerWidget.styled';

interface Props {
    playerRef: RefObject<HTMLAudioElement>;
    embedded?: boolean;
    hidePlaylistToggle?: boolean;
    hideClose?: boolean;
}

const MusicPlayerWidget = ({
    playerRef,
    embedded,
    hidePlaylistToggle,
    hideClose,
}: Props) => {
    const dispatch = useAppDispatch();
    const {
        files,
        current,
        showPlayer,
        showPlaylist,
        playing,
        muted,
        currentTime,
        fileLengthSeconds,
    } = useAppSelector(({ musicPlayer }) => musicPlayer);
    const { name } = current || {};
    const { hasPrevious, hasNext } = useMemo(() => {
        const currentIndex = files
            .map((f) => f.id)
            .findIndex((id) => id === current?.id);
        return {
            hasPrevious: currentIndex > 0,
            hasNext: currentIndex < files.length - 1 && currentIndex >= 0,
        };
    }, [current, files]);

    const handleCurrentTimeChange = (time: number) => {
        if (!playerRef.current) {
            return;
        }
        playerRef.current.currentTime = time;
        updateCurrentTimeValue(time);
    };

    const updateCurrentTimeValue = (time: number) => {
        dispatch(
            setFileDetails({
                currentTime: time,
            })
        );
    };

    return (
        <Styled.Container open={showPlayer || !!embedded} embedded={embedded}>
            <Styled.WidgetRoot embedded={embedded}>
                <Header
                    title={name}
                    onClose={() => dispatch(closePlayer())}
                    hideClose={hideClose}
                />
                <Progress
                    currentTime={currentTime}
                    length={fileLengthSeconds}
                    onChange={(e, value) => {
                        const seconds = Array.isArray(value) ? value[0] : value;
                        handleCurrentTimeChange(seconds);
                    }}
                />
                <Styled.Controls>
                    <MuteButton
                        active={muted}
                        onClick={() => dispatch(toggleMuted())}
                    />
                    <Controls
                        playing={playing}
                        onPlay={() => dispatch(play())}
                        onPause={() => dispatch(pause())}
                        onPrevious={() => dispatch(playPrevious())}
                        onNext={() => dispatch(playNext())}
                        hasPrevious={hasPrevious}
                        hasNext={hasNext}
                    />
                    {!hidePlaylistToggle && (
                        <PlaylistButton
                            active={showPlaylist}
                            onClick={() => dispatch(togglePlaylist())}
                        />
                    )}
                </Styled.Controls>
            </Styled.WidgetRoot>
        </Styled.Container>
    );
};

export default MusicPlayerWidget;
