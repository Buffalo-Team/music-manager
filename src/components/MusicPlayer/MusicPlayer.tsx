import { SyntheticEvent, useEffect, RefObject } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import MusicPlayerWidget from 'components/MusicPlayer/MusicPlayerWidget';
import {
    playNext,
    setFileDetails,
} from 'components/MusicPlayer/store/musicPlayerSlice';

interface Props {
    playerRef: RefObject<HTMLAudioElement>;
}

const MusicPlayer = ({ playerRef }: Props) => {
    const dispatch = useAppDispatch();
    const { current, playing, muted } = useAppSelector(
        ({ musicPlayer }) => musicPlayer
    );
    const { directLink } = current || {};

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }
        playerRef.current.src = directLink || '';
        if (playing) {
            playerRef.current.play();
        }
    }, [directLink]);

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }
        if (playing) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
    }, [playing]);

    useEffect(() => {
        if (!playerRef.current) {
            return;
        }
        playerRef.current.muted = muted;
    }, [muted]);

    const updateCurrentTimeValue = (time: number) => {
        dispatch(
            setFileDetails({
                currentTime: time,
            })
        );
    };

    const onLoadMetadata = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
        dispatch(
            setFileDetails({
                fileLengthSeconds: e.currentTarget.duration || 0,
            })
        );
    };

    return (
        <>
            <MusicPlayerWidget playerRef={playerRef} />
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio
                ref={playerRef}
                onLoadedMetadata={onLoadMetadata}
                onTimeUpdate={(event) =>
                    updateCurrentTimeValue(event.currentTarget.currentTime)
                }
                onEnded={() => dispatch(playNext())}
            >
                <source src={directLink} type="audio/mpeg" />
            </audio>
        </>
    );
};

export default MusicPlayer;
