import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from 'types';
import sortFiles from "pages/Home/components/FilesList/sortFiles";

type MusicPlayerSliceType = {
    files: File[];
    current?: File;
    showPlayer: boolean;
    showPlaylist: boolean;
    playing: boolean;
    muted: boolean;
    currentTime: number;
    fileLengthSeconds: number;
};

const initialState: MusicPlayerSliceType = {
    files: [],
    showPlayer: false,
    showPlaylist: false,
    playing: false,
    muted: false,
    currentTime: 0,
    fileLengthSeconds: 0,
};

const { actions, reducer } = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        clearFiles: () => initialState,
        setFiles: (state, action: PayloadAction<{ files: File[] }>) => ({
            ...state,
            files: (action.payload.files || []).sort(sortFiles),
        }),
        play: (
            state,
            action: PayloadAction<Partial<MusicPlayerSliceType> | undefined>
        ) => ({
            ...state,
            playing: true,
            ...(action.payload || {}),
        }),
        pause: (state) => ({
            ...state,
            playing: false,
        }),
        toggleMuted: (state) => ({
            ...state,
            muted: !state.muted,
        }),
        playPrevious: (state) => {
            const currentFileId = state.current?.id;
            const index = state.files.findIndex((f) => f.id === currentFileId);
            if (index > 0) {
                state.current = state.files[index - 1];
                state.playing = true;
            }
        },
        playNext: (state) => {
            const currentFileId = state.current?.id;
            const index = state.files.findIndex((f) => f.id === currentFileId);
            if (index < state.files.length - 1) {
                state.current = state.files[index + 1];
                state.playing = true;
            } else {
                state.playing = false;
            }
        },
        openPlayer: (state) => {
            state.showPlayer = true;
        },
        closePlayer: (state) => {
            state.showPlayer = false;
        },
        togglePlaylist: (state) => {
            state.showPlaylist = !state.showPlaylist;
        },
        closePlaylist: (state) => {
            state.showPlaylist = false;
        },
        togglePlayer: (state) => {
            state.showPlayer = !state.showPlayer;
        },
        setFileDetails: (
            state,
            action: PayloadAction<{
                currentTime?: number;
                fileLengthSeconds?: number;
            }>
        ) => ({
            ...state,
            ...action.payload,
        }),
    },
});

export const {
    play,
    pause,
    playPrevious,
    playNext,
    togglePlayer,
    closePlayer,
    closePlaylist,
    togglePlaylist,
    toggleMuted,
    setFileDetails,
    clearFiles,
    setFiles,
} = actions;

export default reducer;
